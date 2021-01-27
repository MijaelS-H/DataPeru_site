import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {Geomap} from "d3plus-react";
import {hot} from "react-hot-loader/root";
import {Link} from "react-router";
import {withNamespaces} from "react-i18next";
import {fetchData} from "@datawheel/canon-core";
import {max} from "d3-array";

import {profileSearchConfig} from "helpers/search";

import HeroSearch from "../components/HeroSearch";
import Nav from "../components/Nav";

import "./Home.css";

function titleSize(title, large = false) {
  const length = title.length;
  const longestWord = max(length ? title.match(/\w+/g).map(t => t.length) : 0);
  if (length > 25 || longestWord > 25) return large ? "lg" : "xs";
  if (length > 15 && longestWord > 15) return large ? "xl" : "sm";
  if (length > 5 || longestWord > 5) return large ? "xxl" : "xxs";
  return large ? "xxl" : "lg";
}

function subtitle(entity) {
  return profileSearchConfig.subtitleFormat(entity);

}

class Home extends Component {
  state = {
    data: [],
    scrolled: false
  };

  componentDidMount = () => {
    axios.get("/api/departmentProperties").then(resp => {
      this.setState({data: resp.data.data});
    });
    window.addEventListener("scroll", this.handleScroll);
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
    const {t, lng, router, tiles} = this.props;

    let notMobile = true;
    if (typeof window !== "undefined") {
      notMobile = window.innerWidth > 768;
    }

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
                ITP<span className="hero-info-logo-peru">PRODUCE</span>
                {/* <img src="/icons/homepage/svg/logo_red.svg" alt="DataITPRedCITE" />*/}
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
                height: 600,
                shapeConfig: {
                  hoverOpacity: 0.9,
                  Path: {
                    fill: () => "#fff",
                    fillOpacity: 0.5,
                    hoverOpacity: 0.9
                  }
                },
                tooltipConfig: {
                  className: "d3plus-tooltip-home",
                  title: d => {
                    let tooltip = "<div class='d3plus-tooltip-home-title-wrapper'>";
                    tooltip += `<div class="title"><span>${d.Departamento}</span></div>`;
                    tooltip += "<div class=\"subtitle\"><span>Departamento</span></div>";
                    tooltip += "</div>";

                    return tooltip;
                  },
                  tbody: d => [
                    [`<span style="color: #bf0909;">${d["CITE Count"]}</span>`, "CITE"],
                    [`<span style="color: #bf0909;">${d["Provincia Count"]}</span>`, "Provincias"]
                  ]
                },
                topojson: "/topojson/Department.json",
                topojsonFill: "#fff",
                topojsonId: d => d.properties.CCDD,
                transition: 0,
                zoom: false
              }}
            />
          </div>
        </div>

        {tiles &&
        <ul className="home-grid">
          {tiles.map((tile, i) =>
            <li className={`home-grid-tile cms-profilesearch-tile${tile.large ? " home-grid-tile-large" : ""}${tile.new ? " home-grid-tile-new" : ""}`} key={i}>
              <Link to={tile.link} className="cms-profilesearch-tile-link">
                { tile.title
                  ? <div className="cms-profilesearch-tile-link-text">
                    <div className={`cms-profilesearch-tile-link-title heading u-font-${titleSize(tile.title, notMobile ? tile.large : false)}`}>{tile.title}</div>
                    { tile.category && <div className={`cms-profilesearch-tile-link-sub u-margin-top-xs u-font-${tile.large ? "md" : "xs"}`}>{tile.category}</div>}
                  </div>
                  : tile.entities.map((r, i) =>
                    <React.Fragment key={`tile-entity-${i}`}>
                      { i > 0 && <span className={`cms-profilesearch-tile-link-joiner display u-font-${tile.large ? "xl" : "md"}`}>&amp;</span> }
                      <div className="cms-profilesearch-tile-link-text">
                        <div className={`cms-profilesearch-tile-link-title heading u-font-${titleSize(r.title, notMobile ? tile.large : false)}`}>{r.title}</div>
                        <div className="cms-profilesearch-tile-link-sub u-margin-top-xs u-font-xs">{subtitle(r)}</div>
                      </div>
                    </React.Fragment>
                  ) }
              </Link>
              <div className="cms-profilesearch-tile-image-container">
                { tile.image
                  ? <div key={`tile-image-${i}`}
                    className="cms-profilesearch-tile-image"
                    style={{backgroundImage: `url(${tile.image})`}} />
                  : tile.entities.map((r, i) =>
                    <div key={`tile-image-${i}`}
                      className="cms-profilesearch-tile-image"
                      style={{backgroundImage: `url(api/image?slug=${r.slug}&id=${r.id}&size=thumb)`}} />
                  ) }
              </div>
            </li>
          )}
        </ul>
        }

      </div>
    );
  }
}

Home.need = [
  fetchData("homeTiles", "/api/home")
];

export default hot(withNamespaces()(
  connect(state => ({
    tiles: state.data.homeTiles,
    locale: "es"
  }))(Home)
));
