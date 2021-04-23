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
                <a href="https://www.gob.pe/itp" target="_blank">
                  <img className="footer-logo-itp" src="/icons/footer/ITP_color.png" alt="ITP"/>
                </a>
                <a href="https://www.gob.pe/produce" target="_blank">
                  <img className="footer-logo-produce" src="/icons/footer/Min_produccion_logo.png" alt="PRODUCE" />
                </a>
                <a href="https://www.datawheel.us/" target="_blank">
                  <img className="footer-logo-dw" src="/icons/footer/dw_blanco.svg" alt="Datawheel" />
                </a>
              </div>
            </div>
            <div className="footer-logos-support">
              <div className="footer-logos-support-box">
                <span className="footer-logos-header">Apoyado por</span>
                <a href="https://www.iadb.org/es" target="_blank">
                  <img className="footer-logo-bid" src="/icons/footer/BID_logo.png" alt="BID" />
                </a>
              </div>
              <div className="footer-logos-support-box">
                <span className="footer-logos-header">En el marco de</span>
                <a href="https://bicentenario.gob.pe/" target="_blank">
                  <img className="footer-logo-bicentenario" src="/icons/footer/logo_bicentenario_peru.png" alt="Bicentenario Perú" />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-logos-right">
            <div className="footer-logos-partners">
              <span className="footer-logos-header">En coordinación con</span>
              <div className="footer-logos-partners-box">
                <a href="https://www.gob.pe/mef" target="_blank">
                  <img className="footer-logo-mef" src="/icons/footer/Min_economia_y_finanzas_logo.png" alt="MEF" />
                </a>
                <a href="https://www.gob.pe/cultura" target="_blank">
                  <img className="footer-logo-mincul" src="/icons/footer/Min_Cultura_logo.png" alt="MINCUL" />
                </a>
                <a href="https://www.gob.pe/midagri" target="_blank">
                  <img className="footer-logo-midagri" src="/icons/footer/Min_Agricultura_logo.png" alt="MIDAGRI" />
                </a>
                <a href="https://www.inei.gob.pe/" target="_blank">
                  <img className="footer-logo-inei" src="/icons/footer/INEI_logo.png" alt="INEI" />
                </a>
              </div>
            </div>
            <div className="footer-logos-support">
              <span className="footer-logos-header">Apoyado por</span>
              <img className="footer-logo-bid" src="/icons/footer/BID_logo.png" alt="BID" />
            </div>
            <div className="footer-logos-support">
              <span className="footer-logos-header">En el marco de</span>
              <img className="footer-logo-bicentenario" src="/icons/footer/logo_bicentenario_peru.png" alt="Bicentenario Perú" />
            </div>
            <div className="footer-contact">
              <img className="footer-contact-icon" src="/icons/footer/mail_icon.svg" />
              <a className="footer-contact-text" href="mailto:contacto@itp.gob.pe?Subject=ITPProducción">contacto@itp.gob.pe</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Footer.defaultProps = {};

export default withNamespaces()(Footer);
