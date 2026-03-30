import { BlogPost } from '../types/blog';

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Madi: Tradition of Sacred Food',
    excerpt: 'Explore the profound spiritual and hygiene practices behind Udupi’s centuries-old culinary traditions.',
    content: `
      <h2>The Essence of Sacred Cooking</h2>
      <p>In the heart of Udupi, cooking is not just an act of preparation; it is a spiritual journey. The concept of 'Madi' (sacred purity) is central to our kitchen philosophy. This ancient practice ensures that food is prepared with the utmost devotion and cleanliness.</p>
      
      <h3>Purity in Practice</h3>
      <p>Madi involves strict hygiene rituals. A cook enters the kitchen only after a refreshing bath and wears traditional attire. This isn’t just about physical cleanliness; it’s about a mental state of clarity and focus while preparing meals for the community.</p>
      
      <h3>Traditional Vessels</h3>
      <p>We use traditional soapstone and bronze vessels. These materials don’t just retain heat better; they infuse the food with unique minerals and a 'soul' that modern stainless steel simply cannot replicate.</p>
      
      <p>When you eat at Udupi Vrindavan, you aren't just consuming calories; you are partaking in a 700-year-old heritage of spiritual wellness.</p>
    `,
    author: 'Chief Chef Arjun',
    date: 'March 25, 2024',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
    category: 'Tradition',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Why Coconut Oil is the Hero of our Kitchen',
    excerpt: 'Discover the health benefits and authentic flavor profile that pure coconut oil brings to every Udupi dish.',
    content: `
      <h2>The Golden Liquid of the Coast</h2>
      <p>At Udupi Vrindavan, we use 100% pure coconut oil for almost all our preparations. While many commercial restaurants opt for neutral vegetable oils, we stick to our roots in the Karnataka coast.</p>
      
      <h3>Health First</h3>
      <p>Coconut oil contains medium-chain triglycerides (MCTs), which are easily digested and provide immediate energy. It is also rich in lauric acid, known for its antimicrobial properties.</p>
      
      <h3>Flavor Profile</h3>
      <p>The subtle, nutty aroma of fresh coconut oil is what gives our Neer Dosa and Sambar that authentic 'home' feeling. It bridges the gap between the land and the sea, creating a flavor balance that is both light and satisfying.</p>
      
      <p>We source our oil directly from trusted mills in Karnataka to ensure that every drop is as pure as nature intended.</p>
    `,
    author: 'Chinmay K.',
    date: 'March 20, 2024',
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2070&auto=format&fit=crop',
    category: 'Health',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Navigating the 7 Temples of Udupi',
    excerpt: 'A traveler’s guide to the spiritual epicenter of the South—the sacred temple circuit of Udupi.',
    content: `
      <h2>A Journey through Time</h2>
      <p>Udupi is often called the 'Mathura of the South'. For centuries, seekers have flocked to this coastal town to witness the divine aura of the Sri Krishna Mutta. But Udupi’s spiritual landscape is far more diverse.</p>
      
      <h3>The Eternal Eight</h3>
      <p>The Ashta Mathas (Eight Monasteries) established by Sri Madhvacharya form the backbone of Udupi’s culture. Each Matha takes turns to manage the temple, a tradition that has continued without break for 700 years.</p>
      
      <h3>Architecture and Art</h3>
      <p>From the unique 'Kanakana Kindi' window to the intricate chariot festivals, every corner of the temple complex tells a story of faith, resilience, and architectural brilliance.</p>
      
      <p>Whether you are a pilgrim or a curious traveler, the energy of Udupi is something that stays with you long after you leave.</p>
    `,
    author: 'Vikas Rao',
    date: 'March 15, 2024',
    image: 'https://images.unsplash.com/photo-1590766940554-6d2c673e4a6d?q=80&w=2070&auto=format&fit=crop',
    category: 'Culture',
    readTime: '6 min read'
  }
];
