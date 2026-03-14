'use client';
import React from 'react';
import { Loader } from 'lucide-react';

interface LoadMoreProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading?: boolean;
}

export const LoadMore = ({ onLoadMore, hasMore, isLoading = false }: LoadMoreProps) => {
  if (!hasMore) return null;

  return (
    <div className="w-full flex justify-center py-10">
      <button 
        onClick={onLoadMore} 
        disabled={isLoading}
        className="bg-[#1a1a1a] text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-colors disabled:opacity-50 flex items-center gap-4"
      >
        {isLoading && <Loader className="animate-spin" size={16}/>}
        {isLoading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
};