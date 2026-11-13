import { notFound } from 'next/navigation'

export const instant = false

export function generateStaticParams() {
  return [{ locale: 'en', slug: ['known'] }]
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { slug } = await params
  if (slug[0] !== 'known') notFound()
  return (
    <main id="known-page">
      <h1>Known page</h1>
    </main>
  )
}
