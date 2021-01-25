import React, {Component} from "react";
import axios from "axios";
import {Geomap} from "d3plus-react";
import {hot} from "react-hot-loader/root";
import {withNamespaces} from "react-i18next";

import HeroSearch from "../components/HeroSearch";
import Nav from "../components/Nav";

import "./Home.css";

class Home extends Component {
  state = {
    data: [],
    scrolled: false
  };

  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll);
    axios.get("/api/departmentProperties").then(resp => {
      this.setState({data: resp.data.data});
    });
  }

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 5) {
      this.setState({scrolled: true});
    }
    else {
      this.setState({scrolled: false});
    }
  };

  render() {
    const {data, scrolled} = this.state;
    const {t, lng, router} = this.props;

    return (
      <div className="home">

        <Nav
          className={scrolled ? "background" : ""}
          logo={false}
          routeParams={router.params}
          routePath={"/:lang"}
          title={""}
        />

        <div className="home-hero" style={{backgroundImage: "url(/images/background-dpe.jpg)"}}>
          <div className="home-hero-index">
            <div className="home-hero-info">
              <h1 className="hero-info-logo">
                <img src="/icons/homepage/svg/logo_red.svg" alt="DataITPRedCITE" />
              </h1>
              <p className="hero-info-tagline u-font-xl">
              Plataforma digital para la visualización de indicadores económicos y sectoriales del Perú
              </p>
            </div>
            <div className="home-hero-search">
              <HeroSearch router={router} />
            </div>
          </div>
          <div className="home-hero-map">
            <Geomap
              config={{
                data,
                forceUpdate: true,
                groupBy: "Departamento ID",
                height: 400,
                shapeConfig: {
                  fillOpacity: 0.5,
                  hoverOpacity: 0.9,
                  Path: {
                    fillOpacity: 0.5,
                    hoverOpacity: 0.9
                  },
                  Shape: {
                    fill: "#ccc",
                    hoverOpacity: 1
                  }
                },
                tooltipConfig: {
                  title: d => {
                    let tooltip = "<div class='d3plus-tooltip-home.title-wrapper'>";
                    tooltip += `<div class="title"><span>${d.Departamento}</span></div>`;
                    tooltip += "<div class=\"subtitle\"><span>Departamento</span></div>";
                    tooltip += "</div>";

                    return tooltip;
                  },
                  tbody: d => [
                    ["Cantidad CITE", d["CITE Count"]],
                    ["Cantidad Provincias", d["Provincia Count"]]
                  ]
                },
                topojson: "/topojson/Department.json",
                topojsonId: d => d.properties.CCDD,
                transition: 0,
                zoom: false
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(hot(Home));
