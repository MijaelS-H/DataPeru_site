import React, {useState} from "react";
import clns from "classnames";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

import {vizOptions} from "./constVizOptions.js";

import "./Help.css";

const Help = () => {

  const [selectedVizType, selectVizOption] = useState("Bar chart");

  const pickViz = viz => {
    selectVizOption(viz);
  };

  return (
    <div className="help-container">
      <Nav />

      <div className="help-content">
        <h1 className="help-header">Ayuda</h1>

        <div className="help-content-columns">
          <div className="help-content-column-left">
            <h2 className="help-content-column-left-title">Catálogo de visualizaciones</h2>
            <span className="help-content-column-left-subtitle">Tipologías</span>
            <div className="help-content-viz-options">
              {vizOptions.map((d, i) =>
                <a className="help-content-viz-option-box" key={i} href="#" onClickCapture={evt => [evt.preventDefault(), pickViz(d.item)]}>
                  <img className="help-content-viz-option-icon" src={selectedVizType === d.item ? d.activeIcon : d.inactiveIcon} alt={d.item} />
                  <span className={clns("help-content-viz-option-label", {active: selectedVizType === d.item})}>{d.item}</span>
                </a>
              )}
            </div>
          </div>
          <div className="help-content-column-right">
            <h2 className="help-content-column-right-title">{selectedVizType}</h2>
            <div className="help-content-column-right-viz">
              Visualización
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
