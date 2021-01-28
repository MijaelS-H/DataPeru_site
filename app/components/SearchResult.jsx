
import React from "react";
import {withNamespaces} from "react-i18next";

import "./SearchResult.css";

class SearchResult extends React.Component {
  render() {
    const {id, lng, slug, title, level, t} = this.props;

    return <li className="search-result">
      <a className="search-result-link" href={`/profile/${slug}/${id}`}>
        {/* icon */}
        {slug &&
          <span className="result-icon" key="i">
            {/* <img className="search-result-icon" src={`/icons/explore/${slug}.png`} alt="" />*/}
            <img className="search-result-icon" src={"/icons/visualizations/others.png"} alt="" />
          </span>
        }
        {/* title & subtitle */}
        <span className="search-result-title" key="t">{title}</span>
        {level &&
          <span className="search-result-subttitle u-font-xxs" key="l">{level}</span>
        }
      </a>
    </li>;
  }
}

SearchResult.defaultProps = {
  icon: undefined
};

export default withNamespaces()(SearchResult);