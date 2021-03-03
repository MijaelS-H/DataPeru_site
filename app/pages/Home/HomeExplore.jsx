import axios from "axios";
import React, {useEffect, useState} from "react";

import TileV2 from "../../components/TileV2";

import "./HomeExplore.css";

/**
 * @typedef OwnProps
 * @property {string} [className]
 */

/** @type {React.FC<OwnProps>} */
const HomeExplore = props => {

  const [tiles, setExplorerTiles] = useState([]);

  useEffect(() => {
    axios.get("/api/randomTiles").then(res => {
      const {status, data} = res.data;
      status === "ok" && setExplorerTiles(data);
    });
  }, []);

  return (
    <div className="home-explore-tiles">
      <span className="home-explore-tiles-title">Explore</span>
      <div className="home-explore-tiles-elements">
        {tiles.map((d, i) =>
          <TileV2
            background={""}
            heightType={"large"}
            id={d.ID}
            ix={i}
            key={i}
            level={d.level}
            link={`/profile/${d.slug}/${d.ID}`}
            slug={d.slug}
            slugColor={"#e30a14"}
            title={d.Label}
          />)}
      </div>
    </div>
  );
};

export default HomeExplore;