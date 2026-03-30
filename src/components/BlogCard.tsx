import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types/blog';
import DOMPurify from 'dompurify';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group bg-white border border-brand-blue/5 rounded-lg overflow-hidden hover:shadow-lg hover:border-brand-gold/30 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-blue/5">
        <img
          src={post.image}
          alt={post.title.replace(/<[^>]*>/g, '')}
          loading="lazy"
          width="400"
          height="250"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Category Badge - using brand colors */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-brand-gold text-brand-blue text-xs font-bold rounded-full shadow-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-brand-blue/40 text-xs mb-3 font-medium">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-brand-gold" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-brand-gold" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title - using Garet font */}
        <h3 className="text-xl font-display font-bold text-brand-blue mb-3 group-hover:text-brand-gold transition-colors line-clamp-2">
          <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.title) }} />
        </h3>

        {/* Excerpt */}
        <p className="text-brand-blue/60 text-sm leading-relaxed mb-5 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-brand-blue/5">
          <span className="text-xs text-brand-blue/40">
            By <span className="text-brand-blue/70 font-medium">{post.author}</span>
          </span>
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-brand-gold text-sm font-medium hover:gap-2 transition-all"
          >
            Read More <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;