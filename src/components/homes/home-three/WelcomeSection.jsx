"use client"
import { useLocale } from 'next-intl'

const WelcomeSection = () => {
  const locale = useLocale()

  const welcomeText = {
    en: 'The 12 Real Estate Pattaya is your real estate partner with in-depth knowledge of the Pattaya market, committed to providing "Real value in worthwhile deals" for every project. We hold exclusive status for key projects like Laguna Beach Resort and The Peak Tower. Whether buying for yourself or for investment, you can confidently secure "Beautiful units, great value, easy ownership" in Pattaya, because we are the Pattaya real estate agent you can trust.',
    th: 'The 12 Real Estate Pattaya คือพาร์ทเนอร์อสังหาฯ รู้ลึกทำเลพัทยา มุ่งให้ "มูลค่าจริงในดีลที่คุ้มค่า" ทุกโครงการ พร้อมสถานะเอ็กซ์คลูซีฟในโครงการสำคัญอย่าง Laguna Beach Resort และ The Peak Tower ไม่ว่าซื้ออยู่เองหรือเพื่อการลงทุน "ห้องสวย มูลค่าดี ถือครองง่าย" ในพัทยาได้อย่างมั่นใจเราคือเพราะเราคือ นายหน้าอสังหาฯ พัทยาที่คุณไว้วางใจได้',
    zh: '12 Real Estate Pattaya 是您值得信赖的房地产合作伙伴，深入了解芭提雅市场，致力于为每个项目提供"物有所值的真实价值"。我们拥有 Laguna Beach Resort 和 The Peak Tower 等重点项目的独家代理权。无论是自住还是投资，您都可以放心地在芭提雅获得"精美房源、超值价格、轻松拥有"，因为我们是您可以信赖的芭提雅房地产经纪人。',
    ru: 'The 12 Real Estate Pattaya — ваш партнер по недвижимости с глубоким знанием рынка Паттайи, стремящийся предоставить "Реальную ценность в выгодных сделках" для каждого проекта. Мы имеем эксклюзивный статус для ключевых проектов, таких как Laguna Beach Resort и The Peak Tower. Независимо от того, покупаете ли вы для себя или для инвестиций, вы можете уверенно приобрести "Красивые квартиры, отличную стоимость, легкое владение" в Паттайе, потому что мы — агент по недвижимости Паттайи, которому вы можете доверять.'
  }

  const titleText = {
    part1: {
      en: 'The 12 Real Estate',
      th: 'The 12 Real Estate',
      zh: 'The 12 Real Estate',
      ru: 'The 12 Real Estate'
    },
    part2: {
      en: 'Pattaya Real Value',
      th: 'คอนโดพัทยาและลงทุนอสังหาฯ พัทยา',
      zh: '芭提雅房产真正价值',
      ru: 'Паттайя Реальная Ценность'
    },
    part3: {
      en: 'in Every Deal',
      th: 'ที่คุ้มค่าที่สุด',
      zh: '每笔交易',
      ru: 'в Каждой Сделке'
    }
  }

  return (
    <section className="pb0  pt60" style={{
        paddingBottom: "0px"
    }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* Main Title */}
            <div className="main-title text-center mb40">
              <h2 className="title fz55">
                {titleText.part1[locale] || titleText.part1.en}{' '}
                <span style={{ color: '#AF1A1E' }}>
                  {titleText.part2[locale] || titleText.part2.en}
                </span>{' '}
                {titleText.part3[locale] || titleText.part3.en}
              </h2>
            </div>

            {/* Main Description */}
            <div className="mb40">
              <p className="text fz15 lh-2" style={{ textAlign: 'justify', lineHeight: '1.8' }}>
                {welcomeText[locale] || welcomeText.en}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
