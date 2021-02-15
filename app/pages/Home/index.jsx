import React from "react";
import {withNamespaces} from "react-i18next";
import Nav from "$app/components/Nav";
import HeroSearch from "$app/pages/Home/HeroSearch";
import SectionHero from "./SectionHero";

import "./style.css";

/** @type {React.FC<import("react-router").RouteComponentProps & import("react-i18next").WithNamespaces>} */
const Home = props => {
  const {t, lng, router} = props;

  return (
    <div className="home">
      <Nav
        logo={false}
        routeParams={router.params}
        routePath={"/:lang"}
        title={""}
      />

      <SectionHero>
        <HeroSearch router={router} />
      </SectionHero>
    </div>
  );
};

export default withNamespaces()(Home);
