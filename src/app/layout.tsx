import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {SWRProvider} from './swr-provider'
import NavBar from './navbar';
import React from "react";
import { Suspense } from 'react'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'PyPI Data',
  description: 'PyPI code explorable on Github',
}

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <SWRProvider>
      <body className={inter.className}>
      <NavBar />
      <div className="container mx-auto">
        <Suspense fallback={<></>}>
        {children}
        </Suspense>
      </div>
      </body>
    </SWRProvider>
    </html>
  )
}
