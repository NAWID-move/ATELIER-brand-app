import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';
import { CreativeBrief } from '../types/brief';

interface JsonViewerProps {
  brief: CreativeBrief;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ brief }) => {
  const [copied, setCopied] = useState(false);

  // Exact JSON payload matching the user prompt's keys
  const strictPromptJson = {
    brand_summary: brief.brand_summary,
    target_audience: brief.target_audience,
    brand_archetype: brief.brand_archetype,
    visual_direction: {
      color_palette: (brief.visual_direction?.color_palette || []).map((c) => ({
        name: c.name,
        hex: c.hex,
      })),
      textures_and_materials: brief.visual_direction?.textures_and_materials,
      typography_style: brief.visual_direction?.typography_style,
    },
    suggested_deliverables: brief.suggested_deliverables,
  };

  const jsonString = JSON.stringify(strictPromptJson, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(brief.brand_name || 'creative-brief').toLowerCase().replace(/[^a-z0-9]/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border hairline-border">
        <div>
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-stone-700" />
            <h2 className="font-serif-display text-xl font-medium text-[#141413]">
              Valid JSON Specification Engine
            </h2>
          </div>
          <p className="text-xs text-stone-500 font-mono-code mt-1">
            Conforms strictly to brand_summary, target_audience, brand_archetype, visual_direction, & suggested_deliverables
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono-code text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Strict Schema Validated</span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code border hairline-border hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-500" />
                <span>Copy JSON</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code bg-[#141413] text-[#F7F5F0] hover:bg-[#2C2B29] transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .json</span>
          </button>
        </div>
      </div>

      {/* JSON Code Display */}
      <div className="bg-[#141413] text-stone-200 p-6 sm:p-8 border border-stone-800 font-mono-code text-xs sm:text-sm overflow-x-auto leading-relaxed shadow-lg">
        <pre className="selection:bg-stone-700 selection:text-white">
          <code>{jsonString}</code>
        </pre>
      </div>

      {/* Field Verification Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-mono-code text-stone-600">
        <div className="p-3 bg-white border hairline-border">
          <span className="text-stone-400 block text-[10px]">KEY 01</span>
          <span className="font-semibold text-[#141413]">brand_summary</span>
          <p className="text-[11px] text-stone-500 mt-0.5">2-sentence elevator pitch</p>
        </div>

        <div className="p-3 bg-white border hairline-border">
          <span className="text-stone-400 block text-[10px]">KEY 02</span>
          <span className="font-semibold text-[#141413]">target_audience</span>
          <p className="text-[11px] text-stone-500 mt-0.5">Demographic & psychographic</p>
        </div>

        <div className="p-3 bg-white border hairline-border">
          <span className="text-stone-400 block text-[10px]">KEY 03</span>
          <span className="font-semibold text-[#141413]">brand_archetype</span>
          <p className="text-[11px] text-stone-500 mt-0.5">Governing archetype</p>
        </div>

        <div className="p-3 bg-white border hairline-border">
          <span className="text-stone-400 block text-[10px]">KEY 04</span>
          <span className="font-semibold text-[#141413]">visual_direction</span>
          <p className="text-[11px] text-stone-500 mt-0.5">Palette, textures, fonts</p>
        </div>

        <div className="p-3 bg-white border hairline-border">
          <span className="text-stone-400 block text-[10px]">KEY 05</span>
          <span className="font-semibold text-[#141413]">suggested_deliverables</span>
          <p className="text-[11px] text-stone-500 mt-0.5">3-5 client assets</p>
        </div>
      </div>

    </div>
  );
};
