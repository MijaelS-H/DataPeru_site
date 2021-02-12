import {useScrollPosition} from "@n8tb1t/use-scroll-position";
import React, {useState} from "react";
import {withNamespaces} from "react-i18next";
import HeroSearch from "../../components/HeroSearch";
import HomeExplorer from "../../components/HomeExplorer";
import Nav from "../../components/Nav";

import "./style.css";

/** @type {React.FC<import("react-router").RouteComponentProps & import("react-i18next").WithNamespaces>} */
const Home = props => {
  const {t, lng, router} = props;

  const [scrolled, setScrolled] = useState(false);

  useScrollPosition(({prevPos, currPos}) => {
    if (prevPos.y > 5 && currPos.y < 5) setScrolled(false);
    else if (prevPos.y < 5 && currPos.y > 5) setScrolled(true);
  });

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
                Descubra
            </h1>
            <p className="hero-info-tagline u-font-xl">
              los principales indicadores económicos y sectoriales del Perú
            </p>
          </div>
          <div className="home-hero-search">
            <HeroSearch router={router} />
          </div>
          <div className="home-hero-logos">
            <img className="home-hero-logo-itp" src="/icons/homepage/ITP_blanco.png" />
            <img className="home-hero-logo-produccion" src="/icons/homepage/Min_produccion_logo.png" />
          </div>
        </div>
      </div>

      <HomeExplorer />

    </div>
  );
};

export default withNamespaces()(Home);
