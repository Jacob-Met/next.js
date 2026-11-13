import type { ReactNode } from 'react'

export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header id="site-header">Site header</header>
        {children}
      </body>
    </html>
  )
}
