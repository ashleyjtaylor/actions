import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <h1>Welcome to Next.js on AWS S3</h1>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/server">Server</Link>
        {children}
      </body>
    </html>
  )
}
