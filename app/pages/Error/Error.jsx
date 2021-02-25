import React, {Component} from "react";
import PropTypes from "prop-types";
import {withNamespaces} from "react-i18next";

import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

import "./Error.css";

class Error extends Component {
  render() {
    const {t, errorType, locale, route, routeParams} = this.props;

    return (
      <div className="error">
        <Nav
          logo={false}
          routeParams={routeParams}
          routePath={"/:lang"}
          title={""}
        />
        <div className="error-header container">
          <h1 className="error-header-title u-font-xxl">{errorType}</h1>
          <p className="error-header-description">Página no encontrada</p>
          <a className="error-header-redirect" href="/">Volver al Inicio</a>
        </div>
        <Footer />
      </div>
    );
  }
}

Error.contextTypes = {
  router: PropTypes.object
};

Error.defaultProps = {
  locale: "es",
  errorType: "404"
};

export default withNamespaces()(Error);
