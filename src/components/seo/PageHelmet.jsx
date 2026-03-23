const SITE_NAME = 'Tech Hubben Learning'
const SITE_URL = import.meta.env.VITE_APP_URL || 'https://techhubb.se'
const DEFAULT_DESCRIPTION = 'Interactive learning platform for tech roles and programming languages. Master AI engineering, backend development, DevOps, and more with structured roadmaps.'

export default function PageHelmet({ title, description, path = '', ogType = 'website', subject, educationalLevel }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const desc = description || DEFAULT_DESCRIPTION
  const url = `${SITE_URL}${path}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="category" content="Education" />
      {subject && <meta name="subject" content={subject} />}
      {educationalLevel && <meta name="educational-level" content={educationalLevel} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
    </>
  )
}
