
module.exports = {
  filter: {
    name: "Explore",
    dimension: undefined,
    background: undefined,
    items: undefined,
    levels: [
      {name: "Ver todo", count: 2209}
    ],
    subtitle: "Ver todos"
  },
  geo: {
    name: "Ciudades y lugares",
    dimension: "Geography",
    background: "#e30a14",
    items: ["per", "02", "020101", "240103", "250101"],
    levels: [
      {name: "Nacion", count: 1},
      {name: "Departamento", count: 25},
      {name: "Provincia", count: 196},
      {name: "Distrito", count: 1880},
      {name: "Ver todo", count: 2102}
    ],
    subtitle: "Principales localidades"
  },
  cite: {
    dimension: "CITE",
    background: "#e30a14",
    items: [1, 2, 3, 4, 5],
    name: "CITE",
    levels: [
      {name: "CITE", count: 45},
      {name: "Ver todo", count: 45}
    ],
    subtitle: "Principales CITE"
  },
  industry: {
    dimension: "Industry",
    background: "#e30a14",
    items: ["C", "A", 10, 13, 23],
    name: "Industrias",
    levels: [
      {name: "Categoría", count: 9},
      {name: "Grupo", count: 53},
      {name: "Ver todo", count: 62}
    ],
    subtitle: "Principales industrias"
  }
};
