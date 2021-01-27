import React from "react";
import {withNamespaces} from "react-i18next";
import {Dialog, Icon} from "@blueprintjs/core";

import {SIDEBAR_NAV} from "../helpers/consts.js";
import "./NavMenu.css";

class NavMenu extends React.Component {
  state = {
    isOpen: true
  }

  render() {
    const {lng, isOpen} = this.props;
    const {dialogClassName, t} = this.props;

    const NAV = SIDEBAR_NAV.map(column => {
      column.url = column.url.includes(":lng") ? column.url.replace(":lng", lng) : column.url;
      const items = column.items;
      if (items) {
        items.forEach(item => {
          item.url = item.url.includes(":lng") ? item.url.replace(":lng", lng) : item.url;
        });
      }
      return column;
    });

    return <Dialog
      className={`${dialogClassName} nav-menu`}
      isOpen={isOpen}
      transitionName={"slide"}
      lazy={false}
      backdropClassName={dialogClassName}
      onClose={() => this.props.run(false)}
    >
      <div className="nav-menu-content">
        {/* close button */}
        <button className="nav-button close-button" onClick={() => this.props.run(false)}>
          <span className="menu">{t("Menu")}</span>
          <Icon icon="cross" />
        </button>

        {/* nav */}
        <nav className="nav-menu-nav">
          {/* logo / home page link
          <a className="nav-menu-logo" href={`/${lng}`}>
            <img className="nav-menu-logo-img" src="/icons/logo-horizontal.png" alt={t("Home")} />
          </a>
          */}

          {/* main list */}
          <ul className="nav-menu-list">
            {NAV.map(link =>
              <li className="nav-menu-item" key={link.title}>
                <a className="nav-menu-link" href={link.url}>
                  {t(link.title)}
                </a>
                {/* nested list */}
                {link.items && Array.isArray(link.items) && link.items.length &&
                  <ul className="nav-menu-nested-list">
                    {link.items.map(nested =>
                      <li className="nav-menu-item nav-menu-nested-item" key={nested.title}>
                        <a className="nav-menu-link nav-menu-nested-link" href={nested.url}>
                          {t(nested.title)}
                        </a>
                      </li>
                    )}
                  </ul>
                }
              </li>
            )}
          </ul>
        </nav>
      </div>
    </Dialog>;
  }
}

export default withNamespaces()(NavMenu);
