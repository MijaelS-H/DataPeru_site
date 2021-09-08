import Footer from "$app/components/Footer";
import Nav from "$app/components/Nav";
import {commas} from "$app/helpers/utils";
import {Button, InputGroup} from "@blueprintjs/core";
import clsx from "classnames";
import React, {useMemo, useState} from "react";
import {withNamespaces} from "react-i18next";
import HelmetWrapper from "../HelmetWrapper";
import {diacriticsFix, profilesList} from "./consts";
import {ExploreHeader} from "./ExploreHeader";
import ExploreProfile from "./ExploreProfile";
import {useSearchQuery} from "./useSearchQuery";

import "./Explore.css";

/** @type {React.FC<import("react-router").RouteComponentProps & import("react-i18next").WithNamespaces>} */
const ExplorePage = props => {
  const {t, route, routeParams, location} = props;

  const [profile, setProfile] = useState(`${location.query.profile || "filter"}`);
  const [tab, setTab] = useState(`${location.query.tab || "0"}`);
  const [query, setQuery] = useState(`${location.query.q || ""}`);

  const [isLoading, results] = useSearchQuery(profile, tab, query);

  const headers = useMemo(() => {
    const changeProfile = profile => {
      setProfile(profile);
      setTab("0");
    };
    return Object.keys(profilesList).map(sectionSlug =>
      <ExploreHeader
        handleTabSelected={changeProfile}
        isActive={sectionSlug === profile}
        key={sectionSlug}
        slug={sectionSlug}
        title={profilesList[sectionSlug].title}
      />
    );
  }, [profile]);

  const clearButton = query !== "" &&
    <Button
      onClick={() => {
        setProfile("filter");
        setTab("0");
        setQuery("");
      }}
      minimal={true}
      className="ep-clear-btn"
      icon="cross"
      large={true}
      outlined={true}
    >
      {t("Explore.Clear Filters")}
    </Button>;

  return (
    <div className="explore">
      <HelmetWrapper info={{
        title: "Explorador de perfiles",
        desc: "Explore a través de los perfiles disponibles en ITP Producción",
        img: "/images/homepage/geo.jpg"
      }} />

      <Nav
        className="background"
        logo={false}
        routePath={route.path}
        routeParams={routeParams}
        title=""
      />

      <div className="ep-container container">

        <div className={`ep-loading-splash ${isLoading ? "show" : ""}`}></div>

        <div className="ep-search">
          <InputGroup
            placeholder={"Buscar a nivel geográfico, industrial o Red CITE..."}
            onChange={evt => setQuery(evt.target.value)}
            value={query}
            rightElement={clearButton || undefined}
          />
        </div>

        <div className="ep-headers">{headers}</div>

        <div className="ep-profile-tabs" role="tablist">
          <div className="ep-profile-tab-header" role="heading">
            <img className="ep-profile-tab-header-img" src={"/icons/explore/filtro_icon.png"} alt="Icono de filtro" />
            <span>Filtrar por</span>
          </div>

          {profilesList[profile].levels.map((levelName, ix) => {
            const levelKey = `${ix}`;
            const selected = tab === levelKey;
            return (
              <div
                aria-selected={selected ? "true" : undefined}
                aria-controls="explorer-profile-tabpanel"
                id="explorer-profile-tab"
                className={clsx("ep-profile-tab", {selected})}
                key={levelKey}
                onClick={() => setTab(levelKey)}
                role="tab"
              >
                {diacriticsFix[levelName] || levelName}
              </div>
            );
          })}

          <select
            className="ep-profile-tab-select"
            onChange={evt => setTab(evt.target.value)}
            value={tab}
          >
            {profilesList[profile].levels.map((levelName, ix) =>
              <option key={ix} value={ix}>
                {diacriticsFix[levelName] || levelName}
              </option>
            )}
          </select>
        </div>

        <div className="ep-profiles-total">
          <span className="ep-profiles-total-title">Resultados: </span>
          <span className="ep-profiles-total-value">{results.length}</span>
        </div>

        <div className="ep-profiles">
          <ExploreProfile
            id="explorer-profile-tabpanel"
            filterPanel={profile === "filter"}
            results={results}
            isLoading={isLoading}
            profile={profile}
            tab={tab}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default withNamespaces()(ExplorePage);
