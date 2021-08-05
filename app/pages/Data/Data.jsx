import React, {useState} from "react";
import {withNamespaces} from "react-i18next";

import {dataSources} from "./dataSources.js";

import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

import "./Data.css";

const Data = () => {

  const [selectedDataSource, setDatasource] = useState(dataSources[0]);

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <div className="data-container container">
      <Nav />
      <div className="data-header">
        <span className="data-header-title">Datos</span>
      </div>
      <div className="data-content">
        <div className="data-content-title">
          <img className="data-content-icon" src="/icons/data/fuentes_datos_icon.png" alt="Fuentes de Datos" />
          <span className="data-content-span">Fuentes de datos</span>
        </div>
        <div className="data-content-columns">
          <div className="data-content-sources">
            {dataSources.map((d, i) => <div className="data-content-source" key={`data-source-${i}`}>
              <a className="data-content-source-name" onClickCapture={evt => [evt.preventDefault(), setDatasource(d)]}>{d.shortname}</a>
            </div>)}
          </div>
          <div className="data-content-sources-selector">
            <span className="data-content-sources-selector-name">Fuente de datos</span>
            <select className="cp-select" value={selectedDataSource.shortname} onChange={evt => [evt.preventDefault(), setDatasource(dataSources.find(h => h.shortname === evt.target.value))]}>
              {dataSources.map((d, i) =>
                <option value={d.shortname}>{d.shortname}</option>
              )}
            </select>
          </div>
          <div className="data-content-summary">
            <h2 className="data-content-summary-title">{selectedDataSource.shortname}</h2>
            <h3 className="data-content-summary-subtitle">{selectedDataSource.name}</h3>
            {selectedDataSource.summary.map((d, i) => <p className="data-content-summary-text" key={`summary-${selectedDataSource.shortname.toLowerCase()}-${i}`}>{d}</p>)}
            <h3 className="data-content-summary-datasets-title">Set de datos</h3>
            {selectedDataSource.datasets.map((d, i) => <div className="data-content-dataset-container" key={`data-content-dataset-${i}`}>
              <div className="data-content-dataset-box">
                <img className="data-content-dataset-box-icon" src="/icons/data/nombre_dataset_icon.png" alt="Dataset" />
                {/* <a className="data-content-dataset-box-title" href={d.link}>{d.name}</a> */}
                <span className="data-content-dataset-box-title">{d.name}</span>
              </div>
              <h3 className="data-content-summary-datasets-title">Principales indicadores que puedo encontrar desde esta fuente:</h3>
              <ul className="data-content-dataset-indicator-list">
                {d.indicators.map((h, j) => <a className="data-content-dataset-indicator-name" href={h.link} key={`indicator-${j}`} target="_blank" rel="noreferrer"><li>{h.name}</li></a>)}
              </ul>
            </div>)}
            <a className="data-back-top" onClick={scrollTop} >Volver al inicio</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withNamespaces()(Data);
