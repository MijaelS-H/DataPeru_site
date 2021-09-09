import React from "react";
import {withNamespaces} from "react-i18next";
import Nav from "$app/components/Nav";
import HeroSearch from "$app/pages/Home/HeroSearch";
import HomeAbout from "./HomeAbout";
import SectionHero from "./SectionHero";
import HomeExplore from "./HomeExplore";
import HelmetWrapper from "../HelmetWrapper";
import Footer from "$app/components/Footer";

import "./style.css";

/** @type {React.FC<import("react-router").RouteComponentProps & import("react-i18next").WithNamespaces>} */
const Home = props => {
  const {t, lng, router} = props;

  const labels = {
    title: "ITP Producción",
    desc: "ITP Producción es un esfuerzo de integración, visualización y distribución de datos públicos del Perú desarrollado por Ministerio de la Producción, el Instituto Tecnológico de la Producción y Datawheel, que busca apoyar la formulación de políticas públicas a través de la identificación de clústeres y brechas de productividad.",
    img: "/images/datos/willian-justen-de-vasconcellos-g_1mAmAAG0k-unsplash_1.jpg"
  };

  const share = {
    title: labels.title,
    desc: labels.desc,
    img: labels.img
  };

  return (
    <div className="home">

      <HelmetWrapper info={share} />

      <Nav
        logo={false}
        routeParams={router.params}
        routePath={"/:lang"}
        title={""}
      />

      <SectionHero>
        <HeroSearch router={router} />
      </SectionHero>

      <HomeAbout />

      <HomeExplore />

      <Footer />
    </div>
  );
};

export default withNamespaces()(Home);
