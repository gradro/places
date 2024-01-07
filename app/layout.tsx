import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { options } from './api/auth/[...nextauth]/options';
import { NextAuthProvider } from '@/provider/NextAuthProvider';
import { getServerSession } from 'next-auth';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Places - Social network for sharing amazing places on earth',
  description: 'Your social network for sharing amazing places on earth',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
        </body>
    </html>
  )
}
