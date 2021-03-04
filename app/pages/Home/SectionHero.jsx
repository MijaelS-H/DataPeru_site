import axios from "axios";
import clns from "classnames";
import {assign} from "d3plus-common";
import {Geomap} from "d3plus-react";
import React, {useEffect, useMemo, useState} from "react";
import {heroBackgrounds, slugDict, heroMapConfig} from "./constsHero";
import TileV2 from "$app/components/TileV2";

/**
 * @typedef OwnProps
 * @property {string} [className]
 */

/** @type {React.FC<OwnProps>} */
const SectionHero = props => {
  const [tab, setTab] = useState("geo");
  const [backgroundImage, setBackgroundImage] = useState("url(/images/homepage/default.jpg)"); // useState(heroBackgrounds[tab]);
  const [mapData, setMapData] = useState([]);
  const [mapDepartamento, setMapDepartamento] = useState(0);
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    axios.get("/api/departmentProperties").then(res => {
      const {status, data} = res.data;
      status === "ok" && setMapData(data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/home/${tab}/${mapDepartamento}`).then(res => {
      const {status, data} = res.data;
      status === "ok" && setTiles(data);
    });
  }, [mapDepartamento]);

  const pickDepartamento = depto => {
    setMapDepartamento(depto);
    setBackgroundImage(heroBackgrounds[depto] || "url(/images/homepage/default.jpg)");

    axios.get(`/api/home/${tab}/${mapDepartamento}`).then(res => {
      const {status, data} = res.data;
      status === "ok" && setTiles(data);
    });
  };

  const pickTab = tab => {
    setTab(tab);
    setBackgroundImage(heroBackgrounds[tab]);

    axios.get(`/api/home/${tab}/${mapDepartamento}`).then(res => {
      const {status, data} = res.data;
      status === "ok" && setTiles(data);
    });
  };

  const mapConfig = useMemo(() => assign({}, heroMapConfig, {
    data: mapData,
    forceUpdate: mapDepartamento,
    shapeConfig: {
      fillOpacity: d => mapDepartamento && d["Departamento ID"] !== mapDepartamento
        ? 0.5
        : 1
    },
    on: {
      click: d => window.open(`/profile/geo/${slugDict[d["Departamento ID"]]}`)

      /* click: d => mapDepartamento && mapDepartamento === d["Departamento ID"]
        ? pickDepartamento(0)
        : pickDepartamento(d["Departamento ID"]) */
    }
  }), [mapDepartamento, mapData]);

  return (
    <section className="home-hero" data-background-image={backgroundImage} style={{backgroundImage}}>
      <div className="hero-index">
        <h1 className="hero-tagline">
          <em>Descubra </em>
          <span>los principales indicadores </span>
          <span>económicos y sectoriales del Perú</span>
        </h1>
        <div className="hero-search">
          {props.children}
        </div>
        <div className="hero-logos">
          <img className="hero-logo-itp" src="/icons/homepage/ITP_blanco.png" />
          <img className="hero-logo-produccion" src="/icons/homepage/Min_produccion_logo.png" />
        </div>
      </div>

      <div className="hero-featured">
        <h3 className="hero-featured-title">Navegue a través de los perfiles</h3>

        <Geomap className="hero-featured-map" config={mapConfig}/>

        <ul className="hero-featured-tabs">
          <li className={clns("hero-featured-tab", {active: tab === "geo"})}>
            <a href="#" onClickCapture={evt => [evt.preventDefault(), pickTab("geo")]}>
              <img className="hero-featured-tab-icon" src="/icons/explore/geo.svg" />
              <span className="hero-featured-tab-label">Geográfico</span>
            </a>
          </li>
          <li className={clns("hero-featured-tab", {active: tab === "industry"})}>
            <a href="#" onClickCapture={evt => [evt.preventDefault(), pickTab("industry")]}>
              <img className="hero-featured-tab-icon" src="/icons/explore/industry.svg" />
              <span className="hero-featured-tab-label">Industrias</span>
            </a>
          </li>
          <li className={clns("hero-featured-tab", {active: tab === "cite"})}>
            <a href="#" onClickCapture={evt => [evt.preventDefault(), pickTab("cite")]}>
              <img className="hero-featured-tab-icon" src="/icons/explore/cite.svg" />
              <span className="hero-featured-tab-label">Red CITE</span>
            </a>
          </li>
        </ul>

        <div className="hero-featured-tiles">
          <ul className="hero-featured-tilegrid">
            {tiles.map((tile, i) =>
              <TileV2
                background={""}
                id={tile.entities[0].id}
                ix={i}
                key={`explore-${tab}-${mapDepartamento}-${tile.link}`}
                level={tile.entities[0].hierarchy}
                link={tile.link}
                slug={tile.entities[0].slug}
                slugColor={"#e30a14"}
                title={tile.entities[0].title}
              />
            )}
          </ul>
          <a className="hero-featured-tiles-more" href="/explore">
            <img className="hero-features-more-icon" src="icons/homepage/svg/explorar_icon.svg" alt="" /><span>Continuar explorando</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
