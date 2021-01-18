const axios = require("axios");

let {CANON_CMS_CUBES} = process.env;
if (CANON_CMS_CUBES.substr(-1) === "/") CANON_CMS_CUBES = CANON_CMS_CUBES.substr(0, CANON_CMS_CUBES.length - 1);

const BASE_URL = "/api/departmentProperties/";

module.exports = function(app) {
  app.get(BASE_URL, async(req, res) => {
    try {
      const provincesListAPI = `${CANON_CMS_CUBES}/data.jsonrecords?cube=dimension_ubigeo_district&drilldowns=Provincia&measures=Variable+conteo&parents=true&sparse=false`;
      const citeListAPI = `${CANON_CMS_CUBES}/data.jsonrecords?cube=itp_cite_ejecucion_presupuestal&drilldowns=CITE&measures=Ejecución+presupuestal&parents=false&sparse=false&properties=Ubigeo`;

      const data = await axios.all([axios.get(provincesListAPI), axios.get(citeListAPI)])
        .then(resp => {
          const provincesList = resp[0].data.data;
          const citeList = resp[1].data.data;

          // Group provinces by department ID

          const provincesByDepartmentList = [];

          provincesList.reduce((res, value) => {
            const key = value["Department ID"];

            if (!key) {
              res[key] = {
                "Department ID": key,
                "Province Count": 0
              };
              provincesByDepartmentList.push(res[key]);
            }

            res[key]["Province Count"] += 1;
            return res;
          }, {});

          // Group CITEs by Department

          citeList.forEach(d => {
            d["Department ID"] = d.Ubigeo.slice(-2);
          });

          const citesByDepartmentList = [];

          citeList.reduce((res, value) => {
            const key = value["Department ID"];

            if (!key) {
              res[key] = {
                "Department ID": key,
                "CITE Count": 0
              };
              citesByDepartmentList.push(res[key]);
            }

            res[key]["CITE Count"] += 1;
            return res;
          }, {});

          provincesByDepartmentList.forEach(d =>
            d["CITE Count"] = citesByDepartmentList.find(h =>
              h["Department ID"] === d["Department ID"])["CITE Count"]
          );

          return provincesList;
        });

      res.json({
        data
      });
    }
    catch (e) {
      console.error("Departement Properties API Error:", e);
      return [];
    }
  });
};
