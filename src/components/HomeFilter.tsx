"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronRight } from 'lucide-react';

interface HomeFilterProps {
  initialSearchTerm?: string;
}

export const HomeFilter = ({ initialSearchTerm = "" }: HomeFilterProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [category, setCategory] = useState("Anelli"); // Default to "Anelli" which maps to /rings

  const handleExplore = () => {
    let path = "/";
    switch (category) {
      case "Anelli":
        path = "/rings";
        break;
      case "Orecchini":
        // Coming soon
        break;
      case "Pendenti":
        // Coming soon
        break;
    }

    const query = new URLSearchParams();
    if (searchTerm) {
      query.set("search", searchTerm);
    }
    
    // Only redirect if the category is "Anelli"
    if (path === "/rings") {
        router.push(`${path}?${query.toString()}`);
    } else {
        alert("Questa categoria non è ancora disponibile.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
        {/* Search Input */}
        <div className="flex-1 flex items-center border border-gray-200 p-4">
          <Search size={18} className="text-[#d4af37] mr-4" />
          <input 
            type="text" 
            placeholder="Cerca per modello o ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none text-sm uppercase tracking-widest font-light"
          />
        </div>

        {/* Category Select */}
        <div className="flex-1 p-4 flex items-center justify-between border border-gray-200">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Scegli Categoria</span>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none text-xs font-bold uppercase bg-transparent"
          >
            <option>Anelli</option>
            <option>Orecchini</option>
            <option>Pendenti</option>
          </select>
        </div>

        {/* Explore Button */}
        <button 
          onClick={handleExplore}
          className="bg-[#1a1a1a] text-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#d4af37] transition-colors flex items-center justify-center gap-2"
        >
          Esplora <ChevronRight size={14} />
        </button>
    </div>
  );
};
