
import React from "react";
import axios from "axios";
import {withNamespaces} from "react-i18next";
import TileV2 from "./TileV2";
import "./ExploreProfile.css";

import provinceParents from "../../static/data/Provincia_dict.json";
import districtParents from "../../static/data/Distrito_dict.json";
import divisionParents from "../../static/data/Division_dict.json";
import citeCategories from "../../static/data/CITE_dict.json";

class ExploreProfile extends React.Component {
  render() {
    const {filterPanel, lng, results, t, loading, profile, tab} = this.props;

    let nestedResults = undefined;

    if (profile === "geo" && tab === "2") {
      results.length > 0 && results.forEach(d => {
        const partentObject = provinceParents.find(h => h.slug === d.id);
        d["Departamento"] = partentObject ? partentObject["Departamento"] : false;
        d["Departamento ID"] = partentObject ? partentObject["Departamento ID"] : false;
      });

      nestedResults = results.reduce((a, b) => {
        a[b.Departamento] = [...a[b.Departamento] || [], b];
        return a;
      }, {});
    }

    if (profile === "geo" && tab === "3") {
      results.length > 0 && results.forEach(d => {
        const partentObject = districtParents.find(h => h.slug === d.id);
        d["Departamento"] = partentObject ? partentObject["Departamento"] : false;
        d["Departamento ID"] = partentObject ? partentObject["Departamento ID"] : false;
        d["Provincia"] = partentObject ? partentObject["Provincia"] : false;
        d["Provincia ID"] = partentObject ? partentObject["Provincia ID"] : false;
      });

      nestedResults = results.reduce((a, b) => {
        a[b.Provincia] = [...a[b.Provincia] || [], b];
        return a;
      }, {});
    }

    if (profile === "industry" && tab === "1") {
      results.length > 0 && results.forEach(d => {
        const partentObject = divisionParents.find(h => h.slug === d.id);
        d["Seccion"] = partentObject ? partentObject["Seccion"] : false;
        d["Seccion ID"] = partentObject ? partentObject["Seccion ID"] : false;
      });

      nestedResults = results.reduce((a, b) => {
        a[b.Seccion] = [...a[b.Seccion] || [], b];
        return a;
      }, {});
    }

    if (profile === "cite" && (tab === "0" || tab === "1")) {
      results.length > 0 && results.forEach(d => {
        const citeObject = d["tipo"] = citeCategories.find(h => h.slug === d.id);
        d["tipo"] = citeObject ? citeObject["Categoria"] : false;
      });

      results.sort((a, b) => a.tipo < b.tipo ? 1 : -1);
    }

    if (nestedResults) {
      return <div className="ep-profile">
          {Object.entries(nestedResults).map((d) =>
            <>
            <div className="ep-profile-parent-group">
              {profile === "geo" ? <img src={`/icons/visualizations/Departamentos/${d[1][0]["Departamento ID"]}.png`} className="ep-profile-parent-icon" /> : ""}
              {profile === "industry" ? <img src={`/icons/visualizations/Seccion CIIU/${d[1][0]["Seccion ID"]}.png`} className="ep-profile-parent-icon" /> : ""}
              <h3 className="ep-profile-parent-title">
                {profile === "geo" && tab === "2" ? `${d[0].includes("Callao") ? "Provincia Constitucional" : "Departamento"} de ${d[0]}` : ""}
                {profile === "geo" && tab === "3" ? `${d[0].includes("Callao") ? "" : "Departamento de"} ${d[0]} / ${d[1][0] ? d[1][0]["Provincia"] === "Prov. Const. del Callao" ? "" : "Provincia de" : ""} ${d[1][0]["Provincia"]}` : ""}
                {profile === "industry" && tab === "1" ? `Sección de ${d[0]}` : ""}
              </h3>
            </div>
            <div className="ep-profile-results">
              {d[1].map((h, ix) =>
                <TileV2
                  title={h.name}
                  slug={h.slug}
                  slugColor={h.background}
                  icon={false}
                  id={h.id}
                  ix={ix}
                  level={t(h.level)}
                  background={h.background}
                  lng={lng}
                  key={`explore-${h.slug}-tile-${h.id}-${ix}`}
                  layout="cols"
                />
              )}
            </div>
            </>
          )}
        {results.length > 99 && <p className="message">La consulta supera el límite de resultados, intente ingresar filtros adicionales para refinar la búsqueda.</p>}
      </div>;
    }

    else {
      return <div className="ep-profile">

        {results && results.length === 0 && !filterPanel &&
          <div className="ep-profile-no-results">
            <img className="icon" src="/icons/no-results.png" alt="" />
            <p className="message">
              {!loading ? "Lo sentimos, no hay resultados para esta búsqueda. Intente con otros parámetros o en otras secciones." : "Cargando datos..."}
            </p>
          </div>
        }

        {results && results.length > 0 &&
          <>
            <ul className="ep-profile-results">
              {results.map((d, ix) =>
                <TileV2
                  title={d.name}
                  slug={d.slug}
                  slugColor={d.background}
                  icon={false}
                  id={d.id}
                  ix={ix}
                  level={t(d.level)}
                  background={d.background}
                  lng={lng}
                  key={`explore-${d.slug}-tile-${d.id}-${ix}`}
                  layout="cols"
                />
              )}
            </ul>
            {results.length > 99 && <p className="message">La consulta supera el límite de resultados, intente ingresar filtros adicionales para refinar la búsqueda.</p>}
          </>
        }
      </div>;
    }
  }
}

ExploreProfile.defaultProps = {
  results: []
};

export default withNamespaces()(ExploreProfile);
