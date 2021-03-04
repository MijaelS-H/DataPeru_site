export const heroBackgrounds = {
  "geo": "url(/images/homepage/geo.jpg)",
  "industry": "url(/images/homepage/industry.jpeg)",
  "cite": "url(/images/homepage/cite.jpg)",
  "01": "url(/api/image?slug=geo&id=01)",
  "02": "url(/api/image?slug=geo&id=02)",
  "03": "url(/api/image?slug=geo&id=03)",
  "04": "url(/api/image?slug=geo&id=04)",
  "05": "url(/api/image?slug=geo&id=05)",
  "06": "url(/api/image?slug=geo&id=06)",
  "07": "url(/api/image?slug=geo&id=07)",
  "08": "url(/api/image?slug=geo&id=08)",
  "09": "url(/api/image?slug=geo&id=09)",
  "10": "url(/api/image?slug=geo&id=10)",
  "11": "url(/api/image?slug=geo&id=11)",
  "12": "url(/api/image?slug=geo&id=12)",
  "13": "url(/api/image?slug=geo&id=13)",
  "14": "url(/api/image?slug=geo&id=14)",
  "15": "url(/api/image?slug=geo&id=15)",
  "16": "url(/api/image?slug=geo&id=16)",
  "17": "url(/api/image?slug=geo&id=17)",
  "18": "url(/api/image?slug=geo&id=18)",
  "19": "url(/api/image?slug=geo&id=19)",
  "20": "url(/api/image?slug=geo&id=20)",
  "21": "url(/api/image?slug=geo&id=21)",
  "22": "url(/api/image?slug=geo&id=22)",
  "23": "url(/api/image?slug=geo&id=23)",
  "24": "url(/api/image?slug=geo&id=24)",
  "25": "url(/api/image?slug=geo&id=25)"
};

export const slugDict = {
  "01": "amazonas",
  "02": "ancash",
  "03": "apurimac",
  "04": "arequipa",
  "05": "ayacucho",
  "06": "cajamarca",
  "07": "callao",
  "08": "cusco",
  "09": "huancavelica",
  "10": "huanuco",
  "11": "ica",
  "12": "junin",
  "13": "la-libertad",
  "14": "lambayeque",
  "15": "lima",
  "16": "loreto",
  "17": "madre-de-dios",
  "18": "moquegua",
  "19": "pasco",
  "20": "piura",
  "21": "puno",
  "22": "san-martin",
  "23": "tacna",
  "24": "tumbes",
  "25": "ucayali"
};

export const heroMapConfig = {
  groupBy: "Departamento ID",
  shapeConfig: {
    Path: {
      stroke: "#b3b3b4",
      strokeWidth: 1
    }
  },
  tooltipConfig: {
    className: "d3plus-tooltip-explorer",
    title: d => `<div class='d3plus-tooltip-home-title-wrapper'>
<div class="title"><span>${d.Departamento}</span></div>
<div class="subtitle"><span>Departamento</span></div>
</div>`,
    tbody: d => [
      [`<span style="color: #bf0909;">${d["CITE Count"]}</span>`, "CITE"],
      [`<span style="color: #bf0909;">${d["Provincia Count"]}</span>`, "Provincias"],
      [`<span style="color: #bf0909;">${d["Distrito Count"]}</span>`, "Distritos"]
    ]
  },
  topojson: "/topojson/Department.json",
  topojsonFill: "#c9cacb",
  topojsonId: d => d.properties.CCDD,
  transition: 0,
  zoom: false
};
