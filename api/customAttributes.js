const {default: axios} = require("axios");
const yn = require("yn");
const {max} = require("d3-array");
​
const verbose = yn(process.env.CANON_CMS_LOGGING);
const BASE_API = `${process.env.CANON_CONST_BASE}data.jsonrecords`;
​
/** @type {(app: import("express").Application) => void} */
module.exports = function(app) {
  app.post("/api/cms/customAttributes/:pid", async(req, res) => {
    const resolvers = {
      1: geoProfileAttributes,
      4: citeProfileAttributes,
      5: industryProfileAttributes
    };
    const {pid} = req.params;
    const {variables} = req.body || {};
​
    const attributesResolver = resolvers[pid];
    if (typeof attributesResolver !== "function") {
      return res.json({});
    }
​
    const response = await attributesResolver(variables).catch(error => {
      if (verbose) {
        console.error("Custom Attribute Error:", error.message);
        console.error("- Variables:", variables);
      }
      return {};
    });
​
    return res.json(response);
  });
};
​
/**
 * PID: 1
 */
async function geoProfileAttributes(variables) {
  const {hierarchy1} = variables;
​
  const isNation = hierarchy1 === "Nacion";
  const isDepartment = hierarchy1 === "Departamento";
  const isProvince = hierarchy1 === "Provincia";
  const isDistrict = hierarchy1 === "Distrito";
​
  const isNationOrDepartment = ["Nacion", "Departamento"].includes(hierarchy1);
  const isNationOrProvince = ["Nacion", "Provincia"].includes(hierarchy1);
  const isNationOrDepartmentOrProvince = ["Nacion", "Departamento", "Provincia"].includes(hierarchy1);
  const isDepartmentOrProvince = ["Departamento", "Provincia"].includes(hierarchy1);
​
  const subHierarchyDict = {
    Nacion: "Departamento",
    Departamento: "Provincia",
    Provincia: "Distrito",
    Distrito: "Distrito"
  };
​
  return {
    isNation,
    isDepartment,
    isProvince,
    isDistrict,
    isNationOrDepartment,
    isNationOrProvince,
    isNationOrDepartmentOrProvince,
    isDepartmentOrProvince,
    subHierarchy: subHierarchyDict[hierarchy1]
  };
}
​
/**
 * PID: 4
 */
async function citeProfileAttributes(variables) {
  const {id1, hierarchy1} = variables;
​
  const citeParams = {
    cube: "dimension_cite",
    drilldowns: "CITE",
    measures: "Variable conteo",
    properties: "Categoria",
    [hierarchy1]: id1
  };
​
  const citeData = await axios.get(BASE_API, {params: citeParams}).then(resp => resp.data.data);
​
  const citeCategory = citeData[0].Categoria;
  const isPublicCite = citeCategory === "público" ? true : false;
  const isPrivateCite = !isPublicCite;
​
  const citeAgroindustrialParams = {
    cube: "itp_cite_mercado_interno_agroindustrial",
    drilldowns: "CITE",
    measures: "Produccion"
  };
​
  const citeCamelidoParams = {
    cube: "itp_cite_mercado_interno_camelido",
    drilldowns: "CITE",
    measures: "Produccion"
  };
​
  const citeCueroCalzadoParams = {
    cube: "itp_cite_mercado_interno_cuero",
    drilldowns: "CITE",
    measures: "Produccion"
  };
​
  const citePesqueroParams = {
    cube: "itp_cite_mercado_interno_pesquero",
    drilldowns: "CITE",
    measures: "Desembarque"
  };
​
  const isAgroindustrialOrProductiveCite = await axios.get(BASE_API, {params: citeAgroindustrialParams})
    .then(resp => {
      const {data} = resp.data;
      const citeList = data.map(d => d["CITE ID"]);
      return citeList.includes(id1 * 1);
    });
​
  const isCamelido = await axios.get(BASE_API, {params: citeCamelidoParams})
    .then(resp => {
      const {data} = resp.data;
      const citeList = data.map(d => d["CITE ID"]);
      return citeList.includes(id1 * 1);
    });
​
  const isCueroYCalzado = await axios.get(BASE_API, {params: citeCueroCalzadoParams})
    .then(resp => {
      const {data} = resp.data;
      const citeList = data.map(d => d["CITE ID"]);
      return citeList.includes(id1 * 1);
    });
​
  const isPesquero = await axios.get(BASE_API, {params: citePesqueroParams})
    .then(resp => {
      const {data} = resp.data;
      const citeList = data.map(d => d["CITE ID"]);
      return citeList.includes(id1 * 1);
    });
​
  const citeClientsParams = {
    cube: "itp_cite_empresas_tipo",
    drilldowns: "Time",
    measures: "Empresas",
    CITE: id1
  };
​
  const latestClientsPerSizeDate = await axios.get(BASE_API, {params: citeClientsParams})
    .then(resp => {
      const {data} = resp.data;
      const maxDate = data.length > 0 ? max(data.filter(d => d.Empresas), d => d.Time) : false;
      return maxDate;
    });
​
  const previousClientsPerSizeDate = latestClientsPerSizeDate ? latestClientsPerSizeDate - 100 : false;
​
  const citeServicesParams = {
    cube: "itp_cite_servicios_subcategorias",
    drilldowns: "Time",
    measures: "Servicios",
    CITE: id1
  };
​
  const latestServicesDate = await axios.get(BASE_API, {params: citeServicesParams})
    .then(resp => {
      const {data} = resp.data;
      const maxDate = data.length > 0 ? max(data.filter(d => d.Servicios), d => d.Time) : false;
      return maxDate;
    });
​
  const previousServicesDate = latestServicesDate ? latestServicesDate - 100 : false;
​
  const citeBudgetParams = {
    cube: "itp_cite_ejecucion_presupuestal",
    drilldowns: "Time",
    measures: "Ejecución presupuestal",
    CITE: id1
  };
​
  const latestBudgetDate = await axios.get(BASE_API, {params: citeBudgetParams})
    .then(resp => {
      const {data} = resp.data;
      const maxDate = data.length > 0 ? max(data.filter(d => d["Ejecución presupuestal"]), d => d.Time) : false;
      return maxDate;
    });
​
  const previousBudgetDate = latestBudgetDate ? latestBudgetDate - 100 : false;
​
  return {
    citeCategory,
    isPublicCite,
    isPrivateCite,
    isAgroindustrialOrProductiveCite,
    isCamelido,
    isCueroYCalzado,
    isPesquero,
    latestClientsPerSizeDate,
    previousClientsPerSizeDate,
    latestServicesDate,
    previousServicesDate,
    latestBudgetDate,
    previousBudgetDate
  };
}
​
/**
 * PID: 5
 */
async function industryProfileAttributes(variables) {
  const {id1, hierarchy1} = variables;
​
  const industryDictionary = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    F: 5,
    G: 6,
    H: 7,
    S: 8
  };
​
  const enaveIndustryDictionary = {
    A: 1,
    G: 2,
    J: 3,
    F: 4,
    D: 5,
    K: 6,
    I: 7,
    C: 8,
    B: 9,
    S: 10,
    H: 11
  };
​
  const customHierarchy = "Industria";
  const customId = industryDictionary[id1] || false;
​
  const enaveHierarchy = "Industria";
  const enaveId = enaveIndustryDictionary[id1] || false;
​
  const isSection = hierarchy1 === "Seccion";
  const isDivision = hierarchy1 === "Division";
​
  return {
    customHierarchy,
    customId,
    enaveHierarchy,
    enaveId,
    isDivision,
    isSection
  };
}
