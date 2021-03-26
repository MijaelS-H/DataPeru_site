import {mean} from "d3-array";
import {formatAbbreviate} from "d3plus-format";
import colors from "../static/data/colors.json";
import styles from "style.yml";

const typeface = "'Fira Sans Extra Condensed', sans-serif";
const defaultFontColor = styles["dark-1"];
const headingFontColor = styles["dark-3"];
const fontSizeSm = 12;
const fontSizeMd = 14;
const fontSizeLg = 16;
const labelPadding = 5;
const shapeLegend = 25;

const icons = [
  "Actividades de innovacion", "Actividades de innovacion realizada", "Actividad economica", "Concepto", "Continente", "Capítulo", "Contribuyente", "Elemento FBC", "Elemento PIB", "Indicador Tributo",
  "Credito Directo", "Division", "Indice de precio", "Razon para innovar", "Seccion", "Sector", "Subcategoria", "Subconcepto", "Trade Flow", "Type"
];
const activeIcons = [
  "Actividades de innovacion", "Actividades de innovacion realizada", "Actividad economica", "Concepto", "Continente", "Capítulo", "Credito Directo", "Division", "Elemento FBC", "Elemento PIB", "Indicador Tributo", "Indice de precio",
  "Razon para innovar", "Seccion", "Sector", "Subconcepto", "Trade Flow", "Type"
];

const getTooltipTitle = (d3plusConfig, d) => {
  const len = d3plusConfig._groupBy.length;
  const parentName = d3plusConfig._groupBy[0](d);
  let parent = Object.entries(d).find(h => h[1] === parentName) || [undefined];
  let parentId = parent[0];
  if (parentId.includes(" ID")) {
    parentId = parentId.slice(0, -3);
    parent = Object.entries(d).find(h => h[0] === parentId) || [undefined];
  }
  const itemName = d3plusConfig._groupBy[len - 1](d);
  let item = Object.entries(d).find(h => h[1] === itemName) || [undefined];
  let itemId = item[0];
  if (itemId.includes(" ID")) {
    itemId = itemId.slice(0, -3);
    item = Object.entries(d).find(h => h[0] === itemId) || [undefined];
  }

  if (itemId === "ISO 3") {
    itemId = "Pais";
    item = Object.entries(d).find(h => h[0] === itemId) || [undefined];
  }

  if (itemId === "Categoria" && Object.keys(d).includes("Division") && [
    "Escasez de personal calificado en el país",
    "Insuficiente información sobre otras tecnologías",
    "Insuficiente información sobre los mercados",
    "Insuficiente información sobre tecnologías digitales",
    "Deficiente sistema de propiedad intelectual",
    "Insuficiente flexibilidad de la normativa y/o regulación del estado",
    "Infraestructura inadecuada como un obstáculo a la innovación",
    "Entorno macroeconómico  y político inestable",
    "Dificultad de encontrar socios de cooperación como un obstáculo",
    "Incertidumbre respecto a la demanda de bienes y servicios innovadores",
    "Mercados dominados por empresas establecidas",
    "Reducido tamaño de los mercados como un obstáculo",
    "Acceso al financiamiento",
    "Ausencia de personal calificado en la empresa",
    "Falta de fondos en la empresa o grupo empresarial",
    "Elevado costo de la innovación",
    "Percepción de riesgos económicos excesivos",
    "Rigidez organizativa dentro de la empresa"
  ].includes(d.Indicador)) {
    itemId = "Division";
    item = Object.entries(d).find(h => h[0] === itemId) || [undefined];
  }

  if (itemId === "Categoria" && Object.keys(d).includes("Industria") && [
    "Falta de información sobre los procesos de exportación",
    "Costos logísticos",
    "Identificación de mercados y compradores potenciales",
    "Acceso al financiamiento de las operaciones de comercio exterior",
    "Cumplimiento de normas o requisitos de calidad",
    "Cumpliento con requisitos de cantidad de los compradores",
    "Retrasos causados por el transporte internacional",
    "Procedimientos aduaneros",
    "Retrasos en aduanas",
    "Barreras arancelarias en el extranjero",
    "Corrupción en las fronteras",
    "Porcentaje de empresas por tipo instrumentos de gestión ambiental"
  ].includes(d.Indicador)) {
    itemId = "Industria";
    item = Object.entries(d).find(h => h[0] === itemId) || [undefined];
  }

  if (itemId === "id" && Object.keys(d).includes("Indicador")) {
    itemId = "Indicador";
    item = Object.entries(d).find(h => h[0] === itemId) || [undefined];
  }

  return {item, itemId, parent, parentId};
};

const growthPct = d => `${formatAbbreviate(d * 100)}%`;
const pesoPE = d => `S/ ${formatAbbreviate(d * 100)}`;

