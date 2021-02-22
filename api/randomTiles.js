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

const ENDPOINT = "/api/randomTiles";


module.exports = function(app) {
  app.get(ENDPOINT, (req, res) => {
    const nacionAPI = `${apiBase}/members?cube=dimension_ubigeo_district&level=Nacion`;
    const departmentAPI = `${apiBase}/members?cube=dimension_ubigeo_district&level=Departamento`;
    const provinceAPI = `${apiBase}/members?cube=dimension_ubigeo_district&level=Provincia`;
    const districtAPI = `${apiBase}/members?cube=dimension_ubigeo_district&level=Distrito`;

    const sectionAPI = `${apiBase}/members?cube=dimension_ciiu&level=Seccion`;
    const divisionAPI = `${apiBase}/members?cube=dimension_ciiu&level=Division`;

    const citeAPI = `${apiBase}/members?cube=dimension_cite&level=CITE`;

    Promise.all([
      axios.get(nacionAPI).then(response => {
        const {data: nacionList} = response.data;

        return nacionList.forEach(d => d.slug = "geo");
      }),
      axios.get(departmentAPI).then(response => {
        const {data: departmentList} = response.data;

        return departmentList.forEach(d => d.slug = "geo");
      }),
      axios.get(provinceAPI).then(response => {
        const {data: provinceList} = response.data;

        return provinceList.forEach(d => d.slug = "geo");
      }),
      axios.get(districtAPI).then(response => {
        const {data: districtList} = response.data;

        return districtList.forEach(d => d.slug = "geo");
      }),
      axios.get(sectionAPI).then(response => {
        const {data: sectionList} = response.data;

        return sectionList.forEach(d => d.slug = "industry");
      }),
      axios.get(divisionAPI).then(response => {
        const {data: divisionList} = response.data;

        return divisionList.forEach(d => d.slug = "industry");
      }),
      axios.get(citeAPI).then(response => {
        const {data: citeList} = response.data;

        return citeList.forEach(d => d.slug = "cite");
      })
    ]).then(results => {
      const [nation, departments, provinces, districts, sections, divisions, cites] = results;

      const totalEntities = nation.push([departments, provinces, districts, sections, divisions, cites]);

      res.json({status: "ok", data: totalEntities});
    }).catch(err => {
      isVerboseMode && console.error("[api/randomTiles.js] API Error:", err);
      res.json({
        status: "error",
        message: isVerboseMode ? err.message : "Internal server error"
      });
    });
  });
};
