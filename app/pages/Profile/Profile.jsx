import {Profile as CMSProfile} from "@datawheel/canon-cms";
import libs from "@datawheel/canon-cms/src/utils/libs";
import {fetchData} from "@datawheel/canon-core";
import PropTypes from "prop-types";
import React from "react";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";
import HelmetWrapper from "../HelmetWrapper";
import Nav from "$app/components/Nav";
// import Error from "../Error/Error";
// import Footer from "../../components/Footer";
// import {spanishLabels} from "helpers/spanishLabels";

import "./Profile.css";

/**
 * @typedef StateProps
 * @property {string} baseUrl
 * @property {any} formatters
 * @property {string} locale
 * @property {any} profile
 */

/**
 * @typedef RouteParams
 * @property {string} slug
 * @property {string} id
 */

/** @extends {React.Component<import("react-router").RouteComponentProps<any, RouteParams> & import("react-i18next").WithNamespaces & StateProps>} */
class Profile extends React.Component {
  getChildContext() {
    const {formatters, locale, profile, router} = this.props;
    const {variables} = profile;

    return {
      formatters: formatters.reduce((acc, d) => {
        const f = Function("n", "libs", "formatters", d.logic);
        const fName = d.name.replace(/^\w/g, chr => chr.toLowerCase());
        acc[fName] = n => f(n, libs, acc);
        return acc;
      }, {}),
      router,
      variables,
      locale
    };
  }

  render() {
    const {profile, t, baseUrl} = this.props;
    const {variables} = profile;

    // if (profile && profile.errorCode && profile.errorCode === 404) return <Error />;

    const slug = profile.meta
      ? profile.meta.map(d => d.slug).join("_")
      : "";

    const labels = {
      geo: {
        title: t("Profile.Geo Title", {name: variables.name}),
        desc: t("Profile.Geo Description", {name: variables.name})
      },
      industry: {
        title: t("Profile.Industry Title", {name: variables.name}),
        desc: t("Profile.Industry Description", {name: variables.name})
      },
      cite: {
        title: t("Profile.CITE Title", {name: variables.name}),
        desc: t("Profile.CITE Description", {name: variables.name})
      }
    };

    const share = {
      title: labels[slug].title,
      desc: labels[slug].desc,
      img: `${baseUrl}/api/image?slug=${slug}&id=${variables.id}&size=thumb`
    };

    const searchProps = {
      // subtitleFormat: d => spanishLabels[d.memberHierarchy],
      placeholder: "Buscar perfiles.."
    };

    return (
      <div id="Profile">
        <HelmetWrapper info={share} />

        <Nav
          hierarchy={variables.hierarchy}
          isProfile={true}
          title={variables.name}
          // routePath={this.props.route.path}
          routeParams={this.props.routeParams}
        />

        <CMSProfile {...this.props} searchProps={searchProps} />
        {/* <Footer /> */}
      </div>
    );
  }
}

Profile.need = [
  fetchData("profile", "/api/profile/?slug=<slug>&id=<id>&slug2=<slug2>&id2=<id2>&slug3=<slug3>&id3=<id3>&locale=<i18n.locale>"),
  fetchData("formatters", "/api/formatters")
];

Profile.childContextTypes = {
  formatters: PropTypes.object,
  locale: PropTypes.string,
  router: PropTypes.object,
  variables: PropTypes.object
};

export default withNamespaces()(
  connect(state => ({
    baseUrl: state.env.CANON_API,
    formatters: state.data.formatters,
    locale: state.i18n.locale,
    profile: state.data.profile
  }))(Profile)
);
