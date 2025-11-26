import { ConstructorScrape, ScrapedResult } from '@/src/types/api/scraping'
import { NextResponse } from 'next/server'
import {
  launchBrowser,
  createContext,
  createContextPage,
  closeContext,
  closeBrowser,
} from '@/src/lib/scraper'
import { isHexColor, isValidUrl } from '@/src/utils/scrapers/helpers'

export async function GET(): Promise<NextResponse> {
  const browser = await launchBrowser()
  const context = await createContext(browser)
  const page = await createContextPage(context)

  try {
    const url = `${process.env.F1_BASE_URL}/en/teams`

    if (!isValidUrl(url)) throw new Error('Invalid URL')

    await page.goto(url)
    // Obtener datos de los equipos. Nota: la estructura F1 2025: a[data-f1rd-a7s-click="team_card_click"]
    const teams = await page.$$eval(
      'a[data-f1rd-a7s-click="team_card_click"]',
      (teams) =>
        teams.map((team) => {
          // scrape team data
          // Información del equipo como nombre y logo
          const name = team.querySelector(
            'p.typography-module_display-l-bold__m1yaJ'
          )?.innerHTML
          const logoUrl = team
            .querySelector('span.TeamLogo-module_teamlogo__lA3j1 img')
            ?.getAttribute('src')

          // Colores del equipo desde las variables CSS
          const computedStyle = window.getComputedStyle(team)
          // Intentar obtener las variables CSS personalizadas
          let primary =
            computedStyle.getPropertyValue('--f1-team-colour').trim() || null
          let contrast =
            computedStyle.getPropertyValue('--f1-accessible-colour').trim() ||
            null

          // Validar que los colores son hexadecimales
          if (!isHexColor(primary)) primary = null
          if (!isHexColor(contrast)) contrast = null

          // Si no funcionan las variables CSS, intentar con el atributo style
          let fallbackPrimary = null
          let fallbackContrast = null

          if (!primary || !contrast) {
            // Extraer colores del atributo style como fallback
            const style = team.getAttribute('style') || ''
            const matchPrimary = style.match(/--f1-team-colour:\s*([^;]+)/)
            const matchContrast = style.match(
              /--f1-accessible-colour:\s*([^;]+)/
            )

            fallbackPrimary = matchPrimary ? matchPrimary[1].trim() : null
            fallbackContrast = matchContrast ? matchContrast[1].trim() : null

            // Validar que los colores de fallback son hexadecimales
            if (!primary && isHexColor(fallbackPrimary))
              primary = fallbackPrimary
            if (!contrast && isHexColor(fallbackContrast))
              contrast = fallbackContrast
          }

          return {
            id: name?.toLowerCase().replace(/\s+/g, '-'),
            name,
            branding: {
              logoUrl,
            },
            colors: {
              primary: primary || fallbackPrimary,
              contrast: contrast || fallbackContrast,
            },
          }
        })
    )

    // Filtrar equipos con datos válidos
    const validTeams = teams.filter(
      (team): team is ConstructorScrape =>
        team.id !== undefined && team.name !== undefined
    )

    const response: ScrapedResult<ConstructorScrape> = {
      status: 'success',
      message: 'Constructors data scraped successfully',
      data: validTeams,
      meta: {
        source: 'www.formula1.com/en/teams',
        description: `List of Formula 1 constructors for ${new Date().getFullYear()} with their logos, cars, and colors`,
      },
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('❌ Error scraping constructors:', error)
    return NextResponse.json(
      { error: `Error scraping constructors: ${error}` },
      { status: 500 }
    )
  } finally {
    await closeContext(context)
    await closeBrowser(browser)
  }
}
