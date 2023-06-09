import {encodeChars} from "@datawheel/canon-core";
import axios from "axios";
import clns from "classnames";
import {select} from "d3-selection";
import React, {Component} from "react";
import {withNamespaces} from "react-i18next";
import SearchResult from "$app/components/SearchResult";

import "./HeroSearch.css";

class HeroSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchActive: false,
      results: [],
      timeout: 0,
      userQuery: ""
    };
  }

  openSearch() {
    const {id, searchActive} = this.state;

    if (!searchActive) {
      this.setState({searchActive: true});
    }

    select(document).on(`keydown.${id}`, event => {
      const {router} = this.props;
      const {searchActive} = this.state;
      const key = event.keyCode;
      const DOWN = 40, ENTER = 13, ESC = 27, UP = 38;

      if (key === ESC) {
        this.setState({searchActive: false, userQuery: ""});
      }

      else if (searchActive && event.target === this.textInput) {
        const highlighted = document.querySelector(".is-highlighted");

        if (key === ENTER && highlighted) {
          router.push(document.querySelector(".is-highlighted .search-result-link"));
          this.setState({searchActive: false});
        }
        else if (searchActive && (key === DOWN || key === UP)) {
          if (!highlighted) {
            if (key === DOWN) {
              document.querySelector(".hero-search-results li:first-child").classList.add("is-highlighted");
            }
          }
        }
        else {
          const results = document.querySelectorAll(".hero-search-results li");
          const currentIndex = [].indexOf.call(results, highlighted);

          if (key === DOWN && currentIndex < results.length - 1) {
            const newHighlighted = results[currentIndex + 1];
            highlighted.classList.remove("is-highlighted");
            newHighlighted.classList.add("is-highlighted");
            newHighlighted.scrollIntoView(false);
          }
          else if (key === UP) {
            if (currentIndex > 0) {
              const newHighlighted = results[currentIndex + 1];
              highlighted.classList.remove("is-highlighted");
              newHighlighted.classList.add("is-highlighted");
              newHighlighted.scrollIntoView(false);
            }
          }
        }
      }
    }, false);
  }

  closeSearch() {
    const {searchActive} = this.state;
    if (searchActive) {
      setTimeout(() =>
        this.setState({
          searchActive: false,
          userQuery: "",
          results: []
        }), 200);
    }
  }

  onChange(e) {
    const {timeout} = this.state;
    const {locale, limit, minQueryLength} = this.props;
    const userQuery = e ? e.target.value : "";

    if (userQuery.length < minQueryLength) {
      this.setState({
        searchActive: true,
        results: [],
        userQuery
      });
      clearTimeout(timeout);
    }
    else {
      this.setState({
        userQuery,
        timeout: setTimeout(() => {
          axios.get("/api/search", {params: {
            q: userQuery,
            locale,
            limit
          }})
            .then(resp => this.setState({results: resp.data.results}));
        }, 180)
      });
    }
  }

  onBlur(e) {
    const currentTarget = e.currentTarget;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.closeSearch();
      }
    }, 85);
  }

  render() {
    const {locale, minQueryLength, t} = this.props;
    const {results, searchActive, userQuery} = this.state;

    return (
      <div
        className={clns("hero-search-widget", searchActive ? "is-open" : "is-closed", this.props.className)}
        onBlur={this.onBlur.bind(this)}
      >
        <label className="hero-search-label">
          <span className="u-visually-hidden">
            Buscar a nivel geográfico, industrial o red CITE
          </span>
          <input
            className={clns("hero-search-input u-font-md", userQuery.length >= minQueryLength ? "no-border" : "", this.props.className)}
            placeholder="Buscar a nivel geográfico, industrial o red CITE"
            value={userQuery}
            onChange={this.onChange.bind(this)}
            onFocus={this.openSearch.bind(this)}
            ref={input => this.textInput = input}
            key="si"
          />
          <img className="hero-search-icon" src="/icons/explore/filter.svg" />
          <a
            className={clns("hero-search-link u-font-sm", searchActive ? "is-open" : "is-closed")}
            href={`/explore${userQuery ? `?q=${ encodeChars(userQuery.toString()) }` : ""}`}
          >
            Buscar
          </a>
        </label>

        {searchActive && userQuery.length >= minQueryLength && results &&
          <ul className="hero-search-results u-font-xs">
            {results.map((result, i) =>
              <SearchResult
                key={`search-result-${i}`}
                id={result.slug}
                slug={result.profile}
                title={result.name}
                level={t(result.hierarchy)}
              />
            )}
            {results.length === 0 &&
              <li className="search-result">
                <p className="search-result-link">No hay resultados</p>
              </li>
            }
          </ul>
        }

      </div>
    );
  }
}

HeroSearch.defaultProps = {
  limit: 20,
  minQueryLength: 3,
  locale: "es"
};

export default withNamespaces()(HeroSearch);
