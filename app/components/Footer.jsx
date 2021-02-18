import React from "react";
import {withNamespaces} from "react-i18next";

import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-nav">
          <div className="footer-nav-header">
            <img className="footer-nav-header-image" src="/icons/logo_ITPProduccion.svg" alt="ITP Producción" />
            <span className="footer-nav-header-text">producción, innovación y transformación tecnológica</span>
          </div>
          <div className="footer-nav-elements">
            <a className="footer-nav-element" href="/">
              Inicio
            </a>
            <a className="footer-nav-element" href="/explore">
              Explorador
            </a>
            <a className="footer-nav-element" href="/about">
              Acerca de
            </a>
            <a className="footer-nav-element" href="/datos">
              Datos
            </a>
            <a className="footer-nav-element" href="/ayuda">
              Ayuda
            </a>
          </div>
        </div>
        <div className="footer-logos">
          <div className="footer-logos-left">
            <div className="footer-logos-team">
              <span className="footer-logos-header">Desarrollado por</span>
              <div className="footer-logos-team-box">
                <img className="footer-logo-itp" src="/icons/footer/ITP_blanco.svg" alt="ITP" />
                <img className="footer-logo-produce" src="/icons/footer/Min_produccion_logo.png" alt="PRODUCE" />
                <img className="footer-logo-dw" src="/icons/footer/dw_blanco.svg" alt="Datawheel" />
              </div>
            </div>
            <div className="footer-logos-support">
              <span className="footer-logos-header">Apoyado por</span>
              <img className="footer-logo-bid" src="/icons/footer/BID_logo.png" alt="BID" />
            </div>
          </div>
          <div className="footer-logos-right">
            <div className="footer-logos-partners">
              <span className="footer-logos-header">En coordinación con</span>
              <div className="footer-logos-partners-box">
                <img className="footer-logo-mef" src="/icons/footer/Min_economia_y_finanzas_logo.png" alt="MEF" />
                <img className="footer-logo-mincul" src="/icons/footer/Min_Cultura_logo.png" alt="MINCUL" />
                <img className="footer-logo-midagri" src="/icons/footer/Min_Agricultura_logo.png" alt="MIDAGRI" />
                <img className="footer-logo-inei" src="/icons/footer/INEI_logo.png" alt="INEI" />
              </div>
            </div>
            <div className="footer-contact">
              contacto@itp.gob.pe
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Footer.defaultProps = {};

export default withNamespaces()(Footer);
