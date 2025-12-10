import HeroBanner from "./HeroBanner"
import WelcomeSection from "./WelcomeSection"
import BLockFeatureOne from "./BLockFeatureOne"
import PopularLocationListing from "./PopularLocationListing"
import PropertyTypes from "./PropertyTypes"
import PopularListings from "./PopularListings"
import PopularLocation from "./PopularLocation"
import OurBlog from "./OurBlog"
import TranslationInitializer from '@/components/Translation/page'

const HomeThree = ({ locale, randomProperties = [], homeTranslations = {}, zones = [] }) => {
  return (
    <>
      <TranslationInitializer translations={homeTranslations} locale={locale} section="home"
       style={{
        paddingTop: '50px'
       }}
      >
        <HeroBanner />
        <WelcomeSection />
        {/* <BLockFeatureOne /> */}
        <PopularLocationListing randomProperties={randomProperties} />
        <PropertyTypes />
        <br></br><br></br>
        <PopularLocation zones={zones} />
        <OurBlog />
      </TranslationInitializer>
    </>
  )
}

export default HomeThree
