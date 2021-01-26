const profiles = [
  "geo",
  "cite",
  "industry"
];

export const profileSearchConfig = {
  availableProfiles: profiles,
  columnOrder: profiles,
  columnTitles: {
    geo: "Geográfico",
    cite: "CITE",
    industry: "Industria"
  },
  placeholder: "Explore World Trade",
  subtitleFormat: d => d.hierarchy === "Division" ? "División" : d.hierarchy === "Seccion" ? "Sección" : d.hierarchy
};
