import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  PlusCircle,
  ScanLine,
  Mail,
  Phone,
  Lightbulb,
  MessageCircle,
  Lock,
  PenLine,
  List,
  Eye,
  CheckCircle2,
  CloudUpload,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  Info,
  Trash2,
  Settings,
  RefreshCw,
  CloudCheck,
  AlertCircle,
  Pencil,
  AlertTriangle,
  BookOpen,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { blogApi, BLOG_CONFIG, updateBlogConfig } from '../services/blogApi';
import { BlogPost } from '../types/blog';
import ImageUploader from '../components/ImageUploader';

import { AdminLogin } from '../components/admin/AdminLogin';

const PASSKEY = (import.meta as any).env?.VITE_ADMIN_PASSKEY || 'udupi@admin';

/* ── Helper functions for parsing content images into placeholders ── */
const preprocessContent = (rawContent: string) => {
  const images: Record<string, string> = {};
  let counter = 1;
  const regex = /data:image\/[^"'\s>]+/g;
  const cleanContent = rawContent.replace(regex, (match) => {
    const key = `image-${counter++}-${Date.now()}`;
    images[key] = match;
    return `[[${key}]]`;
  });
  return { cleanContent, images };
};

const postprocessContent = (cleanContent: string, images: Record<string, string>) => {
  let rawContent = cleanContent;
  Object.entries(images).forEach(([key, base64]) => {
    rawContent = rawContent.replaceAll(`[[${key}]]`, base64);
  });
  return rawContent;
};

/* ═══════════════════════════════════════════════
   ── Sub-components
   ═══════════════════════════════════════════════ */

/** HTML Toolbar — inserts snippets at cursor position */
const ContentToolbar = ({
  textareaRef,
  onInsert,
  onImageUploaded,
}: {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onInsert: (newValue: string, cursorStart: number, cursorEnd: number) => void;
  onImageUploaded?: (url: string) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingInline, setUploadingInline] = React.useState(false);
  const [uploadError, setUploadError] = React.useState('');
  const [showUrlPaste, setShowUrlPaste] = React.useState(false);
  const [urlPasteValue, setUrlPasteValue] = React.useState('');

  const IMGBB_API_KEY = (import.meta as any).env?.VITE_IMGBB_API_KEY || '';

  const insert = (before: string, after = '', placeholder = '') => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart ?? 0;
    const end = ta.selectionEnd ?? 0;
    const selected = ta.value.substring(start, end) || placeholder;
    const newVal =
      ta.value.substring(0, start) + before + selected + after + ta.value.substring(end);
    const cs = start + before.length;
    const ce = cs + selected.length;
    onInsert(newVal, cs, ce);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(cs, ce);
    }, 0);
  };

  const insertImgTag = (url: string) => {
    const tag = `\n<img src="${url}" alt="Image" class="w-full rounded-2xl my-6" />\n`;
    const ta = textareaRef.current;
    if (!ta) return;
    const pos = ta.selectionStart ?? ta.value.length;
    const newVal = ta.value.substring(0, pos) + tag + ta.value.substring(pos);
    onInsert(newVal, pos + tag.length, pos + tag.length);
    setTimeout(() => { ta.focus(); }, 0);
  };

  const handleUrlPasteInsert = () => {
    const url = urlPasteValue.trim();
    if (!url) return;
    insertImgTag(url);
    setUrlPasteValue('');
    setShowUrlPaste(false);
    setUploadError('');
  };

  const handleInlineUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File too large (max 10 MB).');
      setShowUrlPaste(true);
      return;
    }
    setUploadingInline(true);
    setUploadError('');
    try {
      let url = '';
      if (IMGBB_API_KEY) {
        const fd = new FormData();
        fd.append('image', file);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: 'POST', body: fd });
        const data = await res.json();
        if (data?.data?.url) url = data.data.url;
      }
      if (!url) {
        const compressImage = (f: File) => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(f);
          reader.onload = (e) => {
            const img = new Image();
            img.src = e.target?.result as string;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 600; // Reduced from 800 to fit Google Sheets 50,000 char limit
              let width = img.width;
              let height = img.height;
              if (width > MAX_WIDTH) {
                height = Math.round((height * MAX_WIDTH) / width);
                width = MAX_WIDTH;
              }
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.fillStyle = '#ffffff'; // Ensure non-transparent background
                ctx.fillRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);
              }
              resolve(canvas.toDataURL('image/webp', 0.45)); // Compressed heavily to fit Google Sheets limits
            };
            img.onerror = () => reject('Image load failed');
          };
          reader.onerror = () => reject('File read failed');
        });
        url = await compressImage(file);
      }
      if (url) {
        if (onImageUploaded) {
          onImageUploaded(url);
        } else {
          insertImgTag(url);
        }
      } else {
        setUploadError('Upload failed. Paste an image URL manually:');
        setShowUrlPaste(true);
      }
    } catch {
      setUploadError('Upload failed. Paste an image URL manually:');
      setShowUrlPaste(true);
    } finally {
      setUploadingInline(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const tools = [
    { label: 'H2', title: 'Heading 2 — Section Title', action: () => insert('<h2>', '</h2>', 'Section Heading') },
    { label: 'H3', title: 'Heading 3 — Sub Section', action: () => insert('<h3>', '</h3>', 'Sub Heading') },
    { label: 'P', title: 'Paragraph', action: () => insert('<p>', '</p>', 'Your paragraph text here...') },
    { label: 'B', title: 'Bold', action: () => insert('<strong>', '</strong>', 'bold text'), cls: 'font-black' },
    { label: 'I', title: 'Italic', action: () => insert('<em>', '</em>', 'italic text'), cls: 'italic' },
    { label: 'UL', title: 'Bullet List', action: () => insert('<ul>\n  <li>', '</li>\n  <li>Item 2</li>\n</ul>', 'Item 1') },
    { label: 'URL', title: 'Paste image URL to embed', action: () => { setShowUrlPaste(true); setUploadError(''); } },
    { label: '— HR', title: 'Horizontal Divider', action: () => insert('\n<hr class="my-8 border-brand-blue/10" />\n') },
    { label: 'QUOTE', title: 'Block Quote', action: () => insert('\n<blockquote class="border-l-4 border-brand-gold pl-4 italic text-brand-blue/70 my-4">', '</blockquote>\n', 'Your quote here...') },
  ];

  return (
    <div className="border border-brand-blue/10 border-b-0 rounded-t-xl overflow-hidden">
      <div className="flex flex-wrap gap-1.5 px-3 py-2 bg-brand-blue/[0.04] items-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleInlineUpload(f); }}
        />
        <span className="text-[9px] text-brand-blue/30 font-black uppercase tracking-widest select-none mr-1">
          Insert →
        </span>
        <button
          type="button"
          title="Upload image — uploads to image host, inserts a real short URL or compressed placeholder"
          disabled={uploadingInline}
          onClick={() => fileInputRef.current?.click()}
          className="px-2.5 py-1 bg-brand-gold/15 border border-brand-gold/30 rounded-lg text-[11px] text-brand-blue hover:bg-brand-gold hover:text-brand-blue hover:border-brand-gold transition-all cursor-pointer shadow-sm font-bold flex items-center gap-1 disabled:opacity-60"
        >
          {uploadingInline ? (
            <><RefreshCw className="animate-spin" size={11} /> Uploading…</>
          ) : (
            <>📤 Upload IMG</>
          )}
        </button>
        {tools.map((t) => (
          <button
            key={t.label}
            type="button"
            title={t.title}
            onClick={t.action}
            className={`px-2.5 py-1 bg-white border border-brand-blue/10 rounded-lg text-[11px] text-brand-blue hover:bg-brand-gold hover:text-brand-blue hover:border-brand-gold transition-all cursor-pointer shadow-sm font-bold ${t.cls || ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Inline URL paste row — appears on fallback or 🖼 URL click */}
      {showUrlPaste && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 px-3 py-2 bg-brand-blue/[0.03] border-t border-brand-blue/8">
          <span className={`text-[10px] font-bold shrink-0 ${uploadError ? 'text-red-500' : 'text-brand-blue/50'}`}>
            {uploadError || 'Image URL:'}
          </span>
          <input
            type="text"
            autoFocus
            value={urlPasteValue}
            onChange={(e) => setUrlPasteValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); handleUrlPasteInsert(); }
              if (e.key === 'Escape') { setShowUrlPaste(false); setUrlPasteValue(''); setUploadError(''); }
            }}
            placeholder="https://i.ibb.co/… or https://example.com/image.jpg"
            className="w-full min-w-0 flex-1 px-3 py-1.5 bg-white border border-brand-blue/10 rounded-lg text-xs text-brand-blue focus:border-brand-gold focus:outline-none font-mono"
          />
          <button
            type="button"
            onClick={handleUrlPasteInsert}
            className="px-3 py-1.5 bg-brand-blue text-brand-cream rounded-lg text-[11px] font-bold hover:bg-brand-gold hover:text-brand-blue transition-all cursor-pointer shrink-0"
          >
            Insert
          </button>
          <button
            type="button"
            onClick={() => { setShowUrlPaste(false); setUrlPasteValue(''); setUploadError(''); }}
            className="text-brand-blue/30 hover:text-brand-blue/60 text-xs font-bold cursor-pointer px-1 shrink-0"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

/** Image guidance info box */
const ImageGuide = () => (
  <div className="bg-gradient-to-br from-brand-gold/8 to-brand-blue/5 border border-brand-gold/25 rounded-2xl p-4 space-y-3 text-xs">
    <div className="flex items-center gap-2 font-bold text-brand-blue text-[11px] uppercase tracking-widest">
      <Info className="text-brand-gold shrink-0" size={15} />
      Image Guide
    </div>
    <div className="flex items-start gap-2.5">
      <span className="text-sm leading-none mt-0.5 shrink-0"><Camera size={18} className="text-brand-gold mt-1 shrink-0" /></span>
      <div>
        <span className="font-bold text-brand-blue block mb-0.5">1 Cover / Featured Image (required)</span>
        <span className="text-brand-blue/55 leading-relaxed">
          This image appears on the blog card and at the top of the post. Paste the URL in the field below.
        </span>
      </div>
    </div>
    <div className="flex items-start gap-2.5">
      <span className="text-sm leading-none mt-0.5 shrink-0"><PlusCircle size={18} className="text-brand-gold mt-1 shrink-0" /></span>
      <div>
        <span className="font-bold text-brand-blue block mb-0.5">Additional images inside content</span>
        <span className="text-brand-blue/55 leading-relaxed">
          Click the <code className="bg-white/80 px-1.5 py-0.5 rounded-md font-bold text-brand-blue/80 border border-brand-blue/10"> IMG</code> button in the toolbar — enter the URL and the image will be embedded in the article.
        </span>
      </div>
    </div>
    <div className="flex items-start gap-2.5">
      <span className="text-sm leading-none mt-0.5 shrink-0"><ScanLine size={18} className="text-brand-gold mt-1 shrink-0" /></span>
      <div>
        <span className="font-bold text-brand-blue block mb-0.5">Recommended Size: 1200 × 630px (16:9)</span>
        <span className="text-brand-blue/55 leading-relaxed">
          JPG / PNG / WebP. Free upload:{' '}
          <a href="https://imgbb.com" target="_blank" rel="noreferrer" className="text-brand-gold hover:underline font-bold">imgbb.com</a>
          {' '}or Google Photos → Share link.
        </span>
      </div>
    </div>
  </div>
);

/** Numbered step header */
const StepCard = ({ number, title, desc, children }: { number: number; title: string; desc: string; children: React.ReactNode }) => (
  <div className="bg-white/80 backdrop-blur-md border border-brand-blue/5 rounded-2xl md:rounded-[2rem] p-4 sm:p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-5 md:space-y-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-brand-gold/20">
    <div className="flex items-start sm:items-center gap-3 sm:gap-4 pb-4 border-b border-brand-blue/5">
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-gold to-brand-gold/80 text-white text-sm font-black flex items-center justify-center shrink-0 shadow-lg shadow-brand-gold/20">
        {number}
      </div>
      <div>
        <h3 className="font-display font-bold text-brand-blue text-lg tracking-tight">{title}</h3>
        <p className="text-[11px] text-brand-blue/50 font-medium mt-0.5">{desc}</p>
      </div>
    </div>
    <div className="pt-1 sm:pt-2">
      {children}
    </div>
  </div>
);

/** Word / char stats bar */
const ContentStats = ({ text }: { text: string }) => {
  const plain = text.replace(/<[^>]*>/g, '').trim();
  const words = plain ? plain.split(/\s+/).filter(Boolean).length : 0;
  const chars = plain.length;
  const readTime = Math.max(1, Math.ceil(words / 220));
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-3 py-2 bg-brand-blue/[0.04] border border-brand-blue/10 border-t-0 rounded-b-2xl text-[10px] text-brand-blue/50 font-bold">
      <span>Words: <span className="text-brand-blue">{words}</span></span>
      <span>Chars: <span className="text-brand-blue">{chars}</span></span>
      <span>Est. Read: <span className="text-brand-blue">~{readTime} min</span></span>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   ── Main BlogAdmin Component
═══════════════════════════════════════════════ */
const BlogAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState(false);

  // View state
  const [view, setView] = useState<'menu' | 'write' | 'list' | 'guide' | 'settings' | 'reservations' | 'edit'>('menu');
  const [posts, setPosts] = useState<(BlogPost & { _source: 'google_sheets' })[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // Edit blog state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editOriginalSlug, setEditOriginalSlug] = useState('');
  const [editCategory, setEditCategory] = useState('Tradition');
  const [editAuthor, setEditAuthor] = useState('Udupi Vrindavan');
  const [editImage, setEditImage] = useState('/logo.png');
  const [editExcerpt, setEditExcerpt] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editStatus, setEditStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [deleteStatus, setDeleteStatus] = useState<Record<string, 'idle' | 'deleting'>>({});
  const [showEditPreview, setShowEditPreview] = useState(false);

  // Reservations
  const [reservations, setReservations] = useState<any[]>([]);
  const [pendingCount, setPendingCount] = useState(0);

  // Write form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Tradition');
  const [author, setAuthor] = useState('Udupi Vrindavan');
  const [image, setImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [publishStatus, setPublishStatus] = useState<'idle' | 'publishing' | 'success' | 'error'>('idle');
  const [showWritePreview, setShowWritePreview] = useState(false);

  // DB settings — Google Sheets only
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState(BLOG_CONFIG.googleSheetsUrl);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  // Textarea refs for toolbar
  const writeContentRef = useRef<HTMLTextAreaElement>(null);
  const editContentRef = useRef<HTMLTextAreaElement>(null);

  // Inline images mapping state for avoiding editor bloat with base64 strings
  const [writeInlineImages, setWriteInlineImages] = useState<Record<string, string>>({});
  const [editInlineImages, setEditInlineImages] = useState<Record<string, string>>({});

  const insertTagAtCursor = (
    tag: string,
    ref: React.RefObject<HTMLTextAreaElement | null>,
    setter: (val: string) => void
  ) => {
    const ta = ref.current;
    if (!ta) return;
    const pos = ta.selectionStart ?? ta.value.length;
    const newVal = ta.value.substring(0, pos) + tag + ta.value.substring(pos);
    setter(newVal);
    setTimeout(() => {
      ta.focus();
    }, 0);
  };

  const handleImageUploadedWrite = (url: string) => {
    if (url.startsWith('data:image/')) {
      const key = `image-${Date.now()}`;
      setWriteInlineImages(prev => ({ ...prev, [key]: url }));
      const tag = `\n<img src="[[${key}]]" alt="Image" class="w-full rounded-2xl my-6" />\n`;
      insertTagAtCursor(tag, writeContentRef, setContent);
    } else {
      const tag = `\n<img src="${url}" alt="Image" class="w-full rounded-2xl my-6" />\n`;
      insertTagAtCursor(tag, writeContentRef, setContent);
    }
  };

  const handleImageUploadedEdit = (url: string) => {
    if (url.startsWith('data:image/')) {
      const key = `image-${Date.now()}`;
      setEditInlineImages(prev => ({ ...prev, [key]: url }));
      const tag = `\n<img src="[[${key}]]" alt="Image" class="w-full rounded-2xl my-6" />\n`;
      insertTagAtCursor(tag, editContentRef, setEditContent);
    } else {
      const tag = `\n<img src="${url}" alt="Image" class="w-full rounded-2xl my-6" />\n`;
      insertTagAtCursor(tag, editContentRef, setEditContent);
    }
  };

  /* ── Toolbar insert handlers ── */
  const handleInsertWrite = (newVal: string, cs: number, ce: number) => {
    setContent(newVal);
    setTimeout(() => {
      writeContentRef.current?.focus();
      writeContentRef.current?.setSelectionRange(cs, ce);
    }, 0);
  };

  const handleInsertEdit = (newVal: string, cs: number, ce: number) => {
    setEditContent(newVal);
    setTimeout(() => {
      editContentRef.current?.focus();
      editContentRef.current?.setSelectionRange(cs, ce);
    }, 0);
  };

  /* ── Sync settings when view changes ── */
  useEffect(() => {
    if (view === 'settings') {
      setGoogleSheetsUrl(BLOG_CONFIG.googleSheetsUrl);
      setTestStatus('idle');
      setTestMessage('');
      setSaveStatus('idle');
    }
  }, [view]);

  /* ── Reservations ── */
  const loadReservations = () => {
    try {
      const stored = localStorage.getItem('udupi_reservations');
      setReservations(stored ? JSON.parse(stored) : []);
    } catch { setReservations([]); }
  };

  useEffect(() => {
    if (view === 'reservations') loadReservations();
  }, [view]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('udupi_reservations');
      if (stored) {
        const list = JSON.parse(stored);
        setPendingCount(list.filter((r: any) => r.status === 'Pending').length);
      } else setPendingCount(0);
    } catch { setPendingCount(0); }
  }, [view, reservations]);

  const handleUpdateReservationStatus = (id: string, newStatus: string) => {
    const updated = reservations.map(r => r.id === id ? { ...r, status: newStatus } : r);
    setReservations(updated);
    localStorage.setItem('udupi_reservations', JSON.stringify(updated));
  };

  const handleDeleteReservation = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this reservation record?')) return;
    const updated = reservations.filter(r => r.id !== id);
    setReservations(updated);
    localStorage.setItem('udupi_reservations', JSON.stringify(updated));
  };

  /* ── Auth ── */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === PASSKEY) { setIsAuthenticated(true); setError(false); }
    else { setError(true); setPasskey(''); }
  };

  /* ── Slug gen ── */
  const toSlug = (val: string) =>
    val.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(toSlug(val));
  };

  /* ── Load posts ── */
  const loadPosts = async () => {
    setLoadingPosts(true);
    try {
      const data = await blogApi.getAllPostsAdmin();
      setPosts(data);
    } catch (err) { console.error(err); }
    finally { setLoadingPosts(false); }
  };

  useEffect(() => {
    if (view === 'list') loadPosts();
  }, [view]);

  /* ── Edit ── */
  const handleStartEdit = (post: BlogPost) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditSlug(post.slug);
    setEditOriginalSlug(post.slug);
    setEditCategory(post.category);
    setEditAuthor(post.author);
    setEditImage(post.image);
    setEditExcerpt(post.excerpt);

    // Preprocess content to replace large inline base64 images with editor placeholders
    const { cleanContent, images } = preprocessContent(post.content);
    setEditContent(cleanContent);
    setEditInlineImages(images);

    setEditStatus('idle');
    setShowEditPreview(false);
    setView('edit');
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    setEditStatus('saving');
    try {
      // Restore full inline base64 images from editor placeholders
      const finalContent = postprocessContent(editContent, editInlineImages);
      const updated: BlogPost = {
        ...editingPost,
        title: editTitle,
        slug: editSlug,
        category: editCategory,
        author: editAuthor,
        image: editImage,
        excerpt: editExcerpt,
        content: finalContent,
      };
      const success = await blogApi.updatePost(updated);
      if (success) {
        setEditStatus('success');
        setEditInlineImages({});
        setTimeout(() => { setView('list'); setEditingPost(null); setEditStatus('idle'); }, 1500);
      } else setEditStatus('error');
    } catch { setEditStatus('error'); }
  };

  /* ── Delete ── */
  const handleDeletePost = async (post: BlogPost) => {
    if (!window.confirm(`Are you sure you want to delete "${post.title}"? This cannot be undone.`)) return;
    setDeleteStatus(prev => ({ ...prev, [post.id]: 'deleting' as const }));
    try {
      await blogApi.deletePost(String(post.id));
      setPosts(prev => prev.filter(p => p.id !== post.id));
    } catch (err) { console.error(err); }
    finally { setDeleteStatus(prev => ({ ...prev, [post.id]: 'idle' as const })); }
  };

  /* ── Publish ── */
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !excerpt.trim()) return;
    setPublishStatus('publishing');
    try {
      // Restore full inline base64 images from editor placeholders
      const finalContent = postprocessContent(content, writeInlineImages);
      const success = await blogApi.createPost({
        title,
        slug,
        excerpt,
        content: finalContent,
        image: image || '/logo.png',
        category,
        author
      });
      if (success) {
        setPublishStatus('success');
        setTitle(''); setSlug(''); setExcerpt(''); setContent(''); setImage('');
        setCategory('Tradition'); setAuthor('Udupi Vrindavan');
        setWriteInlineImages({});
        setTimeout(() => { setPublishStatus('idle'); setView('menu'); }, 2000);
      } else setPublishStatus('error');
    } catch { setPublishStatus('error'); }
  };

  /* ── Settings ── */
  const handleTestConnection = async () => {
    setTestStatus('testing');
    setTestMessage('Connecting to Google Sheets endpoint...');
    try {
      const isConnected = await blogApi.testConnection({
        mode: 'google_sheets',
        googleSheetsUrl: googleSheetsUrl.trim(),
      });
      if (isConnected) {
        setTestStatus('success');
        setTestMessage('Connection successful! Google Sheets Apps Script endpoint is responding correctly.');
      } else {
        setTestStatus('error');
        setTestMessage('Connection failed. Please verify the Web App URL and ensure it is deployed with access set to "Anyone".');
      }
    } catch {
      setTestStatus('error');
      setTestMessage('Connection timed out or blocked by CORS. Check your Apps Script deployment settings.');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    updateBlogConfig({
      googleSheetsUrl: googleSheetsUrl.trim()
    });
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => { setSaveStatus('idle'); setView('menu'); }, 1000);
    }, 800);
  };

  /* ════════════════════════════════
     ── LOGIN VIEW
  ════════════════════════════════ */
  if (!isAuthenticated) {
    return <AdminLogin passkey={passkey} setPasskey={setPasskey} handleLogin={handleLogin} error={error} />;
  }

  /* ════════════════════════════════
     ── MAIN DASHBOARD
  ════════════════════════════════ */
  return (
    <div className="min-h-screen bg-brand-cream py-20 sm:py-24 px-3 sm:px-4 relative overflow-hidden flex items-start justify-center font-sans">
      <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-brand-gold/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-brand-blue/5 blur-[150px] rounded-full" />

      <Helmet>
        <title>Blog Management | Udupi Vrindavan</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white/95 backdrop-blur-2xl rounded-3xl md:rounded-[2.5rem] p-4 sm:p-6 md:p-10 shadow-[0_30px_80px_rgba(15,47,74,0.1)] border border-white relative z-10"
      >
        <AnimatePresence mode="wait">

          {/* ══════════════════════════════
              ── 1. MAIN MENU VIEW
          ══════════════════════════════ */}
          {view === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 px-3 py-1.5 rounded-full text-brand-gold font-bold text-[10px] mb-4 uppercase tracking-widest">
                  <Sparkles size={12} /> Google Sheets CMS — Active
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-brand-blue mb-1.5">Welcome, Admin!</h1>
                <p className="text-brand-blue/50 text-sm max-w-sm mx-auto">
                  Manage blog content and restaurant bookings.
                </p>
              </div>

              {/* Stats Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                <div className="bg-brand-blue text-brand-cream rounded-2xl p-4 flex flex-col items-center justify-center gap-1 shadow-lg">
                  <BookOpen size={20} className="text-brand-gold" />
                  <span className="text-xl font-black">{posts.length > 0 ? posts.length : '—'}</span>
                  <span className="text-[10px] font-bold text-brand-cream/60 uppercase tracking-wider">Live Posts</span>
                </div>
                <div className={`rounded-2xl p-4 flex flex-col items-center justify-center gap-1 shadow-sm border ${pendingCount > 0 ? 'bg-red-50 border-red-100' : 'bg-white border-brand-blue/5'}`}>
                  <Calendar size={20} className={pendingCount > 0 ? 'text-red-500' : 'text-brand-gold'} />
                  <span className={`text-xl font-black ${pendingCount > 0 ? 'text-red-500' : 'text-brand-blue'}`}>{pendingCount}</span>
                  <span className="text-[10px] font-bold text-brand-blue/40 uppercase tracking-wider">Pending</span>
                </div>
                <div className="bg-brand-gold/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-brand-gold/15">
                  <BarChart3 size={20} className="text-brand-gold" />
                  <span className="text-[11px] font-black text-brand-blue capitalize">Google Sheets</span>
                  <span className="text-[10px] font-bold text-brand-blue/40 uppercase tracking-wider">Backend</span>
                </div>
              </div>

              {/* Menu Buttons */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <MenuButton label="Write New Post" desc="Compose and publish a new blog article" onClick={() => setView('write')} icon={<PenLine className="text-brand-gold" size={26} />} primary />
                <MenuButton label="Database Settings" desc="Update your Google Sheets endpoint URL" onClick={() => setView('settings')} icon={<Settings className="text-brand-gold" size={26} />} primary />

                <MenuButton label="View / Edit Posts" desc="Browse, edit, and delete published articles" onClick={() => setView('list')} icon={<List className="text-brand-gold" size={26} />} />
                <MenuButton label="Setup Guide" desc="How to configure Google Sheets CMS" onClick={() => setView('guide')} icon={<Info className="text-brand-gold" size={26} />} />
                <MenuButton label="View Live Blog" desc="See how posts appear on the website" href="/blog" internal icon={<Eye className="text-brand-gold" size={26} />} />
              </div>

              {/* Active backend info */}
              <div className="flex items-center gap-3 p-3 bg-brand-gold/8 border border-brand-gold/15 rounded-xl text-left">
                <CloudCheck size={18} className="text-brand-gold shrink-0" />
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-brand-blue/70">
                  <span className="font-bold">Backend:</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-gold/20 text-brand-blue">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                    Google Sheets
                  </span>
                  <span className="text-brand-blue/40">Posts are stored via your Apps Script endpoint.</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════
              ── 2. WRITE BLOG VIEW
          ══════════════════════════════ */}
          {view === 'write' && (
            <motion.div
              key="write"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 pb-4 border-b border-brand-blue/5">
                <button onClick={() => setView('menu')} className="flex items-center gap-2 text-brand-blue/60 hover:text-brand-gold transition-colors font-bold text-xs uppercase tracking-wider cursor-pointer">
                  <ArrowLeft size={18} /> Back
                </button>
                <div className="text-center">
                  <h2 className="text-xl font-display font-bold text-brand-blue">Write New Post</h2>
                  <p className="text-[10px] text-brand-blue/40 mt-0.5">Complete all 3 steps to publish</p>
                </div>
                <div className="hidden sm:block w-20" />
              </div>

              {publishStatus === 'success' ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-blue mb-2">Post Published Successfully!</h3>
                  <p className="text-brand-blue/60">Your article is now live. Returning to dashboard...</p>
                </div>
              ) : (
                <form onSubmit={handlePublish} className="space-y-5">

                  {/* ── Step 1: Basic Info ── */}
                  <StepCard number={1} title="Basic Information" desc="Title, category, author and URL slug">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-blue/50 mb-1.5 block">Blog Title *</label>
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          placeholder="e.g. The Secret Behind Our Fluffy Idlis"
                          className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-sm font-medium transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-blue/50 mb-1.5 block">Category</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-sm font-medium transition-all"
                        >
                          <option value="Tradition">Tradition</option>
                          <option value="Health">Health</option>
                          <option value="Culture">Culture</option>
                          <option value="Community">Community</option>
                          <option value="Recipe">Recipe</option>
                          <option value="News">News</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-blue/50 mb-1.5 block">URL Slug <span className="text-brand-gold">(auto-generated)</span></label>
                        <input
                          type="text"
                          required
                          value={slug}
                          readOnly
                          className="w-full px-4 py-3 bg-brand-blue/5 border border-brand-blue/5 rounded-xl text-brand-blue/50 text-sm cursor-not-allowed font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-blue/50 mb-1.5 block">Author Name</label>
                        <input
                          type="text"
                          required
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-sm font-medium transition-all"
                        />
                      </div>
                    </div>
                  </StepCard>

                  {/* ── Step 2: Cover Image ── */}
                  <StepCard number={2} title="Cover Image" desc="Optional — drag & drop, upload a file, or paste a URL">
                    <ImageUploader
                      value={image}
                      onChange={setImage}
                      label="Featured Cover Image (optional)"
                    />
                  </StepCard>

                  {/* ── Step 3: Content ── */}
                  <StepCard number={3} title="Content" desc="Short excerpt and the full article body">
                    {/* Excerpt */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-blue/50">Short Excerpt *</label>
                        <span className={`text-[10px] font-bold ${excerpt.length > 200 ? 'text-red-500' : 'text-brand-blue/30'}`}>
                          {excerpt.length}/200
                        </span>
                      </div>
                      <textarea
                        required
                        rows={2}
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="1–2 sentence hook shown on the blog card preview..."
                        className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-sm font-medium resize-none transition-all"
                      />
                      <p className="text-[10px] text-brand-blue/35 mt-1">This appears on the blog listing card. Keep it engaging and concise.</p>
                    </div>

                    {/* Content Editor */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-blue/50">Full Article Content *</label>
                        <button
                          type="button"
                          onClick={() => setShowWritePreview(!showWritePreview)}
                          className="text-[10px] font-bold text-brand-gold hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Eye size={12} />
                          {showWritePreview ? 'Hide Preview' : 'Show Preview'}
                        </button>
                      </div>
                      <ContentToolbar textareaRef={writeContentRef} onInsert={handleInsertWrite} onImageUploaded={handleImageUploadedWrite} />
                      <textarea
                        ref={writeContentRef}
                        required
                        rows={14}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`<h2>Introduction</h2>\n<p>Start your story here...</p>\n\n<h2>Main Section</h2>\n<p>Continue with more details...</p>`}
                        className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-b-2xl focus:rounded-b-2xl outline-none text-brand-blue text-sm font-medium font-mono leading-relaxed resize-y transition-all"
                        style={{ minHeight: '300px' }}
                      />
                      <ContentStats text={content} />
                      <p className="text-[10px] text-brand-blue/35 mt-2">HTML is supported. Use the toolbar buttons for headings, lists, and images.</p>
                    </div>

                    {/* Live HTML Preview */}
                    <AnimatePresence>
                      {showWritePreview && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="border border-brand-gold/20 rounded-2xl overflow-hidden">
                            <div className="bg-brand-gold/10 px-4 py-2.5 flex items-center gap-2">
                              <Eye size={13} className="text-brand-gold" />
                              <span className="text-[10px] font-bold text-brand-blue/60 uppercase tracking-widest">Rendered Preview</span>
                            </div>
                            <div
                              className="p-5 prose prose-sm max-w-none text-brand-blue/80 leading-relaxed text-sm max-h-80 overflow-y-auto bg-white/50"
                              style={{ fontFamily: 'inherit' }}
                              dangerouslySetInnerHTML={{ __html: postprocessContent(content, writeInlineImages) || '<p class="text-brand-blue/30 italic">Your content will appear here...</p>' }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </StepCard>

                  {/* Publish error */}
                  {publishStatus === 'error' && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-200 text-red-700 text-sm">
                      <AlertCircle size={20} className="shrink-0" />
                      Failed to publish. Please check your Google Sheets connection and try again.
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={publishStatus === 'publishing'}
                      className="flex-1 bg-brand-blue text-brand-cream py-4 rounded-2xl font-bold shadow-xl hover:bg-brand-gold hover:text-brand-blue disabled:opacity-60 transition-all text-base flex items-center justify-center gap-3 cursor-pointer"
                    >
                      {publishStatus === 'publishing' ? (
                        <><RefreshCw className="animate-spin" size={18} /> Publishing...</>
                      ) : (
                        <>Publish Article <CloudUpload size={18} /></>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setView('menu')}
                      className="px-8 py-4 sm:py-0 bg-brand-blue/5 border border-brand-blue/5 rounded-2xl font-bold text-brand-blue hover:bg-brand-blue/10 transition-colors text-sm cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {/* ══════════════════════════════
              ── 3. LIST / MANAGE BLOGS
          ══════════════════════════════ */}
          {view === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7 pb-4 border-b border-brand-blue/5">
                <button onClick={() => setView('menu')} className="flex items-center gap-2 text-brand-blue/60 hover:text-brand-gold transition-colors font-bold text-xs uppercase tracking-wider cursor-pointer">
                  <ArrowLeft size={18} /> Back
                </button>
                <div className="text-center">
                  <h2 className="text-xl font-display font-bold text-brand-blue">Published Articles</h2>
                  {posts.length > 0 && <p className="text-[10px] text-brand-blue/40">{posts.length} post{posts.length !== 1 ? 's' : ''} found</p>}
                </div>
                <button
                  onClick={loadPosts}
                  disabled={loadingPosts}
                  className="flex items-center gap-1.5 text-brand-blue/50 hover:text-brand-gold transition-colors text-xs font-bold cursor-pointer"
                  title="Reload posts"
                >
                  <RefreshCw size={16} className={loadingPosts ? 'animate-spin' : ''} />
                  Refresh
                </button>
              </div>

              {loadingPosts ? (
                <div className="text-center py-20 flex flex-col items-center gap-3 text-brand-blue/50">
                  <RefreshCw size={32} className="animate-spin text-brand-gold" />
                  <p className="text-sm">Loading articles from Google Sheets...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-20 bg-brand-blue/[0.03] rounded-3xl border border-brand-blue/5">
                  <BookOpen size={48} className="text-brand-blue/15 mx-auto mb-4" />
                  <h3 className="font-bold text-brand-blue text-lg mb-1">No posts found</h3>
                  <p className="text-xs text-brand-blue/40 max-w-xs mx-auto">Create your first article using "Write New Post" or check your database connection settings.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-0 sm:pr-1.5">
                  {posts.map((post) => (
                    <motion.div
                      key={post.id}
                      layout
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-5 bg-white rounded-2xl sm:rounded-[2rem] border border-brand-blue/5 hover:shadow-[0_15px_40px_rgba(15,47,74,0.08)] hover:border-brand-gold/20 transition-all duration-300 gap-4"
                    >
                      {/* Thumbnail + info */}
                      <div className="flex items-center gap-4 min-w-0 flex-1 w-full">
                        <div className="w-16 h-16 bg-brand-blue/5 rounded-xl overflow-hidden shrink-0 shadow-sm">
                          <img
                            src={post.image}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-brand-blue truncate text-sm md:text-base">{post.title}</h4>
                          <p className="text-brand-blue/50 text-xs truncate mt-0.5 max-w-xs font-light hidden md:block">{post.excerpt}</p>
                          <div className="flex items-center gap-2 flex-wrap mt-1">
                            <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest">{post.category} • {post.date}</span>
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-100">
                              <BarChart3 className="inline mr-1" size={12} /> Google Sheets
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-2 shrink-0 w-full sm:w-auto">
                        <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer"
                          className="p-2.5 bg-brand-blue/5 text-brand-blue hover:bg-brand-gold hover:text-brand-blue rounded-xl transition-all" title="View Live Post">
                          <Eye size={16} />
                        </a>
                        <button onClick={() => handleStartEdit(post)}
                          className="p-2.5 bg-brand-blue/5 text-brand-blue hover:bg-brand-blue hover:text-white rounded-xl transition-all cursor-pointer" title="Edit Post">
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post)}
                          disabled={deleteStatus[post.id] === 'deleting'}
                          className="p-2.5 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all cursor-pointer disabled:opacity-50" title="Delete Post"
                        >
                          {deleteStatus[post.id] === 'deleting'
                            ? <RefreshCw size={16} className="animate-spin" />
                            : <Trash2 size={16} />}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ══════════════════════════════
              ── 3b. EDIT BLOG VIEW
          ══════════════════════════════ */}
          {view === 'edit' && editingPost && (
            <motion.div
              key="edit"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 pb-4 border-b border-brand-blue/5">
                <button onClick={() => { setView('list'); setEditingPost(null); }}
                  className="flex items-center gap-2 text-brand-blue/60 hover:text-brand-gold transition-colors font-bold text-xs uppercase tracking-wider cursor-pointer">
                  <ArrowLeft size={18} /> Back to List
                </button>
                <div className="text-center">
                  <h2 className="text-xl font-display font-bold text-brand-blue">Edit Post</h2>
                  <p className="text-[10px] text-brand-blue/40 mt-0.5 truncate max-w-[200px]">/{editOriginalSlug}</p>
                </div>
                <div className="hidden sm:block w-24" />
              </div>

              {editStatus === 'success' ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-blue mb-2">Post Updated Successfully!</h3>
                  <p className="text-brand-blue/60">Your changes are live. Returning to list...</p>
                </div>
              ) : (
                <form onSubmit={handleSaveEdit} className="space-y-5">

                  {/* ── Step 1: Basic Info ── */}
                  <StepCard number={1} title="Basic Information" desc="Title, category, author and URL slug">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-blue/50 mb-1.5 block">Blog Title *</label>
                        <input
                          type="text"
                          required
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-sm font-medium transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-blue/50 mb-1.5 block">Category</label>
                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                          className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-sm font-medium transition-all"
                        >
                          <option value="Tradition">Tradition</option>
                          <option value="Health">Health</option>
                          <option value="Culture">Culture</option>
                          <option value="Community">Community</option>
                          <option value="Recipe">Recipe</option>
                          <option value="News">News</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-blue/50 mb-1.5 block">URL Slug</label>
                        <input
                          type="text"
                          required
                          value={editSlug}
                          onChange={(e) => setEditSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))}
                          className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-sm font-medium font-mono transition-all"
                        />
                        {editSlug !== editOriginalSlug && (
                          <div className="flex items-start gap-1.5 mt-2 p-2.5 bg-yellow-50 border border-yellow-200 rounded-xl">
                            <AlertTriangle size={14} className="text-yellow-600 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-yellow-700 leading-relaxed">
                              <strong>Warning:</strong> Changing the slug will break any existing links to <code>/blog/{editOriginalSlug}</code>.
                            </p>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-blue/50 mb-1.5 block">Author Name</label>
                        <input
                          type="text"
                          required
                          value={editAuthor}
                          onChange={(e) => setEditAuthor(e.target.value)}
                          className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-sm font-medium transition-all"
                        />
                      </div>
                    </div>
                  </StepCard>

                  {/* ── Step 2: Cover Image ── */}
                  <StepCard number={2} title="Cover Image" desc="Drag & drop, upload a file, or paste a URL">
                    <ImageUploader
                      value={editImage}
                      onChange={setEditImage}
                      label="Featured Cover Image"
                    />
                  </StepCard>

                  {/* ── Step 3: Content ── */}
                  <StepCard number={3} title="Content" desc="Short excerpt and the full article body">
                    {/* Excerpt */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-blue/50">Short Excerpt *</label>
                        <span className={`text-[10px] font-bold ${editExcerpt.length > 200 ? 'text-red-500' : 'text-brand-blue/30'}`}>
                          {editExcerpt.length}/200
                        </span>
                      </div>
                      <textarea
                        required
                        rows={2}
                        value={editExcerpt}
                        onChange={(e) => setEditExcerpt(e.target.value)}
                        placeholder="1–2 sentence hook shown on the blog card preview..."
                        className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-sm font-medium resize-none transition-all"
                      />
                    </div>

                    {/* Content Editor with toolbar */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-blue/50">Full Article Content *</label>
                        <button
                          type="button"
                          onClick={() => setShowEditPreview(!showEditPreview)}
                          className="text-[10px] font-bold text-brand-gold hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Eye size={12} />
                          {showEditPreview ? 'Hide Preview' : 'Show Preview'}
                        </button>
                      </div>
                      <ContentToolbar textareaRef={editContentRef} onInsert={handleInsertEdit} onImageUploaded={handleImageUploadedEdit} />
                      <textarea
                        ref={editContentRef}
                        required
                        rows={14}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-b-2xl focus:rounded-b-2xl outline-none text-brand-blue text-sm font-medium font-mono leading-relaxed resize-y transition-all"
                        style={{ minHeight: '300px' }}
                      />
                      <ContentStats text={editContent} />
                    </div>

                    {/* Live HTML Preview */}
                    <AnimatePresence>
                      {showEditPreview && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="border border-brand-gold/20 rounded-2xl overflow-hidden">
                            <div className="bg-brand-gold/10 px-4 py-2.5 flex items-center gap-2">
                              <Eye size={13} className="text-brand-gold" />
                              <span className="text-[10px] font-bold text-brand-blue/60 uppercase tracking-widest">Rendered Preview</span>
                            </div>
                            <div
                              className="p-5 prose prose-sm max-w-none text-brand-blue/80 leading-relaxed text-sm max-h-80 overflow-y-auto bg-white/50"
                              dangerouslySetInnerHTML={{ __html: postprocessContent(editContent, editInlineImages) || '<p class="text-brand-blue/30 italic">Your content will appear here...</p>' }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </StepCard>

                  {editStatus === 'error' && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-200 text-red-700 text-sm">
                      <AlertCircle size={20} className="shrink-0" />
                      Failed to save changes. Please check your database connection and try again.
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={editStatus === 'saving'}
                      className="flex-1 bg-brand-blue text-brand-cream py-4 rounded-2xl font-bold shadow-xl hover:bg-brand-gold hover:text-brand-blue disabled:opacity-60 transition-all text-base flex items-center justify-center gap-3 cursor-pointer"
                    >
                      {editStatus === 'saving'
                        ? <><RefreshCw className="animate-spin" size={18} /> Saving Changes...</>
                        : <><Pencil size={18} /> Save Changes</>}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setView('list'); setEditingPost(null); }}
                      className="px-8 py-4 sm:py-0 bg-brand-blue/5 border border-brand-blue/5 rounded-2xl font-bold text-brand-blue hover:bg-brand-blue/10 transition-colors text-sm cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {/* ══════════════════════════════
              ── 4. SETUP GUIDE VIEW
          ══════════════════════════════ */}
          {view === 'guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-h-[70vh] overflow-y-auto pr-0 sm:pr-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 pb-4 border-b border-brand-blue/5">
                <button onClick={() => setView('menu')} className="flex items-center gap-2 text-brand-blue/60 hover:text-brand-gold transition-colors font-bold text-xs uppercase tracking-wider cursor-pointer">
                  <ArrowLeft size={18} /> Back to Dashboard
                </button>
                <h2 className="text-xl font-display font-bold text-brand-blue">Google Sheets Setup Guide</h2>
              </div>

              <div className="space-y-8 text-sm leading-relaxed text-brand-blue/80">
                {/* Step 1 */}
                <div className="bg-gradient-to-br from-brand-gold/5 to-transparent border border-brand-gold/15 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-brand-blue text-brand-cream text-xs font-black flex items-center justify-center shrink-0">1</div>
                    <h3 className="font-bold text-base text-brand-blue">Create the Google Sheet</h3>
                  </div>
                  <p className="mb-3 text-brand-blue/70">Create a new Google Sheet and add these exact column headers in Row 1:</p>
                  <div className="flex flex-wrap gap-2">
                    {['id', 'slug', 'title', 'excerpt', 'content', 'author', 'date', 'image', 'category', 'readTime'].map(col => (
                      <code key={col} className="bg-white border border-brand-blue/10 px-2.5 py-1 rounded-lg text-xs font-bold text-brand-blue shadow-sm">{col}</code>
                    ))}
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-gradient-to-br from-brand-blue/[0.03] to-transparent border border-brand-blue/8 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-brand-blue text-brand-cream text-xs font-black flex items-center justify-center shrink-0">2</div>
                    <h3 className="font-bold text-base text-brand-blue">Add the Apps Script</h3>
                  </div>
                  <p className="mb-3 text-brand-blue/70">Open <em>Extensions → Apps Script</em> and paste the following code:</p>
                  <pre className="bg-brand-blue/5 p-4 rounded-xl text-xs overflow-x-auto border border-brand-blue/5 select-all max-h-56 font-mono leading-relaxed">
                    {`function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var jsonArray = [];
  for (var i = 1; i < data.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = data[i][j];
    }
    jsonArray.push(obj);
  }
  return ContentService.createTextOutput(JSON.stringify(jsonArray.reverse()))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var params = JSON.parse(e.postData.contents);
  if (params.action === 'createPost') {
    sheet.appendRow([
      params.id, params.slug, params.title, params.excerpt,
      params.content, params.author, params.date, params.image,
      params.category, params.readTime
    ]);
  }
  if (params.action === 'deletePost') {
    var rows = sheet.getDataRange().getValues();
    for (var i = rows.length - 1; i >= 1; i--) {
      if (String(rows[i][0]) === String(params.id)) {
        sheet.deleteRow(i + 1); break;
      }
    }
  }
  if (params.action === 'updatePost') {
    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      if (String(rows[i][0]) === String(params.id)) {
        sheet.getRange(i+1,1,1,10).setValues([[
          params.id, params.slug, params.title, params.excerpt,
          params.content, params.author, params.date, params.image,
          params.category, params.readTime
        ]]);
        break;
      }
    }
  }
  return ContentService.createTextOutput(JSON.stringify({result:"success"}))
    .setMimeType(ContentService.MimeType.JSON);
}`}
                  </pre>
                </div>

                {/* Step 3 */}
                <div className="bg-gradient-to-br from-brand-gold/5 to-transparent border border-brand-gold/15 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-brand-blue text-brand-cream text-xs font-black flex items-center justify-center shrink-0">3</div>
                    <h3 className="font-bold text-base text-brand-blue">Deploy & Connect</h3>
                  </div>
                  <ol className="space-y-2 text-xs text-brand-blue/70 list-decimal list-inside pl-1">
                    <li>In the Apps Script editor, click <strong className="text-brand-blue">Deploy → New Deployment</strong>.</li>
                    <li>Select type: <strong className="text-brand-blue">Web App</strong>.</li>
                    <li>Set <em>Execute as</em> to <strong className="text-brand-blue">Me</strong> and <em>Who has access</em> to <strong className="text-brand-blue">Anyone</strong>.</li>
                    <li>Click <strong className="text-brand-blue">Deploy</strong> and copy the Web App URL.</li>
                    <li>Paste the URL into <strong className="text-brand-blue">Database Settings</strong> in this admin panel.</li>
                  </ol>
                </div>

                <div className="flex items-start gap-3 p-4 bg-brand-blue/5 rounded-2xl border border-brand-blue/8 text-xs">
                  <Info className="text-brand-gold shrink-0 mt-0.5" size={18} />
                  <p className="text-brand-blue/70 leading-relaxed">
                    <strong className="text-brand-blue">Important:</strong> Every time you modify the Apps Script code, you must create a <strong>new deployment</strong> (not update the existing one) to apply the changes. Use the new URL each time.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════
              ── 5. DATABASE SETTINGS VIEW
          ══════════════════════════════ */}
          {view === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="text-left font-sans"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 pb-4 border-b border-brand-blue/5">
                <button onClick={() => setView('menu')} className="flex items-center gap-2 text-brand-blue/60 hover:text-brand-gold transition-colors font-bold text-xs uppercase tracking-wider cursor-pointer">
                  <ArrowLeft size={18} /> Back to Dashboard
                </button>
                <h2 className="text-xl font-display font-bold text-brand-blue">Database Settings</h2>
              </div>

              {/* Active Backend Banner */}
              <div className="flex items-start sm:items-center gap-3 p-4 mb-8 bg-green-50 border border-green-100 rounded-2xl">
                <div className="p-2 bg-green-100 rounded-xl">
                  <CloudCheck className="text-green-600" size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-green-800">Active Backend: Google Sheets CMS</p>
                  <p className="text-xs text-green-700/70 mt-0.5">All blog posts are read from and written to your Google Spreadsheet.</p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* Google Sheets URL Input */}
                <div className="bg-white border border-brand-blue/8 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-5 shadow-sm">
                  <div className="flex items-start sm:items-center gap-3 pb-4 border-b border-brand-blue/5">
                    <div className="p-2 bg-brand-gold/10 rounded-xl">
                      <List className="text-brand-gold" size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-blue text-sm">Google Apps Script Web App URL</h4>
                      <p className="text-[10px] text-brand-blue/40 mt-0.5">The public endpoint URL from your Google Apps Script deployment</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-brand-blue/50 mb-2 block">Web App Endpoint URL *</label>
                    <input
                      type="url"
                      required
                      value={googleSheetsUrl}
                      onChange={(e) => setGoogleSheetsUrl(e.target.value)}
                      placeholder="https://script.google.com/macros/s/AKfycby.../exec"
                      className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-sm font-medium transition-all"
                    />
                    <p className="text-[10px] text-brand-blue/40 mt-2 leading-relaxed">
                      <Lightbulb className="inline text-brand-gold mr-1" size={16} /> Make sure your Apps Script is deployed as a Web App with access set to <strong>"Anyone"</strong>. See the Setup Guide for step-by-step instructions.
                    </p>
                  </div>

                  {/* Quick link to guide */}
                  <button
                    type="button"
                    onClick={() => setView('guide')}
                    className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <Info size={14} />
                    View Setup Guide
                  </button>
                </div>

                {/* Test banner */}
                {testStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-2xl border text-xs flex items-start gap-3 leading-relaxed ${testStatus === 'testing' ? 'bg-brand-blue/5 border-brand-blue/10 text-brand-blue'
                        : testStatus === 'success' ? 'bg-green-50 border-green-200 text-green-800'
                          : 'bg-red-50 border-red-200 text-red-800'
                      }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {testStatus === 'testing' && <RefreshCw className="animate-spin text-brand-blue" size={18} />}
                      {testStatus === 'success' && <CheckCircle2 className="text-green-600" size={18} />}
                      {testStatus === 'error' && <AlertCircle className="text-red-600" size={18} />}
                    </div>
                    <div>
                      <h5 className="font-bold uppercase tracking-wider text-[10px]">Connection Check</h5>
                      <p className="mt-1 font-light">{testMessage}</p>
                    </div>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-brand-blue/5">
                  <button type="submit" disabled={saveStatus === 'saving' || testStatus === 'testing'}
                    className="flex-1 bg-brand-blue text-brand-cream py-4 rounded-2xl font-bold shadow-xl hover:bg-brand-gold hover:text-brand-blue disabled:opacity-60 transition-all text-sm flex items-center justify-center gap-3 cursor-pointer">
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? '✓ Settings Saved!' : <><CloudCheck size={18} /> Save Settings</>}
                  </button>
                  <button type="button" onClick={handleTestConnection} disabled={testStatus === 'testing' || saveStatus === 'saving'}
                    className="px-6 py-4 bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold font-bold rounded-2xl transition-all text-sm flex items-center justify-center gap-2 cursor-pointer border border-brand-gold/15">
                    <RefreshCw className={testStatus === 'testing' ? 'animate-spin' : ''} size={18} /> Test Connection
                  </button>
                  <button type="button" onClick={() => setView('menu')} disabled={saveStatus === 'saving'}
                    className="px-6 py-4 bg-brand-blue/5 hover:bg-brand-blue/10 text-brand-blue font-bold rounded-2xl transition-all text-sm cursor-pointer border border-brand-blue/5">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ══════════════════════════════
              ── 6. RESERVATIONS MANAGER
          ══════════════════════════════ */}
          {view === 'reservations' && (
            <motion.div
              key="reservations"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="text-left font-sans"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 pb-4 border-b border-brand-blue/5">
                <button onClick={() => setView('menu')} className="flex items-center gap-2 text-brand-blue/60 hover:text-brand-gold transition-colors font-bold text-xs uppercase tracking-wider cursor-pointer">
                  <ArrowLeft size={18} /> Back to Dashboard
                </button>
                <div className="text-center">
                  <h2 className="text-xl font-display font-bold text-brand-blue">Dining Reservations</h2>
                  {reservations.length > 0 && <p className="text-[10px] text-brand-blue/40 mt-0.5">{reservations.length} total · {pendingCount} pending</p>}
                </div>
                <button
                  onClick={loadReservations}
                  className="flex items-center gap-1.5 text-brand-blue/50 hover:text-brand-gold transition-colors text-xs font-bold cursor-pointer"
                >
                  <RefreshCw size={16} />
                  Refresh
                </button>
              </div>

              {reservations.length === 0 ? (
                <div className="text-center py-20 bg-brand-blue/5 rounded-3xl border border-brand-blue/5">
                  <List className="text-brand-blue/20 mx-auto mb-4" size={48} />
                  <h3 className="font-bold text-brand-blue text-lg">No Reservations Yet</h3>
                  <p className="text-xs text-brand-blue/50 mt-1 max-w-xs mx-auto leading-relaxed">
                    Reservations submitted via the "Book a Table" page will appear here automatically.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-0 sm:pr-2">
                  {reservations.map((res: any) => (
                    <div
                      key={res.id}
                      className={`p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border transition-all duration-300 bg-white relative hover:shadow-[0_15px_40px_rgba(15,47,74,0.08)] ${res.status === 'Confirmed' ? 'border-green-100 hover:border-green-200'
                          : res.status === 'Cancelled' ? 'border-red-100 hover:border-red-200'
                            : 'border-brand-blue/5 hover:border-brand-gold/30'
                        }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-blue/5 pb-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-brand-blue text-base">{res.name}</h4>
                            <span className="text-[10px] bg-brand-blue/5 px-2 py-0.5 rounded-full text-brand-blue/60 font-semibold uppercase tracking-wider">{res.id}</span>
                            {res.dietary === 'Strict Satvik' && (
                              <span className="text-[10px] bg-brand-gold/25 text-brand-blue font-bold px-2.5 py-0.5 rounded-full select-none">★ Strict Satvik</span>
                            )}
                          </div>
                          <div className="text-xs text-brand-blue/50 font-light mt-1 flex flex-wrap gap-x-4">
                            <span><Phone className="inline text-brand-gold mr-1" size={14} /> {res.phone}</span>
                            <span><Mail className="inline text-brand-gold mr-1" size={14} /> {res.email}</span>
                          </div>
                        </div>
                        <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${res.status === 'Confirmed' ? 'bg-green-100 text-green-700'
                            : res.status === 'Cancelled' ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {res.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-4">
                        <div>
                          <span className="text-brand-blue/40 font-semibold block">Date</span>
                          <span className="font-bold text-brand-blue mt-0.5 block">
                            {new Date(res.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <div>
                          <span className="text-brand-blue/40 font-semibold block">Time Slot</span>
                          <span className="font-bold text-brand-blue mt-0.5 block">{res.timeSlot}</span>
                        </div>
                        <div>
                          <span className="text-brand-blue/40 font-semibold block">Guests</span>
                          <span className="font-bold text-brand-blue mt-0.5 block">{res.guests} People</span>
                        </div>
                        <div>
                          <span className="text-brand-blue/40 font-semibold block">Seating</span>
                          <span className="font-bold text-brand-blue mt-0.5 block">{res.seating} Area</span>
                        </div>
                      </div>

                      {res.notes && (
                        <div className="text-xs bg-brand-cream/50 p-3 rounded-xl border border-brand-blue/5 mb-4 text-left italic text-brand-blue/70">
                          "{res.notes}"
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-brand-blue/5 pt-4">
                        <span className="text-[10px] text-brand-blue/30 font-light">Received: {res.createdAt}</span>
                        <div className="flex flex-wrap gap-2">
                          {res.status === 'Pending' && (
                            <>
                              <button onClick={() => handleUpdateReservationStatus(res.id, 'Confirmed')}
                                className="px-3.5 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer">
                                Confirm
                              </button>
                              <button onClick={() => handleUpdateReservationStatus(res.id, 'Cancelled')}
                                className="px-3.5 py-1.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-xs font-bold transition-all cursor-pointer">
                                Cancel Booking
                              </button>
                            </>
                          )}
                          {res.status !== 'Pending' && (
                            <>
                              <button
                                onClick={() => {
                                  const cleanPhone = res.phone.replace(/[^0-9]/g, '');
                                  const dateStr = new Date(res.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
                                  const text = res.status === 'Confirmed'
                                    ? `Namaste! This is Udupi Vrindavan Restaurant, Al Karama. \nYour table reservation is CONFIRMED! \n\n• Booking ID: ${res.id}\n• Date: ${dateStr}\n• Time: ${res.timeSlot}\n• Guests: ${res.guests} People\n• Seating: ${res.seating} Area\n• Preference: ${res.dietary === 'Strict Satvik' ? 'Strict Temple-Style Satvik (No Onion/Garlic)' : 'Standard Vegetarian'}\n\nWe look forward to serving you delicious, authentic Karnataka vegetarian food. \n📍 Address: Udupi Vrindavan Restaurant LLC, FB04, WASL Opal, Street 26, Al Karama, Dubai, UAE\n<Phone className="inline text-brand-gold mr-1" size={14} /> Phone: +971 42 7253 23`
                                    : `Namaste! This is Udupi Vrindavan Restaurant, Al Karama. \nRegarding your table reservation request ${res.id} on ${dateStr} at ${res.timeSlot}.\n\nWe regret to inform you that we are fully booked during this slot and had to cancel this request. We sincerely apologize for the inconvenience. \n\nPlease contact us directly at +971 42 7253 23 or reply to this message to book another slot. We would love to serve you.`;
                                  window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
                                }}
                                className="px-3 py-1.5 bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                              >
                                Notify Guest <MessageCircle size={14} />
                              </button>
                              <button onClick={() => handleUpdateReservationStatus(res.id, 'Pending')}
                                className="px-3.5 py-1.5 bg-white border border-brand-blue/10 hover:border-brand-gold text-brand-blue rounded-lg text-xs font-bold transition-all cursor-pointer">
                                Reopen
                              </button>
                            </>
                          )}
                          <button onClick={() => handleDeleteReservation(res.id)}
                            className="p-1.5 text-red-500 hover:text-white hover:bg-red-500 border border-transparent hover:border-red-500 rounded-lg transition-all cursor-pointer" title="Delete Record">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  );
};

/* ─── Menu Button Component ─── */
const MenuButton = ({ label, desc, onClick, href, icon, primary = false, internal = false }: any) => {
  const CardClass = `group w-full flex items-center justify-between gap-4 p-4 sm:p-5 rounded-[1.25rem] transition-all border text-left cursor-pointer ${primary
      ? 'bg-brand-blue text-brand-cream border-brand-blue shadow-[0_12px_35px_rgba(15,47,74,0.2)] hover:shadow-[0_20px_40px_rgba(15,47,74,0.25)]'
      : 'bg-white text-brand-blue border-brand-blue/5 shadow-sm hover:shadow-[0_10px_30px_rgba(15,47,74,0.08)] hover:border-brand-gold/30'
    }`;

  const InnerContent = (
    <>
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className={`p-3 rounded-2xl transition-colors shrink-0 ${primary ? 'bg-white/10 shadow-inner' : 'bg-brand-gold/10 shadow-inner shadow-brand-gold/20'}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-[17px] font-bold font-display leading-tight">{label}</div>
          <div className={`text-[11px] mt-1 font-medium ${primary ? 'text-brand-cream/70' : 'text-brand-blue/50'}`}>{desc}</div>
        </div>
      </div>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:scale-110 shrink-0 ${primary ? 'bg-brand-gold/20 text-brand-gold' : 'bg-brand-blue/5 text-brand-blue/50 group-hover:bg-brand-gold/10 group-hover:text-brand-gold'}`}>
        <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={16} />
      </div>
    </>
  );

  if (href) {
    return (
      <motion.a href={href} target={internal ? '_self' : '_blank'} rel="noopener noreferrer"
        whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className={CardClass}>
        {InnerContent}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className={CardClass}>
      {InnerContent}
    </motion.button>
  );
};

export default BlogAdmin;
