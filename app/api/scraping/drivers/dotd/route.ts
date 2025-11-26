import { DotDDriverScrape, ScrapedResult } from '@/src/types/api/scraping'
import { NextResponse } from 'next/server'
import {
  launchBrowser,
  createContext,
  createContextPage,
  closeContext,
  closeBrowser,
} from '@src/lib/scraper'
import { isValidUrl } from '@/src/utils/scrapers/helpers'

export async function GET(): Promise<NextResponse> {
  const browser = await launchBrowser()
  const context = await createContext(browser)
  const page = await createContextPage(context)

  try {
    const url = `${process.env.F1_BASE_URL}/en/page/vote`

    if (!isValidUrl(url)) throw new Error('Invalid URL')

    await page.goto(url, { waitUntil: 'domcontentloaded' })
    // Esperar iframe con race (más seguro)
    await Promise.race([
      page.waitForSelector('iframe#DOTD', { timeout: 15000 }),
      page.waitForLoadState('networkidle'),
    ])

    const frame = page
      .frames()
      .find((f) => f.name() === 'DOTD' || f.url().includes('amplifyapp.com'))

    if (!frame) throw new Error('DOTD iframe not found.')

    await frame.waitForSelector('div.driver-name')

    const driverData = await frame.evaluate(() => {
      const nameEl = document.querySelector('div.driver-name')
      const first = nameEl?.children[0]?.textContent?.trim() || ''
      const last = nameEl?.children[1]?.textContent?.trim() || ''

      let number = ''
      document.querySelectorAll('strong').forEach((el) => {
        const t = el.textContent?.trim() || ''
        if (t.length <= 2 && !isNaN(Number(t))) number = t
      })

      return { firstName: first, lastName: last, driverNumber: number }
    })

    const response: ScrapedResult<DotDDriverScrape> = {
      status: 'success',
      message: 'Driver of the Day obtained successfully',
      data: driverData,
      meta: {
        source: 'www.formula1.com/en/page/vote',
        description: `Driver of the Day information for ${new Date().getFullYear()}`,
      },
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('❌ Error scraping Driver of the Day:', error)
    return NextResponse.json(
      { error: `Error scraping Driver of the Day: ${error}` },
      { status: 500 }
    )
  } finally {
    await closeContext(context)
    await closeBrowser(browser)
  }
}
