export const heroBackgrounds = {
  "geo": "url(/images/background-dpe.jpg)",
  "industry": "url(/images/_background-dpe.jpg)",
  "cite": "url(/images/background-dpe.jpg)",
  "01": "url(/images/_background-dpe.jpg)"
};

export const heroMapConfig = {
  groupBy: "Departamento ID",
  shapeConfig: {
    fill: "#c9cacb",
    Path: {
      stroke: "#c9cacb",
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
      [`<span style="color: #bf0909;">${d["Provincia Count"]}</span>`, "Provincias"]
    ]
  },
  topojson: "/topojson/Department.json",
  topojsonFill: "#fff",
  topojsonId: d => d.properties.CCDD,
  transition: 0,
  zoom: false
};
