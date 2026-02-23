import Image from "next/image";
import Form from "@/components/pages/contact/Form.jsx";
import LanguageApi from "@/utils/languageApi";
import { TranslationInitializer } from "@/components/Translation/page";

// Dynamic metadata generation for Contact page
export async function generateMetadata({ params: { locale } }) {
  const baseUrl = 'https://www.12realestatepattaya.com';
  const localizedUrl = locale === 'th' ? baseUrl : `${baseUrl}/${locale}`;
  const currentUrl = `${localizedUrl}/contact`;
  
  // SEO-optimized metadata สำหรับ Contact page แยกตามภาษา
  const metadataByLocale = {
    th: {
      title: 'ติดต่อ The 12 Real Estate Pattaya | อสังหาริมทรัพย์และคำปรึกษา',
      description: 'ติดต่อ The 12 Real Estate Pattaya เพื่อรับคำปรึกษาจากผู้เชี่ยวชาญในการซื้อ ขาย เช่า คอนโด บ้าน วิลล่า พูลวิลล่า ในพัทยาและ EEC',
      keywords: ['ติดต่อ The 12 Real Estate Pattaya','ติดต่ออสังหาริมทรัพย์ พัทยา','สอบถามอสังหาฯ พัทยา','ติดต่อนายหน้า พัทยา','เบอร์โทร D-Luck Property','ที่อยู่ D-Luck Property','อีเมล D-Luck Property','ออฟฟิศอสังหาฯ พัทยา','ติดต่อซื้ออสังหาริมทรัพย์ พัทยา','ติดต่อขายอสังหาริมทรัพย์ พัทยา','ติดต่อเช่าอสังหาริมทรัพย์ พัทยา','ติดต่อคอนโด พัทยา','ติดต่อวิลล่า พัทยา','ติดต่อบ้าน พัทยา','ปรึกษาอสังหาริมทรัพย์ พัทยา','สนทนากับผู้เชี่ยวชาญอสังหาฯ พัทยา','แผนที่ D-Luck Property','เวลาทำการ D-Luck Property','Line ID D-Luck Property']
    },
    en: {
      title: 'Contact The 12 Real Estate Pattaya | Real Estate & Property Enquiries',
      description: 'Get in touch with The 12 Real Estate Pattaya for expert advice on buying, selling, or renting condos, houses, villas, and pool villas in Pattaya & EEC.',
      keywords: ['Contact The 12 Real Estate Pattaya','Pattaya real estate contact','Property enquiries Pattaya','Contact real estate agent Pattaya','Get in touch Pattaya property','D-Luck Property phone number','D-Luck Property email','Real estate office Pattaya','Contact us to buy property Pattaya','Contact us to sell property Pattaya','Contact us to rent property Pattaya','Pattaya condo contact','Pattaya villa contact','Pattaya house contact','Real estate consultation Pattaya','Find property in Pattaya contact','Speak to Pattaya real estate expert','D-Luck Property location Pattaya']
    },
    zh: {
      title: '联系 The 12 Real Estate Pattaya | 房产咨询与服务',
      description: '立即联系 The 12 Real Estate Pattaya，获取芭提雅及EEC地区公寓、房屋、别墅、泳池别墅买卖租赁的专家建议。',
      keywords: ['联系D-Luck Property','芭提雅房产联系','房产咨询芭提雅','联系芭提雅房产中介','D-Luck Property 电话','D-Luck Property 地址','D-Luck Property 邮箱','芭提雅房产公司联系','芭提雅公寓咨询','芭提雅别墅咨询','芭提雅房屋咨询','联系芭提雅置业顾问','D-Luck Property 微信','芭提雅房产客服','EEC房产联系','芭提雅中文房产中介','D-Luck Property 工作时间']
    },
    ru: {
      title: 'Контакты The 12 Real Estate Pattaya | Консультации по недвижимости',
      description: 'Свяжитесь с The 12 Real Estate Pattaya для экспертной консультации по покупке, продаже или аренде кондо, домов, вилл и вилл с бассейном в Паттайе и ЕЭС.',
      keywords: ['联系D-Luck Property','контакты D-Luck Property','недвижимость Паттайя контакты','запросы по недвижимости Паттайя','связаться с агентом недвижимости Паттайя','номер телефона D-Luck Property','D-Luck Property адрес','D-Luck Property электронная почта','офис недвижимости Паттайя','как связаться с D-Luck Property','связаться по покупке недвижимости Паттайя','связаться по продаже недвижимости Паттайя','связаться по аренде недвижимости Паттайя','контакты по кондо Паттайя','контакты по виллам Паттайя','контакты по домам Паттайя','консультация по недвижимости Паттайя','график работы D-Luck Property','русскоязычный агент Паттайя контакты']
    }
  };

  // เลือก metadata ตาม locale
  const currentMetadata = metadataByLocale[locale] || metadataByLocale['th'];
  
  // สร้าง alternates สำหรับ SEO
  const languages = {};
  ['th', 'en', 'zh', 'ru'].forEach(lang => {
    const langUrl = lang === 'th' ? baseUrl : `${baseUrl}/${lang}`;
    languages[lang] = `${langUrl}/contact`;
  });

  return {
    title: currentMetadata.title,
    description: currentMetadata.description,
    keywords: currentMetadata.keywords,
    alternates: {
      canonical: currentUrl,
      languages
    },
    openGraph: {
      title: currentMetadata.title,
      description: currentMetadata.description,
      url: currentUrl,
      siteName: 'The 12 Real Estate Pattaya',
      images: [
        {
          url: `${baseUrl}/images/logo/logo.png`,
          width: 1200,
          height: 630,
          alt: 'The 12 Real Estate Pattaya',
        },
      ],
      locale: locale === 'th' ? 'th_TH' : locale === 'zh' ? 'zh_CN' : locale === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMetadata.title,
      description: currentMetadata.description,
      images: [`${baseUrl}/images/logo/logo.png`],
    },
  };
}

