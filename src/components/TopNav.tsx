import React from 'react';
import { Printer, Sparkles, FileText, LayoutGrid, Code2, SlidersHorizontal } from 'lucide-react';

interface TopNavProps {
  activeTab: 'brief' | 'deck' | 'materials' | 'json';
  setActiveTab: (tab: 'brief' | 'deck' | 'materials' | 'json') => void;
  onPrint: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ activeTab, setActiveTab, onPrint }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-b hairline-border no-print">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('brief')}
            className="text-left group cursor-pointer focus-visible:outline-none"
          >
            <span className="font-serif-display text-xl tracking-[0.2em] font-medium text-[#141413] uppercase">
              ATELIER
            </span>
          </button>
          <span className="text-stone-300 font-light text-sm hidden sm:inline">|</span>
          <span className="text-xs tracking-widest uppercase text-stone-500 font-mono-code hidden sm:inline">
            Creative Strategy & Brief Studio
          </span>
        </div>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('brief')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'brief'
                ? 'text-[#141413] border-[#141413] font-semibold'
                : 'text-stone-500 border-transparent hover:text-[#141413]'
            }`}
          >
            01. Creative Brief
          </button>

          <button
            onClick={() => setActiveTab('deck')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'deck'
                ? 'text-[#141413] border-[#141413] font-semibold'
                : 'text-stone-500 border-transparent hover:text-[#141413]'
            }`}
          >
            02. Client Deck
          </button>

          <button
            onClick={() => setActiveTab('materials')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'materials'
                ? 'text-[#141413] border-[#141413] font-semibold'
                : 'text-stone-500 border-transparent hover:text-[#141413]'
            }`}
          >
            03. Tactile Moodboard
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'json'
                ? 'text-[#141413] border-[#141413] font-semibold'
                : 'text-stone-500 border-transparent hover:text-[#141413]'
            }`}
          >
            04. Raw JSON Brief
          </button>
        </nav>

        {/* Zone 3: 1 primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onPrint}
            title="Export full printable PDF presentation deck"
            className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium text-[#F7F5F0] bg-[#141413] hover:bg-[#2A2927] transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export Client PDF</span>
          </button>
        </div>

      </div>
    </header>
  );
};
