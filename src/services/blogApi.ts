import { BlogPost } from '../types/blog';

export const DEFAULT_CONFIG = {
  mode: 'google_sheets' as const,
  googleSheetsUrl: (import.meta as any).env?.VITE_GOOGLE_SHEETS_URL || ''
};

// =========================================================================
// ⚙️ BLOG ENGINE CONFIG — Persisted in localStorage.
// =========================================================================
const getSavedConfig = () => {
  if (typeof window === 'undefined') {
    return { ...DEFAULT_CONFIG };
  }
  try {
    const stored = localStorage.getItem('udupi_blog_config');
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        mode: 'google_sheets' as const,
        googleSheetsUrl: parsed.googleSheetsUrl || DEFAULT_CONFIG.googleSheetsUrl
      };
    }
  } catch (e) {
    console.error('Failed to load blog config from localStorage:', e);
  }
  return { ...DEFAULT_CONFIG };
};

const savedConfig = getSavedConfig();

export const BLOG_CONFIG = {
  get mode() { return 'google_sheets' as const; },
  set mode(_val: string) { },

  get googleSheetsUrl() { return savedConfig.googleSheetsUrl || DEFAULT_CONFIG.googleSheetsUrl; },
  set googleSheetsUrl(val: string) { savedConfig.googleSheetsUrl = val; saveConfig(); },
};

const saveConfig = () => {
  try {
    localStorage.setItem('udupi_blog_config', JSON.stringify({
      mode: 'google_sheets',
      googleSheetsUrl: savedConfig.googleSheetsUrl
    }));
  } catch (e) {
    console.error('Failed to save blog config to localStorage:', e);
  }
};

export const updateBlogConfig = (newConfig: {
  googleSheetsUrl: string;
}) => {
  savedConfig.googleSheetsUrl = newConfig.googleSheetsUrl;
  saveConfig();
};

// ⏱ Read time calculator
const calculateReadTime = (content: string): string => {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
};

// 🧼 Normalizes raw DB keys to lowercase to avoid Google Sheets case discrepancies
const normalizePostKeys = (rawPost: any): BlogPost => {
  if (!rawPost) return {} as BlogPost;

  const normalized: any = {};
  Object.keys(rawPost).forEach(key => {
    normalized[key.toLowerCase()] = rawPost[key];
  });

  return {
    id: normalized.id ? String(normalized.id) : String(Date.now()),
    slug: (normalized.slug ? String(normalized.slug) : '').trim(),
    title: normalized.title ? String(normalized.title) : '',
    excerpt: normalized.excerpt ? String(normalized.excerpt) : '',
    content: normalized.content ? String(normalized.content) : '',
    author: normalized.author ? String(normalized.author) : 'Udupi Vrindavan',
    date: normalized.date ? String(normalized.date) : new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    image: normalized.image ? String(normalized.image) : '/logo.png',
    category: normalized.category ? String(normalized.category) : 'Tradition',
    readTime: normalized.readtime || normalized.readTime || '3 min read'
  };
};

// 🛰 Google Sheets Fetch
const fetchFromGoogleSheets = async (config: any): Promise<BlogPost[]> => {
  if (!config.googleSheetsUrl) return [];
  try {
    const response = await fetch(`${config.googleSheetsUrl}?action=getPosts`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data.map(normalizePostKeys) : [];
  } catch (err) {
    console.error('Google Sheets fetch failed:', err);
    return [];
  }
};

// 📤 Google Sheets Publish
const publishToGoogleSheets = async (newPost: BlogPost, config: any): Promise<boolean> => {
  try {
    await fetch(config.googleSheetsUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'createPost', ...newPost })
    });
    return true;
  } catch (err) {
    console.error('Google Sheets publish failed:', err);
    return false;
  }
};

// 🗑 Google Sheets Delete
const deleteFromGoogleSheets = async (id: string, config: any): Promise<boolean> => {
  if (!config.googleSheetsUrl) return false;
  try {
    await fetch(config.googleSheetsUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'deletePost', id })
    });
    return true;
  } catch (err) {
    console.error('Google Sheets delete failed:', err);
    return false;
  }
};

// ✏️ Google Sheets Update
const updateInGoogleSheets = async (post: BlogPost, config: any): Promise<boolean> => {
  if (!config.googleSheetsUrl) return false;
  try {
    await fetch(config.googleSheetsUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'updatePost', ...post })
    });
    return true;
  } catch (err) {
    console.error('Google Sheets update failed:', err);
    return false;
  }
};

