import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Script
          id="layout-consent-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: 'window.rootBeforeInteractiveExecuted = true;',
          }}
        />
        <Script src="/critical-consent.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  )
}
