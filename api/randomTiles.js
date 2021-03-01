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

        nacionList.forEach(d => {
          d.slug = "geo";
          d.level = "Nación";
        });

        return nacionList;
      }),
      axios.get(departmentAPI).then(response => {
        const {data: departmentList} = response.data;

        departmentList.forEach(d => {
          d.slug = "geo";
          d.level = "Departamento";
        });

        return departmentList;
      }),
      axios.get(provinceAPI).then(response => {
        const {data: provinceList} = response.data;

        provinceList.forEach(d => {
          d.slug = "geo";
          d.level = "Provincia";
        });

        return provinceList;
      }),
      axios.get(districtAPI).then(response => {
        const {data: districtList} = response.data;

        districtList.forEach(d => {
          d.slug = "geo";
          d.level = "Distrito";
        });

        return districtList;
      }),
      axios.get(sectionAPI).then(response => {
        const {data: sectionList} = response.data;

        sectionList.forEach(d => {
          d.slug = "industry";
          d.level = "Sección";
        });

        return sectionList;
      }),
      axios.get(divisionAPI).then(response => {
        const {data: divisionList} = response.data;

        divisionList.forEach(d => {
          d.slug = "industry";
          d.level = "División";
        });

        return divisionList;
      }),
      axios.get(citeAPI).then(response => {
        const {data: citeList} = response.data;

        citeList.forEach(d => {
          d.slug = "cite";
          d.level = "CITE";
        });

        return citeList;
      })
    ]).then(results => {
      const [nation, departments, provinces, districts, sections, divisions, cites] = results;

      nation.push(departments, provinces, districts);
      const geoEntities = nation.flat();

      sections.push(divisions);
      let industryEntities = sections.flat();
      industryEntities = industryEntities.filter(d => ![
        "O", "T", "U", "Z", "00", "01", "02", "03", "04", "05", "06", "08", "09", "12", "35", "36", "37", "38", "39",
        "41", "42", "43", "45", "46", "47", "49", "50", "51", "52", "53", "55", "56", "58", "59", "60", "63",
        "64", "65", "66", "68", "75", "77", "78", "79", "80", "81", "82", "84", "85", "86", "87", "88", "90",
        "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"].includes(d.ID));

      const randomGeoEntity = geoEntities[Math.floor(Math.random() * geoEntities.length)];
      const randomIndustryEntity = industryEntities[Math.floor(Math.random() * industryEntities.length)];
      const randomCiteEntity = cites[Math.floor(Math.random() * cites.length)];

      res.json({status: "ok", data: [randomGeoEntity, randomIndustryEntity, randomCiteEntity]});
    }).catch(err => {
      isVerboseMode && console.error("[api/randomTiles.js] API Error:", err);
      res.json({
        status: "error",
        message: isVerboseMode ? err.message : "Internal server error"
      });
    });
  });
};