export const findColorV2 = (key, d) => {
  if (key === "Pais" || key === "ISO 3") {
    if (!Array.isArray(d["Pais ID"])) return "transparent";
    else return colors.Continente[d["Continente ID"]];
  }

  if (key === "Indicador Tributo" && Object.keys(d).includes("Indicador Tributo Parent ID")) {
    return colors["Subindicador Tributo"][d["Indicador Tributo ID"]];
  }

  if (key === "Componente" && Object.keys(d).includes("Flujo")) {
    return colors["Componente PIP"][d["Componente ID"]];
  }

  if (key === "Short Division") {
    return colors.Division[d["Division ID"]];
  }

  if (key === "id") {
    // Acceso a programas de innovación
    if (d.Indicador === "Programa Nacional de Innovación para la Competitividad y Productividad - Innóvate Perú") return "#E8CA77";
    if (d.Indicador === "Programas de Apoyo a la Ciencia, Tecnología e Innovación Tecnológica") return "#7FD6B6";
    if (d.Indicador === "Incentivo tributario para proyectos de I + D + i (Ley N°30309)") return "#5390D9";

    // Acceso a los servicios de la Red CITE
    if (d.Indicador.includes("Conocen los servicios tecnológicos de los Centros de Innovación y Transferencia Tecnológica") && d["Categoria ID"] === 99) return "#5390D9";
    if (d.Indicador.includes("Conocen los servicios tecnológicos de los Centros de Innovación y Transferencia Tecnológica") && d["Categoria ID"] === 11) return "#DF7373";
    if (d.Indicador.includes("Conocen los servicios tecnológicos de los Centros de Innovación y Transferencia Tecnológica") && d["Categoria ID"] === 12) return "#68B0AB";
    if (d.Indicador.includes("Han accedido a algún servicio brindado por los CITE") && d["Categoria ID"] === 11) return "#DF7373";
    if (d.Indicador.includes("Han accedido a algún servicio brindado por los CITE") && d["Categoria ID"] === 12) return "#68B0AB";
    if (d.Indicador.includes("Han accedido al servicio de capacitación brindado por los CITE")) return "#09747C";
    if (d.Indicador.includes("Han accedido al servicio de certificación de competencias laborales brindado por los CITE")) return "#CED37A";
    if (d.Indicador.includes("Han accedido al servicio de información tecnológica especializada brindado por los CITE")) return "#4E6766";
    if (d.Indicador.includes("Han accedido al servicio de diseño y desarrollo de productos brindado por los CITE")) return "#A5C882";
    if (d.Indicador.includes("Han accedido al servicio de asistencia técnica brindado por los CITE")) return "#80BD9F";
    if (d.Indicador.includes("Han accedido al servicio de soporte productivo brindado por los CITE")) return "#5AB1BB";
    if (d.Indicador.includes("Han accedido al servicio de ensayo de laboratorio brindado por los CITE")) return "#548C91";

    // Pérdidas por delitos
    if (d.Indicador === "Empresas afectadas por hecho delictivo" && d["Categoria ID"] === 99) return "#5390D9";
    if (d.Indicador === "Empresas afectadas por hecho delictivo" && d["Categoria ID"] === 1) return "#68B0AB";
    if (d.Indicador === "Empresas afectadas por hecho delictivo" && d["Categoria ID"] === 2) return "#DF7373";
    if (d.Indicador === "Pérdida de activos (maquinaria, equipos)") return "#89B0AE";
    if (d.Indicador === "Pérdida de productos") return "#B8C457";
    if (d.Indicador === "Pérdida de efectivo") return "#785594";

    // Empresas que adoptaron medidas de seguridad
    if (d.Indicador === "Adoptaron medidas de seguridad" && d["Categoria ID"] === 99) return "#5390D9";
    if (d.Indicador === "Adoptaron medidas de seguridad" && d["Categoria ID"] === 1) return "#DF7373";
    if (d.Indicador === "Adoptaron medidas de seguridad" && d["Categoria ID"] === 2) return "#68B0AB";
    if (d.Indicador === "Incorporación de un sistema de video y captura de imágenes") return "#9FB8AD";
    if (d.Indicador === "Mejora de infraestructura física") return "#128385";
    if (d.Indicador === "Incorporación de un sistema de control de acceso de persona") return "#386B73";
    if (d.Indicador === "Incorporación de un sistema de alarma de seguridad electrónica") return "#F7B801";
    if (d.Indicador === "Adoptaron medidas de seguridad para el traslado de valores") return "#573132";
    if (d.Indicador === "Adoptaron medidas de seguridad para el traslado de bienes") return "#76976A";
    if (d.Indicador === "Incorporacion de personal para resguardo (guardaespaldas)") return "#845361";
    if (d.Indicador === "Incorporacion de personal de seguridad de bienes e inmuebles") return "#FFA16B";
  }

  if (key === "Elemento PIB") {
    if ([
      "Gasto consumo final privado",
      "Gasto consumo gobierno",
      "Formación bruta capital",
      "Exportaciones",
      "Importaciones"
    ].includes(d["Elemento PIB"])) {
      return colors["Elemento PIB Gasto"][d["Elemento PIB ID"]];
    }

    else if ([
      "Remuneraciones",
      "Derechos de Importación",
      "Impuestos a los Productos",
      "Otros Impuestos",
      "Excedente de explotación bruto",
      "Ingreso mixto"
    ].includes(d["Elemento PIB"])) {
      return colors["Elemento PIB Ingreso"][d["Elemento PIB ID"]];
    }

    else if ([
      "Derechos de Importación y Otros Impuestos",
      "Agricultura, ganadería, caza y silvicultura",
      "Pesca y acuicultura",
      "Extracción de petróleo, gas, minerales y servicios conexos",
      "Manufactura",
      "Construcción",
      "Electricidad, gas y agua",
      "Comercio, mantenimiento y reparación de vehículos automotores y motocicletas",
      "Transporte, almacenamiento, correo y mensajería",
      "Alojamiento y restaurantes",
      "Telecomunicaciones y otros servicios de información",
      "Servicios financieros, seguros y pensiones",
      "Servicios prestados a empresas",
      "Administración pública y defensa",
      "Otros servicios"
    ].includes(d["Elemento PIB"])) {
      return colors["Elemento PIB Actividad"][d["Elemento PIB ID"]];
    }
  }

  if (key === "Seccion") {
    if (Object.keys(d).includes("Empresas")) {
      return colors["Seccion CITE"][d["Seccion CITE ID"]];
    }
    else if (Object.keys(d).includes("Estimacion")) {
      return colors["Seccion CIIU"][d["Seccion ID"]];
    }
  }

  if (key === "Subcategoria" && Object.keys(d).includes("Servicios")) {
    return colors["Servicio CITE"][d["Subcategoria ID"]];
  }

  if (key === "Producto" && Object.keys(d).includes("Desembarque")) {
    return colors["Producto Pesquero"][d["Producto ID"]];
  }

  if (key === "Year" && Object.keys(d).includes("Producto") && Object.keys(d).includes("Unidad")) {
    return colors["Producto Cuero"][d["Producto ID"]];
  }

  if (key === "Categoria") {
    if (d.Indicador === "Porcentaje de empresas manufactureras que han realizado alguna actividad de innovación") {
      return colors["Actividades de innovacion"][d["Categoria ID"]];
    }

    else if (d.Indicador === "Porcentaje de empresas manufactureras que han accedido a algún servicio brindado por los CITE públicos") {
      return colors["Acceso CITE"][d["Categoria ID"]];
    }

    else if ([
      "Porcentaje de trabajadores mujeres que labora en el mercado de abastos",
      "Porcentaje de trabajadores hombres que labora en el mercado de abastos"
    ].includes(d.Categoria)) {
      return colors["Gestion Administrativa"][d["Categoria ID"]];
    }

    else if ([
      "No se adaptan a las necesidades de su actividad",
      "Dificultades con el manejo de la confidencialidad",
      "Dificultades burocrátcias",
      "No necesita apoyo para innovar",
      "No le interesó",
      "Otro"
    ].includes(d.Categoria)) {
      return colors["No accede CITE"][d["Categoria ID"]];
    }
  }

  if (key === "Indicador") {
    if ([
      "Falta de interés",
      "No fué necesario",
      "Intentaron pero al final desistieron",
      "No contaron con los recursos económicos necesarios",
      "No contaron con personal capacitado",
      "No contaron con la infraestructura necesaria",
      "Baja escala de producción",
      "Son realizadas en la casa matriz",
      "Desconocimiento del tema"
    ].includes(d.Indicador)) {
      return colors["Razones no innovar"][d["Indicador ID"]];
    }

    else if ([
      "Investigación y desarrollo (I + D) internas",
      "Investigación y desarrollo (I + D) externas",
      "Ingeniería, diseño y otros procesos creativos",
      "Marketing y valor de marca",
      "Declaración de propiedad intelectual",
      "Capacitación en temas de innovación",
      "Desarrollo o adquisición de software y base de datos",
      "Adquisición o alquiler de bienes de capital para innovar",
      "Gestión de la innovación"
    ].includes(d.Indicador)) {
      return colors["Actividad de innovacion realizada"][d["Indicador ID"]];
    }

    else if ([
      "Cultura empresarial desarrollada",
      "Detección de una demanda total o parcialmente insatisfecha en el mercado",
      "Aprovechamiento de una idea o novedad científica",
      "Amenaza de la competencia",
      "Pautas regulatorias",
      "Cambios en normas de propiedad intelectual",
      "Procesos de certificación",
      "Problemas técnivcos",
      "Aprovechamiento de una idea generada al interior de la empresa",
      "Aprovechamiento de incentivos gubernamentales"
    ].includes(d.Indicador)) {
      return colors["Razon para innovar"][d["Indicador ID"]];
    }

    else if ([
      "Inteligencia artificial o aprendizaje automático",
      "Robótica avanzada",
      "Transporte autónomo",
      "Manufactura avanzada",
      "Impresión 3D",
      "Servicios avanzados en redes (ej: big data)"
    ].includes(d.Indicador)) {
      return colors["Tecnologias Produccion"][d["Indicador ID"]];
    }

    else if ([
      "Agricultores, trabajadores calificados agropecuarios, forestales y pesqueros",
      "Obreros, artesanos y electrisistas",
      "Industriales y conductores",
      "Trabajadores de ocupaciones elementales",
      "Profesionales científicos e intelectuales",
      "Profesionales técnicos",
      "Trabajadores de servicios y vendedores",
      "Jefes y empleados administrativos",
      "Directores y gerentes"
    ].includes(d.Indicador) && [66, 70, 74, 78, 82, 86, 90, 94, 98].includes(d["Indicador ID"])) {
      return colors["Capital Humano"][d["Indicador ID"]];
    }

    else if ([
      "Apoyos gubernamentales",
      "Banca comercial privada",
      "Inversiones ángel o capital emprendedor",
      "Otras empresas",
      "Recursos propios",
      "Cooperación internacional"
    ].includes(d.Indicador)) {
      return colors["Financiamiento Innovacion"][d["Indicador ID"]];
    }

    else if ([
      "Capacitación",
      "Certificación de competencias laborales",
      "Información tecnológica especializada",
      "Diseño y desarrollo de productos",
      "Asistencia técnica",
      "Soporte productivo",
      "Ensayo de laboratorio"
    ].includes(d.Indicador)) {
      return colors["Servicios Brindados"][d["Indicador ID"]];
    }

    else if ([
      "Mantenimiento y limpieza de calles",
      "Alumbrado público",
      "Aumento de patrullaje y vigilancia policíal",
      "Instalación de videocámaras de vigilancias"
    ].includes(d.Indicador)) {
      return colors["Acciones Seguridad"][d["Indicador ID"]];
    }

    else if ([
      "Operativos contra narcotráfico",
      "Operativos contra la delincuencia"
    ].includes(d.Indicador)) {
      return colors.Operativos[d["Indicador ID"]];
    }

    else if ([
      "No sabe",
      "Declaración de Impacto Ambiental ( DIA)",
      "Estudio de Impacto Ambiental (EIA)",
      "Declaración ambiental para Actividades en curso (DAAC)",
      "Programa de Adecuacion y Manejo Ambiental (PAMA)",
      "Ninguno"
    ].includes(d.Categoria) && !Object.keys(d).includes("id")) {
      return colors["Industria ENE"][d["Industria ID"]];
    }

    else if (["Ingresos", "Egresos"].includes(d.Type)) {
      return colors["Gestion financiera"][d["Indicador ID"]];
    }

    else if ([
      "Trámites engorrosos",
      "Intereses elevados",
      "Falta de garantía",
      "Deudas pendientes",
      "Accedió a otras fuentes de financiamento",
      "Había accedido a crédito anteriormente"
    ].includes(d.Indicador)) {
      return colors["Solicitudes financiamiento"][d["Indicador ID"]];
    }

    else if ([
      "Robo o hurto",
      "Intento de robo",
      "Extorsión",
      "Estafa o fraude",
      "Daños a su negocio",
      "Amenazas",
      "Secuestro",
      "Corrupción"
    ].includes(d.Indicador)) {
      return colors["Casos delictivos"][d["Indicador ID"]];
    }

    else if ([
      "Vandalismo y/o robos y asaltos contra empresas",
      "Consumo y/o venta ilegal de alcohol",
      "Existencia de pandillas o bandas",
      "Casos de extorsiones",
      "Venta o consumo de droga",
      "Existencia de cobro de cupos",
      "Extorsión de autoridades contra las empresas",
      "Existencia de prostitución",
      "Casos de homicidios",
      "Casos de secuestros"
    ].includes(d.Indicador)) {
      return colors["Casos delictivos por industria"][d["Indicador ID"]];
    }
  }

  if (key === "Industria" && d["Indicador ID"] === 11 && [
    "Disminuyeron",
    "Aumentaron",
    "No sabe",
    "Siguieron igual"
  ].includes(d.Categoria)) {
    return colors["Percepcion delitos"][d["Categoria ID"]];
  }

  if (key === "Industria" && d.Indicador === "Porcentaje de empresas por principal mercado donde vende su principal producto o servicio") {
    return colors["Composicion empresarial"][d["Categoria ID"]];
  }

  if (key === "Industria" && [
    "Falta de información sobre los procesos de exportación",
    "Costos logísticos",
    "Identificación de mercados y compradores potenciales",
    "Acceso al financiamiento de las operaciones de comercio exterior",
    "Cumplimiento de normas o requisitos de calidad",
    "Cumpliento con requisitos de cantidad de los compradores",
    "Retrasos causados por el transporte internacional",
    "Procedimientos aduaneros",
    "Retrasos en aduanas",
    "Barreras arancelarias en el extranjero",
    "Corrupción en las fronteras",
    "Porcentaje de empresas por tipo instrumentos de gestión ambiental"
  ].includes(d.Indicador)) {
    return colors["Industria ENE"][d["Industria ID"]];
  }

  if ((key === "Industria" || key === "Indicador") && [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
  ].includes(d["Industria ID"])) {
    return colors["Industria ENAVE"][d["Industria ID"]];
  }

  if (key === "Tipo" && Object.keys(d).includes("Porcentaje morosidad de credito de la banca")) {
    return colors.Morosidad[1];
  }

  if (key === "Type" && ["Ingresos", "Egresos"].includes(d.Type)) {
    return colors["Gestion financiera"][d["Indicador ID"]];
  }

  if (key === "Capacitacion") {
    if ([
      "Numero de mercados de abastos que recibieron capacitacion sobre gestion empresarial",
      "Numero de mercados de abastos que recibieron capacitacion sobre seguridad y salud ocupacional",
      "Numero de mercados de abastos que recibieron capacitacion sobre gestion de residuos solidos",
      "Numero de mercados de abastos que recibieron capacitacion sobre habilidades socioemocionales",
      "Numero de mercados de abastos que recibieron capacitacion sobre marketing",
      "Numero de mercados de abastos que recibieron capacitacion sobre tecnologias de informacion y comunicacion",
      "Numero de mercados de abastos que recibieron capacitacion sobre manipulacion de alimentos",
      "Numero de mercados de abastos que recibieron capacitacion sobre defensa civil"
    ].includes(d.Capacitacion)) {
      return colors["Recibe capacitacion"][d["Capacitacion ID"]];
    }

    else if ([
      "Numero de mercados de abastos que no recibieron capacitacion por falta de recursos",
      "Numero de mercados de abastos que no recibieron capacitacion por falta de tiempo",
      "Numero de mercados de abastos que no recibieron capacitacion por falta de interes",
      "Numero de mercados de abastos que no recibieron capacitacion por falta de informacion",
      "Numero de mercados de abastos que no recibieron capacitacion por poca concurrencia",
      "Numero de mercados de abastos que no recibieron capacitacion porque no cuentan con ambientes para charlas"
    ].includes(d.Capacitacion)) {
      return colors["No recibe capacitacion"][d["Capacitacion ID"]];
    }
  }

  const id = d[`${key} ID`];

  const palette = colors[key];
  return palette ? colors[key][id] || colors[key][d[key]] || styles["gpe-red"] : styles["gpe-red"];
};

