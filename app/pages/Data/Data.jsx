import React, {useState} from "react";
import PropTypes from "prop-types";
import {withNamespaces} from "react-i18next";

import {dataSources} from "./dataSources.js";

import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

import "./Data.css";

const Data = () => {

  const [selectedDataSource, setDatasource] = useState({
    id: 1,
    name: "Consejo Nacional de Ciencia, Tecnología e Innovación Tecnológica",
    shortname: "CONCYTEC",
    summary: [
      "El CONCYTEC es el órgano rector del SINACYT, encargado de dirigir, fomentar, coordinar, supervisar y evaluar las acciones de Estado en todo el país en el ámbito de la ciencia, tecnología e innovación tecnológica; orienta las acciones del sector privado; y ejecuta acciones de soporte que impulsen el desarrollo científico y tecnológico del país.",
      "Consejo Nacional de Ciencia, Tecnología e Innovación Tecnológica (CONCYTEC) es una entidad adscrita a Presidencia del Consejo de Ministros."
    ],
    datasets: [
      {
        name: "Censo Nacional de Investigación y Desarrollo",
        link: "",
        indicators: [
          {
            name: "Número de Centros de Investigación según clasificación",
            link: ""
          },
          {
            name: "Gasto promedio en I+D en Centros de Investigación",
            link: ""
          },
          {
            name: "Centros de Investigación que incurrieron en gastos de I+D",
            link: ""
          },
          {
            name: "Total gasto corriente y de inversión en I+D según destino en 2014 y 2015",
            link: ""
          },
          {
            name: "Número de proyectos de investigación iniciados en 2014 y 2015, según área de conocimiento",
            link: ""
          }
        ]
      }
    ]
  });

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
          <div className="data-content-summary">
            <h2 className="data-content-summary-title">{selectedDataSource.shortname}</h2>
            <h3 className="data-content-summary-subtitle">{selectedDataSource.name}</h3>
            {selectedDataSource.summary.map((d, i) => <p className="data-content-summary-text" key={`summary-${selectedDataSource.shortname.toLowerCase()}-${i}`}>{d}</p>)}
            <h3 className="data-content-summary-datasets-title">Datasets</h3>
            {selectedDataSource.datasets.map((d, i) => <div className="data-content-dataset-container" key={`data-content-dataset-${i}`}>
              <div className="data-content-dataset-box">
                <img className="data-content-dataset-box-icon" src="/icons/data/nombre_dataset_icon.png" alt="Dataset" />
                <a className="data-content-dataset-box-title" href={d.link}>{d.name}</a>
              </div>
              <h3 className="data-content-summary-datasets-title">¿Qué indicadores puedo encontrar desde esta fuente</h3>
              <ul className="data-content-dataset-indicator-list">
                {d.indicators.map((h, j) => <a className="data-content-dataset-indicator-name" href={h.link} key={`indicator-${j}`} target="_blank" rel="noreferrer"><li>{h.name}</li></a>)}
              </ul>
            </div>)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withNamespaces()(Data);
