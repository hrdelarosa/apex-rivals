import { DriverScrape } from '../types/api/scraping'
import { Browser } from 'playwright'
import { isValidUrl, slugify } from './scrapers/helpers'
import { createPage, closePage } from '../lib/scraper'

interface ScrapeDriverDataParams {
  browser: Browser
  url: string | null | undefined
}

export async function scrapeDriverData({
  browser,
  url,
}: ScrapeDriverDataParams): Promise<DriverScrape | null> {
  if (!url) return null

  // Validar URL antes de proceder
  if (!isValidUrl(url)) {
    console.warn('Skipping invalid driver URL:', url)
    return null
  }

  const page = await createPage(browser)

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('h1 span', { timeout: 8000 })

    // Main container for driver info. Nota: la estructura F1 2025: div.relative.h-full.flex-grow
    const container = await page.$('div.relative.h-full.flex-grow')

    if (!container) {
      console.warn('Driver container not found for URL:', url)
      return null
    }

    // Scrape driver details
    // Información del nobre del piloto
    const firstName = await container.$eval(
      'h1 span span:first-child',
      (el) => el.textContent?.trim() ?? ''
    )
    const lastName = await container.$eval(
      'h1 span:nth-child(2)',
      (el) => el.textContent?.trim() ?? ''
    )
    const nationality = await container.$eval(
      'div.flex.gap-px-12.items-center div.flex.gap-px-8.items-center p',
      (el) => el.textContent?.trim() ?? ''
    )
    const team = await container.$eval(
      'div.flex.gap-px-12.items-center > p:nth-of-type(1)',
      (el) => el.textContent?.trim() ?? ''
    )
    const driverNumber = await container.$eval(
      'div.flex.gap-px-12.items-center > p:nth-of-type(2)',
      (el) => el.textContent?.trim() ?? ''
    )
    // Contenedor de las imágenes. Nota: la estructura F1 2025: div.absolute.bottom-0.right-0.w-full.flex.justify-center
    const containerImages = await page.$(
      'div.absolute.bottom-0.right-0.w-full.flex.justify-center'
    )

    if (!containerImages) {
      console.warn(`Driver ${firstName} ${lastName} has no portrait image.`)
      return null
    }
    // URL de la imagen del piloto
    const driverImage =
      (await containerImages.$eval('img', (el) => el.getAttribute('src'))) ?? ''

    return {
      id: slugify(`${firstName}-${lastName}`),
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      acronymName: lastName.slice(0, 3).toUpperCase(),
      nationality,
      driverNumber,
      team: {
        id: slugify(team),
        name: team,
      },
      images: {
        portraitUrl: driverImage,
      },
    }
  } catch (error) {
    console.warn('Error scraping driver at URL:', url, error)
    return null
  } finally {
    await closePage(page)
  }
}
