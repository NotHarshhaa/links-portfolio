'use client'

import { useEffect } from 'react'
import Head from 'next/head'

interface SEOOptimizerProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  twitterImage?: string
  url?: string
  type?: string
}

export function SEOOptimizer({
  title = 'Harshhaa Vardhan Reddy | DevOps Engineer & Cloud Specialist',
  description = 'DevOps Engineer passionate about automation, cloud infrastructure, and scalable solutions. Based in Hyderabad, India. Connect with me for collaboration and innovation.',
  keywords = 'DevOps Engineer, Cloud Infrastructure, Automation, AWS, Azure, GCP, Kubernetes, Docker, CI/CD, Hyderabad, India',
  ogImage = '/opengraph-image.png',
  twitterImage = '/opengraph-image.png',
  url = 'https://notharshhaa.site',
  type = 'website'
}: SEOOptimizerProps) {
  useEffect(() => {
    // Update meta tags dynamically
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = name
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    // Update basic meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', 'Harshhaa Vardhan Reddy')
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('viewport', 'width=device-width, initial-scale=1')

    // Update Open Graph tags
    updatePropertyTag('og:title', title)
    updatePropertyTag('og:description', description)
    updatePropertyTag('og:image', ogImage)
    updatePropertyTag('og:url', url)
    updatePropertyTag('og:type', type)
    updatePropertyTag('og:site_name', 'Harshhaa Portfolio')
    updatePropertyTag('og:locale', 'en_US')

    // Update Twitter Card tags
    updatePropertyTag('twitter:card', 'summary_large_image')
    updatePropertyTag('twitter:title', title)
    updatePropertyTag('twitter:description', description)
    updatePropertyTag('twitter:image', twitterImage)
    updatePropertyTag('twitter:site', '@NotHarshhaa')
    updatePropertyTag('twitter:creator', '@NotHarshhaa')

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    // Add structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Harshhaa Vardhan Reddy',
      jobTitle: 'DevOps Engineer',
      description: description,
      url: url,
      sameAs: [
        'https://github.com/NotHarshhaa',
        'https://www.linkedin.com/in/harshhaa-vardhan-reddy',
        'https://x.com/NotHarshhaa'
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance'
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hyderabad',
        addressCountry: 'India'
      }
    }

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Add new structured data
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)
  }, [title, description, keywords, ogImage, twitterImage, url, type])

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Harshhaa Vardhan Reddy" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Harshhaa Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:site" content="@NotHarshhaa" />
      <meta name="twitter:creator" content="@NotHarshhaa" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon and app icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://github.com" />
      <link rel="preconnect" href="https://www.linkedin.com" />
      <link rel="preconnect" href="https://x.com" />
    </Head>
  )
}
