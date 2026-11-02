import { ClientIdeaPreset, CreativeBrief } from '../types/brief';

export const CLIENT_PRESETS: ClientIdeaPreset[] = [
  {
    id: 'komorebi',
    title: 'Komorebi // Forest Cellular Alchemy',
    tagline: 'Wild Hinoki wood, snow mushroom beta-glucans, sub-zero fermentation',
    industry: 'High-End Sustainable Skincare',
    archetype: 'The Alchemist / The Sage',
    rawNotes: `Client brainstorm notes:
- Want to start an ultra-premium organic skincare line based on ancient Japanese forest bathing (shinrin-yoku).
- Key active ingredients: wild-harvested Hinoki cypress oil, fermented snow mushroom (tremella) for deep cellular hydration, reishi mushroom, cedarwood extract.
- The vibe should be wabi-sabi, ultra quiet luxury, not commercial or clinical looking.
- Maybe packaging should feel like stone or raw ceramic? Heavy bottles, frosted matte dark amber or smoked glass.
- Price point is high ($120 - $280). Target is design-conscious buyers who hate flashy logos, love brutalist architecture, Aesop, Byredo, but want clean organic certification.
- Need a 2-sentence pitch, who the exact buyer is, archetype, visual rules with hex codes, textures to use, and what deliverables we should design first (packaging, web prototype, logo, etc.).`,
  },
  {
    id: 'aethel',
    title: 'Aethel // Abyssal Marine Peptides',
    tagline: 'Nordic cold-water kelp, basalt minerals, cellular barrier restoration',
    industry: 'High-End Regenerative Biotech Skincare',
    archetype: 'The Sage / The Creator',
    rawNotes: `Client input notes:
- We harvest wild macro-algae and deep-sea mineral brine from the Norwegian fjords at 400m depth.
- Core concept: Marine bio-peptides that repair damaged lipid barriers without endocrine disruptors or synthetic emulsifiers.
- Brand feel: Monochromatic Nordic brutalism. Raw cold ocean, basalt rock, sea foam white, deep abyss ink.
- Textures: Cold cast limestone lids, frosted ocean-tumbled heavy glass, uncoated sea-mineral infused paper boxes.
- Deliverables: Primary wordmark with blind debossed symbol, 30ml dropper bottle layout, digital atelier e-commerce prototype, and physical sample unboxing kit.`,
  },
  {
    id: 'soma',
    title: 'Soma // Biodynamic Alpine Apothecary',
    tagline: 'Wild alpine arnica, cold-pressed meadowfoam, unrefined tree resins',
    industry: 'Holistic Organic Wellness & Body Oils',
    archetype: 'The Caregiver / The Explorer',
    rawNotes: `Client scratchpad:
- Family farm in the Swiss Engadin valley, certified Demeter biodynamic.
- We produce small-batch cold-infused body elixirs with wild arnica, St. John's wort, pine resin, and elderberry seed oil.
- People use it for nervous system regulation, lymphatic drainage, and restorative sleep rituals.
- Need high-contrast luxury positioning: raw earth, terracotta, dark pine green, tactile cotton deckle-edge labels, wax-dipped cork closures.
- How do we present this to luxury hotel spas and high-net-worth wellness clients without sounding like an amateur hippie brand?`,
  },
  {
    id: 'vesper',
    title: 'Vesper // Volcanic Bath & Spatial Rituals',
    tagline: 'Basalt micro-exfoliation, thermal sulphur salts, obsidian body tools',
    industry: 'Tactile Wellness & Sanctuary Care',
    archetype: 'The Ruler / The Creator',
    rawNotes: `Unstructured notes from founder:
- Creating a bath sanctuary and body therapy brand using volcanic minerals, Icelandic black sand, and therapeutic thermal clay.
- Want the aesthetic to look like an art gallery or Peter Zumthor thermal bath architecture.
- Heavy obsidian stone body tools, textured volcanic pumice soap blocks, matte charcoal stoneware canisters.
- We need a bulletproof creative brief: brand elevator pitch, exact audience profile, color palette with hex values, physical packaging textures, typography pairing, and deliverables list.`,
  },
];

export const INITIAL_BRIEF: CreativeBrief = {
  brand_name: 'KOMOREBI // FOREST CELLULAR ALCHEMY',
  core_value_proposition: 'Restoring cellular vitality through wild-harvested Japanese forest botanicals and meditative wabi-sabi rituals.',
  brand_summary: 'Komorebi is an ultra-premium restorative skincare sanctuary uniting ancestral wild-harvested Hinoki cypress with cold-biofermented snow mushroom beta-glucans. By rejecting synthetic fillers and sensory overstimulation, the brand provides architectural quiet luxury and cellular barrier renewal for the mindful purist.',
  target_audience: 'Aesthetic connoisseurs and wellness purists (ages 28–52) earning $140k+ who prioritize radical ingredient provenance, brutalist tactile design, and clinically substantiated organic alchemy. They gravitate toward quiet luxury, architectural living spaces, and intentional daily rituals over fleeting beauty fads.',
  brand_archetype: 'The Alchemist / The Sage',
  visual_direction: {
    color_palette: [
      { name: 'Soot Black', hex: '#121211', description: 'Deep grounding ink for high-contrast architectural typography and razor hairline borders' },
      { name: 'Warm Alabaster', hex: '#F7F5F0', description: 'Uncoated cotton paper canvas evoking tactile cold-press deckle fibers' },
      { name: 'Hinoki Lichen', hex: '#26382C', description: 'Deep sub-canopy forest green honoring wild cypress and moss resilience' },
      { name: 'Raw Limestone', hex: '#875C41', description: 'Warm mineral umber accent reflecting cold-cast ceramic apothecary flacons' }
    ],
    textures_and_materials: 'Uncoated 350gsm Gmund cotton cardstock with deckle edges and blind letterpress debossing; heavy-bottomed smoked borosilicate glass flacons with raw matte cold-cast limestone closures; natural soy-wax sealed outer shippers.',
    typography_style: 'A commanding editorial display serif (Bodoni Moda / Cormorant Garamond) with razor hairline contrast paired with a clean, low-contrast humanist sans-serif (Plus Jakarta Sans) for technical clarity.'
  },
  suggested_deliverables: [
    'Primary Architectural Wordmark & Blind-Embossed Monogram Seal',
    'Tactile Glassware Packaging Suite (30ml Serum Pipette & 50ml Cold-Cast Jar)',
    'Uncoated Paper Brand Guidelines Book & Material Spec Sheet',
    'Minimalist Digital Atelier E-Commerce Experience & Custom Typography Hierarchy',
    'Artisanal Unboxing Protocol & Sustainability Provenance Seals'
  ]
};
