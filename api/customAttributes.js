const axios = require("axios");
const yn = require("yn");
const {CANON_CONST_BASE} = process.env;
const verbose = yn(process.env.CANON_CMS_LOGGING);
const BASE_API = `${CANON_CONST_BASE}data.jsonrecords`;

const {max} = require("d3-array");

const catcher = error => {
  if (verbose) console.error("Custom Attribute Error:", error);
  return [];
};
module.exports = function(app) {

  app.post("/api/cms/customAttributes/:pid", async(req, res) => {
    const pid = req.params.pid * 1;
    const {cache} = app.settings;
    const {variables, locale} = req.body;
    const {id1, dimension1, hierarchy1, slug1, name1, cubeName1, parents1} = variables;

    switch (pid) {
      // Geo profile
      case 1:
        const isNation = hierarchy1 === "Nacion" ? true : false;
        const isDepartment = hierarchy1 === "Departamento" ? true : false;
        const isProvince = hierarchy1 === "Provincia" ? true : false;
        const isDistrict = hierarchy1 === "Distrito" ? true : false;

        const isNationOrDepartment = ["Nacion", "Departamento"].includes(hierarchy1) ? true : false;
        const isNationOrProvince = ["Nacion", "Provincia"].includes(hierarchy1) ? true : false;
        const isNationOrDepartmentOrProvince = ["Nacion", "Departamento", "Provincia"].includes(hierarchy1) ? true : false;
        const isDepartmentOrProvince = ["Departamento", "Provincia"].includes(hierarchy1) ? true : false;

        const subHierarchyDict = {
          Nacion: "Departamento",
          Departamento: "Provincia",
          Provincia: "Distrito",
          Distrito: "Distrito"
        };

        const subHierarchy = subHierarchyDict[hierarchy1];

        return res.json({
          isNation,
          isDepartment,
          isProvince,
          isDistrict,
          isNationOrDepartment,
          isNationOrProvince,
          isNationOrDepartmentOrProvince,
          isDepartmentOrProvince,
          subHierarchy
        });

        // CITE profile

      case 4:
        const citeParams = {
          cube: "dimension_cite",
          drilldowns: "CITE",
          measures: "Variable conteo",
          properties: "Categoria",
          [hierarchy1]: id1
        };

        const citeData = await axios
          .get(BASE_API, {params: citeParams})
          .then(resp => resp.data.data)
          .catch(catcher);

        const citeCategory = citeData[0].Categoria;
        const isPublicCite = citeCategory === "público" ? true : false;
        const isPrivateCite = !isPublicCite;

        const citeAgroindustrialParams = {
          cube: "itp_cite_mercado_interno_agroindustrial",
          drilldowns: "CITE",
          measures: "Produccion"
        };

        const citeCamelidoParams = {
          cube: "itp_cite_mercado_interno_camelido",
          drilldowns: "CITE",
          measures: "Produccion"
        };

        const citeCueroCalzadoParams = {
          cube: "itp_cite_mercado_interno_cuero",
          drilldowns: "CITE",
          measures: "Produccion"
        };

        const citePesqueroParams = {
          cube: "itp_cite_mercado_interno_pesquero",
          drilldowns: "CITE",
          measures: "Desembarque"
        };

        const isAgroindustrialOrProductiveCite = await axios
          .get(BASE_API, {params: citeAgroindustrialParams})
          .then(resp => {
            const data = resp.data.data;

            const citeList = data.map(d => d["CITE ID"]);
            const isAgroindustrialOrProductiveCite = citeList.includes(id1 * 1) ? true : false;

            return isAgroindustrialOrProductiveCite;
          })
          .catch(catcher);

        const isCamelido = await axios
          .get(BASE_API, {params: citeCamelidoParams})
          .then(resp => {
            const data = resp.data.data;

            const citeList = data.map(d => d["CITE ID"]);
            const isCamelido = citeList.includes(id1 * 1) ? true : false;

            return isCamelido;
          })
          .catch(catcher);


        const isCueroYCalzado = await axios
          .get(BASE_API, {params: citeCueroCalzadoParams})
          .then(resp => {
            const data = resp.data.data;

            const citeList = data.map(d => d["CITE ID"]);
            const isCueroYCalzado = citeList.includes(id1 * 1) ? true : false;

            return isCueroYCalzado;
          })
          .catch(catcher);

        const isPesquero = await axios
          .get(BASE_API, {params: citePesqueroParams})
          .then(resp => {
            const data = resp.data.data;

            const citeList = data.map(d => d["CITE ID"]);
            const isPesquero = citeList.includes(id1 * 1) ? true : false;

            return isPesquero;
          })
          .catch(catcher);

        const citeClientsParams = {
          cube: "itp_cite_empresas_tipo",
          drilldowns: "Time",
          measures: "Empresas",
          CITE: id1
        };

        const latestClientsPerSizeDate = await axios
          .get(BASE_API, {params: citeClientsParams}).then(resp => {
            const data = resp.data.data;

            const maxDate = data.length > 0 ? max(data.filter(d => d.Empresas), d => d.Time) : false;

            return maxDate;
          })
          .catch(catcher);

        const previousClientsPerSizeDate = latestClientsPerSizeDate ? latestClientsPerSizeDate - 100 : false;

        const citeServicesParams = {
          cube: "itp_cite_servicios_subcategorias",
          drilldowns: "Time",
          measures: "Servicios",
          CITE: id1
        };

        const latestServicesDate = await axios
          .get(BASE_API, {params: citeServicesParams}).then(resp => {
            const data = resp.data.data;

            const maxDate = data.length > 0 ? max(data.filter(d => d.Servicios), d => d.Time) : false;

            return maxDate;
          })
          .catch(catcher);

        const previousServicesDate = latestServicesDate ? latestServicesDate - 100 : false;

        const citeBudgetParams = {
          cube: "itp_cite_ejecucion_presupuestal",
          drilldowns: "Time",
          measures: "Ejecución presupuestal",
          CITE: id1
        };

        const latestBudgetDate = await axios
          .get(BASE_API, {params: citeBudgetParams}).then(resp => {
            const data = resp.data.data;

            const maxDate = data.length > 0 ? max(data.filter(d => d["Ejecución presupuestal"]), d => d.Time) : false;

            return maxDate;
          })
          .catch(catcher);

        const previousBudgetDate = latestBudgetDate ? latestBudgetDate - 100 : false;

        return res.json({
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
        });

      // Industry profile
      case 5:
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

        const customHierarchy = "Industria";
        const customId = industryDictionary[id1] || false;

        const enaveHierarchy = "Industria";
        const enaveId = enaveIndustryDictionary[id1] || false;

        const isSection = hierarchy1 === "Seccion" ? true : false;
        const isDivision = hierarchy1 === "Division" ? true : false;

        return res.json({
          customHierarchy,
          customId,
          enaveHierarchy,
          enaveId,
          isSection,
          isDivision
        });

      default:
        return res.json({});
    }
  });
};
