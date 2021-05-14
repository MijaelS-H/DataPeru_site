export const diacriticsFix = {
  "Division": "División",
  "Nacion": "Nación",
  "Seccion": "Sección",
};

export const profilesList = {
  filter: {
    background: "#e30a14",
    cube: undefined,
    dimension: undefined,
    levels: ["Ver todo"],
    title: "Explorar",
  },
  geo: {
    background: "#e30a14",
    cube: "dimension_ubigeo_district",
    dimension: "Dimension geografica",
    levels: ["Nacion", "Departamento", "Provincia", "Distrito", "Ver todo"],
    title: "Geográfico",
  },
  industry: {
    background: "#e30a14",
    cube: "dimension_ciiu",
    dimension: "Dimension CIIU",
    levels: ["Seccion", "Division", "Ver todo"],
    title: "Industrias",
  },
  cite: {
    background: "#e30a14",
    cube: "dimension_cite",
    dimension: "CITE",
    levels: ["CITE", "Ver todo"],
    title: "Red CITE",
  }
};
