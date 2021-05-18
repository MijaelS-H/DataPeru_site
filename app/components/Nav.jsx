import clns from "classnames";
import React, {useState} from "react";
import NavMenu from "./NavMenu";
import NavSearch from "./NavSearch";
import {useWindowScrolled} from "../helpers/hooks";

import "./Nav.css";

/**
 * @typedef OwnProps
 * @property {string} [className]
 * @property {string} [hierarchy]
 * @property {Boolean} [isProfile]
 * @property {string} [title] A title shown when the page has been scrolled
 * @property {Record<string, string>} [routeParams]
 */

/** @type {React.FC<OwnProps>} */
const Nav = props => {
  const scrolled = useWindowScrolled();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={clns("container nav", props.className, {solid: scrolled})}>
      <NavMenu
        isOpen={isMenuOpen}
        run={setIsMenuOpen}
        dialogClassName={isMenuOpen ? "slide-enter" : "slide-exit"}
      />

      <div className="nav-left">
        <button className="nav-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img
            alt="Ícono para menú del sitio"
            src={scrolled
              ? "/icons/navbar/menu_gray_icon.svg"
              : "/icons/navbar/menu_white_icon.svg"}
          />
          <span className="sr-only">Menú</span>
        </button>
        {props.isProfile && scrolled &&
          <div className="nav-left-info">
            <span className={clns("nav-left-info-title", {solid: scrolled})}>
              {props.title}
            </span>
            <span className={clns("nav-left-info-hierarchy", {solid: scrolled})}>
              {props.hierarchy}
            </span>
          </div>}
      </div>

      <div className="nav-center">
        <a href="/">
          <img
            alt="ITP Producción"
            src={scrolled
              ? "/icons/Logo_ITPProduccion_color.svg"
              : "/icons/Logo_ITPProduccion_white.svg"}
          />
        </a>
      </div>

      <div className="nav-right">
        <NavSearch
          icon={scrolled
            ? "/icons/navbar/lupa_gray_icon.svg"
            : "/icons/navbar/lupa_white_icon.svg"}
        />
      </div>
    </header>
  );
};

Nav.defaultProps = {
  className: "",
  title: ""
};

export default Nav;
