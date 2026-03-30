import React from 'react';
import { motion } from 'framer-motion';

const SkeletonBlogCard = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
      <div className="p-6">
        <div className="flex gap-4 mb-4">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonBlogCard;