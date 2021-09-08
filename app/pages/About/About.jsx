import React, {Component} from "react";
import PropTypes from "prop-types";
import {withNamespaces} from "react-i18next";

import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import HelmetWrapper from "../HelmetWrapper";

import "./About.css";

class About extends Component {
  render() {
    const {routeParams} = this.props;

    return (
      <div className="about-container container">
        <HelmetWrapper info={{
          title: "Acerca de",
          desc: "Conozca acerca del ITP y su rol en el desarollo de la productividad, calidad y rentabilidad de las empresas mediante ITP Producción.",
          img: "/images/about/mckayla-crump-hjanvZlqoB8-unsplash.jpg"
        }} />

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
                  servicios de investigación, desarrollo, innovación,
                  adaptación, transformación y transferencia  tecnológica
                  ambientalmente sostenibles y accesibles, en coordinación
                  con entidades de soporte productivo y del ecosistema de
                  CTI (Ciencia Tecnología e Innovación).
                </p>
                <p className="about-itp-description-text">
                  A través de los servicios de los CITE (Centros de Innovación
                  Productiva y Transferencia Tecnológica), aseguramos el
                  cumplimiento de las normas técnicas, las buenas prácticas
                  y estándares de calidad que permiten a las empresas
                  desarrollar productos de mejor calidad y aprovechar las
                  oportunidades de los mercados a nivel nacional e
                  internacional.
                </p>
                <p className="about-itp-description-text">
                  Cada CITE es un punto de encuentro entre el Estado,
                  la academia y el sector privado que articula con el resto
                  de elementos del sistema de innovación de las cadenas
                  productivas.
                </p>
                <p className="about-itp-description-text">
                  De esta manera, aportamos a la visión del Ministerio de
                  la Producción (PRODUCE), la cual busca que las empresas
                  produzcan y accedan a mercados de manera sostenible,
                  competitiva y con altos niveles de productividad.
                </p>
                <p className="about-itp-description-text">
                  Instituto Tecnológico de la Producción (ITP) es una entidad
                  adscrita a Ministerio de la Producción.
                </p>
              </div>
              <div className="about-itp-highlights">
                <div className="about-itp-highlights-box">
                  <img className="about-itp-box-image" src="/icons/about/vision_icon.png" alt="Visión" />
                  <div className="about-itp-box-description">
                    <span className="about-itp-box-title">Visión</span>
                    <p className="about-itp-box-value">
                      Queremos impulsar la innovación y transferencia tecnológica, facilitar la
                      investigación aplicada y la difusión de conocimientos tecnológicos para
                      fomentar el desarrollo productivo del país.
                    </p>
                  </div>
                </div>
                <div className="about-itp-highlights-box">
                  <img className="about-itp-box-image" src="/icons/about/mision_icon.png" alt="Misión" />
                  <div className="about-itp-box-description">
                    <span className="about-itp-box-title">Misión</span>
                    <p className="about-itp-box-value">
                      Nuestra misión es presentar una mirada amplia e informada dentro del
                      campo de la productividad, con innovación, tecnología y calidad.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-itp-produccion">
              <span className="about-itp-produccion-title">Enfoques</span>
              <p className="about-itp-produccion-description">
                El Instituto Tecnológico de la Producción (ITP) pone a disposición de los investigadores,
                y al público en general, ITP Producción, plataforma que funciona como un centro de recursos
                para la investigación e innovación, a través de una profundización en los siguientes temas:
              </p>
              <div className="about-topics-highlights-box">
                <div className="about-topics-item">
                  <div className="about-topics-element">
                    <img className="about-topics-element-icon" src="/icons/about/produccion_y_economia_icon.png" alt="Producción y Economía" />
                    <span className="about-topics-element-title">Producción y Economía</span>
                  </div>
                  <div className="about-topics-description">
                    A través del análisis de múltiples fuentes de información relacionadas a economía, empleo, salud,
                    educación, demografía, hogares, gobierno, industrias, cultura, I+D y Red CITE a múltiples niveles geográficos,
                    ITP Producción promueve el acceso a información tecnológica y de mercado, facilitando el acceso a información
                    estratégica, impulsando así la productividad y la economía a múltiples niveles territoriales.
                  </div>
                </div>

                <div className="about-topics-item">
                  <div className="about-topics-element">
                    <img className="about-topics-element-icon" src="/icons/about/unidades_sectoriales_icon.png" alt="Unidades Sectoriales" />
                    <span className="about-topics-element-title">Unidades Sectoriales</span>
                  </div>
                  <div className="about-topics-description">
                    A través del análisis de indicadores relacionados a industrias presentes dentro del territorio nacional
                    en áreas tales como organización y cultura empresarial, mercado, tecnología, exportaciones, gestión ambiental,
                    seguridad, entre otros, ITP Producción promueve el acceso a la información económica desde un punto de vista
                    sectorial, apoyando la toma de decisiones de inversionistas, directores y emprendedores.
                  </div>
                </div>

                <div className="about-topics-item">
                  <div className="about-topics-element">
                    <img className="about-topics-element-icon" src="/icons/about/innovacion_transferencia_icon.png" alt="Innovación/Transferencia" />
                    <span className="about-topics-element-title">Innovación y Transferencia</span>
                  </div>
                  <div className="about-topics-description">
                    A través del análisis de indicadores relacionados a la Red CITE, con el objetivo de consolidar un ecosistema
                    productivo a través de la transferencia de capacidades, información y recursos disponibles en la Red CITE pública y privada.
                    Así mismo, se fomenta la transparencia de datos de la Red CITE hacia el público general con el objetivo de apoyar la Estrategia
                    Nacional de Datos Abiertos Gubernamentales y el Modelo de Datos Abiertos Gubernamentales del Perú.
                  </div>
                </div>
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
