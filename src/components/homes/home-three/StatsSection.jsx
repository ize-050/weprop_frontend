'use client'
import { useState, useEffect } from 'react'
import useSimpleTranslations from '@/hooks/useSimpleTranslations'

const StatsSection = () => {
   const { t } = useSimpleTranslations('home')
   const [counts, setCounts] = useState({
      properties: 0,
      clients: 0,
      experience: 0,
      agents: 0
   })

   const stats = [
      {
         id: 1,
         icon: 'flaticon-home-1',
         target: 500,
         suffix: '+',
         label: t('stats-properties', 'Properties Listed'),
         key: 'properties'
      },
      {
         id: 2,
         icon: 'flaticon-user',
         target: 1200,
         suffix: '+',
         label: t('stats-clients', 'Happy Clients'),
         key: 'clients'
      },
      {
         id: 3,
         icon: 'flaticon-trophy',
         target: 15,
         suffix: '+',
         label: t('stats-experience', 'Years Experience'),
         key: 'experience'
      },
      {
         id: 4,
         icon: 'flaticon-team',
         target: 25,
         suffix: '+',
         label: t('stats-agents', 'Expert Agents'),
         key: 'agents'
      }
   ]

   useEffect(() => {
      const duration = 2000 // 2 seconds
      const steps = 60
      const interval = duration / steps

      stats.forEach(stat => {
         let current = 0
         const increment = stat.target / steps
         
         const timer = setInterval(() => {
            current += increment
            if (current >= stat.target) {
               setCounts(prev => ({ ...prev, [stat.key]: stat.target }))
               clearInterval(timer)
            } else {
               setCounts(prev => ({ ...prev, [stat.key]: Math.floor(current) }))
            }
         }, interval)
      })
   }, [])

   return (
      <div className="block-feature-three mt-150 xl-mt-120 md-mt-80">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="title-one text-center mb-60 lg-mb-40 wow fadeInUp">
                     <h3>{t('stats-title', 'Our Success in Numbers')}</h3>
                     <p className="fs-22 mt-20">
                        {t('stats-subtitle', 'Trusted by thousands of clients across Pattaya')}
                     </p>
                  </div>
               </div>
            </div>
            <div className="row gx-xxl-5">
               {stats.map((stat) => (
                  <div key={stat.id} className="col-lg-3 col-sm-6 d-flex wow fadeInUp" data-wow-delay={`${stat.id * 0.1}s`}>
                     <div className="card-style-four text-center mt-30 w-100">
                        <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto" style={{
                           width: '90px',
                           height: '90px',
                           backgroundColor: '#fff5f5',
                           marginBottom: '25px'
                        }}>
                           <i className={stat.icon} style={{ fontSize: '40px', color: '#8B0000' }}></i>
                        </div>
                        <h2 className="fw-bold" style={{ color: '#8B0000', fontSize: '48px', marginBottom: '10px' }}>
                           {counts[stat.key]}{stat.suffix}
                        </h2>
                        <p className="fs-20 mb-0">{stat.label}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default StatsSection
