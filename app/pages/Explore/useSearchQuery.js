import axios from "axios";
import {map as D3Map, nest} from "d3-collection";
import {useEffect, useRef, useState} from "react";
import {profilesList} from "./consts";

/**
 * @typedef SearchResult
 * @property {string} background
 * @property {string} id:
 * @property {string} level
 * @property {string} name
 * @property {string} slug
 */

/** @type {SearchResult[]} */
const anyArray = [];

/**
 * Retrieves search results from the API
 * @param {string} profile
 * @param {string} tab
 * @param {string} query
 * @returns {[boolean, SearchResult[]]}
 */
export function useSearchQuery(profile, tab, query) {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState(anyArray);

  const box = useRef({
    lastRequest: null,
    lastCanceler: null
  });

  useEffect(() => {
    setResults([]);
    setIsLoading(true);

    fetchSearch(box, profile, tab, query).then(results => {
      setResults(results);
      setIsLoading(false);
    }, error => {
      const result = error.response;
      console.error(error);
      return Promise.reject(result);
    });
  }, [profile, tab, query]);

  // Update the url search params
  useEffect(() => {
    const nextUrl = new URL(window.location.pathname, window.location.origin);
    nextUrl.searchParams.set("profile", profile);
    nextUrl.searchParams.set("tab", tab);
    query.length > 0 && nextUrl.searchParams.set("q", query);
    window.history.replaceState(null, "", nextUrl.pathname + nextUrl.search);
  }, [profile, tab, query]);

  return [isLoading, results];
}

/**
 * @param {React.MutableRefObject<{lastCanceler: null | (() => void)}>} box
 * @param {string} profile
 * @param {string} tab
 * @param {string} query
 * @returns {Promise<SearchResult[]>}
 */
function fetchSearch(box, profile, tab, query) {
  const {lastCanceler} = box.current;
  typeof lastCanceler === "function" && lastCanceler();

  return axios.get("/api/search", {
    cancelToken: new axios.CancelToken(canceler => {
      box.current.lastCanceler = canceler;
    }),
    params: {
      limit: 3000,
      locale: "es",
      dimension: profilesList[profile].dimension ? profilesList[profile].dimension : "",
      cubeName: profilesList[profile].cube ? profilesList[profile].cube : "",
      levels: profilesList[profile].levels[tab] !== "Ver todo" ? profilesList[profile].levels[tab] : "",
      pslug: profile,
      q: query || undefined
    }
  }).then(response => {
    const {results} = response.data;
    return results.map(profileItem => ({
      id: profileItem.slug,
      name: profileItem.name,
      slug: profileItem.profile,
      level: profileItem.hierarchy,
      background: profilesList[profile].background
    }));
  });
}
