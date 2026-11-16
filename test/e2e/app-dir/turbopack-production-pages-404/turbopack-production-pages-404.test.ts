import { nextTestSetup } from 'e2e-utils'

describe('turbopack-production-pages-404', () => {
  const { next, isNextStart } = nextTestSetup({
    files: __dirname,
  })

  // Regression for #58945 and the Turbopack production gap in #95713.
  // An app directory with only a layout must not shadow pages/404.
  const itInProduction = isNextStart ? it : it.skip

  it('preserves App Router metadata routes alongside Pages Router pages', async () => {
    const response = await next.fetch('/robots.txt')
    expect(response.status).toBe(200)
    expect(await response.text()).toContain('Disallow: /private')
  })

  it('preserves App Router route handlers alongside Pages Router pages', async () => {
    const response = await next.fetch('/api/health')
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: 'healthy' })
  })

  it('should render the pages router home page', async () => {
    const $ = await next.render$('/')
    expect($('p').text()).toBe('hello world')
  })

  /* eslint-disable jest/no-standalone-expect */
  itInProduction(
    'should use the custom pages/404 instead of the app router built-in not-found',
    async () => {
      const res = await next.fetch('/does-not-exist')
      expect(res.status).toBe(404)
      const html = await res.text()
      expect(html).toContain('PAGES ROUTER CUSTOM 404')
    }
  )

  itInProduction('should use the custom pages/404 in the browser', async () => {
    const browser = await next.browser('/does-not-exist')
    expect(await browser.elementByCss('p').text()).toBe(
      'PAGES ROUTER CUSTOM 404'
    )
  })
  /* eslint-enable jest/no-standalone-expect */
})
