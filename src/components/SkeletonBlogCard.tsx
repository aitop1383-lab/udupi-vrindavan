import React from 'react';

const SkeletonBlogCard = () => {
  return (
    <div className="bg-white border border-brand-blue/5 rounded-lg overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col h-full">
      {/* Image container skeleton */}
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-blue/5 border-b border-brand-blue/5">
        <div className="w-full h-full shimmer" />
        {/* Category badge placeholder */}
        <div className="absolute top-4 left-4 w-16 h-5 rounded-full border border-brand-gold/10 shimmer-gold" />
      </div>

      {/* Content wrapper */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta Info placeholders */}
        <div className="flex gap-4 mb-4">
          <div className="h-3 w-20 rounded shimmer" />
          <div className="h-3 w-16 rounded shimmer" />
        </div>

        {/* Title placeholders */}
        <div className="space-y-2 mb-4">
          <div className="h-5 w-full rounded shimmer" />
          <div className="h-5 w-4/5 rounded shimmer" />
        </div>

        {/* Excerpt placeholders */}
        <div className="space-y-2 mb-6 flex-grow">
          <div className="h-3.5 w-full rounded shimmer" />
          <div className="h-3.5 w-[95%] rounded shimmer" />
          <div className="h-3.5 w-2/3 rounded shimmer" />
        </div>

        {/* Footer placeholder */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-brand-blue/5">
          <div className="h-3.5 w-24 rounded shimmer" />
          <div className="h-3.5 w-16 rounded shimmer-gold" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonBlogCard;