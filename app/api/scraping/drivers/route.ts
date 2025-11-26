import { ScrapedResult, DriverScrape } from '@src/types/api/scraping'
import { NextResponse } from 'next/server'
import {
  launchBrowser,
  createContext,
  createContextPage,
  closeContext,
  closeBrowser,
} from '@/src/lib/scraper'
import plimit from 'p-limit'
import { scrapeDriverData } from '@/src/utils/scrapeDriver'
import { isValidUrl } from '@/src/utils/scrapers/helpers'

export async function GET(): Promise<NextResponse> {
  const browser = await launchBrowser()
  const context = await createContext(browser)
  const page = await createContextPage(context)

  try {
    const url = `${process.env.F1_BASE_URL}/en/drivers`

    if (!isValidUrl(url)) throw new Error('Invalid URL')

    await page.goto(`${process.env.F1_BASE_URL}/en/drivers`, {
      waitUntil: 'domcontentloaded',
    })

    // Obtener URLs de los pilotos. Nota: la estructura F1 2025: a[data-f1rd-a7s-click="driver_card_click"]
    const driversUrls = await page.$$eval(
      'a[data-f1rd-a7s-click="driver_card_click"]',
      (driverElements, baseUrl) =>
        driverElements.map((driver) => {
          const href = driver.getAttribute('href') || null
          try {
            return href ? new URL(href, baseUrl).toString() : null
          } catch {
            return null
          }
        }),
      process.env.F1_BASE_URL
    )

    // Verificar si se encontraron URLs de pilotos
    if (!driversUrls || driversUrls.length === 0) {
      console.warn('⚠️ No driver URLs found.')
      return NextResponse.json(
        { error: 'No driver URLs found.' },
        { status: 404 }
      )
    }

    // Limitar concurrencia para no sobrecargar el navegador
    const limit = plimit(5)

    // Iniciar scraping de datos de cada piloto
    const driverPromises = driversUrls.map((url) =>
      limit(() => scrapeDriverData({ browser, url }))
    )

    // Esperar a que todas las promesas se resuelvan. Incluso si algunas fallan y filtra los resultados exitosos y no nulos
    const results = await Promise.allSettled(driverPromises)
    const drivers = results
      .filter((r) => r.status === 'fulfilled' && r.value)
      .map((r) => (r as PromiseFulfilledResult<DriverScrape>).value)

    // Verificar si se obtuvieron datos de pilotos
    if (!drivers || drivers.length === 0) {
      console.warn('⚠️ No driver data scraped.')
      return NextResponse.json(
        { error: 'No driver data scraped.' },
        { status: 404 }
      )
    }

    const response: ScrapedResult<DriverScrape> = {
      status: 'success',
      message: 'Drivers data scraped successfully',
      data: drivers,
      meta: {
        source: 'www.formula1.com/en/drivers',
        description: `List of Formula 1 drivers for ${new Date().getFullYear()} with their images, numbers, and teams`,
      },
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('❌ Error scraping drivers:', error)
    return NextResponse.json(
      { error: `Error scraping drivers: ${error}` },
      { status: 500 }
    )
  } finally {
    await closeContext(context)
    await closeBrowser(browser)
  }
}
