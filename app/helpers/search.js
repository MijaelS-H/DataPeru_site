const profiles = [
  "filter",
  "geo",
  "cite",
  "industry"
];

export const profileSearchConfig = {
  availableProfiles: profiles,
  columnOrder: profiles,
  columnTitles: {
    filter: "Todos",
    geo: "Geográfico",
    cite: "CITE",
    industry: "Industria"
  },
  placeholder: "Explore datos",
  subtitleFormat: d => d.hierarchy === "Division" ? "División" : d.hierarchy === "Seccion" ? "Sección" : d.hierarchy
};
