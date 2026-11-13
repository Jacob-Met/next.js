import { nextTestSetup } from 'e2e-utils'

describe('cache components terminal static not-found recovery', () => {
  const { next } = nextTestSetup({ files: __dirname })

  it('serves the nearest not-found boundary and layout in initial 404 HTML', async () => {
    const res = await next.fetch('/en/missing')
    expect(res.status).toBe(404)
    const html = await res.text()
    expect(html).not.toContain('id="__next_error__"')
    expect(html).toContain('lang="en"')
    expect(html).toContain('Site header')
    expect(html).toContain('Localized missing page')
    expect(html).toContain('name="robots" content="noindex"')
  })

  it('can navigate away from the hydrated 404', async () => {
    const browser = await next.browser('/en/missing')
    await browser.waitForElementByCss('#return-home')
    await browser.elementByCss('#return-home').click()
    await browser.waitForElementByCss('#home-page')
    expect(await browser.eval(() => location.pathname)).toBe('/')
  })

  it('serves ordinary routes with status 200', async () => {
    const res = await next.fetch('/')
    expect(res.status).toBe(200)
    expect(await res.text()).toContain('Home page')
  })
})
