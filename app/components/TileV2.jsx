import React, {Component} from "react";
import classnames from "classnames";
import {withNamespaces} from "react-i18next";
import {stringNormalizer} from "../helpers/funcs";

import "./TileV2.css";

class TileV2 extends Component {
  render() {
    const {
      color,
      icon,
      id,             // profile id
      level,          // profile level
      link,           // profile direct link
      lng,            // locale
      slug,           // profile type
      slugColor,      // profile type color
      title,           // profile name
      ix,
      layout         // Could be 'full-width'  or 'cols'
    } = this.props;

    return (
      <li className={classnames("tile-v2-container", `tile-v2-layout-${layout}`)} key={`tile-${slug}-${id}-${ix}`}>
        <a className="tile-link" href={link || `/profile/${slug}/${id}`}>
          <div className="tile-content">
            <div className="image-content">
              <img src={!icon ? `/icons/explore/${slug}.svg` : icon} alt="tag" className="tile-content-tag" style={{backgroundColor: `${slugColor}`}} />
            </div>
            <div className="tile-content-description">
              <div className="description-content">
                <h3 title={title} className={classnames("tile-content-description-title", title && (stringNormalizer(title).length > 30 || stringNormalizer(title).match(/\w+/).toString().length > 25) ? "u-font-xs" : "u-font-sm")}>{title}</h3>
                <span className="tile-content-description-level">{level}</span>
              </div>
            </div>
          </div>
          {
            !color
              ? <div className="tile-background" style={{backgroundImage: `url(/api/image?slug=${slug}&id=${id}&size=thumb)`}} />
              : <div className="tile-background-color" style={{backgroundColor: color}} />
          }
        </a>
      </li>
    );
  }
}

TileV2.defaultProps = {
  color: false,
  icon: false,
  link: undefined,
  title: "",
  Element: "div",
  layout: "full-width"
};

export default withNamespaces()(TileV2);
