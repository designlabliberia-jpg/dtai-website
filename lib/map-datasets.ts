import { liberiaCounties } from "@/lib/liberia-counties-data";

export interface MapTier {
  label: string;
  color: string;
  min: number;
}

export interface MapDataset {
  key: string;
  title: string;
  networkLabel: string;
  iconKey: "globe" | "leaf" | "droplet" | "wind" | "alert";
  themeColor: string;
  metricLabel: string;
  unit: string;
  isRealData: boolean;
  description: string;
  tiers: MapTier[];
  getValue: (countyId: string) => number;
  secondaryStatLabel: string;
  computeSecondaryStat: (values: number[]) => string;
}

function seededValue(seed: string, min: number, max: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const normalized = Math.abs(hash % 1000) / 1000;
  return Math.round(min + normalized * (max - min));
}

const REAL_POPULATION: MapDataset = {
  key: "population",
  title: "Spatial data by county",
  networkLabel: "GIS & Spatial Data Network",
  iconKey: "globe",
  themeColor: "0,166,255",
  metricLabel: "Population (2022 Census)",
  unit: "people",
  isRealData: true,
  description:
    "Population figures and county boundaries reflect the official 2022 LISGIS National Population and Housing Census.",
  tiers: [
    { label: "High (400,000+)", color: "var(--color-tech-blue)", min: 400000 },
    { label: "Moderate (150,000–399,999)", color: "#E0B84B", min: 150000 },
    { label: "Low (under 150,000)", color: "var(--color-neutral-600)", min: 0 },
  ],
  getValue: (countyId) =>
    liberiaCounties.find((c) => c.id === countyId)?.populationValue ?? 0,
  secondaryStatLabel: "Total Population Represented",
  computeSecondaryStat: (values) => values.reduce((s, v) => s + v, 0).toLocaleString(),
};

const BIODIVERSITY: MapDataset = {
  key: "biodiversity",
  title: "Illustrative biodiversity survey by county",
  networkLabel: "Biodiversity Survey Network",
  iconKey: "leaf",
  themeColor: "52,211,153",
  metricLabel: "Relative Biodiversity Index",
  unit: "index (0–100)",
  isRealData: false,
  description:
    "This is illustrative demonstration data showing how a biodiversity mapping tool would visualize county-level survey results — not real field survey data.",
  tiers: [
    { label: "High diversity zone", color: "#34D399", min: 66 },
    { label: "Moderate diversity zone", color: "#FBBF24", min: 33 },
    { label: "Lower diversity zone", color: "var(--color-neutral-600)", min: 0 },
  ],
  getValue: (countyId) => seededValue(countyId + "biodiversity", 10, 98),
  secondaryStatLabel: "Counties in High-Diversity Zone",
  computeSecondaryStat: (values) => `${values.filter((v) => v >= 66).length} of ${values.length}`,
};

const WATER_STRESS: MapDataset = {
  key: "water",
  title: "Illustrative hydrological monitoring by county",
  networkLabel: "Hydrological Monitoring Network",
  iconKey: "droplet",
  themeColor: "96,165,250",
  metricLabel: "Water Stress Index",
  unit: "index (0–100)",
  isRealData: false,
  description:
    "This is illustrative demonstration data showing how a water resource monitoring tool would visualize stress levels across a watershed — not real hydrological survey data.",
  tiers: [
    { label: "High stress", color: "#F87171", min: 66 },
    { label: "Moderate stress", color: "#FBBF24", min: 33 },
    { label: "Low stress", color: "#60A5FA", min: 0 },
  ],
  getValue: (countyId) => seededValue(countyId + "water", 5, 95),
  secondaryStatLabel: "Counties Under High Water Stress",
  computeSecondaryStat: (values) => `${values.filter((v) => v >= 66).length} of ${values.length}`,
};

const POLLUTION: MapDataset = {
  key: "pollution",
  title: "Illustrative sensor network readings by county",
  networkLabel: "Air & Water Quality Sensor Network",
  iconKey: "wind",
  themeColor: "251,191,36",
  metricLabel: "Composite Pollution Index",
  unit: "index (0–100)",
  isRealData: false,
  description:
    "This is illustrative demonstration data showing how a pollution monitoring dashboard would visualize sensor-derived readings — not real air/water/soil sample data.",
  tiers: [
    { label: "Elevated readings", color: "#F87171", min: 60 },
    { label: "Within normal range", color: "#FBBF24", min: 30 },
    { label: "Low readings", color: "#34D399", min: 0 },
  ],
  getValue: (countyId) => seededValue(countyId + "pollution", 8, 92),
  secondaryStatLabel: "Counties Exceeding Threshold",
  computeSecondaryStat: (values) => `${values.filter((v) => v >= 60).length} of ${values.length}`,
};

const DISASTER_RISK: MapDataset = {
  key: "disaster",
  title: "Illustrative early warning risk mapping by county",
  networkLabel: "Early Warning & Hazard Monitoring System",
  iconKey: "alert",
  themeColor: "248,113,113",
  metricLabel: "Composite Hazard Risk",
  unit: "index (0–100)",
  isRealData: false,
  description:
    "This is illustrative demonstration data showing how an early-warning risk mapping tool would visualize hazard exposure — not a real hazard assessment.",
  tiers: [
    { label: "High risk", color: "#F87171", min: 66 },
    { label: "Moderate risk", color: "#FBBF24", min: 33 },
    { label: "Lower risk", color: "#34D399", min: 0 },
  ],
  getValue: (countyId) => seededValue(countyId + "disaster", 10, 95),
  secondaryStatLabel: "Counties at Elevated Risk",
  computeSecondaryStat: (values) => `${values.filter((v) => v >= 66).length} of ${values.length}`,
};

export const MAP_DATASETS: Record<string, MapDataset> = {
  population: REAL_POPULATION,
  biodiversity: BIODIVERSITY,
  water: WATER_STRESS,
  pollution: POLLUTION,
  disaster: DISASTER_RISK,
};

export function getMapDataset(key: string): MapDataset | undefined {
  return MAP_DATASETS[key];
}
