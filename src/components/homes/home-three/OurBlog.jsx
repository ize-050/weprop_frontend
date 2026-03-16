'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import blogService from '@/services/blogService'

const OurBlog = () => {
  const locale = useLocale()
  const t = useTranslations()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const data = await blogService.getLatestBlogs(2) // Get 2 latest blogs
        console.log('OurBlog - Fetched blogs:', data)
        setBlogs(data.data || [])
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  // Get localized title
  const getLocalizedTitle = (blog) => {
    if (blog.translatedTitles) {
      try {
        const translatedTitles = typeof blog.translatedTitles === 'string'
          ? JSON.parse(blog.translatedTitles)
          : blog.translatedTitles
        
        return translatedTitles[locale] || blog.title
      } catch (error) {
        console.error('Error parsing translatedTitles:', error)
      }
    }
    return blog.title || 'Untitled'
  }

  // Get localized content
  const getLocalizedContent = (blog) => {
    if (blog.translatedContents) {
      try {
        const translatedContents = typeof blog.translatedContents === 'string'
          ? JSON.parse(blog.translatedContents)
          : blog.translatedContents
        
        return translatedContents[locale] || blog.content
      } catch (error) {
        console.error('Error parsing translatedContents:', error)
      }
    }
    return blog.content || ''
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString(locale, { month: 'short' })
    return { day, month }
  }

  if (loading) {
    return null
  }

  if (!blogs || blogs.length === 0) {
    return null
  }

  return (
    <>
      <div className="blog-section-one mt-50 xl-mt-120">
        <div className="container">
          <div className="position-relative">
            <div className="title-one mb-35 xl-mb-20 md-mb-10 wow fadeInUp">
              <h2 style={{ color: '#1a1a1a', fontWeight: '600', fontSize: 'clamp(24px, 5vw, 42px)', lineHeight: '1.2', fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}>
                {t('blogTitlePart1')}{' '}
                <span style={{ color: '#AF1A1E' }}>
                  {t('blogTitlePart2')}
                </span>
              </h2>
              <p className="fs-20 mt-xs">
                {t('blogSubtitle')}
              </p>
            </div>

            <div className="row gx-xl-5">
            {blogs.map((blog) => {
              const { day, month } = formatDate(blog.createdAt)
              const title = getLocalizedTitle(blog)
              const content = getLocalizedContent(blog)
              const excerpt = content?.replace(/<[^>]*>/g, '').substring(0, 150) || ''
              
              // Build image URL
              const imageUrl = blog.featuredImage 
                ? (blog.featuredImage.startsWith('http') 
                    ? blog.featuredImage 
                    : `${process.env.NEXT_PUBLIC_IMAGE_URL || 'http://localhost:5001'}${blog.featuredImage}`)
                : '/images/blog/default-blog.jpg'

              return (
                <div className="col-md-6" key={blog.id}>
                  <article className="blog-meta-one mt-35 wow fadeInUp"
                  
                  >
                    <figure className="post-img position-relative m0" style={{ 
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '400px',
                      borderRadius: '12px'
                    }}>
                      <Link 
                        href={`/${locale !== 'th' ? locale + '/' : ''}blog/${blog.slug}`}
                        className="stretched-link date tran3s"
                        style={{
                          position: 'absolute',
                          top: '20px',
                          left: '20px',
                          backgroundColor: 'white',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1a1a1a',
                          textDecoration: 'none'
                        }}
                      >
                        {day} {month}
                      </Link>
                    </figure>
                    <div className="post-data">
                      <div className="d-flex justify-content-between align-items-sm-center flex-wrap">
                        <Link 
                          href={`/${locale !== 'th' ? locale + '/' : ''}blog/${blog.slug}`}
                          className="blog-title"
                        >
                          <h4>{title}</h4>
                        </Link>
                        <Link 
                          href={`/${locale !== 'th' ? locale + '/' : ''}blog/${blog.slug}`}
                          className="read-btn d-flex align-items-center justify-content-center tran3s"
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: '1px solid #e0e0e0',
                            color: '#fff',
                            backgroundColor: '#AF1A1E',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#AF1A1E'
                            e.currentTarget.style.borderColor = '#AF1A1E'
                            e.currentTarget.style.color = 'white'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.borderColor = '#e0e0e0'
                            e.currentTarget.style.color = '#1a1a1a'
                          }}
                        >
                          <i className="bi bi-arrow-up-right"></i>
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              )
            })}
            </div>

            <div className="section-btn text-center md-mt-60">
              <Link 
                href={`/${locale !== 'th' ? locale + '/' : ''}blog`}
                className="btn-eight"
                style={{
                  backgroundColor: '#AF1A1E',
                  borderColor: '#AF1A1E',
                  color: 'white'
                }}
              >
                <span>{t('exploreAll')}</span> <i className="bi bi-arrow-up-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OurBlog
