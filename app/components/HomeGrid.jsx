
import React, {Component} from "react";
import {hot} from "react-hot-loader/root";
import {withNamespaces} from "react-i18next";

import TileV2 from "./TileV2";

import "./HomeGrid.css";

class HomeGrid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {selectedDepartment, lng, tiles} = this.props;

    return (
      <div className="home-grid">
        <ul className="home-grid-tiles">
          {tiles && tiles.map((tile, i) =>
            <TileV2
              title={tile.entities[0].title}
              slug={tile.entities[0].slug}
              slugColor={"#e30a14"}
              id={tile.entities[0].id}
              ix={i}
              level={tile.entities[0].hierarchy}
              link={tile.link}
              background={""}
              lng={lng}
              key={`explore-${tile.entities[0].slug}-tile-${tile.entities[0].id}-${i}`}
              layout="full-width"
            />
          )}
        </ul>
        <div>
          <div>Ícono</div>
          <div>Continuar explorando</div>
        </div>
      </div>
    );
  }
}

export default hot(withNamespaces()(HomeGrid));
