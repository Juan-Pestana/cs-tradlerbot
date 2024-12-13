'use client'

import Link from 'next/link'
import React from 'react'
import { DarkModeToggle } from './DarkModeToggle'
import { useParams, usePathname } from 'next/navigation'

interface Iheader {
  slug: string
}

function Header() {
  const slug = usePathname()

  return (
    <div className="p-4 flex h-14 items-center justify-between supports-backdrop-blur:bg-background">
      <span className="font-bold">TradlerBot </span>
      {/* <div className="flex gap-3 items-center">
        <Link
          className={slug == '/manager' ? 'font-bold text-lg' : ''}
          href={'/manager'}
        >
          Manager
        </Link>
        <Link
          className={slug != '/manager' ? 'font-bold text-lg' : ''}
          href={'/'}
        >
          User
        </Link>
      </div> */}
      <DarkModeToggle />
    </div>
  )
}

export default Header