// ── Client-Side In-Memory and SessionStorage Caching ──
let cachedPosts: BlogPost[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 3 * 60 * 1000; // 3 minutes TTL

const getCachedPosts = (): BlogPost[] | null => {
  if (cachedPosts && (Date.now() - cacheTimestamp < CACHE_TTL)) {
    return cachedPosts;
  }
  try {
    const sessionData = sessionStorage.getItem('udupi_posts_cache');
    const sessionTime = sessionStorage.getItem('udupi_posts_cache_time');
    if (sessionData && sessionTime) {
      const parsedTime = parseInt(sessionTime, 10);
      if (Date.now() - parsedTime < CACHE_TTL) {
        cachedPosts = JSON.parse(sessionData);
        cacheTimestamp = parsedTime;
        return cachedPosts;
      }
    }
  } catch (e) {
    console.error('Error reading from sessionStorage cache', e);
  }
  return null;
};

const setPostsCache = (posts: BlogPost[]) => {
  cachedPosts = posts;
  cacheTimestamp = Date.now();
  try {
    sessionStorage.setItem('udupi_posts_cache', JSON.stringify(posts));
    sessionStorage.setItem('udupi_posts_cache_time', String(cacheTimestamp));
  } catch (e) {
    console.error('Error writing to sessionStorage cache', e);
  }
};

const clearPostsCache = () => {
  cachedPosts = null;
  cacheTimestamp = 0;
  try {
    sessionStorage.removeItem('udupi_posts_cache');
    sessionStorage.removeItem('udupi_posts_cache_time');
  } catch (e) {
    console.error('Error clearing sessionStorage cache', e);
  }
};

export const blogApi = {
  // ✅ GET ALL POSTS
  async getPosts(forceRefresh = false): Promise<BlogPost[]> {
    if (!forceRefresh) {
      const cached = getCachedPosts();
      if (cached) {
        return cached;
      }
    }
    const config = getSavedConfig();
    const posts = await fetchFromGoogleSheets(config);
    if (posts && posts.length > 0) {
      setPostsCache(posts);
    }
    return posts;
  },

  // ✅ GET ALL POSTS FOR ADMIN
  async getAllPostsAdmin(): Promise<(BlogPost & { _source: 'google_sheets' })[]> {
    const config = getSavedConfig();
    const posts = await fetchFromGoogleSheets(config);
    if (posts && posts.length > 0) {
      setPostsCache(posts);
    }
    return posts.map(p => ({ ...p, _source: 'google_sheets' as const }));
  },

  // ✅ GET SINGLE POST
  async getPostBySlug(slug: string, forceRefresh = false): Promise<BlogPost | null> {
    const posts = await this.getPosts(forceRefresh);
    const cleanSlug = decodeURIComponent(slug).trim().toLowerCase();

    return posts.find(p => {
      const pSlug = p.slug ? p.slug.trim().toLowerCase() : '';
      const generatedSlugFromTitle = p.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      return pSlug === cleanSlug || generatedSlugFromTitle === cleanSlug;
    }) || null;
  },

  // ✅ TEST CONNECTION (Google Sheets only)
  async testConnection(config: {
    mode: 'google_sheets';
    googleSheetsUrl: string;
  }): Promise<boolean> {
    try {
      const posts = await fetchFromGoogleSheets(config);
      return posts.length >= 0;
    } catch (e) {
      console.error('Connection test failed:', e);
      return false;
    }
  },

  // ✅ CREATE NEW POST
  async createPost(post: Omit<BlogPost, 'id' | 'date' | 'readTime'>): Promise<boolean> {
    const config = getSavedConfig();
    const newPost: BlogPost = {
      ...post,
      id: String(Date.now()),
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      readTime: calculateReadTime(post.content)
    };
    const success = await publishToGoogleSheets(newPost, config);
    if (success) {
      clearPostsCache();
    }
    return success;
  },

  // 🗑 DELETE POST
  async deletePost(id: string): Promise<boolean> {
    const config = getSavedConfig();
    const success = await deleteFromGoogleSheets(id, config);
    if (success) {
      clearPostsCache();
    }
    return success;
  },

  // ✏️ UPDATE POST
  async updatePost(post: BlogPost): Promise<boolean> {
    const config = getSavedConfig();
    const updatedPost = {
      ...post,
      readTime: calculateReadTime(post.content)
    };
    const success = await updateInGoogleSheets(updatedPost, config);
    if (success) {
      clearPostsCache();
    }
    return success;
  }
};
