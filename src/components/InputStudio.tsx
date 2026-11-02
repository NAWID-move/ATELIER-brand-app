import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, BookOpen, Layers, Feather } from 'lucide-react';
import { CLIENT_PRESETS } from '../data/presets';
import { ClientIdeaPreset } from '../types/brief';

interface InputStudioProps {
  onGenerate: (params: {
    prompt: string;
    brandNameHint?: string;
    archetypeHint?: string;
    focusIndustry?: string;
  }) => Promise<void>;
  isLoading: boolean;
  activePresetId?: string;
  onSelectPreset: (preset: ClientIdeaPreset) => void;
}

export const InputStudio: React.FC<InputStudioProps> = ({
  onGenerate,
  isLoading,
  activePresetId,
  onSelectPreset,
}) => {
  const [prompt, setPrompt] = useState(CLIENT_PRESETS[0].rawNotes);
  const [brandHint, setBrandHint] = useState('KOMOREBI');
  const [selectedArchetype, setSelectedArchetype] = useState('The Alchemist / The Sage');
  const [tactileFocus, setTactileFocus] = useState('Wabi-sabi ceramics & 350gsm cotton paper');

  const archetypes = [
    'The Alchemist / The Sage',
    'The Creator',
    'The Ruler (Quiet Luxury)',
    'The Caregiver',
    'The Explorer',
  ];

  const tactileOptions = [
    'Wabi-sabi ceramics & 350gsm cotton paper',
    'Cold-cast limestone & smoked glass',
    'Uncoated sea-mineral deckle paper',
    'Basalt stone & amber apothecary glass',
  ];

  const handlePresetClick = (preset: ClientIdeaPreset) => {
    onSelectPreset(preset);
    setPrompt(preset.rawNotes);
    setBrandHint(preset.title.split('//')[0].trim());
    setSelectedArchetype(preset.archetype);
  };

  const handleClear = () => {
    setPrompt('');
    setBrandHint('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    onGenerate({
      prompt,
      brandNameHint: brandHint.trim() || undefined,
      archetypeHint: selectedArchetype,
      focusIndustry: `High-End Sustainable Skincare & Wellness (Focus: ${tactileFocus})`,
    });
  };

  return (
    <section className="bg-white border-b hairline-border no-print">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Curated Presets Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-widest font-mono-code text-stone-500">
              Curated High-End Client Notes & Scenarios
            </span>
            <span className="text-xs text-stone-400">
              Select a preset or paste messy notes below
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CLIENT_PRESETS.map((preset) => {
              const isSelected = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className={`text-left p-3.5 transition-all cursor-pointer border ${
                    isSelected
                      ? 'border-[#141413] bg-[#F7F5F0] ring-1 ring-[#141413]'
                      : 'border-stone-200 hover:border-stone-400 bg-white'
                  }`}
                >
                  <p className="font-serif-editorial text-sm font-semibold text-[#141413] truncate">
                    {preset.title}
                  </p>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {preset.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="client-notes" className="text-xs uppercase tracking-widest font-mono-code text-[#141413] font-semibold">
                Client Notes & Raw Brainstorm Fragments
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-stone-400 hover:text-stone-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear Input</span>
                </button>
              </div>
            </div>

            <textarea
              id="client-notes"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Paste unstructured notes, founder brainstorms, ingredient lists, target demographics, aesthetic keywords, or packaging musings..."
              rows={5}
              className="w-full p-4 text-sm font-sans-clean bg-[#FAF9F6] border border-stone-300 focus:border-[#141413] focus:bg-white focus:outline-none transition-colors leading-relaxed placeholder:text-stone-400"
            />
          </div>

          {/* Strategic Levers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs uppercase tracking-widest font-mono-code text-stone-500 mb-1.5">
                Brand Name / Working Title
              </label>
              <input
                type="text"
                value={brandHint}
                onChange={(e) => setBrandHint(e.target.value)}
                placeholder="e.g., KOMOREBI, AETHEL, SOMA"
                className="w-full px-3 py-2 text-xs font-mono-code bg-[#FAF9F6] border border-stone-300 focus:border-[#141413] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-mono-code text-stone-500 mb-1.5">
                Archetype Bias
              </label>
              <select
                value={selectedArchetype}
                onChange={(e) => setSelectedArchetype(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-stone-300 focus:border-[#141413] focus:outline-none text-stone-800 cursor-pointer"
              >
                {archetypes.map((arch) => (
                  <option key={arch} value={arch}>
                    {arch}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-mono-code text-stone-500 mb-1.5">
                Tactile Material Lens
              </label>
              <select
                value={tactileFocus}
                onChange={(e) => setTactileFocus(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-stone-300 focus:border-[#141413] focus:outline-none text-stone-800 cursor-pointer"
              >
                {tactileOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <div className="text-xs text-stone-500 flex items-center gap-2">
              <span className="font-mono-code">MODE:</span>
              <span>Gemini 3.8 Flash + Quiet Luxury Intelligence Engine</span>
            </div>

            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className={`flex items-center gap-3 px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer ${
                isLoading || !prompt.trim()
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : 'bg-[#141413] text-[#F7F5F0] hover:bg-[#2C2B29] shadow-md'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-stone-400 border-t-white rounded-full animate-spin" />
                  <span>Synthesizing Strategy...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Synthesize Creative Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};
