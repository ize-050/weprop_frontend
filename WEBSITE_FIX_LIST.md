# Website The 12 Real Estate - Fix List

## สถานะ: ⬜ = ยังไม่ทำ | 🔄 = กำลังทำ | ✅ = เสร็จแล้ว

---

## 1. ✅ Interactive Picture Not Working on Mobile
**ปัญหา:** Thumbnail gallery ด้านล่างรูปใหญ่คลิกไม่ได้บน mobile
**ไฟล์ที่ต้องแก้:**
- `src/components/properties/detail-three/PropertyMediaGallery.jsx` — Mobile thumbnails ใช้ `onClick={() => thumbsSwiper?.slideTo(i)}` แต่ thumbsSwiper เป็น desktop vertical swiper ที่ซ่อนบน mobile (`d-none d-lg-block`) ทำให้ thumbsSwiper เป็น null บน mobile
**วิธีแก้:** สร้าง state `activeIndex` แยก แล้วให้ mobile thumbnails ควบคุม main swiper โดยตรงผ่าน swiper instance ref

---

## 2. ✅ Contact Agent Form - Submission Not Working
**ปัญหา:** กดปุ่ม "Send a Message Now" แล้วไม่ทำงาน + Profile info ไม่อัพเดทตาม agent + ต้องเพิ่ม country code ใน phone field
**ไฟล์ที่ต้องแก้:**
- **Frontend:** `src/components/properties/detail-three/PropertyContactAgent.jsx` — ตรวจสอบ form submission logic, เพิ่ม country code selector, แก้ social icon links
- **Backend:** `src/services/contactService.js` — phone regex `^[0-9]{9,10}$` ไม่รองรับ country code (เช่น +66) ต้องแก้ regex
- **Backend:** `src/services/messageService.js` — phone regex เดียวกัน ต้องแก้
**Social Icons ใต้ form (ปัจจุบัน):**
- Email: `mailto:info@12realestatepattaya.com` ✅ ถูกแล้ว
- WhatsApp: `https://wa.me/66892530622` ❌ ต้องเปลี่ยนเป็น `https://wa.me/+66888997944`
- Messenger: `https://m.me/12realestatepattaya` ❌ ต้องเปลี่ยนเป็น `https://m.me/222887021193075`

---

## 3. ✅ Sticky Bar - Adjust Layout, Social Icons, Send Message Popup
**ปัญหา:** Sticky bar ต้องปรับ layout, social icons, Send Message เปิด popup form, Call Now เบอร์ผิด
**ไฟล์ที่ต้องแก้:**
- `src/components/common/MobileContactButtons.jsx` — แก้ Call Now link (ปัจจุบัน `tel:+66888997944` ✅ ถูกแล้ว), Send Message ปัจจุบันลิงก์ไป `/contact` ❌ ต้องเปลี่ยนเป็น popup form
- `src/components/home/home/SidebarStickyBar.jsx` — Desktop sidebar: default phone `086-543-2345` ❌ ต้องเปลี่ยน, email `info@d-luckproperty.com` ❌ ต้องเปลี่ยนเป็น `info@12realestatepattaya.com`
**Social Links ที่ต้องการ:**
- WhatsApp: `https://wa.me/+66888997944`
- LINE: `https://lin.ee/dG5aGu4`
- Messenger: `https://m.me/222887021193075`
- Call: `tel:+66888997944`

---

## 4. ✅ Email Notify - Wrong Branding + CC
**ปัญหา:** Property Inquiry email ยังใช้ branding "D-Luck Property" + ไม่มี CC
**ไฟล์ที่ต้องแก้:**
- **Backend:** `src/services/emailService.js`
  - `sendPropertyInquiryEmail()` line ~226: ยังใช้ `D-Luck Property` ❌ ต้องเปลี่ยนเป็น `The 12 Real Estate Pattaya`
  - `sendPropertyInquiryEmail()` line ~317: ไม่มี CC ❌ ต้องเพิ่ม `cc: 'krittiyakwang@gmail.com'`
  - `sendPropertyInquiryEmail()` line ~226: ใช้ `cid:dluck-icon` ❌ ต้องเปลี่ยนเป็น `cid:12-real-estate-logo`
  - Email ต้องส่งไป: `info@12realestatepattaya.com` CC: `krittiyakwang@gmail.com`

---

## 5. ✅ Property Description - EN Page Shows Thai + Property Types No Data
**ปัญหา:** หน้า EN แสดงภาษาไทย + Property Types แสดง "No data found"
**ไฟล์ที่ต้องแก้:**
- `src/components/properties/detail-three/PropertyDescription.jsx` — ตรวจสอบ locale mapping ว่าดึง description ภาษาถูกต้องหรือไม่
- `src/components/homes/home-three/PropertyTypes.jsx` — API `/property-types` อาจ return empty data, ตรวจสอบ API endpoint + image path
- **Backend:** ตรวจสอบ property-types API route

---

## 6. ✅ Tag Wrong & Rent Price Not Showing
**ปัญหา:** Tag แสดงผิด + ราคาเช่าไม่แสดง
**ไฟล์ที่ต้องแก้:**
- `src/components/properties/PropertiesList.jsx` — ตรวจสอบ tag/label rendering logic
- `src/components/properties/detail-three/PropertyOverview.jsx` — ตรวจสอบ rent price display
- **Backend:** `src/repositories/propertyRepository.js` — ตรวจสอบว่า rentPrice field ถูก include ใน query

