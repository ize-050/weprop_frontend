# 🔧 Website The 12 Real Estate - Issues & Fix Locations

## 📋 สรุป Issues ทั้งหมด

---

## 1. Header & Layout (ภาพที่ 1)

### 1.1 Remove Size Header On Mobile and Desktop ❗
- **ปัญหา:** มีช่องว่างสีขาวขนาดใหญ่ระหว่าง Header กับ Hero Banner (กรอบแดงในภาพ)
- **URL:** `https://www.12realestatepattaya.com/properties?type=sale`
- **ไฟล์ที่ต้องแก้:**
  - `src/styles/mobile-header.css`
  - `src/styles/header-custom.css`
  - `src/components/common/ResponsiveHeader.jsx`
  - `src/app/[locale]/layout.jsx` (ตรวจสอบ `<hr>` tag)
- **วิธีแก้:** 
  - ลบหรือลด padding/margin ระหว่าง header กับ content
  - ตรวจสอบ `<hr>` element ที่อาจสร้างช่องว่าง

### 1.2 Check Section Gap on Home Page
- **ปัญหา:** ระยะห่างระหว่าง sections บนหน้า Home ไม่สม่ำเสมอ (เส้นสีแดงในภาพ)
- **ไฟล์ที่ต้องแก้:**
  - `src/components/homes/home-three/index.jsx`
  - `src/styles/scss/main.scss`
- **วิธีแก้:** ตรวจสอบ margin/padding ของแต่ละ section

### 1.3 Button Backoffice Frontend
- **ไฟล์ที่ต้องแก้:**
  - `src/components/backoffice/` (ต้องระบุเพิ่มเติม)

---

## 2. Properties Page - `/properties?type=sale` (ภาพที่ 2)

### 2.1 Desktop Slide Bar Preview Picture ไม่ทำงาน

- **ปัญหา:** Property card แสดงรูปเดียว ไม่มี slide bar preview รูปภาพอื่นๆ
- **URL:** `https://www.12realestatepattaya.com/properties?type=sale`
- **ไฟล์ที่ต้องแก้:**
  - `src/components/properties/PropertiesList.jsx`
  - `src/components/properties/listing/ListingPropertiesPage.jsx`
- **วิธีแก้:** เพิ่ม image slider/carousel ใน property card

### 2.2 Interactive picture not working on mobile

- **ปัญหา:** รูปภาพ interactive (swipe/slide) ไม่ทำงานบน Mobile
- **ไฟล์ที่ต้องแก้:**
  - `src/components/properties/PropertiesList.jsx`
- **วิธีแก้:** ตรวจสอบ touch events และ Swiper mobile settings

---

## 3. Property Detail Page (ภาพที่ 3-4)

### 3.1 Property Overview - Layout ผิดบน Mobile ❗

- **ปัญหา:** Property Overview section (Bedrooms, Bathrooms, Useable Area) แสดงผิดบน Mobile - กล่องซ้อนกัน/ไม่เรียงถูกต้อง (กรอบแดงในภาพ)
- **ไฟล์ที่ต้องแก้:**
  - `src/app/[locale]/property-detail-three/[...slug]/page.jsx`
  - `src/styles/property-detail.scss`
- **วิธีแก้:** ปรับ CSS grid/flexbox ให้ responsive บน mobile

### 3.2 Property Details - Layout 2 columns บน Mobile

- **ปัญหา:** Property Details แสดง 2 columns บน Mobile ทำให้อ่านยาก (ควรเป็น 1 column)
- **ไฟล์ที่ต้องแก้:**
  - `src/app/[locale]/property-detail-three/[...slug]/page.jsx`
  - `src/styles/property-detail.scss`
- **วิธีแก้:** ปรับ CSS media queries ให้เป็น 1 column บน mobile

### 3.3 Date Listed / Updated - ขอเพิ่ม field

- **ปัญหา:** ลูกค้าถาม "can add on?" สำหรับ Date Listed และ Updated
- **ไฟล์ที่ต้องแก้:**
  - `src/app/[locale]/property-detail-three/[...slug]/page.jsx`