async function getContactTranslations(locale) {
    // Fetch contact section translations from API
    const response = await LanguageApi.getUiStringsBySection('contact', {
        serverSide: true,
    });

    if (!response.success) {
        console.error('Failed to fetch contact translations:', response.error);
        return [];
    }

    return response.data;
}

const Contact = async ({ params }) => {
    // Get locale from params
    const { locale } = params;
    const contactTranslations = await getContactTranslations(locale);
    
    // Map frontend locale to database field name
    const getLocaleField = (locale) => {
        switch (locale) {
            case 'zh':
                return 'zhCN'; // Database field for Chinese
            case 'th':
                return 'th';
            case 'ru':
                return 'ru';
            default:
                return 'en';
        }
    };
    
    const dbLocale = getLocaleField(locale);
    return (
        <>
            {/* Initialize translations in the client */}
            <TranslationInitializer 
                translations={{ contact: contactTranslations }} 
                locale={locale} 
            />

            <section className="p-0">
                <Image
                    className="home8-map contact-page"
                    loading="lazy"
                    width={1920}
                    height={1080}
                    src="/images/contact/banner-contact-us.jpg"
                    title="Contact Us - The 12 Real Estate Pattaya"
                    aria-label="Contact Us Banner"
                />
            </section>

            <section>
                <div className="container">
                    <div className="row d-flex align-items-end">
                        <div className="col-lg-5 position-relative">
                            <div className="home8-contact-form default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white">
                                <h4 className="form-title mb25">
                                    {/* Use translation from API */}
                                    {contactTranslations.find(t => t.slug === 'need_more_info')?.[dbLocale] || 
                                     contactTranslations.find(t => t.slug === 'need_more_info')?.en || 
                                     'Need more information?'}
                                </h4>
                                <Form translations={contactTranslations} locale={locale} />
                            </div>
                        </div>

                        <div className="col-lg-5 offset-lg-2">
                            <h2 className="mb-4">
                                {/* Use translation from API */}
                                {contactTranslations.find(t => t.slug === 'contact_consultant')?.[dbLocale] || 
                                 contactTranslations.find(t => t.slug === 'contact_consultant')?.en || 
                                 'Contact our Property Consultant'}
                            </h2>
                            <p className="mb-4">
                                {/* Use translation from API */}
                                {contactTranslations.find(t => t.slug === 'contact_description')?.[dbLocale] || 
                                 contactTranslations.find(t => t.slug === 'contact_description')?.en || 
                                 'Please do not hesitate to contact us if you have any questions about the condo & properties buying, selling or leasing process and for would like to schedule an appointment to view properties in Pattaya.'}
                            </p>

                        </div>
                    </div>
                </div>
            </section>


            {/* Google Map Section */}
            <section className="container mb-5">
                <div className="row">
                    <div className="col-12">
                        <h3 className="mb-4 text-center">
                            {contactTranslations.find(t => t.slug === 'our_location')?.[dbLocale] || 'Our Location'}
                        </h3>
                        <div className="map-container" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4187.909500370445!2d100.8786619!3d12.899051199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310297e04a328b91%3A0x2193ad061fcba40!2sAgent%20Team%20-%20The%2012%20Real%20Estate%20Co.%2C%20Ltd.!5e1!3m2!1sth!2sth!4v1771863011004!5m2!1sth!2sth"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="The 12 Real Estate Pattaya Location"
                            ></iframe>
                        </div>
                        <div className="text-center mt-3">
                            <a 
                                href="https://maps.app.goo.gl/J1qRZhu45YN5b3oP8" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary"
                                style={{ borderRadius: '25px', padding: '10px 30px' }}
                            >
                                <i className="bi bi-geo-alt me-2"></i>
                                {contactTranslations.find(t => t.slug === 'open_in_maps')?.[dbLocale] || 'Open in Google Maps'}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="d-flex row">
                    <div className="col-lg-4 text-center">
                        <a href="tel:+66888997944" className="d-block text-decoration-none">
                            <div className="mb-3">
                                <img src="/images/contact/icon-call-us.png" alt="Call Us" width="60" height="60" />
                            </div>
                            <h5 className="mb-0">
                                {contactTranslations.find(t => t.slug === 'call_us_title')?.[dbLocale] || 
                                 contactTranslations.find(t => t.slug === 'call_us_title')?.en || 
                                 'Call Us Now'}
                            </h5>
                            <p className="small text-muted">
                                {contactTranslations.find(t => t.slug === 'phone_contact')?.[dbLocale] || 
                                 contactTranslations.find(t => t.slug === 'phone_contact')?.en || 
                                 '+66(0)80 253 0612'}
                            </p>
                        </a> 
                    </div>

                    <div className="col-lg-4 text-center">
                        <a href="mailto:info@12realestatepattaya.com" className="d-block text-decoration-none">
                            <div className="mb-3">
                                <img src="/images/contact/icon-drop-a-mail.png" alt="Email Us" width="60" height="60" />
                            </div>
                            <h5 className="mb-0">
                                {contactTranslations.find(t => t.slug === 'drop_mail_title')?.[dbLocale] || 
                                 contactTranslations.find(t => t.slug === 'drop_mail_title')?.en || 
                                 'Drop a Mail'}
                            </h5>
                            <p className="small text-muted">
                                {contactTranslations.find(t => t.slug === 'email_address_contact')?.[dbLocale] || 
                                 contactTranslations.find(t => t.slug === 'email_address_contact')?.en || 
                                 'info@d-luckproperty.com'}
                            </p>
                        </a>
                    </div>

                    <div className="col-lg-4 text-center">
                        <a href="https://lin.ee/dG5aGu4" target="_blank" rel="noopener noreferrer" className="d-block text-decoration-none">
                            <div className="mb-3">
                                <img src="/images/contact/icon-add-friend.png" alt="Line" width="60" height="60" />
                            </div>
                            <h5 className="mb-0">
                                {contactTranslations.find(t => t.slug === 'add_friend_title')?.[dbLocale] || 
                                 contactTranslations.find(t => t.slug === 'add_friend_title')?.en || 
                                 'Add Friend'}
                            </h5>
                            <p className="small text-muted">
                                {contactTranslations.find(t => t.slug === 'line_id_text')?.[dbLocale] || 
                                 contactTranslations.find(t => t.slug === 'line_id_text')?.en || 
                                 'Line ID : @dluck or Click'}
                            </p>
                        </a>
                    </div>
                </div>
            </section>


        </>
    );
};

export default Contact;
