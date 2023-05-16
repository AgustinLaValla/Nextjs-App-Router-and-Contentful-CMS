import NextLink from 'next/link';
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className='bg-stone-100 p-8'>
          <nav className='container'>
            <ul className='flex gap-4'>
              <li>
                <NextLink
                  href='/'
                  className='text-sm font-medium uppercase text-stone-400'
                >
                  Home
                </NextLink>
              </li>
              <li>
                <NextLink
                  href='/posts'
                  className='text-sm font-medium uppercase text-stone-400'
                >
                  Posts
                </NextLink>
              </li>
            </ul>
          </nav>
        </header>

        <main className='container p-8'>{children}</main>

        <footer className='bg-stone-100 text-sm font-medium uppercase text-stone-400 px-8 py-4'>
          <div className='container'>
            <p>Footer</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
