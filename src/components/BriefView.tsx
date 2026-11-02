import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Sparkles, Layers, Box, Type, Compass, Target, ArrowUpRight } from 'lucide-react';
import { CreativeBrief } from '../types/brief';

interface BriefViewProps {
  brief: CreativeBrief;
  onGoToDeck: () => void;
  onGoToJson: () => void;
}

export const BriefView: React.FC<BriefViewProps> = ({ brief, onGoToDeck, onGoToJson }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(identifier);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const palette = brief.visual_direction?.color_palette || [];

  return (
    <div className="space-y-16">
      
      {/* Editorial Header & Marquee */}
      <div className="border-b hairline-border pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-stone-500 uppercase tracking-widest mb-2">
              <span>EXECUTIVE CREATIVE BRIEF</span>
              <span aria-hidden="true">·</span>
              <span>CONFIDENTIAL</span>
              <span aria-hidden="true">·</span>
              <span>TACTILE LUXURY STRATEGY</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#141413] leading-none text-balance">
              {brief.brand_name || 'BRAND IDENTITY BRIEF'}
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0 no-print">
            <button
              onClick={onGoToDeck}
              className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium text-[#141413] border hairline-border-strong hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <span>View Client Deck</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onGoToJson}
              className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium text-stone-600 hover:text-[#141413] transition-colors cursor-pointer"
            >
              <span className="font-mono-code">{'{}'} Inspect JSON</span>
            </button>
          </div>
        </div>

        {brief.core_value_proposition && (
          <div className="mt-8 pt-6 border-t hairline-border">
            <span className="text-xs uppercase tracking-widest font-mono-code text-stone-500 block mb-2">
              Core Value Proposition
            </span>
            <p className="font-serif-editorial text-xl sm:text-2xl italic font-normal text-stone-900 leading-relaxed max-w-4xl">
              &ldquo;{brief.core_value_proposition}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* 01. Brand Summary & Elevator Pitch */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3">
          <span className="text-xs uppercase tracking-widest font-mono-code text-stone-500 block">
            01 / STRATEGY
          </span>
          <h2 className="font-serif-display text-xl font-medium text-[#141413] mt-1">
            Brand Summary
          </h2>
          <p className="text-xs text-stone-500 mt-2 font-mono-code leading-relaxed">
            2-Sentence Executive Elevator Pitch
          </p>
        </div>

        <div className="lg:col-span-9 bg-white p-8 sm:p-10 border hairline-border shadow-xs">
          <p className="font-serif-editorial text-lg sm:text-xl text-[#1C1917] leading-relaxed max-w-3xl first-letter:text-5xl first-letter:font-serif-display first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#141413]">
            {brief.brand_summary}
          </p>
        </div>
      </section>

      {/* 02. Target Audience Profile */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t hairline-border pt-12">
        <div className="lg:col-span-3">
          <span className="text-xs uppercase tracking-widest font-mono-code text-stone-500 block">
            02 / MARKET
          </span>
          <h2 className="font-serif-display text-xl font-medium text-[#141413] mt-1">
            Target Audience
          </h2>
          <p className="text-xs text-stone-500 mt-2 font-mono-code leading-relaxed">
            Demographic & Psychographic Architecture
          </p>
        </div>

        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 border hairline-border">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-stone-700" />
              <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#141413] font-semibold">
                Strategic Profile & Mindset
              </h3>
            </div>
            <p className="text-sm font-sans-clean text-stone-700 leading-relaxed">
              {brief.target_audience}
            </p>
          </div>

          <div className="bg-[#FAF9F6] p-8 border hairline-border flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono-code uppercase tracking-wider text-stone-500 block mb-3">
                Core Psychological Drivers
              </span>
              <ul className="space-y-3 text-xs text-stone-700">
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-code text-stone-400">01.</span>
                  <span><strong>Discreet Provenance:</strong> Desires quiet verification over loud luxury logos.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-code text-stone-400">02.</span>
                  <span><strong>Sensory Sanctuary:</strong> Seeks tactile relief from hyper-digital noise.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-code text-stone-400">03.</span>
                  <span><strong>Clinical Organic Integrity:</strong> Demands verifiable bio-potency without compromise.</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6 pt-4 border-t border-stone-200 text-xs font-mono-code text-stone-500">
              Target Household Income: $160k+ · Urban & Cultural Hubs
            </div>
          </div>
        </div>
      </section>

      {/* 03. Brand Archetype */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t hairline-border pt-12">
        <div className="lg:col-span-3">
          <span className="text-xs uppercase tracking-widest font-mono-code text-stone-500 block">
            03 / IDENTITY
          </span>
          <h2 className="font-serif-display text-xl font-medium text-[#141413] mt-1">
            Brand Archetype
          </h2>
          <p className="text-xs text-stone-500 mt-2 font-mono-code leading-relaxed">
            Psychological Persona & Tone of Voice
          </p>
        </div>

        <div className="lg:col-span-9 bg-white p-8 sm:p-10 border hairline-border">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b hairline-border">
            <div>
              <span className="text-xs font-mono-code uppercase tracking-wider text-stone-500 block">
                Primary Governing Archetype
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#141413] mt-1 font-semibold">
                {brief.brand_archetype}
              </h3>
            </div>
            <div className="text-xs font-mono-code text-stone-500">
              Role: Curatorial Transformation & Quiet Authority
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <div>
              <span className="text-xs font-mono-code uppercase tracking-wider text-stone-500 block mb-1">
                Core Motivation
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                Unveiling purity through rigorous botanical study, organic restraint, and elevating everyday skin rituals into meditative art.
              </p>
            </div>
            <div>
              <span className="text-xs font-mono-code uppercase tracking-wider text-stone-500 block mb-1">
                Tone of Voice
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                Austere, poetic, deeply scientific yet warm; never hurried, sensational, or sales-driven.
              </p>
            </div>
            <div>
              <span className="text-xs font-mono-code uppercase tracking-wider text-stone-500 block mb-1">
                Shadow To Avoid
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                Inaccessible elitism, clinical coldness, or generic wellness clichés like "radiate from within".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Visual Direction Suite */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t hairline-border pt-12">
        <div className="lg:col-span-3">
          <span className="text-xs uppercase tracking-widest font-mono-code text-stone-500 block">
            04 / AESTHETICS
          </span>
          <h2 className="font-serif-display text-xl font-medium text-[#141413] mt-1">
            Visual Direction
          </h2>
          <p className="text-xs text-stone-500 mt-2 font-mono-code leading-relaxed">
            Palette, Materials, & Typography
          </p>
        </div>

        <div className="lg:col-span-9 space-y-8">
          
          {/* Color Palette Swatches */}
          <div className="bg-white p-8 border hairline-border">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono-code uppercase tracking-wider text-[#141413] font-semibold">
                Color Palette // 60-30-10 Disciplinary Split
              </span>
              <span className="text-xs font-mono-code text-stone-400">
                Click swatch to copy hex code
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {palette.map((color, idx) => {
                const isCopied = copiedHex === color.hex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => copyToClipboard(color.hex, color.hex)}
                    className="group text-left p-3 border hairline-border hover:border-stone-400 transition-all bg-[#FAF9F6] cursor-pointer"
                  >
                    <div
                      className="w-full h-24 mb-3 border border-black/10 relative flex items-center justify-center transition-transform group-hover:scale-[1.02]"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span className={`text-[10px] uppercase font-mono-code px-2 py-0.5 rounded-none ${
                        color.hex.toLowerCase() === '#f7f5f0' || color.hex.toLowerCase() === '#f4f1ea' || color.hex.toLowerCase() === '#ffffff'
                          ? 'bg-black/80 text-white'
                          : 'bg-white/90 text-black'
                      }`}>
                        {isCopied ? 'Copied!' : color.hex}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="font-serif-editorial text-sm font-semibold text-[#141413] truncate">
                        {color.name}
                      </p>
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-800 transition-colors" />
                      )}
                    </div>
                    {color.description && (
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-tight font-sans-clean">
                        {color.description}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Textures and Physical Materials */}
          <div className="bg-white p-8 border hairline-border">
            <div className="flex items-center gap-2 mb-4">
              <Box className="w-4 h-4 text-stone-700" />
              <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#141413] font-semibold">
                Textures & Physical Materials // Packaging Specs
              </h3>
            </div>
            <p className="text-sm font-sans-clean text-stone-800 leading-relaxed mb-6">
              {brief.visual_direction.textures_and_materials}
            </p>

            {/* Tactile Material Simulation Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t hairline-border">
              <div className="p-4 bg-[#F5F2EB] border hairline-border">
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-stone-500 block mb-1">
                  Cardstock
                </span>
                <p className="font-serif-editorial text-sm font-semibold text-stone-900">
                  350gsm Gmund Cotton Paper
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Uncoated deckle edges, subtle tooth, blind debossed typography.
                </p>
              </div>

              <div className="p-4 bg-[#EBE7DF] border hairline-border">
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-stone-500 block mb-1">
                  Vessel Closures
                </span>
                <p className="font-serif-editorial text-sm font-semibold text-stone-900">
                  Cold-Cast Mineral Limestone
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Matte stone weight, natural grain variations, thermal coolness.
                </p>
              </div>

              <div className="p-4 bg-[#232321] text-stone-200 border border-stone-800">
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-stone-400 block mb-1">
                  Glassware
                </span>
                <p className="font-serif-editorial text-sm font-semibold text-white">
                  Smoked Borosilicate Flacons
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  UV-filtering deep amber & charcoal tint, heavy sham base.
                </p>
              </div>
            </div>
          </div>

          {/* Typography Style Recommendation & Live Specimen */}
          <div className="bg-white p-8 border hairline-border">
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-4 h-4 text-stone-700" />
              <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#141413] font-semibold">
                Typography Pairing Specimen
              </h3>
            </div>
            
            <p className="text-sm font-sans-clean text-stone-800 leading-relaxed mb-6">
              {brief.visual_direction.typography_style}
            </p>

            <div className="p-6 bg-[#FAF9F6] border hairline-border space-y-4">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-stone-500 block mb-1">
                  Primary Display Serif // Bodoni Moda / Cormorant Garamond
                </span>
                <h4 className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#141413]">
                  The Architecture of Botanical Restoration.
                </h4>
              </div>

              <div className="pt-3 border-t hairline-border">
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-stone-500 block mb-1">
                  Secondary Body Sans // Plus Jakarta Sans / DM Sans
                </span>
                <p className="font-sans-clean text-xs sm:text-sm text-stone-700 leading-relaxed max-w-2xl">
                  Formulated at sub-zero temperatures using wild-harvested macro-botanicals. Every formulation is bottled in small medicinal batches under sterile inert gas to preserve bioactive cellular potency.
                </p>
              </div>

              <div className="pt-2 border-t hairline-border flex items-center gap-6 text-[11px] font-mono-code text-stone-500">
                <span>Display: 400 Regular / 600 SemiBold</span>
                <span>·</span>
                <span>Body: 400 Book / 500 Medium</span>
                <span>·</span>
                <span>Figures: Tabular Numerals</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 05. Suggested Deliverables */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t hairline-border pt-12 pb-8">
        <div className="lg:col-span-3">
          <span className="text-xs uppercase tracking-widest font-mono-code text-stone-500 block">
            05 / SCOPE
          </span>
          <h2 className="font-serif-display text-xl font-medium text-[#141413] mt-1">
            Deliverables
          </h2>
          <p className="text-xs text-stone-500 mt-2 font-mono-code leading-relaxed">
            Essential Strategic & Visual Assets
          </p>
        </div>

        <div className="lg:col-span-9 bg-white p-8 border hairline-border">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono-code uppercase tracking-wider text-[#141413] font-semibold">
              Strategic Asset Roadmap ({brief.suggested_deliverables?.length || 0} Key Milestones)
            </span>
            <span className="text-xs font-mono-code text-stone-500">
              Scope Priority: Phase 1 Launch
            </span>
          </div>

          <div className="divide-y hairline-border">
            {(brief.suggested_deliverables || []).map((deliverable, idx) => (
              <div key={idx} className="py-4 flex items-start sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  <span className="font-mono-code text-xs text-stone-400 mt-0.5 sm:mt-0">
                    0{idx + 1}.
                  </span>
                  <div>
                    <p className="font-serif-editorial text-base font-semibold text-[#141413]">
                      {deliverable}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5 font-sans-clean">
                      Specification: Production-ready high-contrast asset with vector master files and material notes.
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono-code text-stone-600 bg-[#F7F5F0] px-2.5 py-1 border hairline-border shrink-0">
                  Deliverable
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
