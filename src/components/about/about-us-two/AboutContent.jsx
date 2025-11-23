'use client'

import Image from "next/image"
import Link from "next/link"
import { useLocale } from 'next-intl'

const AboutContent = () => {
   const locale = useLocale()

   const translations = {
      upperTitle: {
         en: 'About Us',
         th: 'เกี่ยวกับเรา',
         zh: '关于我们',
         ru: 'О нас'
      },
      mainTitle: {
         en: 'About',
         th: 'เกี่ยวกับ',
         zh: '关于',
         ru: 'О'
      },
      companyName: '12 Real Estate Pattaya',
      whoWeAre: {
         title: {
            en: 'Who we are',
            th: 'เราเป็นใคร',
            zh: '我们是谁',
            ru: 'Кто мы'
         },
         content: {
            en: 'The 12 Real Estate Pattaya is a team of hyperlocal agents specializing in the Pattaya market. We select only real units with verified documents, handling everything from selection, viewing, negotiation, and financing, up to the transfer date, including foreign quota cases.',
            th: 'The 12 Real Estate Pattaya คือทีมเอเจนต์ไฮเปอร์โลคัลผู้เชี่ยวชาญทำเลพัทยา คัดเฉพาะยูนิตจริงที่ตรวจเอกสารแล้ว ดูแลครบตั้งแต่คัดเลือก พาชม ต่อรอง ไฟแนนซ์ จนถึงวันโอน รวมถึงเคสโควต้าต่างชาติ',
            zh: 'The 12 Real Estate Pattaya 是一支专注于芭提雅市场的超本地代理团队。我们只选择经过文件验证的真实单位，从选择、看房、谈判、融资到过户日期，包括外国配额案例，全程处理。',
            ru: 'The 12 Real Estate Pattaya — это команда гиперлокальных агентов, специализирующихся на рынке Паттайи. Мы выбираем только реальные объекты с проверенными документами, обрабатывая все от выбора, просмотра, переговоров и финансирования до даты передачи, включая случаи иностранной квоты.'
         }
      },
      ourGoal: {
         title: {
            en: "What Our Goal",
            th: 'เป้าหมายของเรา',
            zh: '我们的目标',
            ru: 'Наша цель'
         },
         content: {
            en: 'To get you to "Beautiful units, great value, easy ownership" through deals that are fair, transparent, and enable fast decisions, reducing the time and risk in purchasing, whether for residency or investment.',
            th: 'พาคุณไปถึง "ห้องสวย มูลค่าดี ถือครองง่าย" ด้วยดีลที่แฟร์ โปร่งใส และตัดสินใจได้เร็ว ลดเวลาและความเสี่ยงในการซื้อ ไม่ว่าซื้ออยู่เองหรือเพื่อการลงทุน',
            zh: '通过公平、透明且能够快速决策的交易，让您获得"美丽单位、超值价格、易于拥有"，减少购买的时间和风险，无论是用于居住还是投资。',
            ru: 'Привести вас к "Красивым квартирам, отличной стоимости, легкому владению" через справедливые, прозрачные сделки, позволяющие быстро принимать решения, сокращая время и риски при покупке, будь то для проживания или инвестиций.'
         }
      },
      ourVision: {
         title: {
            en: 'Our Vision',
            th: 'วิสัยทัศน์ของเรา',
            zh: '我们的愿景',
            ru: 'Наше видение'
         },
         content: {
            en: 'To be the real estate partner with deep knowledge of the Pattaya market, focused on providing "Real value in worthwhile deals" based on actual data and end-to-end service standards, enhanced by local expertise and exclusive cooperation with leading projects such as Laguna Beach Resort and The Peak Tower.',
            th: 'เป็นพาร์ทเนอร์อสังหาฯ รู้ลึกทำเลพัทยา มุ่งให้ "มูลค่าจริงในดีลที่คุ้มค่า" โดยยืนบนข้อมูลจริง และมาตรฐานบริการแบบครบวงจร พร้อมเสริมด้วยความเชี่ยวชาญท้องถิ่นและความร่วมมือเอ็กซ์คลูซีฟกับโครงการชั้นนำ เช่น Laguna Beach Resort และ The Peak Tower',
            zh: '成为深入了解芭提雅市场的房地产合作伙伴，专注于提供"物有所值的真实价值"，基于实际数据和端到端服务标准，并通过本地专业知识和与领先项目（如Laguna Beach Resort和The Peak Tower）的独家合作而增强。',
            ru: 'Быть партнером по недвижимости с глубоким знанием рынка Паттайи, сосредоточенным на предоставлении "Реальной ценности в выгодных сделках" на основе фактических данных и стандартов комплексного обслуживания, усиленных местной экспертизой и эксклюзивным сотрудничеством с ведущими проектами, такими как Laguna Beach Resort и The Peak Tower.'
         }
      },
      contactUs: {
         en: 'Contact Us',
         th: 'ติดต่อเรา',
         zh: '联系我们',
         ru: 'Связаться с нами'
      }
   }

   return (
      <div className="block-feature-two mt-150 xl-mt-100">
         <div className="container">
            <div className="row gx-xl-5">
               <div className="col-lg-6 wow fadeInLeft">
                  <div className="me-xxl-4">
                     <Image 
                        src="/assets/images/aboutus/get to know -photo.png" 
                        alt="About D-Luck Property" 
                        width={600}
                        height={500}
                        className="lazy-img w-100"
                     />
                  </div>
               </div>

               <div className="col-lg-6 wow fadeInRight">
                  <div className="ms-xxl-4 md-mt-40">
                     <div className="upper-title mb-20">{translations.upperTitle[locale] || translations.upperTitle.en}</div>
                     <h3 className="mb-40">
                        {translations.mainTitle[locale] || translations.mainTitle.en}{' '}
                        <span className="text-danger">{translations.companyName}</span>
                     </h3>
                     
                     <div className="accordion accordion-style-one" id="accordionAbout">
                        <div className="accordion-item active">
                           <h2 className="accordion-header">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse" 
                                 data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                 {translations.whoWeAre.title[locale] || translations.whoWeAre.title.en}
                              </button>
                           </h2>
                           <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionAbout">
                              <div className="accordion-body">
                                 <p>{translations.whoWeAre.content[locale] || translations.whoWeAre.content.en}</p>
                              </div>
                           </div>
                        </div>
                        
                        <div className="accordion-item">
                           <h2 className="accordion-header">
                              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                                 data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                 {translations.ourGoal.title[locale] || translations.ourGoal.title.en}
                              </button>
                           </h2>
                           <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionAbout">
                              <div className="accordion-body">
                                 <p>{translations.ourGoal.content[locale] || translations.ourGoal.content.en}</p>
                              </div>
                           </div>
                        </div>

                        <div className="accordion-item">
                           <h2 className="accordion-header">
                              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                                 data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                 {translations.ourVision.title[locale] || translations.ourVision.title.en}
                              </button>
                           </h2>
                           <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionAbout">
                              <div className="accordion-body">
                                 <p>{translations.ourVision.content[locale] || translations.ourVision.content.en}</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <Link href="/contact" className="btn-two mt-50 md-mt-30">
                        {translations.contactUs[locale] || translations.contactUs.en}
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default AboutContent
