"use client"
import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"

const FaqSection = () => {
   const [openAccordion, setOpenAccordion] = useState('collapse3')
   const t = useTranslations()

   const toggleAccordion = (id) => {
      setOpenAccordion(openAccordion === id ? '' : id)
   }

   const faq_categories = [
      {
         id: 1,
         id_name: "Buying",
         title: t('faqBuyingTitle'),
         md_pt: false,
         faq: [
            { id: 1, question: t('faqBuyingQ1'), answer: t('faqBuyingA1') },
            { id: 2, question: t('faqBuyingQ2'), answer: t('faqBuyingA2') },
            { id: 3, question: t('faqBuyingQ3'), answer: t('faqBuyingA3') },
            { id: 4, question: t('faqBuyingQ4'), answer: t('faqBuyingA4') },
         ]
      },
   ]

   return (
      <div className="faq-section-two mt-130 xl-mt-100 mb-150 xl-mb-100">
         <div className="container">
            <div className="title-one text-center mb-80 xl-mb-50 md-mb-30">
               <h3>{t('faqTitle')}</h3>
               <p className="fs-20 mt-xs">{t('faqSubtitle')}</p>
            </div>
            
            <div className="row">
               <div className="col-lg-4 wow fadeInLeft">
                  <div className="faq-sidebar">
                     <div className="bg-wrapper">
                        <ul className="style-none">
                           <li><Link href="#Buying">1. <span>{t('faqBuyingTitle')}</span></Link></li>
                        </ul>
                     </div>
                     <div className="bg-wrapper text-center mt-35">
                        <h4 className="mb-35">{t('faqSidebarTitle')}</h4>
                        <Link href="/contact" className="btn-five">{t('faqContactButton')}</Link>
                     </div>
                  </div>
               </div>

               <div className="col-lg-8">
                  {faq_categories.map((item) => (
                     <div key={item.id} className="accordion-style-two no-bg p0 ms-xl-5">
                        <div className={`accordion-title text-uppercase fw-500 ${item.md_pt ? "md-pt-90" : "pt-90"}`} id={item.id_name}>{item.title}</div>
                        <div className="accordion p0" id={`accordion${item.id}`}>
                           {item.faq.map((faq, index) => {
                              const collapseId = `collapse${faq.id}`
                              const isOpen = openAccordion === collapseId
                              
                              return (
                                 <div key={index} className={`accordion-item ${isOpen ? "active" : ""}`}>
                                    <h2 className="accordion-header">
                                       <button 
                                          className={`accordion-button ${!isOpen ? "collapsed" : ""}`} 
                                          type="button"
                                          onClick={() => toggleAccordion(collapseId)}
                                          aria-expanded={isOpen}
                                          aria-controls={collapseId}
                                       >
                                          {faq.question}
                                       </button>
                                    </h2>
                                    <div 
                                       id={collapseId} 
                                       className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
                                       data-bs-parent={`#accordion${item.id}`}
                                    >
                                       <div className="accordion-body">
                                          <p>{faq.answer}</p>
                                       </div>
                                    </div>
                                 </div>
                              )
                           })}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}

export default FaqSection
