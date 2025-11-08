"use client"
import useSimpleTranslations from '@/hooks/useSimpleTranslations'

const WelcomeSection = () => {
  const { t } = useSimpleTranslations('home')

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
                {t('welcome.title.part1', 'Welcome to')}{' '}
                <span style={{ color: '#AF1A1E' }}>
                  {t('welcome.title.part2', '12 Real Estate')}
                </span>{' '}
                {t('welcome.title.part3', 'Pattaya')}
              </h2>
            </div>

            {/* Main Description */}
            <div className="mb40">
              <p className="text fz15 lh-2">
                {t('welcome.intro', 'Your trusted partner for buying, selling, and renting properties in Pattaya and EEC.')}
              </p>
            </div>

            {/* Section 1: Buy, Sell & Rent */}
            <div className="mb30">
              <h4 className="title fz18 mb15">
                {t('welcome.section1Title', 'Buy, Sell & Rent Properties')}
              </h4>
              <p className="text fz15 lh-2">
                {t('welcome.section1Description', 'Find your dream home, sell your property, or discover the perfect rental with our comprehensive services.')}
              </p>
            </div>

            {/* Section 2: Investment Opportunities */}
            <div className="mb30">
              <h4 className="title fz18 mb15">
                {t('welcome.section2Title', 'Investment Opportunities in EEC')}
              </h4>
              <p className="text fz15 lh-2">
                {t('welcome.section2Description', 'Exclusive access to high-potential properties in strategic locations for long-term growth.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
