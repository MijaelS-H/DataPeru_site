import clsx from "classnames";
import React, {createElement} from "react";
import {stringNormalizer} from "../helpers/funcs";

import "./TileV2.css";


/**
 * @typedef TileWrapperProps
 * @property {number} [data-index]
 * @property {boolean} [isLarge]
 * @property {"full-width" | "cols"} [layout]
 * @property {keyof JSX.IntrinsicElements} [tagName]
 */

/** @type {React.FC<TileWrapperProps>} */
export const TileV2Wrapper = props => {
  const layout = props.layout === "cols"
    ? `tile-v2-layout-cols`
    : `tile-v2-layout-full-width`;

  return createElement(props.tagName || "li", {
    "className": clsx("tile-v2-container", layout, {"tile-v2-large": props.isLarge}),
    "data-index": props["data-index"]
  }, props.children);
};


/**
 * @typedef TileContentProps
 * @property {string} id -- Profile id
 * @property {string} level -- Profile level
 * @property {string} slug -- Profile type
 * @property {string} slugColor -- Profile type color
 * @property {string} title -- Profile name
 * @property {string} [color] -- ,
 * @property {string} [icon] -- ,
 * @property {string} [link] -- Profile direct link
 */

/** @type {React.FC<TileContentProps>} */
export const TileV2Content = props => {
  const {id, slug, title} = props;

  const backgroundStyle = props.color
    ? {backgroundColor: props.color}
    : {backgroundImage: `url(https://dataperu.datawheel.us/api/image?slug=${slug}&id=${id}&size=thumb)`};
  const icon = props.icon || `/icons/explore/${slug}.svg`;
  const link = props.link || `/profile/${slug}/${id}`;
  const normalizedTitle = stringNormalizer(title);

  return (
    <a className="tile-link" href={link}>
      <div className="tile-content">
        <div className="image-content">
          <img
            alt="tag"
            className="tile-content-tag"
            src={icon}
            style={{backgroundColor: props.slugColor}}
          />
        </div>
        <div className="tile-content-description">
          <div className="description-content">
            {title && <h3
              title={title}
              className={clsx(
                "tile-content-description-title",
                normalizedTitle.length > 30 || normalizedTitle.match(/\w+/).toString().length > 25
                  ? "u-font-xs"
                  : "u-font-sm"
              )}
            >
              {title}
            </h3>}
            <span className="tile-content-description-level">{props.level}</span>
          </div>
        </div>
      </div>
      <div
        className={props.color ? "tile-background-color" : "tile-background"}
        style={backgroundStyle}
      />
    </a>
  );
};


/** @type {React.FC<TileWrapperProps & TileContentProps>} */
const TileV2 = props =>
  <TileV2Wrapper {...props}>
    <TileV2Content {...props} />
  </TileV2Wrapper>;

TileV2.defaultProps = {
  title: "",
  layout: "full-width",
  slugColor: "#E30A14",
};


/** @type {React.FC<TileWrapperProps>} */
export const TileV2Placeholder = props => {
  const layout = props.layout === "cols"
    ? `tile-v2-layout-cols`
    : `tile-v2-layout-full-width`;

  console.log(props.style);

  return (
    <li className={clsx(
      "tile-v2-container",
      layout,
      "tile-vs-placeholder",
      {"tile-v2-large": props.isLarge}
    )}>
      <div className="tile-link">
        <div className="tile-content">
          <div className="image-content">
            <span className="tile-content-tag" style={{backgroundColor: props.slugColor}} />
          </div>
          <div className="tile-content-description">
            <div className="description-content">
              <h3 className="tile-content-description-title u-font-sm">&mdash;</h3>
              <span className="tile-content-description-level">&mdash; &mdash; &mdash;</span>
            </div>
          </div>
        </div>
        <div className="tile-background" />
      </div>
    </li>
  );
};

TileV2Placeholder.defaultProps = {
  slugColor: "#E30A14",
}

export default TileV2;
