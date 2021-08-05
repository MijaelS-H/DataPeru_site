module.exports = {
  SIDEBAR_NAV: [
    {title: "Inicio", url: "/"},
    {title: "Explorador", url: "/explore", items: [
      {title: "Explorar todo", url: "/explore?profile=filter&tab=0"},
      {title: "Geográfico", url: "/explore?profile=geo&tab=4"},
      {title: "Industrias", url: "/explore?profile=industry&tab=2"},
      {title: "Red CITE", url: "/explore?profile=cite&tab=1"}
    ]},
    {title: "Acerca de", url: "/about"},
    {title: "Datos", url: "/datos"},
    {title: "Ayuda", url: "/ayuda"}
  ],
  LOGOS: [
    {
      title: "Ministerio de la Producción",
      url: "https://www.gob.pe/produce",
      src: "/icons/homepage/Min_produccion_logo.png"
    },
    {
      title: "Instituto Tecnológico de la Producción",
      url: "https://www.gob.pe/itp",
      src: "/icons/homepage/logos_peru-itp.png"
    },
    {
      title: "Bicentenario del Perú",
      url: "https://bicentenario.gob.pe/",
      src: "/icons/homepage/logos_peru-bicentenario.png"
    }
  ]
};
