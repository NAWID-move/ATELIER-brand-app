import React, { useState } from 'react';
import { TopNav } from './components/TopNav';
import { InputStudio } from './components/InputStudio';
import { BriefView } from './components/BriefView';
import { PresentationDeck } from './components/PresentationDeck';
import { TactileMoodboard } from './components/TactileMoodboard';
import { JsonViewer } from './components/JsonViewer';
import { INITIAL_BRIEF, CLIENT_PRESETS } from './data/presets';
import { CreativeBrief, ClientIdeaPreset } from './types/brief';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [brief, setBrief] = useState<CreativeBrief>(INITIAL_BRIEF);
  const [activeTab, setActiveTab] = useState<'brief' | 'deck' | 'materials' | 'json'>('brief');
  const [activePresetId, setActivePresetId] = useState<string>('komorebi');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async (params: {
    prompt: string;
    brandNameHint?: string;
    archetypeHint?: string;
    focusIndustry?: string;
  }) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/generate-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.brief) {
        setBrief(data.brief);
        // Switch to creative brief tab to reveal results immediately
        setActiveTab('brief');
      } else {
        throw new Error('Invalid response structure received.');
      }
    } catch (err: any) {
      console.error('Failed to generate creative brief:', err);
      setErrorMsg('Could not connect to generator engine. Using synthesized brand architecture.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (preset: ClientIdeaPreset) => {
    setActivePresetId(preset.id);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#141413] flex flex-col font-sans-clean antialiased selection:bg-[#141413] selection:text-[#F7F5F0]">
      
      {/* Top Bar Contract (Screen Only) */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPrint={handlePrint}
      />

      {/* Input & Ideation Studio (Screen Only) */}
      <InputStudio
        onGenerate={handleGenerate}
        isLoading={isLoading}
        activePresetId={activePresetId}
        onSelectPreset={handleSelectPreset}
      />

      {/* Error notification banner if any */}
      {errorMsg && (
        <div className="max-w-7xl mx-auto px-6 pt-4 w-full no-print">
          <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-xs uppercase tracking-wider font-mono-code text-amber-800 hover:text-amber-950 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Content Workspace */}
      <main className="grow max-w-7xl mx-auto px-6 py-12 w-full">
        {activeTab === 'brief' && (
          <BriefView
            brief={brief}
            onGoToDeck={() => setActiveTab('deck')}
            onGoToJson={() => setActiveTab('json')}
          />
        )}

        {activeTab === 'deck' && (
          <PresentationDeck
            brief={brief}
            onPrint={handlePrint}
          />
        )}

        {activeTab === 'materials' && (
          <TactileMoodboard
            brief={brief}
          />
        )}

        {activeTab === 'json' && (
          <JsonViewer
            brief={brief}
          />
        )}
      </main>

      {/* Hidden Print Container: Automatically renders all 5 deck slides during window.print() */}
      <div className="hidden print-only">
        <PresentationDeck brief={brief} onPrint={handlePrint} />
      </div>

      {/* Archival Editorial Footer */}
      <footer className="mt-auto border-t hairline-border bg-white py-8 no-print">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-serif-display font-medium text-[#141413] tracking-widest uppercase">
              ATELIER
            </span>
            <span>·</span>
            <span>Brand Strategy & Creative Direction Studio</span>
          </div>

          <div className="flex items-center gap-6">
            <span>High-Contrast Minimalist Brutalism</span>
            <span>·</span>
            <span>A4 Landscape PDF Ready</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
