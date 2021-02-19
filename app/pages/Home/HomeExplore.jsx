import React from "react";
import {withNamespaces} from "react-i18next";

import TileV2 from "../../components/TileV2";

import "./HomeExplore.css";

class HomeExplore extends React.Component {

  render() {
    return (
      <div className="home-explore-tiles">
        <span className="home-explore-tiles-title">Explore</span>
        <div className="home-explore-tiles-elements">
          <TileV2
            background={""}
            heightType={"large"}
            id={24}
            ix={1}
            key={1}
            level={"Departamento"}
            link={"/profile/geo/lima"}
            slug={"geo"}
            slugColor={"#e30a14"}
            title={"Lima"}
          />
          <TileV2
            background={""}
            heightType={"large"}
            id={24}
            ix={1}
            key={1}
            level={"Departamento"}
            link={"/profile/geo/lima"}
            slug={"geo"}
            slugColor={"#e30a14"}
            title={"Lima"}
          />
          <TileV2
            background={""}
            heightType={"large"}
            id={24}
            ix={1}
            key={1}
            level={"Departamento"}
            link={"/profile/geo/lima"}
            slug={"geo"}
            slugColor={"#e30a14"}
            title={"Lima"}
          />
        </div>
      </div>
    );
  }
}

HomeExplore.defaultProps = {};

export default withNamespaces()(HomeExplore);
