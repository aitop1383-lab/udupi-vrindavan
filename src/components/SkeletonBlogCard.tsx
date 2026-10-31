import React from 'react';

const SkeletonBlogCard = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-brand-blue/5">
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-blue/5">
        <div className="h-full w-full shimmer" />
        <div className="absolute left-4 top-4 h-5 w-16 rounded-full shimmer-gold" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-4 flex gap-4">
          <div className="h-3 w-20 rounded shimmer" />
          <div className="h-3 w-16 rounded shimmer" />
        </div>
        <div className="mb-4 space-y-2">
          <div className="h-5 w-full rounded shimmer" />
          <div className="h-5 w-4/5 rounded shimmer" />
        </div>
        <div className="mb-6 flex-grow space-y-2">
          <div className="h-3.5 w-full rounded shimmer" />
          <div className="h-3.5 w-[95%] rounded shimmer" />
          <div className="h-3.5 w-2/3 rounded shimmer" />
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-brand-blue/5 pt-5">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-full shimmer" />
            <div className="h-3.5 w-24 rounded shimmer" />
          </div>
          <div className="h-3.5 w-16 rounded shimmer-gold" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonBlogCard;
