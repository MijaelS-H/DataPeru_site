import React from "react";

import "./ExploreHeader.css";

/**
 * @typedef ExploreHeaderProps
 * @property {string} slug
 * @property {string} title
 * @property {boolean} isActive
 * @property {(slug: string) => void} handleTabSelected
 */

/** @type {React.FC<ExploreHeaderProps>} */
export const ExploreHeader = props => {
  const {slug, handleTabSelected} = props;

  return (
    <button
      className={`ep-header ${props.isActive ? "is-active" : "is-inactive"}`}
      onClick={() => handleTabSelected(slug)}
      key={`explore-header-btn-${slug}`}
    >
      <img className="ep-header-img" src={`/icons/explore/${slug}.svg`} alt="[Ícono]" />
      <span className="ep-header-title heading u-font-md">{props.title}</span>
    </button>
  );
};
