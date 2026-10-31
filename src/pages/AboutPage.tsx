import React from 'react';
import Seo from '../components/Seo';
import PageHero from '../components/ui/PageHero';
import AboutUs from './AboutUs';
import Heritage from './Heritage';
import Commitment from './Commitment';
import { breadcrumbSchema, restaurantSchema } from '../data/seoSchemas';

const aboutBreadcrumbSchema = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' }
]);

const AboutPage = () => {
  return (
    <div className="bg-brand-cream min-h-screen">
      <Seo
        title="About Us | Authentic South Indian Vegetarian Dining Philosophy in Dubai"
        description="Learn about Udupi Vrindavan's philosophy of pure Satvik food, authentic Karnataka culinary traditions, and ethical kitchen practices in Al Karama, Dubai."
        canonicalPath="/about"
        image="/host.jpeg"
        type="article"
        jsonLd={[aboutBreadcrumbSchema, restaurantSchema]}
      />

      <PageHero
        eyebrow="Our Story & Values"
        title={<>Preserving Sacred <span className="accent text-[1.1em]">Flavors</span></>}
        description="At Udupi Vrindavan, we believe that food is more than just sustenance; it is sacred. We bring authentic Karnataka and Udupi Satvik traditions to Dubai with pure ingredients, skilled Karnataka cooks, and a deep commitment to our patrons and team."
      />

      <AboutUs />
      <Heritage />
      <Commitment />
    </div>
  );
};

export default AboutPage;
