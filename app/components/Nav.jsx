import {Icon} from "@blueprintjs/core";
import {useScrollPosition} from "@n8tb1t/use-scroll-position";
import clns from "classnames";
import React, {useState} from "react";
import {withNamespaces} from "react-i18next";
import NavMenu from "./NavMenu";
import NavSearch from "./NavSearch";

import "./Nav.css";

/**
 * @typedef OwnProps
 * @property {string} [className]
 * @property {string} [hierarchy]
 * @property {Boolean} [isProfile]
 * @property {string} [title] A title shown when the page has been scrolled
 * @property {Record<string, string>} [routeParams]
 */

/** @type {React.FC<import("react-i18next").WithNamespaces & OwnProps>} */
const Nav = props => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useScrollPosition(({prevPos, currPos}) => {
    if (prevPos.y < -20 && currPos.y > -20) setScrolled(false);
    else if (prevPos.y > -20 && currPos.y < -20 || currPos.y < -20) setScrolled(true);
  });

  return (
    <header className={clns("container nav", props.className, {solid: scrolled})}>
      <NavMenu
        isOpen={isMenuOpen}
        run={setIsMenuOpen}
        dialogClassName={isMenuOpen ? "slide-enter" : "slide-exit"}
      />

      <div className="nav-left">
        <button className="nav-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={scrolled ? "/icons/navbar/menu_gray_icon.svg" : "/icons/navbar/menu_white_icon.svg"} alt=""/>
          <span className="sr-only">Menú</span>
        </button>
        {props.isProfile && scrolled &&
        <div className="nav-left-info">
          <span className={clns("nav-left-info-title", {solid: scrolled})}>{props.title}</span>
          <span className={clns("nav-left-info-hierarchy", {solid: scrolled})}>{props.hierarchy}</span>
        </div>}
      </div>

      <div className="nav-center">
        <a href="/">
          <img src={scrolled ? "/icons/Logo_ITPProduccion_color.svg" : "/icons/Logo_ITPProduccion_white.svg"} alt="ITP Producción" />
        </a>
      </div>

      <div className="nav-right">
        <NavSearch
          icon={scrolled ? "/icons/navbar/lupa_gray_icon.svg" : "/icons/navbar/lupa_white_icon.svg"}
        />
      </div>
    </header>
  );
};

Nav.defaultProps = {
  className: "",
  title: ""
};

export default withNamespaces()(Nav);
