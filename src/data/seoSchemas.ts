import { CONTACT_DETAILS, SITE_METADATA, SOCIAL_LINKS, REVIEWS } from './siteConfig';

export const ORDER_URL = 'https://order.udupivrindavan.com/outlet/99670498269910';

const sameAs = SOCIAL_LINKS.map((link) => link.href);

export const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': ['Restaurant', 'LocalBusiness'],
  '@id': `${SITE_METADATA.siteUrl}/#restaurant`,
  name: SITE_METADATA.businessName,
  alternateName: SITE_METADATA.siteName,
  url: SITE_METADATA.siteUrl,
  image: [
    `${SITE_METADATA.siteUrl}/logo.png`,
    `${SITE_METADATA.siteUrl}/Butter-Dosa.jpg`
  ],
  logo: `${SITE_METADATA.siteUrl}/logo.png`,
  telephone: CONTACT_DETAILS.phone,
  email: CONTACT_DETAILS.email,
  currenciesAccepted: 'AED',
  paymentAccepted: 'Cash, Credit Card, Debit Card',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'FB04, WASL Opal, Street 26',
    addressLocality: 'Al Karama',
    addressRegion: 'Dubai',
    addressCountry: 'AE'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.247057,
    longitude: 55.310259
  },
  hasMap: CONTACT_DETAILS.googleMapsDirect,
  areaServed: 'Al Karama, Dubai',
  servesCuisine: ['Udupi', 'South Indian', 'Vegetarian', 'Karnataka'],
  menu: SITE_METADATA.menuUrl,
  description: SITE_METADATA.description,
  sameAs,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '07:00',
      closes: '23:00'
    }
  ],
  potentialAction: {
    '@type': 'OrderAction',
    target: ORDER_URL
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '600',
    bestRating: '5',
    worstRating: '1'
  },
  review: REVIEWS.map((rev) => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: rev.name
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1'
    },
    reviewBody: rev.text
  }))
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_METADATA.siteUrl}/#website`,
  name: SITE_METADATA.siteName,
  url: SITE_METADATA.siteUrl,
  inLanguage: 'en-US',
  publisher: {
    '@id': `${SITE_METADATA.siteUrl}/#restaurant`
  },
  description: SITE_METADATA.description
};

export const homeBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_METADATA.siteUrl
    }
  ]
};

export const breadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_METADATA.siteUrl}${item.path}`
  }))
});
