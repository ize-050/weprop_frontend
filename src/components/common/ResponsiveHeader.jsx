'use client'

import { useState, useEffect } from 'react'
import HeaderTwo from "@/layouts/headers/HeaderTwo"
import MobileHeader from "@/layouts/headers/MobileHeader"

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
