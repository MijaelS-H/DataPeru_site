import React, {Component} from "react";
import PropTypes from "prop-types";
import {withNamespaces} from "react-i18next";

import {dataSources} from "./dataSources.js";

import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

import "./Data.css";

class Data extends Component {
  render() {
    const {routeParams} = this.props;

    return (
      <div className="data-container container">
        <Nav
          logo={false}
          routeParams={routeParams}
          routePath={"/:lang"}
          title={""}
        />
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
                <span className="data-content-source-name">{d.name}</span>
              </div>)}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Data.contextTypes = {
  router: PropTypes.object
};

export default withNamespaces()(Data);
