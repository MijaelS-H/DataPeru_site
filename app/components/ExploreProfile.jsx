
import React from "react";
import {withNamespaces} from "react-i18next";

import TileV2 from "./TileV2";
import "./ExploreProfile.css";

class ExploreProfile extends React.Component {
  render() {
    const {filterPanel, lng, results, t, loading} = this.props;

    return <div className="ep-profile">

      {results && results.length === 0 && !filterPanel &&
          <div className="ep-profile-no-results">
            <img className="icon" src="/icons/no-results.png" alt=""/>
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
            {results.length > 99 && <p className="message">{"La consulta supera los 100 resultados, intente ingresar filtros adicionales para refinar la búsqueda."}</p>}
          </>
      }
    </div>;
  }
}

ExploreProfile.defaultProps = {
  results: []
};

export default withNamespaces()(ExploreProfile);