// Tooltip title
export const tooltipTitle = (bgColor, imgUrl, title) => {
  let tooltip = "<div class='d3plus-tooltip-title-wrapper'>";
  if (imgUrl) {
    tooltip += `<div class="icon" style="background-color: ${bgColor}"><img src="${imgUrl}" /></div>`;
  }
  tooltip += `<div class="title"><span>${title}</span></div>`;
  tooltip += "</div>";
  return tooltip;
};

export const findIconV2 = (key, d) => {
  // const options = {2: "export", 1: "import"};
  if (key === "Pais" || key === "ISO 3") {
    const icon = key === "Pais" && Array.isArray(d["Pais ID"]) ? d["Continente ID"] : d[`${key} ID`];
    return `/icons/visualizations/Pais/country_${icon}.png`;
  }

  if (key === "Indicador Tributo" && Object.keys(d).includes("Indicador Tributo Parent ID")) {
    return `/icons/visualizations/Subindicador Tributo/${d["Indicador Tributo ID"]}.png`;
  }

  if (key === "Categoria") {
    if (d.Indicador === "Porcentaje de empresas manufactureras que han realizado alguna actividad de innovación") {
      return `/icons/visualizations/Actividades de innovacion/${d["Categoria ID"]}.png`;
    }

    else if (d.Indicador === "Porcentaje de empresas manufactureras que han accedido a algún servicio brindado por los CITE públicos") {
      return `/icons/visualizations/Acceso CITE/${d["Categoria ID"]}.png`;
    }

    else if ([
      "Porcentaje de trabajadores mujeres que labora en el mercado de abastos",
      "Porcentaje de trabajadores hombres que labora en el mercado de abastos"
    ].includes(d.Categoria)) {
      return `/icons/visualizations/Gestion Administrativa/${d["Categoria ID"]}.png`;
    }

    else if ([
      "No se adaptan a las necesidades de su actividad",
      "Dificultades con el manejo de la confidencialidad",
      "Dificultades burocrátcias",
      "No necesita apoyo para innovar",
      "No le interesó",
      "Otro"
    ].includes(d.Categoria)) {
      return `/icons/visualizations/No accede CITE/${d["Categoria ID"]}.png`;
    }
  }

  if (key === "Short Division") {
    return `/icons/visualizations/Division/png/white/${d["Division ID"]}.png`;
  }

  if (key === "id") {
    // Acceso a programas de innovación
    if (d.Indicador === "Programa Nacional de Innovación para la Competitividad y Productividad - Innóvate Perú") return "/icons/visualizations/Sankey/programa_nacional_innovacion_competitividad_productividad.png";
    if (d.Indicador === "Programas de Apoyo a la Ciencia, Tecnología e Innovación Tecnológica") return "/icons/visualizations/Sankey/programa_apoyo_ciencia_tecnologia_innovacion_tecnologica.png";
    if (d.Indicador === "Incentivo tributario para proyectos de I + D + i (Ley N°30309)") return "/icons/visualizations/Sankey/incentivo_tributario_para_innovacion.png";

    // Acceso a los servicios de la Red CITE
    if (d.Indicador.includes("Conocen los servicios tecnológicos de los Centros de Innovación y Transferencia Tecnológica") && d["Categoria ID"] === 99) return "/icons/visualizations/Sankey/conoce_cite.png";
    if (d.Indicador.includes("Conocen los servicios tecnológicos de los Centros de Innovación y Transferencia Tecnológica") && d["Categoria ID"] === 11) return "/icons/visualizations/Sankey/11.png";
    if (d.Indicador.includes("Conocen los servicios tecnológicos de los Centros de Innovación y Transferencia Tecnológica") && d["Categoria ID"] === 12) return "/icons/visualizations/Sankey/12.png";
    if (d.Indicador.includes("Han accedido a algún servicio brindado por los CITE") && d["Categoria ID"] === 11) return "/icons/visualizations/Sankey/11.png";
    if (d.Indicador.includes("Han accedido a algún servicio brindado por los CITE") && d["Categoria ID"] === 12) return "/icons/visualizations/Sankey/12.png";
    if (d.Indicador.includes("Han accedido al servicio de capacitación brindado por los CITE")) return "/icons/visualizations/Sankey/capacitacion.png";
    if (d.Indicador.includes("Han accedido al servicio de certificación de competencias laborales brindado por los CITE")) return "/icons/visualizations/Sankey/competencias_laborales.png";
    if (d.Indicador.includes("Han accedido al servicio de información tecnológica especializada brindado por los CITE")) return "/icons/visualizations/Sankey/informacion_tecnologica.png";
    if (d.Indicador.includes("Han accedido al servicio de diseño y desarrollo de productos brindado por los CITE")) return "/icons/visualizations/Sankey/diseno_productos.png";
    if (d.Indicador.includes("Han accedido al servicio de asistencia técnica brindado por los CITE")) return "/icons/visualizations/Sankey/asistencia_tecnica.png";
    if (d.Indicador.includes("Han accedido al servicio de soporte productivo brindado por los CITE")) return "/icons/visualizations/Sankey/soporte_productivo.png";
    if (d.Indicador.includes("Han accedido al servicio de ensayo de laboratorio brindado por los CITE")) return "/icons/visualizations/Sankey/laboratorio.png";

    // Pérdidas por delitos
    if (d.Indicador.includes("Empresas afectadas por hecho delictivo") && d["Categoria ID"] === 99) return "/icons/visualizations/Sankey/conoce_cite.png";
    if (d.Indicador.includes("Empresas afectadas por hecho delictivo") && d["Categoria ID"] === 2) return "/icons/visualizations/Sankey/11.png";
    if (d.Indicador.includes("Empresas afectadas por hecho delictivo") && d["Categoria ID"] === 1) return "/icons/visualizations/Sankey/12.png";
    if (d.Indicador.includes("Pérdida de activos (maquinaria, equipos)")) return "/icons/visualizations/Sankey/herramientas.png";
    if (d.Indicador.includes("Pérdida de productos")) return "/icons/visualizations/Sankey/productos.png";
    if (d.Indicador.includes("Pérdida de efectivo")) return "/icons/visualizations/Sankey/efectivo.png";

    // Empresas que adoptaron medidas de seguridad
    if (d.Indicador === "Adoptaron medidas de seguridad" && d["Categoria ID"] === 99) return "/icons/visualizations/Sankey/conoce_cite.png";
    if (d.Indicador === "Adoptaron medidas de seguridad" && d["Categoria ID"] === 1) return "/icons/visualizations/Sankey/11.png";
    if (d.Indicador === "Adoptaron medidas de seguridad" && d["Categoria ID"] === 2) return "/icons/visualizations/Sankey/12.png";
    if (d.Indicador === "Incorporación de un sistema de video y captura de imágenes") return  "/icons/visualizations/Sankey/sistema_video.png";
    if (d.Indicador === "Mejora de infraestructura física") return "/icons/visualizations/Sankey/estructura_fisica.png";
    if (d.Indicador === "Incorporación de un sistema de control de acceso de persona") return "/icons/visualizations/Sankey/control_acceso.png";
    if (d.Indicador === "Incorporación de un sistema de alarma de seguridad electrónica") return "/icons/visualizations/Sankey/alarma.png";
    if (d.Indicador === "Adoptaron medidas de seguridad para el traslado de valores") return "/icons/visualizations/Sankey/traslado_valores.png";
    if (d.Indicador === "Adoptaron medidas de seguridad para el traslado de bienes") return "/icons/visualizations/Sankey/traslado_bienes.png";
    if (d.Indicador === "Incorporacion de personal para resguardo (guardaespaldas)") return "/icons/visualizations/Sankey/guarda_espaldas.png";
    if (d.Indicador === "Incorporacion de personal de seguridad de bienes e inmuebles") return "/icons/visualizations/Sankey/seguridad_bienes.png";
  }

  if (key === "Elemento PIB") {
    if ([
      "Gasto consumo final privado",
      "Gasto consumo gobierno",
      "Formación bruta capital",
      "Exportaciones",
      "Importaciones"
    ].includes(d["Elemento PIB"])) {
      return `/icons/visualizations/Elemento PIB Gasto/${d["Elemento PIB ID"]}.png`;
    }

    else if ([
      "Remuneraciones",
      "Derechos de Importación",
      "Impuestos a los Productos",
      "Otros Impuestos",
      "Excedente de explotación bruto",
      "Ingreso mixto"
    ].includes(d["Elemento PIB"])) {
      return `/icons/visualizations/Elemento PIB Ingreso/${d["Elemento PIB ID"]}.png`;
    }

    else if ([
      "Derechos de Importación y Otros Impuestos",
      "Agricultura, ganadería, caza y silvicultura",
      "Pesca y acuicultura",
      "Extracción de petróleo, gas, minerales y servicios conexos",
      "Manufactura",
      "Construcción",
      "Electricidad, gas y agua",
      "Comercio, mantenimiento y reparación de vehículos automotores y motocicletas",
      "Transporte, almacenamiento, correo y mensajería",
      "Alojamiento y restaurantes",
      "Telecomunicaciones y otros servicios de información",
      "Servicios financieros, seguros y pensiones",
      "Servicios prestados a empresas",
      "Administración pública y defensa",
      "Otros servicios"
    ].includes(d["Elemento PIB"])) {
      return `/icons/visualizations/Elemento PIB Actividad/${d["Elemento PIB ID"]}.png`;
    }
  }

  if (key === "Seccion") {
    if (Object.keys(d).includes("Empresas")) {
      return `/icons/visualizations/Seccion CITE/${d["Categoria ID"]}.png`;
    }
    else if (Object.keys(d).includes("Estimacion")) {
      return `/icons/visualizations/Seccion CIIU/${d["Seccion ID"]}.png`;
    }
  }

  if (key === "Indicador") {
    if ([
      "Falta de interés",
      "No fué necesario",
      "Intentaron pero al final desistieron",
      "No contaron con los recursos económicos necesarios",
      "No contaron con personal capacitado",
      "No contaron con la infraestructura necesaria",
      "Baja escala de producción",
      "Son realizadas en la casa matriz",
      "Desconocimiento del tema"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Razon no innovar/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Investigación y desarrollo (I + D) internas",
      "Investigación y desarrollo (I + D) externas",
      "Ingeniería, diseño y otros procesos creativos",
      "Marketing y valor de marca",
      "Declaración de propiedad intelectual",
      "Capacitación en temas de innovación",
      "Desarrollo o adquisición de software y base de datos",
      "Adquisición o alquiler de bienes de capital para innovar",
      "Gestión de la innovación"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Actividad de innovacion realizada/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Cultura empresarial desarrollada",
      "Detección de una demanda total o parcialmente insatisfecha en el mercado",
      "Aprovechamiento de una idea o novedad científica",
      "Amenaza de la competencia",
      "Pautas regulatorias",
      "Cambios en normas de propiedad intelectual",
      "Procesos de certificación",
      "Problemas técnivcos",
      "Aprovechamiento de una idea generada al interior de la empresa",
      "Aprovechamiento de incentivos gubernamentales"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Razon para innovar/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Inteligencia artificial o aprendizaje automático",
      "Robótica avanzada",
      "Transporte autónomo",
      "Manufactura avanzada",
      "Impresión 3D",
      "Servicios avanzados en redes (ej: big data)"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Tecnologias Produccion/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Agricultores, trabajadores calificados agropecuarios, forestales y pesqueros",
      "Obreros, artesanos y electrisistas",
      "Industriales y conductores",
      "Trabajadores de ocupaciones elementales",
      "Profesionales científicos e intelectuales",
      "Profesionales técnicos",
      "Trabajadores de servicios y vendedores",
      "Jefes y empleados administrativos",
      "Directores y gerentes"
    ].includes(d.Indicador) && [66, 70, 74, 78, 82, 86, 90, 94, 98].includes(d["Indicador ID"])) {
      return `/icons/visualizations/Capital Humano/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Apoyos gubernamentales",
      "Banca comercial privada",
      "Inversiones ángel o capital emprendedor",
      "Otras empresas",
      "Recursos propios",
      "Cooperación internacional"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Financiamiento Innovacion/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Capacitación",
      "Certificación de competencias laborales",
      "Información tecnológica especializada",
      "Diseño y desarrollo de productos",
      "Asistencia técnica",
      "Soporte productivo",
      "Ensayo de laboratorio"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Servicios CITE/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Mantenimiento y limpieza de calles",
      "Alumbrado público",
      "Aumento de patrullaje y vigilancia policíal",
      "Instalación de videocámaras de vigilancias"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Acciones Seguridad/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Operativos contra narcotráfico",
      "Operativos contra la delincuencia"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Operativos/${d["Indicador ID"]}.png`;
    }

    else if ([
      "No sabe",
      "Declaración de Impacto Ambiental ( DIA)",
      "Estudio de Impacto Ambiental (EIA)",
      "Declaración ambiental para Actividades en curso (DAAC)",
      "Programa de Adecuacion y Manejo Ambiental (PAMA)",
      "Ninguno"
    ].includes(d.Categoria)) {
      return `/icons/visualizations/Industria ENE/${d["Industria ID"]}.png`;
    }

    else if (["Ingresos", "Egresos"].includes(d.Type)) {
      return `/icons/visualizations/Gestion financiera/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Trámites engorrosos",
      "Intereses elevados",
      "Falta de garantía",
      "Deudas pendientes",
      "Accedió a otras fuentes de financiamento",
      "Había accedido a crédito anteriormente"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Solicitudes financiamiento/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Robo o hurto",
      "Intento de robo",
      "Extorsión",
      "Estafa o fraude",
      "Daños a su negocio",
      "Amenazas",
      "Secuestro",
      "Corrupción"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Casos delictivos/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Vandalismo y/o robos y asaltos contra empresas",
      "Consumo y/o venta ilegal de alcohol",
      "Existencia de pandillas o bandas",
      "Casos de extorsiones",
      "Venta o consumo de droga",
      "Existencia de cobro de cupos",
      "Extorsión de autoridades contra las empresas",
      "Existencia de prostitución",
      "Casos de homicidios",
      "Casos de secuestros"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Casos delictivos por industria/${d["Indicador ID"]}.png`;
    }
  }

  if (key === "Industria" && d["Indicador ID"] === 11 && [
    "Disminuyeron",
    "Aumentaron",
    "No sabe",
    "Siguieron igual"
  ].includes(d.Categoria)) {
    return `/icons/visualizations/Percepcion delitos/${d["Categoria ID"]}.png`;
  }

  if (key === "Industria" && d.Indicador === "Porcentaje de empresas por principal mercado donde vende su principal producto o servicio") {
    return `/icons/visualizations/Composicion empresarial/${d["Categoria ID"]}.png`;
  }

  if (key === "Industria" && [
    "Falta de información sobre los procesos de exportación",
    "Costos logísticos",
    "Identificación de mercados y compradores potenciales",
    "Acceso al financiamiento de las operaciones de comercio exterior",
    "Cumplimiento de normas o requisitos de calidad",
    "Cumpliento con requisitos de cantidad de los compradores",
    "Retrasos causados por el transporte internacional",
    "Procedimientos aduaneros",
    "Retrasos en aduanas",
    "Barreras arancelarias en el extranjero",
    "Corrupción en las fronteras",
    "Porcentaje de empresas por tipo instrumentos de gestión ambiental"
  ].includes(d.Indicador)) {
    return `/icons/visualizations/Industria ENE/${d["Industria ID"]}.png`;
  }

  if ((key === "Industria" || key === "Indicador") && [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
  ].includes(d["Industria ID"])) {
    return `/icons/visualizations/Industria ENAVE/${d["Industria ID"]}.png`;
  }

  if (key === "Tipo" && Object.keys(d).includes("Porcentaje morosidad de credito de la banca")) {
    return "/icons/visualizations/Morosidad/1.png";
  }

  if (key === "Capacitacion") {
    if ([
      "Numero de mercados de abastos que recibieron capacitacion sobre gestion empresarial",
      "Numero de mercados de abastos que recibieron capacitacion sobre seguridad y salud ocupacional",
      "Numero de mercados de abastos que recibieron capacitacion sobre gestion de residuos solidos",
      "Numero de mercados de abastos que recibieron capacitacion sobre habilidades socioemocionales",
      "Numero de mercados de abastos que recibieron capacitacion sobre marketing",
      "Numero de mercados de abastos que recibieron capacitacion sobre tecnologias de informacion y comunicacion",
      "Numero de mercados de abastos que recibieron capacitacion sobre manipulacion de alimentos",
      "Numero de mercados de abastos que recibieron capacitacion sobre defensa civil"
    ].includes(d.Capacitacion)) {
      return `/icons/visualizations/Recibe capacitacion/${d["Capacitacion ID"]}.png`;
    }

    else if ([
      "Numero de mercados de abastos que no recibieron capacitacion por falta de recursos",
      "Numero de mercados de abastos que no recibieron capacitacion por falta de tiempo",
      "Numero de mercados de abastos que no recibieron capacitacion por falta de interes",
      "Numero de mercados de abastos que no recibieron capacitacion por falta de informacion",
      "Numero de mercados de abastos que no recibieron capacitacion por poca concurrencia",
      "Numero de mercados de abastos que no recibieron capacitacion porque no cuentan con ambientes para charlas"
    ].includes(d.Capacitacion)) {
      return `/icons/visualizations/No recibe capacitacion/${d["Capacitacion ID"]}.png`;
    }
  }

  const icon = key;
  const iconID = d[`${key} ID`];

  return icons.includes(icon)
    ? activeIcons.includes(icon)
      ? `/icons/visualizations/${icon}/png/white/${iconID}.png`
      : "/icons/visualizations/others.png"
    : undefined;
};

