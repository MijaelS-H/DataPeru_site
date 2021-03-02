import React, {useCallback, useEffect, useRef, useState} from "react";
import clns from "classnames";
import {Icon, InputGroup} from "@blueprintjs/core";
import {Popover2, Popover2InteractionKind} from "@blueprintjs/popover2";
import axios from "axios";
import SearchResult from "./SearchResult";
import {withNamespaces} from "react-i18next";

/**
 * @typedef OwnProps
 * @property {string} [className]
 */

/** @type {React.FC<import("react-i18next").WithNamespaces & OwnProps>} */
const NavSearch = props => {
  const {t, lng, icon} = props;

  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState(false);
  const [content, setContent] = useState(<div>Sin resultados</div>);

  /** @type {React.MutableRefObject<import("axios").Canceler?>} */
  const cancelContainer = useRef(null);

  /** @type {(event: React.ChangeEvent<HTMLInputElement>) => void} */
  const inputHandler = evt => {
    const query = evt.target.value;
    const canceler = cancelContainer.current;

    if (canceler) {
      canceler();
      cancelContainer.current = null;
    }

    if (query.length > 1) {
      axios.get("/api/search", {
        cancelToken: new axios.CancelToken(canceler => {
          // An executor function receives a cancel function as a parameter
          cancelContainer.current = canceler;
        }),
        params: {q: query, locale: lng}
      })
        .then(resp => {
          const data = resp.data.results;
          const results = data.map(d => ({id: d.slug, name: d.name, slug: d.profile, level: d.hierarchy}));
          setResults(results);

          const content = <ul className={clns("results", {active: isOpen})}>
            {results.map((d, i) => <SearchResult
              key={`search_result_${d.id}_${i}`}
              id={d.id}
              isNav={true}
              slug={d.slug}
              title={d.name}
              level={d.level}
            />)}
          </ul>;

          setContent(content);

        })
        .catch(error => {
          error.message && console.error("Search result error:", error);
        });
    }
    else {
      setResults(false);
      setContent(<div>Sin resultados</div>);
    }
  };

  const useOutsideClick = (ref, callback) => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClick);
      document.addEventListener("keydown", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
        document.addEventListener("keydown", handleClick);
      };
    });
  };

  const ref = useRef();

  useOutsideClick(ref, () => {
    if (isOpen) {
      setIsOpen(!isOpen);
      setResults(false);
      setContent(<div>Sin resultados</div>);
    }
  });

  return (
    <div className={clns("search-button", "search-nav", {active: isOpen})} ref={ref}>

      <React.Fragment>
        <img className="click" src={icon} onClick={() => setIsOpen(!isOpen)} />
        <InputGroup
          placeholder={"Buscar perfiles"}
          className={clns("search-button-label", {active: isOpen})}
          autoFocus={true}
          onChange={inputHandler}
        />
      </React.Fragment>

      {isOpen && results && results.length === 0 &&
      <Popover2
        isOpen={results.length > 0 && isOpen}
        minimal={true}
        placement="bottom"
        usePortal={false}
      >
        <ul className={clns("results", {active: isOpen})}>
          <li className="no-search-result">
            <span className="search-result-title" key="t">No hay resultados</span>
          </li>
        </ul>
      </Popover2>
      }

      {results.length > 0 &&
      <Popover2
        isOpen={results.length > 0 && isOpen}
        minimal={true}
        placement="bottom"
        usePortal={false}
      >
        {content}
      </Popover2>
      }
    </div>
  );
};

export default withNamespaces()(NavSearch);
