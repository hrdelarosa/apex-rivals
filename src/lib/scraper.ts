import { Browser, BrowserContext, chromium, Page } from 'playwright'

export async function launchBrowser(): Promise<Browser> {
  return await chromium.launch({ headless: true })
}

export async function closeBrowser(browser: Browser): Promise<void> {
  await browser.close()
}

export async function createContext(browser: Browser): Promise<BrowserContext> {
  return await browser.newContext()
}

export async function closeContext(context: BrowserContext): Promise<void> {
  await context.close()
}

export async function createContextPage(
  context: BrowserContext
): Promise<Page> {
  return await context.newPage()
}

export async function createPage(browser: Browser): Promise<Page> {
  return await browser.newPage()
}

export async function closePage(page: Page): Promise<void> {
  await page.close()
}
