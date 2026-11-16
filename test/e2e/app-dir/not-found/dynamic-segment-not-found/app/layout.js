import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Script
          id="not-found-critical-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: 'window.notFoundCriticalScriptExecuted = true;',
          }}
        />
        <header id="site-header">Site Header</header>
        <main>{children}</main>
      </body>
    </html>
  )
}
