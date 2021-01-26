const axios = require("axios");

let {CANON_CONST_BASE} = process.env;
if (CANON_CONST_BASE.substr(-1) === "/") CANON_CONST_BASE = CANON_CONST_BASE.substr(0, CANON_CONST_BASE.length - 1);

const BASE_URL = "/api/departmentProperties";

const yn = require("yn");
const verbose = yn(process.env.CANON_CMS_LOGGING);
const catcher = error => {
  if (verbose) console.error("Department Properties API Error:", error);
  return [];
};

module.exports = function(app) {
  app.get(BASE_URL, async(req, res) => {
    try {
      const provincesListAPI = `${CANON_CONST_BASE}/data.jsonrecords?cube=dimension_ubigeo_district&drilldowns=Provincia&measures=Variable+conteo&parents=true&sparse=false`;
      const citeListAPI = `${CANON_CONST_BASE}/data.jsonrecords?cube=itp_cite_ejecucion_presupuestal&drilldowns=CITE&measures=Ejecuci%C3%B3n+presupuestal&parents=false&sparse=false&properties=Ubigeo`;

      const data = await axios.all([axios.get(provincesListAPI), axios.get(citeListAPI)])
        .then(resp => {
          const provincesList = resp[0].data.data;
          const citeList = resp[1].data.data;

          // Group provinces by department ID

          const provincesByDepartmentList = [];

          provincesList.reduce((res, value) => {
            const key = value["Departamento ID"];

            if (!res[key]) {
              res[key] = {
                "Departamento ID": key,
                "Departamento": value.Departamento,
                "Provincia Count": 0
              };
              provincesByDepartmentList.push(res[key]);
            }

            res[key]["Provincia Count"] += 1;
            return res;
          }, {});


          // Group CITEs by Department

          citeList.forEach(d => {
            d["Departamento ID"] = d.Ubigeo.slice(0, 2);
          });

          const citesByDepartmentList = [];

          citeList.reduce((res, value) => {
            const key = value["Departamento ID"];

            if (!res[key]) {
              res[key] = {
                "Departamento ID": key,
                "CITE Count": 0
              };
              citesByDepartmentList.push(res[key]);
            }

            res[key]["CITE Count"] += 1;
            return res;
          }, {});

          provincesByDepartmentList.forEach(d =>
            d["CITE Count"] = citesByDepartmentList.find(h =>
              h["Departamento ID"] === d["Departamento ID"]) ? citesByDepartmentList.find(h =>
                h["Departamento ID"] === d["Departamento ID"])["CITE Count"] : 0
          );

          return provincesByDepartmentList.flat();
        }).catch(catcher);

      res.json({
        data
      });
    }
    catch (e) {
      console.error("Departement Properties API Error:", e);
    }
  });
};