- **วิธีแก้:** ตรวจสอบว่า field นี้มีอยู่แล้วหรือยัง ถ้ายังให้เพิ่ม

### 3.4 Title Text Size on mobile / Desktop

- **ปัญหา:** ขนาด Title บน Mobile และ Desktop ไม่เหมาะสม
- **ไฟล์ที่ต้องแก้:**
  - `src/app/[locale]/property-detail-three/[...slug]/page.jsx`
  - `src/styles/property-detail.scss`
- **วิธีแก้:** ปรับ font-size ใน media queries

---

## 4. Blog & Contact (ภาพที่ 5)

### 4.1 Text "Our Blog" - Check Update

- **ปัญหา:** ข้อความ "Our Blog" และ section blog บนหน้า property detail
- **ไฟล์ที่ต้องแก้:**
  - `src/app/[locale]/blog/page.jsx`
  - `src/components/homes/home-three/OurBlog.jsx`

### 4.2 Contact Agent Form - ต้องอัพเดทข้อมูล ❗

- **ปัญหา:** Contact Agent form (กรอบแดงในภาพ) - ข้อมูล Agent "Kwang" และเบอร์โทรต้องอัพเดท
- **ไฟล์ที่ต้องแก้:**
  - `src/app/[locale]/property-detail-three/[...slug]/page.jsx`
  - `src/components/property-detail/ContactAgentForm.jsx` (ถ้ามี)
- **วิธีแก้:** อัพเดทข้อมูล agent และเบอร์โทร

### 4.3 Form Contact Agent - Submission Not Working

- **ปัญหา:** Form "Send a Message Now" ส่งข้อมูลไม่ทำงาน
- **ไฟล์ที่ต้องแก้:**
  - `src/app/[locale]/contact/page.jsx`
  - `src/app/[locale]/property-detail-three/[...slug]/page.jsx`
- **วิธีแก้:** ตรวจสอบ API endpoint และ form submission logic

### 4.4 Phone Number - add country code on All Form

- **ปัญหา:** ต้องเพิ่ม country code selector (+66) ในทุก form
- **ไฟล์ที่ต้องแก้:**
  - ทุก form ที่มี phone number field

### 4.5 Keep social icon under Form

- **ไฟล์ที่ต้องแก้:**
  - `src/app/[locale]/contact/page.jsx`

---

## 5. Social Links & Contact Info (ต้องอัพเดท)

### ข้อมูลที่ต้องอัพเดท:
| Platform | Value |
|----------|-------|
| **WhatsApp** | `https://wa.me/+66888997944` |
| **LINE** | `https://lin.ee/dG5aGu4` |
| **Email Notify** | `info@12realestatepattaya.com` |
| **CC Email** | `krittiyakwang@gmail.com` |

### ไฟล์ที่ต้องแก้:
- `src/components/common/MobileContactButtons.jsx` - Line 106: `tel:+66951432345` → `tel:+66888997944`
- `src/components/homes/home-three/FooterHomeThree.jsx`
- Backend: Database `messaging_settings` table

---

## 6. Sticky Bar / Mobile Footer

### 6.1 Adjust Layout and Text
- **ไฟล์ที่ต้องแก้:**
  - `src/components/common/MobileContactButtons.jsx`
  - `src/styles/mobile-header.css`

### 6.2 Button "Call Now" - Wrong Number ❗
- **ปัญหา:** เบอร์โทรผิด `tel:088897944` → ต้องเป็น `tel:+66888997944`
- **ไฟล์ที่ต้องแก้:**
  - `src/components/common/MobileContactButtons.jsx`
  - **Line 106:** `<a href="tel:+66951432345"` → `<a href="tel:+66888997944"`

### 6.3 Keep social icon (WhatsApp, LINE)
- **ไฟล์ที่ต้องแก้:**
  - `src/components/common/MobileContactButtons.jsx`

### 6.4 Button Alignment middle
- **ไฟล์ที่ต้องแก้:**
  - `src/components/common/MobileContactButtons.jsx`
  - CSS styles

---

## 7. Backend Issues

