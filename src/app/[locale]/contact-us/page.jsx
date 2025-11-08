import Wrapper from "@/layouts/Wrapper"
import ContactArea from "@/components/contact/ContactArea"
import TranslationInitializer from '@/components/Translation/page'
import LanguageApi from '@/utils/languageApi'

export const metadata = {
   title: "Contact Us - 12 Real Estate Pattaya",
   description: "Get in touch with 12 Real Estate for expert advice on buying, selling, or renting properties in Pattaya."
}

// ฟังก์ชันสำหรับดึงข้อมูล translations
async function getLanguage(section = 'contact') {
  try {
    const response = await LanguageApi.getUiStringsBySection(section, {
      serverSide: true,
      next: { revalidate: 3600 }
    })

    if (!response.success) {
      console.error(`Failed to fetch ${section} translations`)
      return {}
    }

    const translations = response.data.reduce((acc, item) => {
      acc[item.slug] = {
        en: item.en,
        th: item.th,
        zhCN: item.zhCN,
        ru: item.ru
      }
      return acc
    }, {})

    return translations
  } catch (error) {
    console.error(`Error fetching ${section} translations:`, error)
    return {}
  }
}

const ContactPage = async ({ params }) => {
   const locale = params?.locale || 'en'
   
   let contactTranslations = {}
   try {
      contactTranslations = await getLanguage('contact')
   } catch (error) {
      console.error('Failed to fetch contact translations:', error)
   }

   return (
      <Wrapper>
         <TranslationInitializer translations={contactTranslations} locale={locale} section="contact">
            <ContactArea />
         </TranslationInitializer>
      </Wrapper>
   )
}

export default ContactPage
