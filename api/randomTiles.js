const axios = require("axios");
const yn = require("yn");

const {
  CANON_CMS_CUBES = "",
  CANON_CMS_LOGGING = ""
} = process.env;

const apiBase = CANON_CMS_CUBES.endsWith("/")
  ? CANON_CMS_CUBES.substr(0, CANON_CMS_CUBES.length - 1)
  : CANON_CMS_CUBES;
const isVerboseMode = yn(CANON_CMS_LOGGING);

const ENDPOINT = "/api/randomTiles";


module.exports = function(app) {
  app.get(ENDPOINT, (req, res) => {
    const nacionAPI = `${apiBase}/search?dimension=Dimension+geografica&cubeName=dimension_ubigeo_district&levels=Nacion&pslug=geo`;
    const departmentAPI = `${apiBase}/search?dimension=Dimension+geografica&cubeName=dimension_ubigeo_district&levels=Departamento&pslug=geo`;
    const provinceAPI = `${apiBase}/search?dimension=Dimension+geografica&cubeName=dimension_ubigeo_district&levels=Provincia&pslug=geo`;
    const districtAPI = `${apiBase}/search?dimension=Dimension+geografica&cubeName=dimension_ubigeo_district&levels=Distrito&pslug=geo`;

    const sectionAPI = `${apiBase}/search?dimension=Dimension+CIIU&cubeName=dimension_ciiu&levels=Seccion&pslug=industry`;
    const divisionAPI = `${apiBase}/search?dimension=Dimension+CIIU&cubeName=dimension_ciiu&levels=Division&pslug=industry`;

    const citeAPI = `${apiBase}/search?dimension=CITE&cubeName=dimension_cite&levels=CITE&pslug=cite`;

    Promise.all([
      axios.get(nacionAPI).then(response => {
        const {results: nacionList} = response.data;

        nacionList.forEach(d => {
          d.level = "Nación";
        });

        return nacionList;
      }),
      axios.get(departmentAPI).then(response => {
        const {results: departmentList} = response.data;

        departmentList.forEach(d => {
          d.level = "Departamento";
        });

        return departmentList;
      }),
      axios.get(provinceAPI).then(response => {
        const {results: provinceList} = response.data;

        provinceList.forEach(d => {
          d.level = "Provincia";
        });

        return provinceList;
      }),
      axios.get(districtAPI).then(response => {
        const {results: districtList} = response.data;

        districtList.forEach(d => {
          d.level = "Distrito";
        });

        return districtList;
      }),
      axios.get(sectionAPI).then(response => {
        const {results: sectionList} = response.data;

        sectionList.forEach(d => {
          d.level = "Sección";
        });

        return sectionList;
      }),
      axios.get(divisionAPI).then(response => {
        const {results: divisionList} = response.data;

        divisionList.forEach(d => {
          d.level = "División";
        });

        return divisionList;
      }),
      axios.get(citeAPI).then(response => {
        const {results: citeList} = response.data;

        citeList.forEach(d => {
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
        "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"].includes(d.id));

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
