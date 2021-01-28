import React from "react";
import axios from "axios";
import classnames from "classnames";
import {Icon, InputGroup} from "@blueprintjs/core";
import {withNamespaces} from "react-i18next";

import NavMenu from "./NavMenu";
import SearchResult from "./SearchResult";

import "./Nav.css";

const CancelToken = axios.CancelToken;
let cancel;

const pathParser = (params, path) => {
  let new_path = path.replace(/\(|\)/g, "");
  Object.entries(params).forEach(d => {
    new_path = new_path.replace(d[0], d[1]);
  });
  return new_path;
};

class Nav extends React.Component {
  state = {
    isOpen: false,
    isOpenSearchResults: false,
    isSearchOpen: false,
    results: [],
    resultsFilter: []
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const {className} = this.props;
    const {isOpen, isSearchOpen, isOpenSearchResults} = this.state;

    return nextProps.className !== className || nextState.isOpen !== isOpen || nextState.isSearchOpen !== isSearchOpen || nextState.isOpenSearchResults !== isOpenSearchResults;
  }

  handleSearch = e => {
    const {results} = this.state;
    const query = e.target.value;

    if (cancel !== undefined) {
      cancel();
    }

    if (query.length > 1) {
      return axios.get("/api/search", {
        cancelToken: new CancelToken(c => {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        }),
        params: {
          q: query,
          locale: this.props.lng
        }
      })
        .then(resp => {
          const data = resp.data.results;
          const results = data.map(d => ({id: d.slug, name: d.name, slug: d.profile, level: d.hierarchy}));
          this.setState({results, resultsFilter: results, isOpenSearchResults: true});
        })
        .catch(error => {
          const result = error.response;
          return Promise.reject(result);
        });
    }

    const resultsFilter = query.length > 0
      ? results.filter(d => d.name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
      : [];

    const isOpen = query.length > 2;
    this.setState({resultsFilter, isOpenSearchResults: isOpen});

    return true;
  }

  render() {
    const {className, lng, logo, routeParams, routePath, t, title} = this.props;
    const {isOpen, isSearchOpen, resultsFilter} = this.state;

    let params;
    if (routeParams && typeof routeParams === "object") {
      params = Object.entries(routeParams).reduce((obj, d) => {
        const key = `:${d[0]}`;
        const value = d[1];
        obj[key] = value;
        return obj;
      }, {});
    }

    return <div className={`${className} nav container`}>
      <NavMenu
        isOpen={isOpen}
        run={isOpen => this.setState({isOpen})}
        dialogClassName={isOpen ? "slide-enter" : "slide-exit"}
      />
      <div className="nav-left">
        <button className="nav-button" onClick={() => this.setState({isOpen: !isOpen})}>
          <Icon icon="menu" />
          {/* <span className="menu">Menú</span>*/}
        </button>
      </div>
      <div className={classnames("nav-center", {"active-searchbar": isSearchOpen})}>
        {/* {(logo || className === "background") && <a className="profile-logo" href={`/${lng}`} data-refresh="true"><img src="/icons/logo-horizontal.png" alt="" /></a>}
        <span className="nav-subtitle">{title}</span>*/}
        ITP<span className="nav-logo">PRODUCCIÓN</span>
      </div>
      <div className="nav-right">
        <div className={classnames("search-button", "search-nav", {active: isSearchOpen})}>
          <Icon icon="search" className="click" onClick={() => this.setState({isSearchOpen: !isSearchOpen})} />
          <InputGroup
            placeholder={t("Search profiles")}
            className={classnames({active: isSearchOpen})}
            autoFocus={true}
            onChange={this.handleSearch}
          />
          <ul className={classnames("results", {active: isSearchOpen})}>
            {resultsFilter.map((d, i) => <SearchResult
              key={`search_result_${d.id}_${i}`}
              id={d.id}
              slug={d.slug}
              title={d.name}
              level={d.level}
            />)}
          </ul>
        </div>
      </div>
    </div>;
  }
}
Nav.defaultProps = {
  className: "",
  logo: true,
  title: ""
};
export default withNamespaces()(Nav);