### 7.1 Button Unpublish Not Update On Frontend
- **ปัญหา:** เมื่อกด Unpublish ใน Backend ไม่อัพเดทบน Frontend
- **ไฟล์ที่ต้องแก้:**
  - Backend: `src/services/propertyService.js`
  - Backend: `src/repositories/propertyRepository.js`
- **วิธีแก้:** ตรวจสอบ status field และ cache

### 7.2 Remove the image
- **ต้องระบุเพิ่มเติมว่ารูปไหน**

---

## 8. New Content to Add

### 8.1 New Upload Photo
- **Source:** [Google Drive](https://drive.google.com/drive/folders/1A8gaHr7FOl_zwBAk9YGHSDpxLzZXO6t9?usp=drive_link)
- **ต้องดาวน์โหลดและอัพโหลดไปที่ server**

### 8.2 Contact Us Page - Google Map
- **Google Map URL:** `https://maps.app.goo.gl/J1qRZhu45YN5b3oP8`
- **ไฟล์ที่ต้องแก้:**
  - `src/app/[locale]/contact/page.jsx`
  - `src/app/[locale]/contact-us/page.jsx`

### 8.3 Exclusive Partners Section (ใหม่)
- **ตำแหน่ง:** ก่อน Feature Listing บนหน้า Home
- **ไฟล์ที่ต้องสร้าง/แก้:**
  - สร้างใหม่: `src/components/homes/home-three/ExclusivePartners.jsx`
  - แก้ไข: `src/components/homes/home-three/index.jsx` (เพิ่ม component)

### Exclusive Partners Cards:
| Partner | Link |
|---------|------|
| Laguna Beach Resort Jomtien | https://www.lagunabeachpattaya.com/ |
| Laguna Beach Resort 2 | (ไม่มี link) |
| Laguna Beach Resort The Maldives | https://www.lagunamaldivespattaya.com/ |
| The Peak Towers | https://www.thepeaktowerpattaya.com/ |

---

## 9. SEO Title Tags

### ไฟล์ที่ต้องแก้:
- `src/app/[locale]/about/page.jsx` - metadata
- `src/app/[locale]/page.jsx` - metadata
- `src/app/[locale]/blog/page.jsx` - metadata

### Title Tags:
| Page | Title Tag |
|------|-----------|
| `/about` | `About \| Property in Pattaya for Sale and Rent` |
| `/` (Home) | `Property in Pattaya for Sale & Rent \| The 12 Real Estate` |
| `/blog` | `Blog \| Property in Pattaya for Sale and Rent` |

---

## 📌 Priority Order (แนะนำลำดับการแก้)

### 🔴 High Priority

- [ ] **6.2** Call Now Wrong Number → `tel:+66888997944`
- [ ] **5** Social Links Update (WhatsApp: `+66888997944`, LINE: `dG5aGu4`)
- [ ] **4.2** Contact Agent Form - อัพเดทข้อมูล
- [ ] **4.3** Form Contact Agent - Submission Not Working
- [ ] **7.1** Unpublish Not Update on Frontend

### 🟡 Medium Priority

- [ ] **1.1** Header Gap - ช่องว่างระหว่าง Header กับ Content (ภาพ 1)
- [ ] **3.1** Property Overview Layout บน Mobile (ภาพ 3)
- [ ] **3.2** Property Details 2 columns บน Mobile (ภาพ 4)
- [ ] **2.1** Slide Bar Preview Picture (ภาพ 2)
- [ ] **9** SEO Title Tags

### 🟢 Low Priority

- [ ] **2.2** Interactive picture on mobile
- [ ] **3.3** Date Listed / Updated field
- [ ] **3.4** Title Text Size
- [ ] **8.2** Google Map on Contact
- [ ] **8.3** Exclusive Partners Section (New Feature)
- [ ] **8.1** New Photos Upload

---

## 📝 Notes

- ภาพประกอบจาก docx ได้รับแล้ว (5 ภาพ)
- เบอร์โทรที่ถูกต้อง: `+66888997944`
- LINE ID: `dG5aGu4`
- Email: `info@12realestatepattaya.com`, CC: `krittiyakwang@gmail.com`
