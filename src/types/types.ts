export interface Layer {
  name: string;
  format: "SHP" | "Geopackage" | "GeoJSON" | "CSV";
}

export interface MapSuggestion {
  id: number;
  title: string;
  layers: Layer[];
  description: string;
  steps: string[];
  keywords: string[];
  decisionScore: number;
}