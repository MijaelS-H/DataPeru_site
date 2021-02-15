const axios = require("axios");
const yn = require("yn");

const {
  CANON_CONST_BASE = "",
  CANON_CMS_LOGGING = ""
} = process.env;

const apiBase = CANON_CONST_BASE.endsWith("/")
  ? CANON_CONST_BASE.substr(0, CANON_CONST_BASE.length - 1)
  : CANON_CONST_BASE;
const isVerboseMode = yn(CANON_CMS_LOGGING);

const ENDPOINT = "/api/departmentProperties";

module.exports = function(app) {
  app.get(ENDPOINT, (req, res) => {
    const provincesListAPI = `${apiBase}/data.jsonrecords?cube=dimension_ubigeo_district&drilldowns=Provincia&measures=Variable+conteo&parents=true&sparse=false`;
    const citeListAPI = `${apiBase}/data.jsonrecords?cube=itp_cite_ejecucion_presupuestal&drilldowns=CITE&measures=Ejecuci%C3%B3n+presupuestal&parents=false&sparse=false&properties=Ubigeo`;

    Promise.all([
      axios.get(provincesListAPI).then(response => {
        const {data: provincesList} = response.data;

        // Group provinces by "Departamento ID"
        return provincesList.reduce((res, value) => {
          const key = value["Departamento ID"];
          if (!res[key]) {
            res[key] = {
              "Departamento ID": key,
              "Departamento": value.Departamento,
              "Provincia Count": 0
            };
          }

          res[key]["Provincia Count"] += 1;
          return res;
        }, {});
      }),
      axios.get(citeListAPI).then(response => {
        const {data: citeList} = response.data;

        // Group CITEs by "Departamento ID"
        return citeList.reduce((res, value) => {
          // Ubigeo[0:2] == Departamento ID
          const key = value.Ubigeo.slice(0, 2);
          if (!res[key]) {
            res[key] = {
              "Departamento ID": key,
              "CITE Count": 0
            };
          }

          res[key]["CITE Count"] += 1;
          return res;
        }, {});
      })
    ]).then(results => {
      const [provinces, cites] = results;

      const provinceReduction = Object.values(provinces).map(province => {
        const key = province["Departamento ID"];
        const cite = cites[key] || {};
        province["CITE Count"] = cite["CITE Count"] || 0;
        return province;
      });

      res.json({status: "ok", data: provinceReduction});
    }).catch(err => {
      isVerboseMode && console.error("[api/departmentProperties.js] API Error:", err);
      res.json({
        status: "error",
        message: isVerboseMode ? err.message : "Internal server error"
      });
    });
  });
};
