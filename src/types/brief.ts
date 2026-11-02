export interface ColorSwatch {
  name: string;
  hex: string;
  description?: string;
}

export interface VisualDirection {
  color_palette: ColorSwatch[];
  textures_and_materials: string;
  typography_style: string;
}

export interface CreativeBrief {
  brand_summary: string;
  target_audience: string;
  brand_archetype: string;
  visual_direction: VisualDirection;
  suggested_deliverables: string[];
  brand_name?: string;
  core_value_proposition?: string;
}

export interface ClientIdeaPreset {
  id: string;
  title: string;
  tagline: string;
  rawNotes: string;
  archetype: string;
  industry: string;
}
