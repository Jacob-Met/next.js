import type { ReactNode } from 'react'

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return <section id="locale-layout">{children}</section>
}
