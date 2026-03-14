'use client';
import React from 'react';
import { Search } from 'lucide-react';

interface HomeSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearchClick: () => void; // Add this prop to handle the click
}

export const HomeSearch = ({ searchTerm, setSearchTerm, onSearchClick }: HomeSearchProps) => {

  // This function will now be called on button click or Enter press
  const handleSearch = () => {
    onSearchClick();
  };

  return (
    <div className="w-full relative z-10 -mt-8">
      <div className="flex flex-row flex-nowrap items-stretch bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden mx-4 md:mx-auto max-w-3xl">
        
        <div className="flex-grow flex items-center min-w-0">
          <Search className="ml-4 md:ml-6 text-gray-400 shrink-0" size={18} />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search ID, shape, style..."
            className="w-full p-4 md:p-6 text-[10px] md:text-xs uppercase tracking-[0.2em] outline-none text-black font-medium placeholder:text-gray-300 min-w-0"
          />
        </div>

        <button 
          onClick={handleSearch}
          className="bg-[#C0C0C0] hover:bg-[#d4af37] text-black hover:text-white px-6 md:px-12 flex items-center justify-center transition-all duration-300 shrink-0 group">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] group-hover:scale-105 transition-transform">
            Search
          </span>
        </button>
      </div>
    </div>
  );
};