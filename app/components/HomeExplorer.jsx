import React, {Component} from "react";
import {withNamespaces} from "react-i18next";
import {hot} from "react-hot-loader/root";
import axios from "axios";
import {Geomap} from "d3plus-react";

import HomeGrid from "./HomeGrid";

import "./HomeExplorer.css";

class HomeExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedDepartment: false,
      level: "",
      tiles: []
    };
  }

  componentDidMount() {
    axios.all([axios.get("/api/departmentProperties"), axios.get("/api/home")]).then(axios.spread((...resp) => {
      this.setState({
        data: resp[0].data.data,
        tiles: resp[1].data
      });
    }));
  }

  render() {
    const {data, selectedDepartment, level, tiles} = this.state;

    let mediumSize = true;
    if (typeof window !== "undefined") {
      mediumSize = window.innerWidth >= 887 && window.innerWidth <= 1280;
    }

    return (
      <div className="home-explorer">
        <div className="home-explorer-nav">
          <span className="home-explorer-title">
            Navegue a través de los perfiles
          </span>
          <div className="home-explorer-selectors">
            <div className="home-explorer-option" onClick={() => this.setState({level: "geo"})}>
              <img className="home-explorer-icon" src="/icons/explore/geo-white.png" />
              <span className="home-explorer-name">Geográfico</span>
            </div>
            <div className="home-explorer-option" onClick={() => this.setState({level: "industry"})}>
              <img className="home-explorer-icon" src="/icons/explore/geo-white.png" />
              <span className="home-explorer-name">Industrias</span>
            </div>
            <div className="home-explorer-option" onClick={() => this.setState({level: "cite"})}>
              <img className="home-explorer-icon" src="/icons/explore/geo-white.png" />
              <span className="home-explorer-name">Red CITE</span>
            </div>
          </div>
        </div>
        <div className="home-explorer-results">
          <div className="home-explorer-map">
            <Geomap
              config={{
                data,
                forceUpdate: selectedDepartment,
                groupBy: "Departamento ID",
                height: mediumSize ? 400 : 500,
                width: mediumSize ? 400 : 500,
                on: {
                  click: d => selectedDepartment ? selectedDepartment === d["Departamento ID"] ? this.setState({selectedDepartment: false}) : this.setState({selectedDepartment: d["Departamento ID"]}) : this.setState({selectedDepartment: d["Departamento ID"]})
                },
                shapeConfig: {
                  fill: "#c9cacb",
                  fillOpacity: d => selectedDepartment ? d["Departamento ID"] === selectedDepartment ? 1 : 0.5 : 1,
                  Path: {
                    stroke: "#c9cacb",
                    strokeWidth: 1
                  }
                },
                tooltipConfig: {
                  className: "d3plus-tooltip-explorer",
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
          <HomeGrid
            tiles={tiles}
          />
        </div>
      </div>
    );
  }
}

export default withNamespaces()(hot(HomeExplorer));
