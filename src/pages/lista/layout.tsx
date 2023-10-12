"use client"
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Lista de participantes',
  description: '',
}

export default function ListaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <>{children}
      <script src="https://kit.fontawesome.com/3f5b62cc81.js" crossOrigin="anonymous"></script>
    </>

  )
}
