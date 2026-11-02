import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Printer, Sparkles, Box, Type, Layers, CheckCircle2, Maximize2 } from 'lucide-react';
import { CreativeBrief } from '../types/brief';

interface PresentationDeckProps {
  brief: CreativeBrief;
  onPrint: () => void;
}

export const PresentationDeck: React.FC<PresentationDeckProps> = ({ brief, onPrint }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slideTitles = [
    '01. Cover & Executive Thesis',
    '02. Strategy & Target Audience',
    '03. Brand Archetype & Persona',
    '04. Visual Identity & Tactile Direction',
    '05. Strategic Deliverables Scope',
  ];

  const palette = brief.visual_direction?.color_palette || [];

  return (
    <div className="space-y-8">
      
      {/* Deck Controls (Screen Only) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border hairline-border shadow-xs no-print">
        <div className="flex items-center gap-3">
          <span className="font-mono-code text-xs uppercase tracking-widest text-stone-500 font-semibold">
            Client Presentation Deck
          </span>
          <span className="text-stone-300">|</span>
          <span className="font-mono-code text-xs text-stone-700">
            Slide {currentSlide + 1} of {totalSlides} · {slideTitles[currentSlide]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Slide dots */}
          <div className="flex items-center gap-1.5 mr-3">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`w-6 h-1.5 transition-all cursor-pointer ${
                  currentSlide === idx ? 'bg-[#141413]' : 'bg-stone-200 hover:bg-stone-400'
                }`}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
            disabled={currentSlide === 0}
            className="p-2 border hairline-border hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4 text-[#141413]" />
          </button>

          <button
            type="button"
            onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))}
            disabled={currentSlide === totalSlides - 1}
            className="p-2 border hairline-border hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4 text-[#141413]" />
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="flex items-center gap-2 ml-2 px-3.5 py-2 text-xs uppercase tracking-wider font-semibold bg-[#141413] text-[#F7F5F0] hover:bg-[#2C2B29] transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Deck (PDF)</span>
          </button>
        </div>
      </div>

      {/* Interactive Presentation Deck Slide (Screen Display) */}
      <div className="no-print">
        <div className="min-h-[580px] bg-white p-8 sm:p-14 border hairline-border-strong relative flex flex-col justify-between shadow-sm">
          
          {/* Top Running Header */}
          <div className="flex items-center justify-between border-b hairline-border pb-4 mb-8 text-xs font-mono-code text-stone-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="font-serif-display tracking-widest text-[#141413] font-semibold">ATELIER</span>
              <span>·</span>
              <span>CONFIDENTIAL BRAND SPECIFICATION</span>
            </div>
            <div>
              SLIDE {currentSlide + 1} / {totalSlides}
            </div>
          </div>

          {/* Slide Content Dynamic Switcher */}
          <div className="grow flex flex-col justify-center">
            
            {/* Slide 1: Cover & Thesis */}
            {currentSlide === 0 && (
              <div className="py-6 space-y-8">
                <div className="inline-block border border-stone-800 px-3 py-1 text-[11px] font-mono-code uppercase tracking-widest text-stone-800">
                  CREATIVE STRATEGY & VISUAL SPECIFICATION // 2026
                </div>

                <div className="space-y-4">
                  <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#141413] leading-none text-balance">
                    {brief.brand_name || 'KOMOREBI // BOTANICALS'}
                  </h1>
                  <p className="font-serif-editorial text-2xl sm:text-3xl italic text-stone-700 max-w-3xl">
                    &ldquo;{brief.core_value_proposition}&rdquo;
                  </p>
                </div>

                <div className="pt-8 border-t hairline-border grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono-code text-stone-600">
                  <div>
                    <span className="text-stone-400 block mb-1">CLIENT DOMAIN</span>
                    <span className="font-medium text-[#141413]">High-End Organic Skincare & Wellness</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-1">STRATEGIC POSTURE</span>
                    <span className="font-medium text-[#141413]">Minimalist Brutalism & Tactile Craft</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-1">PREPARED BY</span>
                    <span className="font-medium text-[#141413]">Atelier Creative Direction</span>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 2: Strategy & Target Audience */}
            {currentSlide === 1 && (
              <div className="py-4 space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-widest font-mono-code text-stone-500 block mb-1">
                    EXECUTIVE STRATEGY
                  </span>
                  <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#141413]">
                    Core Proposition & Target Audience
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-7 bg-[#FAF9F6] p-8 border hairline-border">
                    <span className="text-xs font-mono-code uppercase tracking-widest text-stone-500 block mb-3">
                      Elevator Thesis
                    </span>
                    <p className="font-serif-editorial text-xl sm:text-2xl text-stone-900 leading-relaxed">
                      {brief.brand_summary}
                    </p>
                  </div>

                  <div className="md:col-span-5 p-8 border hairline-border bg-white space-y-4">
                    <span className="text-xs font-mono-code uppercase tracking-widest text-stone-500 block">
                      Audience Profile & Psychographics
                    </span>
                    <p className="text-sm font-sans-clean text-stone-700 leading-relaxed">
                      {brief.target_audience}
                    </p>
                    <div className="pt-4 border-t hairline-border text-xs font-mono-code text-stone-500">
                      Discerning Aesthetic Purists · Wabi-Sabi Sensibility
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 3: Brand Archetype & Persona */}
            {currentSlide === 2 && (
              <div className="py-4 space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-widest font-mono-code text-stone-500 block mb-1">
                    PSYCHOLOGICAL FOUNDATION
                  </span>
                  <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#141413]">
                    Archetypal Resonance & Tone of Voice
                  </h2>
                </div>

                <div className="bg-[#FAF9F6] p-8 sm:p-10 border hairline-border">
                  <span className="text-xs font-mono-code uppercase tracking-widest text-stone-500 block mb-2">
                    Primary Archetype
                  </span>
                  <h3 className="font-serif-display text-3xl sm:text-5xl font-medium text-[#141413]">
                    {brief.brand_archetype}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t hairline-border">
                    <div>
                      <span className="text-xs font-mono-code uppercase tracking-wider text-stone-500 block mb-1.5">
                        Brand Voice
                      </span>
                      <p className="text-sm text-stone-700 font-sans-clean leading-relaxed">
                        Quiet authority, deeply researched botanical precision, poetic stillness without marketing hyperbole.
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-mono-code uppercase tracking-wider text-stone-500 block mb-1.5">
                        Client Experience
                      </span>
                      <p className="text-sm text-stone-700 font-sans-clean leading-relaxed">
                        An intimate daily sanctuary; physical objects crafted as architectural decor rather than disposable consumer goods.
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-mono-code uppercase tracking-wider text-stone-500 block mb-1.5">
                        Core Value Pillar
                      </span>
                      <p className="text-sm text-stone-700 font-sans-clean leading-relaxed">
                        Radical material honesty, unhurried fermentation processes, and regenerative respect for living ecosystems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 4: Visual Identity & Tactile Direction */}
            {currentSlide === 3 && (
              <div className="py-4 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest font-mono-code text-stone-500 block mb-1">
                    AESTHETIC SPECIFICATION
                  </span>
                  <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#141413]">
                    Color Swatches, Textures, & Typography
                  </h2>
                </div>

                {/* Swatch row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {palette.map((color, idx) => (
                    <div key={idx} className="p-3 bg-[#FAF9F6] border hairline-border">
                      <div
                        className="w-full h-16 mb-2 border border-black/10 flex items-center justify-center text-[10px] font-mono-code"
                        style={{ backgroundColor: color.hex }}
                      >
                        <span className={`px-1.5 py-0.5 ${
                          color.hex.toLowerCase() === '#f7f5f0' || color.hex.toLowerCase() === '#ffffff'
                            ? 'bg-black/80 text-white'
                            : 'bg-white/90 text-black'
                        }`}>
                          {color.hex}
                        </span>
                      </div>
                      <p className="font-serif-editorial text-sm font-semibold text-[#141413] truncate">
                        {color.name}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Materials & Typography Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-6 bg-white border hairline-border">
                    <span className="text-xs font-mono-code uppercase tracking-widest text-stone-500 block mb-2">
                      Tactile Physical Materials
                    </span>
                    <p className="text-sm text-stone-800 font-sans-clean leading-relaxed">
                      {brief.visual_direction.textures_and_materials}
                    </p>
                  </div>

                  <div className="p-6 bg-white border hairline-border">
                    <span className="text-xs font-mono-code uppercase tracking-widest text-stone-500 block mb-2">
                      Typography Hierarchy
                    </span>
                    <p className="text-sm text-stone-800 font-sans-clean leading-relaxed">
                      {brief.visual_direction.typography_style}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 5: Strategic Deliverables Scope */}
            {currentSlide === 4 && (
              <div className="py-4 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest font-mono-code text-stone-500 block mb-1">
                    EXECUTION ROADMAP
                  </span>
                  <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#141413]">
                    Suggested Strategic Deliverables
                  </h2>
                </div>

                <div className="bg-[#FAF9F6] p-6 sm:p-8 border hairline-border divide-y hairline-border">
                  {(brief.suggested_deliverables || []).map((item, idx) => (
                    <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono-code text-xs text-stone-400">0{idx + 1}.</span>
                        <span className="font-serif-editorial text-base font-semibold text-[#141413]">
                          {item}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono-code text-stone-600 bg-white px-2.5 py-1 border hairline-border shrink-0">
                        Phase 1 Scope
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Running Footer */}
          <div className="flex items-center justify-between border-t hairline-border pt-4 mt-8 text-xs font-mono-code text-stone-400">
            <span>ATELIER CREATIVE DIRECTOR SYSTEM</span>
            <span>HIGH-CONTRAST MINIMALIST BRUTALISM // CONFIDENTIAL</span>
          </div>

        </div>
      </div>

      {/* FULL PRINTABLE DECK (PRINT-ONLY) — Sequentially renders all 5 slides with page-breaks */}
      <div className="hidden print-only space-y-8">
        
        {/* Print Slide 1: Cover */}
        <div className="print-deck-card p-12 flex flex-col justify-between page-break-after">
          <div className="border-b-2 border-black pb-4 text-xs font-mono-code uppercase tracking-widest flex justify-between">
            <span>ATELIER // CONFIDENTIAL CREATIVE BRIEF</span>
            <span>SLIDE 01 / 05</span>
          </div>
          <div className="py-16 space-y-8">
            <h1 className="font-serif-display text-6xl font-medium text-black">
              {brief.brand_name || 'KOMOREBI // BOTANICALS'}
            </h1>
            <p className="font-serif-editorial text-3xl italic text-neutral-800">
              &ldquo;{brief.core_value_proposition}&rdquo;
            </p>
          </div>
          <div className="border-t-2 border-black pt-4 grid grid-cols-3 gap-6 text-xs font-mono-code">
            <div>DOMAIN: High-End Sustainable Skincare</div>
            <div>AESTHETIC: High-Contrast Minimalist Brutalism</div>
            <div>DATE: November 2026</div>
          </div>
        </div>

        {/* Print Slide 2: Strategy */}
        <div className="print-deck-card p-12 flex flex-col justify-between page-break-after">
          <div className="border-b-2 border-black pb-4 text-xs font-mono-code uppercase tracking-widest flex justify-between">
            <span>EXECUTIVE STRATEGY & TARGET AUDIENCE</span>
            <span>SLIDE 02 / 05</span>
          </div>
          <div className="py-10 space-y-8">
            <div>
              <span className="font-mono-code text-xs uppercase tracking-widest text-neutral-600 block mb-2">01. Elevator Pitch</span>
              <p className="font-serif-editorial text-2xl leading-relaxed text-black">
                {brief.brand_summary}
              </p>
            </div>
            <div className="pt-6 border-t border-neutral-300">
              <span className="font-mono-code text-xs uppercase tracking-widest text-neutral-600 block mb-2">02. Target Audience Architecture</span>
              <p className="font-sans-clean text-base text-neutral-800 leading-relaxed">
                {brief.target_audience}
              </p>
            </div>
          </div>
          <div className="border-t-2 border-black pt-4 text-xs font-mono-code">
            CONFIDENTIAL CLIENT PRESENTATION
          </div>
        </div>

        {/* Print Slide 3: Archetype */}
        <div className="print-deck-card p-12 flex flex-col justify-between page-break-after">
          <div className="border-b-2 border-black pb-4 text-xs font-mono-code uppercase tracking-widest flex justify-between">
            <span>BRAND ARCHETYPE & RESONANCE</span>
            <span>SLIDE 03 / 05</span>
          </div>
          <div className="py-10 space-y-8">
            <div>
              <span className="font-mono-code text-xs uppercase tracking-widest text-neutral-600 block mb-2">Primary Archetype</span>
              <h2 className="font-serif-display text-5xl font-medium text-black">
                {brief.brand_archetype}
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-6 border-t border-neutral-300 text-sm">
              <div>
                <strong>Brand Voice:</strong> Quiet authority, botanical rigor, poetic minimalism.
              </div>
              <div>
                <strong>Client Experience:</strong> Tactile sensory sanctuary, ritualistic barrier recovery.
              </div>
              <div>
                <strong>Material Standard:</strong> Zero plastic packaging, raw limestone and borosilicate glass.
              </div>
            </div>
          </div>
          <div className="border-t-2 border-black pt-4 text-xs font-mono-code">
            CONFIDENTIAL CLIENT PRESENTATION
          </div>
        </div>

        {/* Print Slide 4: Visual Direction */}
        <div className="print-deck-card p-12 flex flex-col justify-between page-break-after">
          <div className="border-b-2 border-black pb-4 text-xs font-mono-code uppercase tracking-widest flex justify-between">
            <span>VISUAL DIRECTION & TACTILE SYSTEM</span>
            <span>SLIDE 04 / 05</span>
          </div>
          <div className="py-8 space-y-8">
            <div className="grid grid-cols-4 gap-4">
              {palette.map((c, i) => (
                <div key={i} className="border border-black p-3">
                  <div className="h-16 w-full border border-black/20 mb-2" style={{ backgroundColor: c.hex }} />
                  <div className="font-bold text-xs">{c.name}</div>
                  <div className="font-mono-code text-xs">{c.hex}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-neutral-300 text-sm">
              <div>
                <strong className="block mb-2 font-mono-code text-xs uppercase tracking-widest">Tactile Materials:</strong>
                <p>{brief.visual_direction.textures_and_materials}</p>
              </div>
              <div>
                <strong className="block mb-2 font-mono-code text-xs uppercase tracking-widest">Typography Style:</strong>
                <p>{brief.visual_direction.typography_style}</p>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-black pt-4 text-xs font-mono-code">
            CONFIDENTIAL CLIENT PRESENTATION
          </div>
        </div>

        {/* Print Slide 5: Deliverables */}
        <div className="print-deck-card p-12 flex flex-col justify-between">
          <div className="border-b-2 border-black pb-4 text-xs font-mono-code uppercase tracking-widest flex justify-between">
            <span>STRATEGIC ASSET DELIVERABLES</span>
            <span>SLIDE 05 / 05</span>
          </div>
          <div className="py-8 space-y-4">
            {(brief.suggested_deliverables || []).map((item, idx) => (
              <div key={idx} className="p-4 border border-black flex justify-between items-center text-base">
                <span className="font-serif-editorial font-bold">0{idx + 1}. {item}</span>
                <span className="font-mono-code text-xs">Phase 1 Execution</span>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-black pt-4 text-xs font-mono-code">
            ATELIER // END OF SPECIFICATION
          </div>
        </div>

      </div>

    </div>
  );
};
