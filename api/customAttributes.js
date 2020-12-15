const axios = require("axios");
const yn = require("yn");
const {CANON_CMS_CUBES} = process.env;
const verbose = yn(process.env.CANON_CMS_LOGGING);
const BASE_API = `${CANON_CMS_CUBES}data.jsonrecords`;

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
        const isNationOrDepartmentOrProvince = ["Nacion", "Departamento", "Provincia"].includes(hierarchy1) ? true : false;

        return res.json({
          isNation,
          isDepartment,
          isProvince,
          isDistrict,
          isNationOrDepartment,
          isNationOrDepartmentOrProvince
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

        const customHierarchy = "Industria";
        const customId = industryDictionary[id1] || false;

        return res.json({
          customHierarchy,
          customId
        });

      default:
        return res.json({});
    }
  });
};
