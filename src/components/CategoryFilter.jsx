import React from 'react';
import { CATEGORIES } from '../data/mockData';

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="py-3 sm:py-4 overflow-x-auto no-scrollbar touch-pan-x overscroll-x-contain">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-max px-1 pb-1">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition duration-200 cursor-pointer select-none active:scale-95 ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/25 scale-102'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-xs'
              }`}
            >
              <span className="text-base sm:text-lg shrink-0">{cat.icon}</span>
              <span className="whitespace-nowrap">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
