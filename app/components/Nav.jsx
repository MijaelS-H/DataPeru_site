import {Icon} from "@blueprintjs/core";
import {useScrollPosition} from "@n8tb1t/use-scroll-position";
import clns from "classnames";
import React, {useState} from "react";
import {withNamespaces} from "react-i18next";
import NavMenu from "./NavMenu";
import NavSearch from "./NavSearch";

import "./Nav.css";

const Nav = props => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useScrollPosition(({prevPos, currPos}) => {
    if (prevPos.y < -20 && currPos.y > -20) setScrolled(false);
    else if (prevPos.y > -20 && currPos.y < -20) setScrolled(true);
  });

  return (
    <div className={clns("container nav", props.className, {solid: scrolled})}>
      <NavMenu
        isOpen={isMenuOpen}
        run={setIsMenuOpen}
        dialogClassName={isMenuOpen ? "slide-enter" : "slide-exit"}
      />

      <div className="nav-left">
        <button className="nav-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Icon icon="menu" />
          {/* <span className="menu">Menú</span>*/}
        </button>
      </div>

      <div className="nav-center">
        <span className="logo-itp">ITP</span><span className="logo-produccion">Producción</span>
      </div>

      <div className="nav-right">
        {/* <NavSearch /> */}
      </div>
    </div>
  );
};

Nav.defaultProps = {
  className: "",
  logo: true,
  title: ""
};

export default withNamespaces()(Nav);
