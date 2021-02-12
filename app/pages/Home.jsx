import React, {Component} from "react";
import {hot} from "react-hot-loader/root";
import {withNamespaces} from "react-i18next";

import HomeExplorer from "../components/HomeExplorer";
import HeroSearch from "../components/HeroSearch";
import Nav from "../components/Nav";

import "./Home.css";

class Home extends Component {
  state = {
    scrolled: false
  };

  componentDidMount = () => {
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
    const {scrolled} = this.state;
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
  }
}

export default withNamespaces()(hot(Home));
