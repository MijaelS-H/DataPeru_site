import React, {Component} from "react";
import PropTypes from "prop-types";
import {withNamespaces} from "react-i18next";

import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

import "./About.css";

class About extends Component {
  render() {
    const {routeParams} = this.props;

    return (
      <div className="about-container container">
        <Nav
          logo={false}
          routeParams={routeParams}
          routePath={"/:lang"}
          title={""}
        />
        <div className="about-header">
          <span className="about-header-title">Acerca de</span>
        </div>
        <div className="about-content">
          <div className="about-itp">
            <span className="about-itp-title">Sobre ITP</span>
            <div className="about-itp-columns">
              <div className="about-itp-description">
                <p className="about-itp-description-text">
                Contribuimos a la mejora de la productividad, calidad y
                rentabilidad de las empresas a través de la provisión de
                servicios de investigación, desarrollo,innovación,
                adaptación, transformación y transferencia tecnológica
                ambientalmente sostenibles y accesibles, en coordinación
                con entidades de soporte productivo y del ecosistema de
                CTI (Ciencia Tecnología e Innovación).
                </p>
              </div>
              <div className="about-itp-highlights">
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

About.contextTypes = {
  router: PropTypes.object
};

export default withNamespaces()(About);
