export interface CountyData {
  id: string;
  name: string;
  // Schematic grid position (not geographic coordinates)
  gridX: number;
  gridY: number;
  population: string;
  connectivityScore: string;
  activeProjects: number;
}

// NOTE: Figures below are illustrative placeholder data for demonstration
// purposes only. Replace with verified data when available.
export const liberiaCounties: CountyData[] = [
  { id: "grand-cape-mount", name: "Grand Cape Mount", gridX: 40, gridY: 210, population: "129,000", connectivityScore: "Moderate", activeProjects: 1 },
  { id: "bomi", name: "Bomi", gridX: 110, gridY: 190, population: "97,000", connectivityScore: "Moderate", activeProjects: 1 },
  { id: "montserrado", name: "Montserrado", gridX: 130, gridY: 250, population: "1,650,000", connectivityScore: "High", activeProjects: 5 },
  { id: "margibi", name: "Margibi", gridX: 200, gridY: 230, population: "246,000", connectivityScore: "High", activeProjects: 3 },
  { id: "grand-bassa", name: "Grand Bassa", gridX: 240, gridY: 290, population: "232,000", connectivityScore: "Moderate", activeProjects: 2 },
  { id: "gbarpolu", name: "Gbarpolu", gridX: 130, gridY: 100, population: "104,000", connectivityScore: "Low", activeProjects: 1 },
  { id: "lofa", name: "Lofa", gridX: 210, gridY: 50, population: "331,000", connectivityScore: "Low", activeProjects: 2 },
  { id: "bong", name: "Bong", gridX: 250, gridY: 150, population: "436,000", connectivityScore: "Moderate", activeProjects: 3 },
  { id: "nimba", name: "Nimba", gridX: 360, gridY: 130, population: "530,000", connectivityScore: "Moderate", activeProjects: 3 },
  { id: "rivercess", name: "River Cess", gridX: 300, gridY: 290, population: "82,000", connectivityScore: "Low", activeProjects: 1 },
  { id: "sinoe", name: "Sinoe", gridX: 340, gridY: 330, population: "127,000", connectivityScore: "Low", activeProjects: 1 },
  { id: "grand-gedeh", name: "Grand Gedeh", gridX: 420, gridY: 220, population: "144,000", connectivityScore: "Low", activeProjects: 1 },
  { id: "river-gee", name: "River Gee", gridX: 430, gridY: 300, population: "82,000", connectivityScore: "Low", activeProjects: 1 },
  { id: "grand-kru", name: "Grand Kru", gridX: 380, gridY: 370, population: "70,000", connectivityScore: "Low", activeProjects: 1 },
  { id: "maryland", name: "Maryland", gridX: 450, gridY: 370, population: "158,000", connectivityScore: "Moderate", activeProjects: 2 },
];
