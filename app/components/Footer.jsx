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
            <h4 className="footer-logos-header">Desarrolado por:</h4>
            <div className="footer-logos-left-grid">
              <a className="left-item-1" href="https://www.gob.pe/produce" target="_blank">
                <img className="footer-logo-produce" src="/icons/footer/Min_produccion_logo.png" alt="PRODUCE" />
              </a>
              <a className="left-item-2" href="https://www.gob.pe/itp" target="_blank">
                <img className="footer-logo-itp" src="/icons/homepage/logos_peru-itp.png" alt="ITP" />
              </a>
              <a className="left-item-3" href="https://bicentenario.gob.pe/" target="_blank">
                <img className="footer-logo-bicentenario" src="/icons/footer/logo_bicentenario_peru.png" alt="Bicentenario Perú" />
              </a>
            </div>
          </div>
          <div className="footer-logos-right">
            <h4 className="footer-logos-header">En coordinación con:</h4>
            <div className="footer-logos-right-grid">
              <a className="right-item-1" href="https://www.gob.pe/mef" target="_blank">
                <img className="footer-logo-mef" src="/icons/footer/Min_economia_y_finanzas_logo.png" alt="MEF" />
              </a>
              <a className="right-item-2" href="https://www.gob.pe/cultura" target="_blank">
                <img className="footer-logo-mincul" src="/icons/footer/Min_Cultura_logo.png" alt="MINCUL" />
              </a>
              <a className="right-item-3" href="https://www.gob.pe/midagri" target="_blank">
                <img className="footer-logo-midagri" src="/icons/footer/Min_Agricultura_logo.png" alt="MIDAGRI" />
              </a>
              <a className="right-item-4" href="https://www.gob.pe/concytec" target="_blank">
                <img className="footer-logo-concytec" src="/icons/footer/logo-concytec_horizontal-blanco.png" alt="CONCYTEC" />
              </a>
              <a className="right-item-5" href="https://www.iadb.org/es" target="_blank">
                <img className="footer-logo-bid" src="/icons/footer/BID_logo.png" alt="BID" />
              </a>
              <a className="right-item-6" href="https://www.datawheel.us/" target="_blank">
                <img className="footer-logo-dw" src="/icons/footer/dw_blanco.svg" alt="Datawheel" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Footer.defaultProps = {};

export default withNamespaces()(Footer);
