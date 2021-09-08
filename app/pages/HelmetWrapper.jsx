import React from "react";
import {Helmet} from "react-helmet-async";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";

/**
 * @typedef OwnProps
 * @property {object} [info]
 * @property {string} info.title
 * @property {string} info.desc
 * @property {string} info.img
 */

/**
 * @typedef StateProps
 * @property {string} baseUrl
 * @property {string} lang
 * @property {string} path
 */

/** @type {React.FC<import("react-i18next").WithNamespaces & OwnProps & StateProps>} */
const HelmetWrapper = props => {
  const {t, info, lang, baseUrl, path} = props;

  const defaults = {
    title: info?.title ?? t("Share.Title"),
    desc: info?.desc ?? t("Share.Description"),
    img: info?.img ?? `${baseUrl}/images/share/share-${lang}.jpg`,
    url: `${baseUrl}${path}`,
    locale: lang
  };

  return (
    <Helmet encodeSpecialCharacters={false} title={defaults.title}>
      <meta name="title" content={`${defaults.title} | ITP Producción`} />
      <meta name="description" content={defaults.desc} />

      <meta name="twitter:title" content={`${defaults.title} | ITP Producción`} />
      <meta name="twitter:description" content={defaults.desc} />
      <meta name="twitter:image" content={defaults.img} />

      <meta property="og:title" content={`${defaults.title} | ITP Producción`} />
      <meta property="og:description" content={defaults.desc} />
      <meta property="og:locale" content={defaults.locale} />
      <meta property="og:url" content={defaults.url} />
      <meta property="og:image" content={defaults.img} />
    </Helmet>
  );
};

/** @type {import("react-redux").MapStateToProps<StateProps, OwnProps, any>} */
const mapState = state => ({
  baseUrl: state.env.CANON_API,
  lang: "es",
  path: state.location.pathname
});

export default withNamespaces()(
  connect(mapState)(HelmetWrapper)
);
