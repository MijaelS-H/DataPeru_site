import React from "react";
import {withNamespaces} from "react-i18next";

import {aboutSections} from "./constsAbout.js";

import "./HomeAbout.css";

class HomeAbout extends React.Component {
  render() {
    return (
      <div className="home-about-container">
        <div className="home-about-icon">
          <span className="home-about-icon-word">Sobre</span>
          <img className="home-about-icon-image" src="/icons/logo_ITPProduccion.svg" alt="ITP Producción" />
        </div>

        <p className="home-about-disclaimer">producción, innovación y transformación tecnológica</p>

        <p className="home-about-description">
          Destacando a nivel nacional y sectorial un análisis a las unidades productivas del Perú
          en temáticas tales como economía, empleo, acceso a financiamiento de las empresas, I+D+i, educación,
          tecnologías de la información y comunicaciones, presupuestos e inversión, entre otras.
        </p>

        <div className="home-about-sections">
          {aboutSections.map((d, i) =>
            <div className="home-about-item" key={i}>
              <img className="home-about-item-icon" src={d.icon} alt={d.item} />
              <span className="home-about-item-text">{d.item}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

HomeAbout.defaultProps = {};

export default withNamespaces()(HomeAbout);
