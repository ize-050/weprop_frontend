'use client'
import useSimpleTranslations from '@/hooks/useSimpleTranslations'

const WhyChooseUs = () => {
   const { t } = useSimpleTranslations('home')

   const features = [
      {
         id: 1,
         icon: 'flaticon-verification',
         title: t('why-verified', 'Verified Properties'),
         description: t('why-verified-desc', 'All properties are verified and inspected by our professional team')
      },
      {
         id: 2,
         icon: 'flaticon-customer-service',
         title: t('why-support', '24/7 Support'),
         description: t('why-support-desc', 'Our dedicated team is available round the clock to assist you')
      },
      {
         id: 3,
         icon: 'flaticon-price-tag',
         title: t('why-price', 'Best Prices'),
         description: t('why-price-desc', 'Competitive pricing with no hidden fees or charges')
      },
      {
         id: 4,
         icon: 'flaticon-agreement',
         title: t('why-legal', 'Legal Assistance'),
         description: t('why-legal-desc', 'Complete legal support for all property transactions')
      },
      {
         id: 5,
         icon: 'flaticon-location',
         title: t('why-location', 'Prime Locations'),
         description: t('why-location-desc', 'Properties in the most sought-after areas of Pattaya')
      },
      {
         id: 6,
         icon: 'flaticon-investment',
         title: t('why-investment', 'Investment Advice'),
         description: t('why-investment-desc', 'Expert guidance on property investment opportunities')
      }
   ]

   return (
      <div className="block-feature-two mt-150 xl-mt-120 md-mt-80">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="title-one text-center mb-60 lg-mb-40 wow fadeInUp">
                     <h3>{t('why-title', 'Why Choose 12 Real Estate?')}</h3>
                     <p className="fs-22 mt-20">
                        {t('why-subtitle', 'Your trusted partner in finding the perfect property in Pattaya')}
                     </p>
                  </div>
               </div>
            </div>
            <div className="row gx-xxl-5">
               {features.map((feature, index) => (
                  <div key={feature.id} className="col-lg-4 col-md-6 d-flex wow fadeInUp" data-wow-delay={`${index * 0.1}s`}>
                     <div className="card-style-five text-center mt-40 w-100">
                        <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto" style={{
                           width: '80px',
                           height: '80px',
                           backgroundColor: '#8B0000',
                           marginBottom: '30px'
                        }}>
                           <i className={feature.icon} style={{ fontSize: '35px', color: '#fff' }}></i>
                        </div>
                        <h4 className="fw-500 mb-20">{feature.title}</h4>
                        <p className="fs-18 lh-lg mb-0">{feature.description}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default WhyChooseUs
