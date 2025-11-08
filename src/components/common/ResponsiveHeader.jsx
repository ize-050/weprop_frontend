'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const HeaderTwo = dynamic(() => import("@/layouts/headers/HeaderTwo"), { ssr: false })
const MobileHeader = dynamic(() => import("@/layouts/headers/MobileHeader"), { ssr: false })

export default function ResponsiveHeader() {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isClient) return null

  return isMobile ? <MobileHeader /> : <HeaderTwo style_1={true} style_2={false} />
}