/** default x/y axis styles */
const axisConfig = {
  // main bar lines
  maxSize: 100,
  barConfig: {
    stroke: "transparent"
  },
  // secondary grid lines
  gridConfig: {
    stroke: "#cccccc",
    strokeWidth: 1
    // opacity: 0.5
  },
  locale: "es-CL",
  // axis title labels
  titleConfig: {
    fontFamily: () => typeface,
    fontSize: () => fontSizeLg,
    fontColor: headingFontColor
  },
  // value labels
  shapeConfig: {
    labelConfig: {
      labelRotation: false,
      fontColor: headingFontColor,
      fontFamily: () => typeface,
      fontSize: () => fontSizeMd
    }
  },
  // death to ticks
  tickSize: 0
};

/**
  The object exported by this file will be used as a base config for any
  d3plus-react visualization rendered on the page.
*/
export default {
  // global defaults
  aggs: {
    "Categoria ID": mean,
    "Capitulo ID": mean,
    "CITE ID": mean,
    "Componente ID": mean,
    "Concepto ID": mean,
    "Contribuyente ID": mean,
    "Elemento PIB ID": mean,
    "Elemento FBC ID": mean,
    "Indicador ID": mean,
    "Indicador Tributo ID": mean,
    "Industria ID": mean,
    "Subconcepto ID": mean,
    "Trade Flow ID": mean,
    "Year": mean
  },
  locale: "es-CL",
  xConfig: axisConfig,
  yConfig: {...axisConfig, scale: "auto"},
  y2Config: {...axisConfig, scale: "auto"},
  barPadding: 0,
  groupPadding: 10,

  // legends
  legend: (config, arr) => arr.length > 1,
  legendConfig: {
    label(d) {
      return "";
    },
    shapeConfig: {
      fill(d) {
        const item = this._parent._groupBy[0](d);
        let itemId = Object.entries(d).find(h => h[1] === item)[0];
        if (itemId.includes(" ID")) itemId = itemId.replace(" ID", "");

        return findColorV2(itemId, d);
      },
      backgroundImage(d, i) {
        const item = this._parent._groupBy[0](d);
        let itemId = Object.entries(d).find(h => h[1] === item)[0];
        if (itemId.includes(" ID")) itemId = itemId.replace(" ID", "");
        return findIconV2(itemId, d);
      },
      borderRadius: 0,
      width: shapeLegend,
      height: shapeLegend
    },
    labelConfig: {
      fontColor: defaultFontColor,
      fontSize: () => fontSizeLg,
      fontFamily: () => typeface
    },
    stroke: "transparent"
  },
  legendPosition: "bottom",
  legendTooltip: {
    title(d) {
      const {item, parent, parentId} = getTooltipTitle(this, d);
      const title = Array.isArray(item[1]) ? `${parent[1] || "Valores"}` : item[1];
      const itemBgImg = parentId;
      const bgColor = findColorV2(itemBgImg, d);
      const imgUrl = findIconV2(itemBgImg, d);
      return tooltipTitle(bgColor, imgUrl, title);
    },
    tbody: []
  },

  // color scale
  colorScaleConfig: {
    scale: "quantile",
    axisConfig: {
      labelOffset: true,
      labelRotation: false,
      locale: "es-CL",
      shapeConfig: {
        height: 50,
        labelConfig: {
          fontSize: () => fontSizeLg,
          fontColor: headingFontColor,
          fontFamily: () => typeface
        }
      },
      titleConfig: {
        fontFamily: () => typeface,
        fontColor: headingFontColor
      },
      // death to ticks
      tickSize: 0,
      tickFormat: d => formatAbbreviate(d),
      barConfig: {
        stroke: "transparent"
      },
      rectConfig: {
        stroke: "transparent"
      }
    },
    color: [
      "#FFFFB2",
      "#FED976",
      "#FEB24C",
      "#FD8D3C",
      "#F03B20",
      "#BD0026"
    ],
    legendConfig: {
      shapeConfig: {
        height: shapeLegend,
        width: shapeLegend,
        stroke: "transparent"
      }
    },
    rectConfig: {
      rx: 0,
      ry: 0,
      borderRadius: 0,
      stroke: "transparent"
    }
  },
  colorScalePosition: "bottom",

  // geomaps
  ocean: "transparent",
  tiles: false,
  pointSizeMin: 1,
  pointSizeMax: 7,
  zoomScroll: false,

  // various visualizations
  shapeConfig: {
    // labels
    fontFamily: () => typeface,
    labelConfig: {
      fontFamily: () => typeface,
      fontMax: 32,
      padding: 10
    },
    // stacked area
    Area: {
      labelConfig: {
        fontColor: styles.white,
        fontFamily: () => typeface
        // fontMax: fontSizeLg,
        // fontMin: fontSizeSm
      },
      strokeWidth: d => 1
    },
    Bar: {
      labelConfig: {
        fontSize: () => 16,
        fontFamily: () => typeface
      },
      textAlign: "left",
      stroke: "transparent",
      strokeWidth: d => 1
    },
    // line charts
    Line: {
      curve: "monotoneX",
      labelConfig: {
        fontStrokeWidth: d => 0.5,
        fontWeight: 600,
        fontFamily: () => styles["base-font-stack-condensed"],
        padding: 3
      },
      stroke(d) {
        if (this && this._groupBy) {
          const item = this._groupBy[0](d);
          let itemId = Object.entries(d).find(h => h[1] === item)[0];
          if (itemId.includes(" ID")) itemId = itemId.replace(" ID", "");
          return findColorV2(itemId, d);
        }
        return undefined;
      },
      strokeWidth: 3,
      strokeLinecap: "round"
    },
    // scatter plots
    Circle: {
      // fill: d => {
      //   if (d["Trade Value RCA"]) {
      //     return d["Trade Value RCA"] > 1 ? findColor(d) : "#b1bac6";
      //   }
      //   return "#b1bac6";
      // },
      // stroke: "#aaaaaa",
      strokeWidth: 1
    },
    fill(d) {
      if (this && this._groupBy) {
        const parentName = this._groupBy[0](d);
        if (parentName) {
          let parent = Object.entries(d).find(h => h[1] === parentName) || [undefined];
          let parentId = parent[0];
          if (parentId.includes(" ID")) {
            parentId = parentId.slice(0, -3);
            parent = Object.entries(d).find(h => h[0] === parentId) || [undefined];
          }

          const bgColor = findColorV2(parentId, d);
          return bgColor;
        }
        else return "green";
      }
      else {
        return "transparent";
      }
    }
  },

  // timelines
  timelineConfig: {
    // handle
    handleConfig: {
      width: 9,
      fill: styles["accent-dark"]
    },
    tickFormat: d => {
      d = d.toString().includes("Q") ? d.toString().replace("Q", "0") : d;
      const latest = new Date(d);
      const id = latest.getFullYear();
      const month = latest.getUTCMonth() + 1;
      const day = latest.getDate();

      const tickString = id.toString();
      const len = tickString.length;

      let label = "";

      if (month === 1 && id < 20000) {
        label = id;
      }

      else if (len === 5) {
        // ${tickString.slice(0, 4)}-
        const quarter = tickString.slice(4, 5);
        label = quarter === "1" ? `${tickString.slice(0, 4)}` : `Q${quarter}`;
        // ${quarter}${tickString.slice(0, 4)}
      }
      else if (len === 6) {
        label = `${tickString.slice(0, 4)}/${tickString.slice(4, 6)}/01`;
      }
      else {
        label = latest;
      }
      return label;
    },
    // button stuff
    brushing: false,
    buttonBehavior: "buttons",
    buttonHeight: 20,
    buttonWidth: 200,
    buttonPadding: 5,
    // selected range
    selectionConfig: {
      "height": 8,
      "fill": styles["accent-dark"],
      "fill-opacity": 0.25,
      "transform": "translate(0, 2)"
    },
    // main horizontal bar line
    barConfig: {
      stroke: styles["light-3"],
      opacity: 0.5
    },
    shapeConfig: {
      // ticks and/or button bg
      fill: styles["light-3"],
      stroke: "none",
      // label and/or button text
      labelConfig: {
        fontColor(d) {
          const n = parseInt(d.text, 10);
          return defaultFontColor;
        },
        fontFamily: () => typeface,
        fontSize: () => fontSizeSm,
        lineHeight: () => fontSizeLg,
        padding: 0
      }
    },
    labelRotation: false,
    padding: 0
  },

  // tooltips
  tooltipConfig: {
    background: styles.white,
    footerStyle: {
      "color": headingFontColor,
      "fontFamily": () => typeface,
      "font-size": fontSizeSm,
      "padding-top": "5px",
      "text-align": "center"
    },
    title(d) {
      const {item, itemId, parent, parentId} = getTooltipTitle(this, d);
      const aggregated = Array.isArray(parent[1]) ? "Valores" : parent[1];
      const title = Array.isArray(item[1]) ? `Otros ${aggregated || "Valores"}` : item[1];
      const itemBgImg = ["Pais"].includes(itemId) ? itemId : parentId;
      let bgColor = findColorV2(itemBgImg, d);
      let imgUrl = findIconV2(itemBgImg, d);
      if (parentId === "type" && ["Perú"].includes(title)) {
        imgUrl = "/icons/visualizations/Pais/country_per.png";
        bgColor = undefined;
      }
      return tooltipTitle(bgColor, imgUrl, title);
    },
    tbody(d) {
      const output = [];
      if (d.Quarter) {
        output.push(["Quarter", d.Quarter]);
      }
      return output;
    }
  },
  totalConfig: {
    locale: "es-CL",
    fontSize: () => fontSizeMd
  },
  noDataHTML: "<img src='/icons/no-data.png' />",
  loadingHTML: `<div style="left: 50%; top: 50%; position: absolute; transform: translate(-50%, -50%);">
      <svg class="cp-viz-spinner" width="60px" height="60px" viewBox="0 0 317 317" xmlns="http://www.w3.org/2000/svg">
        <path class="outer" d="M16.43 157.072c0 34.797 12.578 66.644 33.428 91.277l-11.144 11.141c-23.673-27.496-37.992-63.283-37.992-102.418 0-39.133 14.319-74.921 37.992-102.423l11.144 11.144c-20.85 24.63-33.428 56.481-33.428 91.279z"/>
        <path class="outer" d="M157.793 15.708c34.798 0 66.648 12.58 91.28 33.427l11.143-11.144c-27.502-23.676-63.29-37.991-102.423-37.991-39.132 0-74.919 14.315-102.422 37.991l11.148 11.144c24.627-20.847 56.477-33.427 91.274-33.427"/>
        <path class="outer" d="M299.159 157.072c0 34.797-12.578 66.644-33.43 91.277l11.145 11.141c23.674-27.496 37.992-63.283 37.992-102.418 0-39.133-14.318-74.921-37.992-102.423l-11.145 11.144c20.852 24.63 33.43 56.481 33.43 91.279"/>
        <path class="outer" d="M157.793 298.432c-34.797 0-66.647-12.574-91.274-33.424l-11.148 11.138c27.503 23.682 63.29 37.997 102.422 37.997 39.133 0 74.921-14.315 102.423-37.997l-11.143-11.138c-24.632 20.85-56.482 33.424-91.28 33.424"/>
        <path class="middle" d="M226.59 61.474l-7.889 13.659c24.997 18.61 41.184 48.382 41.184 81.94 0 33.555-16.187 63.329-41.184 81.936l7.889 13.664c29.674-21.394 49.004-56.23 49.004-95.6 0-39.373-19.33-74.21-49.004-95.599"/>
        <path class="middle" d="M157.793 259.169c-52.398 0-95.553-39.485-101.399-90.317h-15.814c5.912 59.524 56.131 106.018 117.213 106.018 17.26 0 33.633-3.742 48.404-10.406l-7.893-13.672c-12.425 5.38-26.114 8.377-40.511 8.377"/>
        <path class="middle" d="M157.793 54.976c14.397 0 28.086 2.993 40.511 8.371l7.893-13.667c-14.771-6.669-31.144-10.412-48.404-10.412-61.082 0-111.301 46.493-117.213 106.021h15.814c5.846-50.831 49.001-90.313 101.399-90.313"/>
        <path class="inner" d="M95.371 164.193c-3.476-30.475 15.471-58.324 43.723-67.097l-1.804-15.842c-36.899 9.931-61.986 45.602-57.524 84.719 4.461 39.115 36.934 68.219 75.122 69.584l-1.806-15.838c-29.504-2.186-54.235-25.054-57.711-55.526"/>
        <path class="inner" d="M162.504 94.425c29.508 2.185 54.235 25.053 57.711 55.529 3.476 30.469-15.466 58.319-43.724 67.096l1.806 15.834c36.898-9.927 61.986-45.598 57.525-84.712-4.461-39.117-36.936-68.223-75.125-69.588l1.807 15.841z"/>
      </svg>
      <strong>Cargando...</strong>
      <sub style="bottom: 0; display: block; line-height: 1; margin-top: 5px;">
        <a style="color: inherit;" href="https://www.datawheel.us/" target="_blank">
          Desarrollado por Datawheel
        </a>
      </sub>
    </div>`
};
