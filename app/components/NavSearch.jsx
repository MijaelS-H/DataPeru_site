import React, {useCallback, useRef, useState} from "react";
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
  const {t, lng} = props;

  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);

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
        })
        .catch(error => {
          console.error("Search result error:", error);
        });
    }
  };

  const content = <ul className={clns("results", {active: isOpen})}>
    {results.map((d, i) => <SearchResult
      key={`search_result_${d.id}_${i}`}
      id={d.id}
      slug={d.slug}
      title={d.name}
      level={d.level}
    />)}
  </ul>;

  return (
    <div className={clns("search-button", "search-nav", {active: isOpen})}>
      <Popover2
        content={content}
        isOpen={isOpen}
        minimal={true}
        placement="bottom"
      >
        <React.Fragment>
          <Icon icon="search" className="click" onClick={() => setIsOpen(!isOpen)} />
          <InputGroup
            placeholder={t("Search profiles")}
            className={clns({active: isOpen})}
            autoFocus={true}
            onChange={inputHandler}
          />
        </React.Fragment>
      </Popover2>
    </div>
  );
};

export default withNamespaces()(NavSearch);
