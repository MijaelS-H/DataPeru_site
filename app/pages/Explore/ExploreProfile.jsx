import React, {forwardRef, Fragment, useMemo, useRef} from "react";
import {withNamespaces} from "react-i18next";
import {VirtuosoGrid} from "react-virtuoso";
import {ExploreListHeader} from "./ExploreListHeader";
import TileV2, {TileV2Content, TileV2Placeholder, TileV2Wrapper} from "$app/components/TileV2";

import "./ExploreProfile.css";

import citeCategories from "$root/static/data/CITE_dict.json";
import districtParents from "$root/static/data/Distrito_dict.json";
import divisionParents from "$root/static/data/Division_dict.json";
import provinceParents from "$root/static/data/Provincia_dict.json";


/**
 * @typedef ExploreProfileProps
 * @property {boolean} isLoading
 * @property {string} profile
 * @property {string} id
 * @property {string} tab
 * @property {any[]} results
 * @property {boolean} filterPanel
 */

/** @type {React.FC<ExploreProfileProps & import("react-i18next").WithNamespaces>} */
const ExploreProfile = props => {
  const {results, t, isLoading, profile, tab} = props;

  const nestedResults = useMemo(() => {
    if (profile === "geo") {
      if (tab === "2") {
        results.length > 0 && results.forEach(d => {
          const partentObject = provinceParents.find(h => h.slug === d.id);
          d["Departamento"] = partentObject ? partentObject["Departamento"] : false;
          d["Departamento ID"] = partentObject ? partentObject["Departamento ID"] : false;
        });
        return results.reduce((a, b) => {
          a[b.Departamento] = [...a[b.Departamento] || [], b];
          return a;
        }, {});
      }

      if (tab === "3") {
        results.length > 0 && results.forEach(d => {
          const partentObject = districtParents.find(h => h.slug === d.id);
          d["Departamento"] = partentObject ? partentObject["Departamento"] : false;
          d["Departamento ID"] = partentObject ? partentObject["Departamento ID"] : false;
          d["Provincia"] = partentObject ? partentObject["Provincia"] : false;
          d["Provincia ID"] = partentObject ? partentObject["Provincia ID"] : false;
        });

        return results.reduce((a, b) => {
          a[b.Provincia] = [...a[b.Provincia] || [], b];
          return a;
        }, {});
      }
    }

    if (profile === "industry" && tab === "1") {
      results.length > 0 && results.forEach(d => {
        const partentObject = divisionParents.find(h => h.slug === d.id);
        d["Seccion"] = partentObject ? partentObject["Seccion"] : false;
        d["Seccion ID"] = partentObject ? partentObject["Seccion ID"] : false;
      });

      return results.reduce((a, b) => {
        a[b.Seccion] = [...a[b.Seccion] || [], b];
        return a;
      }, {});
    }

    return undefined;
  }, [profile, tab, results]);


  if (results.length === 0 && !props.filterPanel) {
    const message = isLoading
      ? "Cargando datos..."
      : "Lo sentimos, no hay resultados para esta búsqueda. Intente con otros parámetros o en otras secciones.";

    return (
      <div className="ep-profile">
        <div className="ep-profile-no-results">
          {!isLoading && <img className="icon" src="/icons/no-data.png" alt="[Icon for no results]" />}
          <p className="message">{message}</p>
        </div>
      </div>
    );
  }

  if (profile === "cite" && ["0", "1"].includes(tab)) {
    results.length > 0 && results.forEach(d => {
      const citeObject = d["tipo"] = citeCategories.find(h => h.slug === d.id);
      d["tipo"] = citeObject ? citeObject["Categoria"] : false;
    });
    results.sort((a, b) => a.tipo < b.tipo ? 1 : -1);
  }

  if (nestedResults) {
    return (
      <div className="ep-profile">
        {Object.entries(nestedResults).map((result) =>
          <Fragment>
            <ExploreListHeader
              key={`title-${result[0]}`}
              className="ep-profile-parent-group"
              profile={profile}
              tab={tab}
              title={result[0]}
              item={result[1][0]}
            />
            <div key={`results-${result[0]}`} className="ep-profile-results">
              {result[1].map((h, ix) =>
                <TileV2
                  id={h.id}
                  key={`explore-${h.slug}-tile-${h.id}-${ix}`}
                  layout="cols"
                  level={t(h.level)}
                  slug={h.slug}
                  slugColor={h.background}
                  title={h.name}
                />
              )}
            </div>
          </Fragment>
        )}
      </div>
    );
  }

  if (results.length < 200) {
    return (
      <div className="ep-profile">
        <ul className="ep-profile-results">
          {results.map((result, ix) =>
            <TileV2Wrapper
              layout="cols"
              key={`explore-${result.slug}-tile-${result.id}-${ix}`}
            >
              <TileV2Content
                id={result.id}
                level={t(result.level)}
                slug={result.slug}
                slugColor={result.background}
                title={result.name}
              />
            </TileV2Wrapper>
          )}
        </ul>
      </div>
    );
  }

  return (
    <div className="ep-profile virtual-list">
      <VirtuosoGrid
        totalCount={results.length}
        overscan={40}
        components={{
          Item: props => <TileV2Wrapper layout="cols" {...props}>{props.children}</TileV2Wrapper>,
          List: forwardRef((props, ref) => (
            <ul ref={ref} className="ep-profile-results" style={props.style}>
              {props.children}
            </ul>
          )),
          ScrollSeekPlaceholder: props => <TileV2Placeholder style={props.style} layout="cols" />,
        }}
        computeItemKey={ix => {
          const result = results[ix];
          return `explore-${result.slug}-tile-${result.id}-${ix}`
        }}
        itemContent={ix => {
          const result = results[ix];
          return (
            <TileV2Content
              id={result.id}
              level={t(result.level)}
              slug={result.slug}
              slugColor={result.background}
              title={result.name}
            />
          );
        }}
        scrollSeekConfiguration={{
          enter: velocity => Math.abs(velocity) > 5000,
          exit: velocity => Math.abs(velocity) < 100,
          // change: (_, range) => console.log({ range }),
        }}
        useWindowScroll
      />
    </div>
  );
}

ExploreProfile.defaultProps = {
  results: []
};

export default withNamespaces()(ExploreProfile);
