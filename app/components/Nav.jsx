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
 * @property {string} [title] A title shown when the page has been scrolled
 * @property {Record<string, string>} [routeParams]
 */

/** @type {React.FC<import("react-i18next").WithNamespaces & OwnProps>} */
const Nav = props => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useScrollPosition(({prevPos, currPos}) => {
    if (prevPos.y < -20 && currPos.y > -20) setScrolled(false);
    else if (prevPos.y > -20 && currPos.y < -20) setScrolled(true);
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
          <Icon icon="menu" />
          <span className="sr-only">Menú</span>
        </button>
      </div>

      <div className="nav-center">
        <h1 className="nav-title">
          <span className="logo-itp">ITP</span><span className="logo-produccion">Producción</span>
          {props.title && <span className="nav-subtitle">{props.title}</span>}
        </h1>
      </div>

      <div className="nav-right">
        {/* <NavSearch /> */}
      </div>
    </header>
  );
};

Nav.defaultProps = {
  className: "",
  title: ""
};

export default withNamespaces()(Nav);
