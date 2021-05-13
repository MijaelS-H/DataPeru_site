import React from "react";

/**
 * @typedef ExploreListHeaderProps
 * @property {string} profile
 * @property {string} tab
 * @property {string} title
 * @property {any} item
 * @property {string} [className]
 */

const urls = {
  geo: value => `/icons/visualizations/Departamentos/${value["Departamento ID"]}.png`,
  industry: value => `/icons/visualizations/Seccion CIIU/${value["Seccion ID"]}.png`
}

const titles = {
  geo: {
    2: (key, value) => key.includes("Callao") ? `Provincia Constitucional de ${key}` : `Departamento de ${key}`,
    3: (key, value) => `${key.includes("Callao") ? "" : "Departamento de"} ${key} / ${value ? value["Provincia"] === "Prov. Const. del Callao" ? "" : "Provincia de" : ""} ${value["Provincia"]}`
  },
  industry: {
    1: key => `Sección de ${key}`
  }
}

/** @type {React.FC<ExploreListHeaderProps>} */
export const ExploreListHeader = props => {
  const {profile, tab, item} = props;

  const iconBuilder = urls[profile];
  const icon = typeof iconBuilder === "function" ? iconBuilder(item) : null;

  const titleBuilder = (titles[profile] || {})[tab] || titles.default;
  const title = typeof titleBuilder === "function" ? titleBuilder(props.title, item) : "";

  if (!title) {
    return null;
  }

  return (
    <div className={props.className}>
      {icon && <img src={icon} alt="[Ícono]" className="ep-profile-parent-icon" />}
      <h3 className="ep-profile-parent-title">{title}</h3>
    </div>
  );
}
