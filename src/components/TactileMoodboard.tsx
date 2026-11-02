import React, { useState } from 'react';
import { Layers, Sparkles, Copy, Check, Eye, Package, Sliders, ShieldCheck } from 'lucide-react';
import { CreativeBrief } from '../types/brief';

interface TactileMoodboardProps {
  brief: CreativeBrief;
}

export const TactileMoodboard: React.FC<TactileMoodboardProps> = ({ brief }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const palette = brief.visual_direction?.color_palette || [];

  return (
    <div className="space-y-12">
      
      {/* Intro Header */}
      <div className="border-b hairline-border pb-6">
        <span className="text-xs font-mono-code uppercase tracking-widest text-stone-500 block mb-1">
          TACTILE PHILOSOPHY & MATERIAL SPECIFICATION
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#141413]">
          Wabi-Sabi Aesthetics & Material Honesty
        </h2>
        <p className="text-sm text-stone-600 font-sans-clean mt-2 max-w-2xl leading-relaxed">
          Quiet luxury is tactile. In a digital world of frictionless glass screens, ultra-premium brands earn reverence through physical weight, deliberate imperfections, toothy unbleached papers, and raw mineral textures.
        </p>
      </div>

      {/* 4 Tactile Material Specimens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Specimen 1: Uncoated Cotton Deckle Paper */}
        <div className="bg-[#FAF8F5] p-6 border hairline-border flex flex-col justify-between">
          <div>
            <div className="w-full h-32 mb-4 bg-[#F2EDE4] border border-stone-300 relative flex flex-col items-center justify-center p-4 text-center overflow-hidden">
              {/* Paper grain visual pattern */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#141413_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="relative z-10 border border-stone-400/80 px-3 py-1.5 bg-[#FAF8F5]/90">
                <span className="font-serif-editorial text-xs italic tracking-widest uppercase text-stone-800">
                  Deckle Edge 350gsm
                </span>
              </div>
            </div>
            
            <span className="text-[10px] font-mono-code uppercase tracking-widest text-stone-500 block">
              MATERIAL SPEC 01
            </span>
            <h3 className="font-serif-display text-lg font-semibold text-[#141413] mt-0.5">
              Raw Cotton Paper
            </h3>
            <p className="text-xs text-stone-600 mt-2 font-sans-clean leading-relaxed">
              FSC-certified, unbleached cotton fibers with natural rag inclusions. Blind debossed wordmarks and blind foil stamp details.
            </p>
          </div>

          <div className="mt-6 pt-3 border-t hairline-border text-[11px] font-mono-code text-stone-500 flex justify-between">
            <span>FINISH: Matte Tooth</span>
            <span>WEIGHT: 350 GSM</span>
          </div>
        </div>

        {/* Specimen 2: Cold-Cast Limestone Ceramics */}
        <div className="bg-[#FAF8F5] p-6 border hairline-border flex flex-col justify-between">
          <div>
            <div className="w-full h-32 mb-4 bg-[#E2DCD2] border border-stone-300 relative flex flex-col items-center justify-center p-4 text-center">
              <div className="w-16 h-16 rounded-full border border-stone-400 bg-[#D4CDBC] shadow-inner flex items-center justify-center">
                <span className="text-[9px] font-mono-code text-stone-700">MINERAL</span>
              </div>
            </div>

            <span className="text-[10px] font-mono-code uppercase tracking-widest text-stone-500 block">
              MATERIAL SPEC 02
            </span>
            <h3 className="font-serif-display text-lg font-semibold text-[#141413] mt-0.5">
              Cold-Cast Limestone
            </h3>
            <p className="text-xs text-stone-600 mt-2 font-sans-clean leading-relaxed">
              Molded stone dust and ceramic binder. Creates cool-to-touch weighted vessel closures that age gracefully over time.
            </p>
          </div>

          <div className="mt-6 pt-3 border-t hairline-border text-[11px] font-mono-code text-stone-500 flex justify-between">
            <span>DENSITY: 2.4 g/cm³</span>
            <span>TACTILITY: Cool Stone</span>
          </div>
        </div>

        {/* Specimen 3: Smoked Borosilicate Glass */}
        <div className="bg-[#FAF8F5] p-6 border hairline-border flex flex-col justify-between">
          <div>
            <div className="w-full h-32 mb-4 bg-[#1E1E1C] border border-stone-800 relative flex flex-col items-center justify-center p-4 text-center">
              <div className="w-12 h-20 border-2 border-stone-600/70 bg-[#2C2C28]/60 backdrop-blur-xs flex items-center justify-center">
                <span className="text-[9px] font-mono-code text-stone-400">UV SHIELD</span>
              </div>
            </div>

            <span className="text-[10px] font-mono-code uppercase tracking-widest text-stone-500 block">
              MATERIAL SPEC 03
            </span>
            <h3 className="font-serif-display text-lg font-semibold text-[#141413] mt-0.5">
              Smoked Borosilicate Glass
            </h3>
            <p className="text-xs text-stone-600 mt-2 font-sans-clean leading-relaxed">
              Medical-grade thermal glass with deep charcoal amber tinting. Shields delicate botanical actives from UV degradation.
            </p>
          </div>

          <div className="mt-6 pt-3 border-t hairline-border text-[11px] font-mono-code text-stone-500 flex justify-between">
            <span>BASE: Heavy Sham</span>
            <span>PROTECTION: 99.8% UV</span>
          </div>
        </div>

        {/* Specimen 4: Volcanic Basalt & Cork */}
        <div className="bg-[#FAF8F5] p-6 border hairline-border flex flex-col justify-between">
          <div>
            <div className="w-full h-32 mb-4 bg-[#2A2624] border border-stone-800 relative flex flex-col items-center justify-center p-4 text-center">
              <div className="w-14 h-14 bg-[#191716] border border-stone-700 transform rotate-45 flex items-center justify-center">
                <span className="transform -rotate-45 text-[8px] font-mono-code text-stone-400">ORGANIC</span>
              </div>
            </div>

            <span className="text-[10px] font-mono-code uppercase tracking-widest text-stone-500 block">
              MATERIAL SPEC 04
            </span>
            <h3 className="font-serif-display text-lg font-semibold text-[#141413] mt-0.5">
              Basalt Mineral & Agglomerate
            </h3>
            <p className="text-xs text-stone-600 mt-2 font-sans-clean leading-relaxed">
              Crushed volcanic stone and compressed natural cork seals. Zero plastic, 100% compostable outer secondary packaging.
            </p>
          </div>

          <div className="mt-6 pt-3 border-t hairline-border text-[11px] font-mono-code text-stone-500 flex justify-between">
            <span>CIRCULAR: 100%</span>
            <span>SOURCE: Volcanic</span>
          </div>
        </div>

      </div>

      {/* Color Contrast & Chromatic Calibration */}
      <div className="bg-white p-8 border hairline-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-widest text-stone-500 block">
              CHROMATIC CALIBRATION
            </span>
            <h3 className="font-serif-display text-xl font-medium text-[#141413]">
              High-Contrast Palettes & WCAG AA Precision
            </h3>
          </div>
          <span className="text-xs font-mono-code text-stone-500">
            60-30-10 Disciplinary Distribution
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {palette.map((color, idx) => (
            <div key={idx} className="p-4 border hairline-border bg-[#FAF9F6] space-y-3">
              <div
                className="w-full h-20 border border-black/10 flex items-center justify-center cursor-pointer transition-transform hover:scale-[1.01]"
                style={{ backgroundColor: color.hex }}
                onClick={() => copyHex(color.hex)}
                title="Click to copy hex"
              >
                <span className={`text-[10px] font-mono-code uppercase px-2 py-0.5 ${
                  color.hex.toLowerCase() === '#f7f5f0' || color.hex.toLowerCase() === '#ffffff'
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                }`}>
                  {copiedHex === color.hex ? 'COPIED' : color.hex}
                </span>
              </div>

              <div>
                <p className="font-serif-editorial text-sm font-semibold text-[#141413]">
                  {color.name}
                </p>
                <p className="text-xs text-stone-500 mt-1 font-sans-clean leading-normal">
                  {color.description || 'Curated brand pigment'}
                </p>
              </div>

              <div className="pt-2 border-t hairline-border flex items-center justify-between text-[10px] font-mono-code text-stone-500">
                <span>ROLE: {idx === 0 ? 'Canvas' : idx === 1 ? 'Surface' : idx === 2 ? 'Accent' : 'Grounding'}</span>
                <span>HEX: {color.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
