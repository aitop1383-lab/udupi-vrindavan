import React from 'react';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types/blog';
import DOMPurify from 'dompurify';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const isLogo = post.image === '/logo.png';
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-brand-blue/5 shadow-[0_20px_45px_-32px_rgba(15,47,74,0.45)] transition-all duration-500 hover:-translate-y-1.5 hover:ring-brand-gold/40 hover:shadow-[0_30px_60px_-30px_rgba(15,47,74,0.5)]"
    >
      {/* Image */}
      <div className={`relative aspect-[16/10] overflow-hidden ${isLogo ? 'bg-brand-blue' : 'bg-brand-sand'}`}>
        <img
          src={post.image}
          alt={post.title.replace(/<[^>]*>/g, '')}
          loading="lazy"
          width="400"
          height="250"
          onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
          className={`h-full w-full transition-transform duration-700 group-hover:scale-105 ${isLogo ? 'object-contain p-10' : 'object-cover'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-blue shadow-sm">
          {post.category}
        </span>
        <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-white text-brand-blue opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium text-brand-blue/45">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-brand-bronze" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-brand-bronze" />
            {post.readTime}
          </span>
        </div>

        <h3 className="mb-3 line-clamp-2 text-xl leading-snug text-brand-blue transition-colors group-hover:text-brand-bronze">
          <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.title) }} />
        </h3>

        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-brand-blue/60">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-brand-blue/5 pt-5">
          <span className="flex items-center gap-2.5 text-xs text-brand-blue/45">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-blue font-display text-[11px] font-bold text-brand-gold">
              {post.author.charAt(0)}
            </span>
            <span>
              By <span className="font-medium text-brand-blue/75">{post.author}</span>
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-bronze transition-all group-hover:gap-2.5">
            Read More <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
