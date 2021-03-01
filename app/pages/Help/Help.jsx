import React, {useState} from "react";
import clns from "classnames";
import * as d3plus from "d3plus-react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

import {vizOptions} from "./constVizOptions.js";

import "./Help.css";

const Help = () => {

  const [vizConfig, setVizConfig] = useState({
    height: 450,
    legendConfig: {
      shapeConfig: {
        fill: "D3PLUS-COMMON-RESET"
      }
    },
    shapeConfig: {
      fill: "D3PLUS-COMMON-RESET"
    },
    stacked: false,
    tooltipConfig: {
      tbody: [
        ["Valor", d => d.y]
      ]
    },
    xConfig: {
      barConfig: {
        stroke: "#919295",
        strokeWidth: 0.5
      },
      shapeConfig: {
        fill: "#919295",
        stroke: "#919295",
        labelConfig: {
          fontColor: "#919295"
        }
      }
    },
    yConfig: {
      barConfig: {
        stroke: "#919295",
        strokeWidth: 0.5
      },
      shapeConfig: {
        fill: "#919295",
        stroke: "#919295",
        labelConfig: {
          fontColor: "#919295"
        }
      },
      tickFormat: d => d
    }
  });
  const [data, setVizData] = useState([
    {id: "alpha", x: 4, y: 7},
    {id: "alpha", x: 5, y: 25},
    {id: "alpha", x: 6, y: 13},
    {id: "beta",  x: 4, y: 17},
    {id: "beta",  x: 5, y: 8},
    {id: "beta",  x: 6, y: 13}
  ]);

  const [howToRead, setHowtoReadText] = useState([
    "El gráfico de barras clásico utiliza barras horizontales o verticales para mostrar comparaciones numéricas discretas entre categorías. Un eje del gráfico muestra las categorías específicas que se están comparando y el otro eje representa una escala de valores discretos.",
    "Los gráficos de barra se distinguen de los histogramas porque no muestran desarrollos contínuos durante un intervalo. Los datos discretos del gráfico de barras son datos categóricos y, por lo tanto, responden a la pregunta de '¿cuántos? en cada categoría."
  ]);
  const [howToUse, setHowToUseText] = useState([
    "Un defecto importante de los gráficos de barra es que el etiquetado se vuelve problemático cuando hay una gran cantidad de barras."
  ]);
  const [useTabs, setTabs] = useState([
    "Comparaciones",
    "Patrones"
  ]);
  const [links, setLinks] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [selectedVizType, selectVizOption] = useState("Bar chart");
  const [type, setVizType] = useState("BarChart");

  const pickViz = viz => {
    selectVizOption(viz.item);
    setVizConfig(viz.config);
    setVizData(viz.data);
    setVizType(viz.type);
    setNodes(viz.nodes);
    setLinks(viz.links);
    setHowtoReadText(viz.howTexts);
    setHowToUseText(viz.useTexts);
    setTabs(viz.useTabs);
  };

  const Visualization = d3plus[type];

  return (
    <div className="help-container">
      <Nav />

      <div className="help-content">
        <h1 className="help-header">Ayuda</h1>
        <h2 className="help-sub-header">Catálogo de visualizaciones</h2>

        <div className="help-content-columns">
          <div className="help-content-column-left">
            <h2 className="help-content-column-left-title">Catálogo de visualizaciones</h2>
            <h3 className="help-content-column-left-subtitle">Tipologías</h3>
            <div className="help-content-viz-options">
              {vizOptions.map((d, i) =>
                <a className="help-content-viz-option-box" key={i} href={`#${d.type}`} onClickCapture={evt => [evt.preventDefault(), pickViz(d)]}>
                  <img className="help-content-viz-option-icon" src={selectedVizType === d.item ? d.activeIcon : d.inactiveIcon} alt={d.item} />
                  <span className={clns("help-content-viz-option-label", {active: selectedVizType === d.item})}>{d.item}</span>
                </a>
              )}
            </div>
          </div>
          <div className="help-content-column-right">
            <h2 className="help-content-column-right-title">{selectedVizType}</h2>
            <div className="help-content-column-right-viz">
              {<Visualization
                config={{
                  data,
                  links,
                  nodes,
                  ...vizConfig
                }}
              />}
            </div>
            <div className="help-content-column-right-how">
              <h4 className="help-content-column-right-subtitle">
                Cómo interpretar y leer esta visualización
              </h4>
              {howToRead.map((d, i) => <p className="help-content-column-right-content" key={i}>{d}</p>)}
            </div>
            { useTabs &&
              <div className="help-content-column-right-uses">
                <h4 className="help-content-column-right-subtitle">
                  Usos o funciones
                </h4>
                {howToUse.map((d, i) => <p className="help-content-column-right-content" key={i}>{d}</p>)}
              </div>
            }
            <div className="help-content-column-right-tabs">
              {useTabs.map((d, i) => <p className="help-content-column-right-tab" key={i}>{d}</p>)}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
