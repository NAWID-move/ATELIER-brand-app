import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
});

// Creative Brief Generation Endpoint
app.post('/api/generate-brief', async (req, res) => {
  try {
    const { prompt, brandNameHint, archetypeHint, focusIndustry } = req.body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'Please provide client notes or ideas to analyze.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        
        const systemPrompt = `You are an elite brand strategist and creative director.
Your job is to take unstructured, messy ideas from clients and transform them into a comprehensive, highly structured creative brief.
Analyze the user's input and extract the core value proposition. If details are missing, infer them based on market trends for premium brands.
Emphasize high-contrast, minimalist aesthetics, and tactile concepts (e.g., wabi-sabi, earthy textures, quiet luxury, high-end organic skincare and wellness) where appropriate.

You must output exclusively in valid JSON format with the following keys:
- "brand_summary": A 2-sentence elevator pitch.
- "target_audience": Primary demographic and psychographic profile.
- "brand_archetype": E.g., The Creator, The Sage, The Explorer, The Alchemist.
- "visual_direction": An object with:
    "color_palette": Suggest 3-4 specific hex codes with descriptive names (e.g., deep umbers, forest greens, matte whites) as an array of objects: [{"name": "...", "hex": "#...", "description": "..."}].
    "textures_and_materials": Suggested physical textures for packaging or web design (e.g., limestone, uncoated cotton paper, matte glass, raw cold-cast ceramics).
    "typography_style": A recommendation for font pairings (e.g., a serif display with a clean geometric sans-serif).
- "suggested_deliverables": A list of 3-5 assets the client will likely need (e.g., UI/UX prototype, primary logo, packaging layout, tactile brand guidelines).

Also include:
- "brand_name": A suggested refined brand name or extracted name.
- "core_value_proposition": A concise 1-sentence statement of the brand's fundamental transformation or promise.`;

        const userMessage = `Client notes / unstructured raw input:
"""
${prompt}
"""
${brandNameHint ? `Brand name / working title hint: ${brandNameHint}` : ''}
${archetypeHint ? `Preferred archetype preference: ${archetypeHint}` : ''}
${focusIndustry ? `Domain context: ${focusIndustry}` : ''}

Generate the complete elite creative brief in valid JSON. Return ONLY the JSON object.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userMessage,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
            temperature: 0.4,
          },
        });

        const rawText = response.text?.trim() || '{}';
        const parsed = JSON.parse(rawText);

        return res.json({
          brief: parsed,
          source: 'gemini',
        });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, using heuristic synthesizer:', geminiError?.message || geminiError);
        // Fall back gracefully to synthesized brief
      }
    }

    // High-quality fallback synthesis if no API key or error
    const fallbackBrief = generateSynthesizedBrief(prompt, brandNameHint, archetypeHint, focusIndustry);
    return res.json({
      brief: fallbackBrief,
      source: 'synthesizer',
    });
  } catch (error: any) {
    console.error('Error generating creative brief:', error);
    return res.status(500).json({
      error: 'Failed to generate creative brief. Please try again.',
      details: error?.message,
    });
  }
});

function generateSynthesizedBrief(prompt: string, brandNameHint?: string, archetypeHint?: string, focusIndustry?: string) {
  const lower = prompt.toLowerCase();
  
  let brandName = brandNameHint || 'KOMOREBI // BOTANICALS';
  if (!brandNameHint) {
    if (lower.includes('marine') || lower.includes('kelp') || lower.includes('sea')) {
      brandName = 'AETHEL // MARINE PEPTIDES';
    } else if (lower.includes('ritual') || lower.includes('clay') || lower.includes('ceramic') || lower.includes('bath')) {
      brandName = 'VESPER // MINERAL LAB';
    } else if (lower.includes('arnica') || lower.includes('apothecary') || lower.includes('resin')) {
      brandName = 'SOMA // WILD HARVEST';
    }
  }

  const archetype = archetypeHint || (lower.includes('science') || lower.includes('cellular') ? 'The Sage / The Alchemist' : 'The Creator');

  return {
    brand_name: brandName,
    core_value_proposition: 'Regenerating the skin barrier through cold-pressed bioactive botanicals and quiet, mindful cellular rituals.',
    brand_summary: `${brandName} is a restorative skincare sanctuary uniting ancestral wild-harvested botanicals with low-temperature bio-fermentation. By rejecting hyper-processed synthetics and sensory overload, the brand delivers quiet luxury through tactile, earthy formulations that honor natural chronobiology.`,
    target_audience: 'Discerning aesthetic purists (ages 28–52) seeking radical ingredient transparency, wabi-sabi tactile design, and clinically substantiated organic alchemy. They value architectural minimalism, sustainable craftsmanship, and ritualistic self-preservation over transient beauty trends.',
    brand_archetype: archetype,
    visual_direction: {
      color_palette: [
        { name: 'Soot Black', hex: '#141413', description: 'Deep grounding ink for high-contrast typography and razor hairline borders' },
        { name: 'Warm Alabaster', hex: '#F7F5F0', description: 'Raw archival paper background evoking tactile cold-press fibers' },
        { name: 'Lichen Moss', hex: '#2A3C30', description: 'Deep sub-alpine botanical evergreen accent denoting cellular vitality' },
        { name: 'Limestone Umber', hex: '#8C5B3E', description: 'Earthy mineral terracotta undertone honoring raw ceramic apothecary vessels' }
      ],
      textures_and_materials: 'Uncoated 350gsm Gmund cotton cardstock with deckle edges and blind letterpress debossing; heavy-bottomed smoked borosilicate glass flacons with raw matte cold-cast limestone closures; natural soy-wax sealed outer shippers.',
      typography_style: 'A high-contrast display serif (Bodoni Moda / Cormorant Garamond) for commanding architectural editorial headlines paired with a clean, low-contrast humanist sans-serif (Plus Jakarta Sans) for effortless technical clarity.'
    },
    suggested_deliverables: [
      'Primary Architectural Wordmark & Blind-Embossed Monogram',
      'Tactile Glassware Packaging Suite (30ml Serum Pipette & 50ml Cold-Cast Jar)',
      'Uncoated Paper Brand Guidelines Book & Material Spec Sheet',
      'Minimalist Digital Atelier E-Commerce Experience & Custom Typography Hierarchy',
      'Artisanal Unboxing Protocol & Sustainability Provenance Seals'
    ]
  };
}

// Dev vs Production server wiring
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, port: Number(PORT), host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Atelier Brand Studio running on http://localhost:${PORT}`);
  });
}

startServer();