---

## 7. ✅ AREA Section Issues
**ปัญหา:** AREA section มีปัญหา (ต้องตรวจสอบเพิ่ม)
**ไฟล์ที่ต้องแก้:**
- ต้องตรวจสอบว่า AREA หมายถึง property area display หรือ zone area
- `src/components/properties/detail-three/PropertyOverview.jsx` — ตรวจสอบ area fields (usableArea, landArea)

---

## 8. ✅ Buy Page Pagination Not Working
**ปัญหา:** หน้า Buy กดเปลี่ยนหน้าแล้ว listing ไม่อัพเดท
**ไฟล์ที่ต้องแก้:**
- `src/components/properties/listing/ListingPropertiesPage.jsx` — ตรวจสอบ pagination state + API call
- `src/app/[locale]/properties/list/page.jsx` — ตรวจสอบ searchParams handling
- **Backend:** `src/repositories/propertyRepository.js` — ตรวจสอบ pagination query

---

## 9. ✅ Exclusive Partners - Multi Picture
**ปัญหา:** แสดงแค่ 1 รูป ต้องแสดงหลายรูป
**ไฟล์ที่ต้องแก้:**
- `src/components/homes/home-three/ExclusivePartners.jsx` — เคยแก้แล้ว มี image slider, ตรวจสอบว่ารูปโหลดได้หรือไม่ (URL encoding issue)

---

## 10. ✅ Request Tag Highlight > "New Project"
**ปัญหา:** ต้องเพิ่ม tag "New Project" ใน property listing
**ไฟล์ที่ต้องแก้:**
- **Backend:** เพิ่ม label type `new-project` ใน database
- `src/components/properties/PropertiesList.jsx` — เพิ่ม rendering สำหรับ new-project label
- `src/components/properties/detail-three/PropertyBanner.jsx` — เพิ่ม badge สำหรับ new-project

---

## 11. ✅ SEO URLs + Title Tags + H1
**ปัญหา:** ต้องสร้าง SEO-friendly URLs
**รายละเอียด:**
- `/properties-for-sale-pattaya` → Title: "Properties for Sale in Pattaya | Houses & Condos | 12 Real Estate" + H1: "Properties for Sale in Pattaya"
- `/pattaya-property-rentals` → Title: "Pattaya Property Rentals | Condos & Villas for Rent | 12 Real Estate" + H1: "Property Rentals in Pattaya"
**ไฟล์ที่ต้องสร้าง/แก้:**
- สร้าง `src/app/[locale]/properties-for-sale-pattaya/page.jsx` (redirect หรือ alias)
- สร้าง `src/app/[locale]/pattaya-property-rentals/page.jsx` (redirect หรือ alias)
- หรือใช้ Next.js middleware rewrite

---

## 12. ✅ SEO Schema Markup - JSON-LD
**ปัญหา:** ต้องเพิ่ม BreadcrumbList + ItemList schema markup
**ไฟล์ที่ต้องแก้:**
- `src/app/[locale]/properties/list/page.jsx` — เพิ่ม JSON-LD script ใน metadata
- BreadcrumbList: Home > Properties > For Sale
- ItemList: Dynamic top 10 property listings

---

## 13. ✅ Google Map Not Correct (Contact Page)
**ปัญหา:** Google Map แสดงตำแหน่งผิด
**ไฟล์ที่ต้องแก้:**
- `src/app/[locale]/contact/page.jsx` — เคยแก้แล้ว ตรวจสอบว่า URL ถูกต้อง: `https://maps.app.goo.gl/J1qRZhu45YN5b3oP8`

---

## สรุปไฟล์ที่ต้องแก้

### Frontend (`weare_frontend`)
| ไฟล์ | Issues |
|------|--------|
| `src/components/properties/detail-three/PropertyMediaGallery.jsx` | #1 |
| `src/components/properties/detail-three/PropertyContactAgent.jsx` | #2 |
| `src/components/common/MobileContactButtons.jsx` | #3 |
| `src/components/home/home/SidebarStickyBar.jsx` | #3 |
| `src/components/properties/detail-three/PropertyDescription.jsx` | #5 |
| `src/components/homes/home-three/PropertyTypes.jsx` | #5 |
| `src/components/properties/PropertiesList.jsx` | #6, #10 |
| `src/components/properties/detail-three/PropertyOverview.jsx` | #6, #7 |
| `src/components/properties/listing/ListingPropertiesPage.jsx` | #8 |
| `src/components/homes/home-three/ExclusivePartners.jsx` | #9 |
| `src/components/properties/detail-three/PropertyBanner.jsx` | #10 |
| `src/app/[locale]/properties/list/page.jsx` | #8, #12 |
| `src/app/[locale]/contact/page.jsx` | #13 |

### Backend (`weareprop_backend`)
| ไฟล์ | Issues |
|------|--------|
| `src/services/emailService.js` | #4 |
| `src/services/contactService.js` | #2 |
| `src/services/messageService.js` | #2 |
| `src/repositories/propertyRepository.js` | #6, #8 |
