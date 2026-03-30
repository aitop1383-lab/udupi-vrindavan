import { BlogPost } from '../types/blog';

const LOCAL_PROXY_URL = '/api/wp/posts';

// 🚀 In-Memory Cache
let postsCache: BlogPost[] | null = null;
const postDetailCache: Record<string, BlogPost> = {};

// ⏱ Read time
const calculateReadTime = (content: string): string => {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
};

// 🖼 Proper Image Extractor (FIXED)
const getFeaturedImage = (wpPost: any): string => {
  const media = wpPost._embedded?.['wp:featuredmedia']?.[0];

  return (
    media?.media_details?.sizes?.full?.source_url ||
    media?.media_details?.sizes?.large?.source_url ||
    media?.media_details?.sizes?.medium?.source_url ||
    media?.source_url ||
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'
  );
};

// 🧠 Mapper
const mapWPPostToBlogPost = (wpPost: any): BlogPost => {
  return {
    id: wpPost.id,
    slug: wpPost.slug,

    title: wpPost.title?.rendered || '',

    excerpt:
      wpPost.excerpt?.rendered
        ?.replace(/<[^>]*>/g, '')
        ?.substring(0, 150) + '...',

    content: wpPost.content?.rendered || '',

    author:
      wpPost._embedded?.author?.[0]?.name || 'Udupi Vrindavan',

    date: new Date(wpPost.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),

    image: getFeaturedImage(wpPost), // 🔥 FIXED

    category:
      wpPost._embedded?.['wp:term']?.[0]?.[0]?.name ||
      'Tradition',

    readTime: calculateReadTime(wpPost.content?.rendered || ''),
  };
};

export const blogApi = {
  // ✅ ALL POSTS
  async getPosts(): Promise<BlogPost[]> {
    if (postsCache) return postsCache;

    const response = await fetch(`${LOCAL_PROXY_URL}?_embed=1`);

    if (!response.ok) throw new Error('Failed to fetch posts');

    const wpPosts = await response.json();

    postsCache = wpPosts.map(mapWPPostToBlogPost);
    return postsCache;
  },

  // ✅ SINGLE POST (FIXED)
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (postDetailCache[slug]) return postDetailCache[slug];

    // If available in global posts list, use it to save request
    if (postsCache) {
      const cachedPost = postsCache.find(p => p.slug === slug);
      if (cachedPost) {
        postDetailCache[slug] = cachedPost;
        return cachedPost;
      }
    }

    const response = await fetch(
      `${LOCAL_PROXY_URL}?slug=${slug}&_embed=1`
    );

    if (response.status === 404) return null;
    if (!response.ok) throw new Error('Failed to fetch post');

    const wpPosts = await response.json();

    if (!Array.isArray(wpPosts) || wpPosts.length === 0) return null;

    const post = mapWPPostToBlogPost(wpPosts[0]);
    postDetailCache[slug] = post;
    return post;
  },
};