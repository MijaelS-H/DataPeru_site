const title = "ITP Producción";

export default {
  link: [
    {rel: "icon", href: "/images/favicon.ico"},
    {rel: "preconnect", href: "https://fonts.gstatic.com/", crossorigin: ""},
    {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cabin:wght@200;300;400;500;600;700&family=Open+Sans:wght@200;300;400;500;600;700&display=swap"}
  ],
  meta: [
    {charset: "utf-8"},
    {"http-equiv": "X-UA-Compatible", "content": "IE=edge"},
    {name: "description", content: "Descubra los principales indicadores económicos y sectoriales del Perú"},
    {name: "viewport", content: "width=device-width, initial-scale=1"},

    {name: "twitter:card", content: "summary"},

    {property: "og:type", content: "article"},
    {property: "og:site_name", content: title},

    {name: "mobile-web-app-capable", content: "yes"},
    {name: "apple-mobile-web-app-capable", content: "yes"},
    {name: "apple-mobile-web-app-title", content: title},

    /* Chrome, Firefox OS and Opera*/
    {name: "theme-color", content: "#E30A14"},

    /* Windows Phone*/
    {name: "msapplication-navbutton-color", content: "#E30A14"},

    /* iOS Safari*/
    {name: "apple-mobile-web-app-status-bar-style", content: "#E30A14"}
  ],
  title: "ITP Producción"
};
