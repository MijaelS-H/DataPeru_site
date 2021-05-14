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
  const availableParents = Object.entries(d).filter(h => h[1] === parentName);

  let parent = availableParents.length > 1 ? availableParents[1] : availableParents[0] || [undefined];
  //let parent = Object.entries(d).find(h => h[1] === parentName) || [undefined];
  let parentId = parent[0];
  if (parentId.includes(" ID")) {
    parentId = parentId.slice(0, -3);
    parent = Object.entries(d).find(h => h[0] === parentId) || [undefined];
  }
  const itemName = d3plusConfig._groupBy[len - 1](d);

  //const availableItems = Object.entries(d).filter(h => h[1] === item);
  //let itemId = availableItems.length > 1 ? availableItems[1][0] : availableItems[0][0]

  const availableItems = Object.entries(d).filter(h => h[1] === itemName);
  let item = availableItems.length > 1 ? availableItems[1] : availableItems[0] || [undefined];

  //let item = Object.entries(d).find(h => h[1] === itemName) || [undefined];
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
  //console.log(key,d);
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

    // Afiliaciones a sistemas de salud
    if (d.Indicador === "Pertenece a uno") return "#3282B8";
    if (d.Indicador === "No pertenece a uno") return "#BBE1FA";
    if (d.Indicador === "Total encuestado") return "#0F4C75";


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

  if (key === "Year" && Object.keys(d).includes("Tipo de Gasto")) {
    if (d.Year === 2014) return "#DE4463";
    if (d.Year === 2015) return "#821752";
  }

  if (key === "Year" && Object.keys(d).includes("Area de conocimiento")) {
    if (d.Year === 2014) return "#C3AED6";
    if (d.Year === 2015) return "#5D54A4";
  }

  if (key === "Categoria") {

    if (d.Indicador === "No tiene" && d["Categoria ID"] === 73) return "#F7C873";

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
    ].includes(d.Categoria) && (d["Indicador ID"] === 66)) {
      return colors["No accede CITE"][d["Categoria ID"]];
    }

    // Empleo
    else if (["Empleo informal"].includes(d.Categoria)) {
      return "#346B84";
    }

    else if ([
      "Trabajador independiente en la actividad principal",
      "Trabajador independiente en la actividad principal y secundaria",
      "Trabajador independiente en la actividad secundaria",
      "Trabajador no independiente"
    ].includes(d.Categoria)) {
      return colors["Informalidad laboral"][d["Categoria ID"]];
    }

    else if ([
      "No está registrado (no tiene ruc)",
      "Persona jurídica (sociedad anónima; srl; sociedad civil; eirl; fundación u asociación, etc)",
      "Persona natural (con ruc, rus, rer, u otro régimen)"
    ].includes(d.Categoria)) {
      return colors["Negocios o establecimientos independientes"][d["Categoria ID"]];
    }

    else if ([
      "Otro",
      "Es un trabajo eventual",
      "Le quita demasiado tiempo",
      "Los trámites son muy complicados",
      "No lo considera necesario",
      "No podrá asumir la carga de impuestos si se registra",
      "No sabe dónde o cómo registrarse",
      "No sabe si debe registrarse",
      "Su negocio es pequeño/produce poca cantidad"
    ].includes(d.Categoria) && (d["Indicador ID"] === 75)) {
      return colors["Composicion por registrados en sunat"][d["Categoria ID"]];
    }

    else if ([
      "Otro",
      "Como ambulante",
      "Dentro de las habitaciones de su vivienda",
      "En el domicilio de los clientes",
      "En local fijo en mercado público (tienda, stand)",
      "En puesto fijo en la vía pública",
      "En puesto improvisado en la vía pública",
      "En puesto improvisado en mercado público",
      "En su taller comercial dentro de su vivienda y en una habitación de uso exclusivo",
      "En taller, tienda, restaurante, hotel, oficina, consultorio, etc.",
      "En vehículo para transporte de personas o mercaderías"
    ].includes(d.Categoria) && (d["Indicador ID"] === 76)) {
      return colors["Composicion por negocio o actividad"][d["Categoria ID"]];
    }

    else if ([
      "No lleva cuentas",
      "Por medio de apuntes, registros o anotaciones personales",
      "Por medio de libros de ingresos y gastos exigidos por la sunat",
      "Por medios de libros o sistema de contabilidad completa"
    ].includes(d.Categoria) && (d["Indicador ID"] === 77)) {
      return colors["Composicion por tipo de instrumento contable"][d["Categoria ID"]];
    }

    else if ([
      "Agropecuario",
      "Caza, silvicultura, extracción de madera y pesca",
      "Comercio",
      "Comunicaciones",
      "Construcción",
      "Electricidad, gas, agua",
      "Finanzas y seguros",
      "Hospedaje",
      "Manufactura",
      "Minería y petróleo",
      "Otros servicios excl. públicos",
      "Transporte"
    ].includes(d.Categoria) && (d["Indicador ID"] === 52)) {
      return colors["Poblacion economicamente ocupada por sector"][d["Categoria ID"]];
    }

    else if ([
      "Contrato a plazo fijo (sujeto a modalidad)",
      "Contrato indefinido, nombrado, permanente",
      "Contrato por locación de servicios (honorarios profesionales, ruc), snp",
      "Convenios de formación laboral juvenil /prácticas pre-profesioanles",
      "Está en período de prueba",
      "Regimen especial de contratación administrativa (cas)",
      "Sin contrato",
      "Otro"
    ].includes(d.Categoria) && (d["Indicador ID"] === 53)) {
      return colors["Distribucion poblacion ocupada por contrato"][d["Categoria ID"]];
    }

    else if ([
      "De 101 a 500 personas",
      "De 21 a 50 personas",
      "De 51 a 100 personas",
      "Hasta 20 personas",
      "Más de 500 personas"
    ].includes(d.Categoria) && (d["Indicador ID"] === 54)) {
      return colors["Distribucion poblacion ocupada por tamaño"][d["Categoria ID"]];
    }

    // Salud
    else if ([
      "Essalud",
      "Seguro privado de salud",
      "Entidad prestadora de salud",
      "Seguro ff.aa./policiales",
      "Seguro integral de salud (sis)",
      "Seguro universitario",
      "Seguro escolar privado",
      "Otro"
    ].includes(d.Categoria)) {
      return colors["Afiliados segun sistema de prestacion"][d["Categoria ID"]];
    }

    else if ([
      "Acude a establecimiento en su distrito",
      "Acude a establecimiento en otro distrito",
      "No acude a establecimiento de salud"
    ].includes(d.Categoria) && (d["Indicador ID"] === 49)) {
      return colors["Centros de prestacion de salud"][d["Categoria ID"]];
    }

    // Educacion
    else if ([
      "Asiste a un centro de educación técnico productiva",
      "De vacaciones",
      "Estoy trabajando",
      "No existe centro de educación básica o superior en el centro poblado",
      "No me interesa/no me gusta el estudio",
      "No tiene la edad suficiente (para el grupo 3-5 años)",
      "Otra razón",
      "Problemas económicos",
      "Problemas familiares",
      "Se dedica a los quehaceres del hogar",
      "Terminó sus estudios: secundarios/ superiores /asiste a academia preuniversitaria"
    ].includes(d.Categoria) && (d["Indicador ID"] === 20)) {
      return colors["Poblacion no matriculada"][d["Categoria ID"]];
    }

    else if (d.Indicador === "Porcentaje de menores de 18 a_os matriculados que asisten y tienen atraso escolar") {
      return colors["Atraso escolar"][d["Categoria ID"]];
    }

    // Hogares
    else if ([
      "Hogar con ingresos independientes",
      "Hogar sin ingresos independientes"
    ].includes(d.Categoria) && (d["Indicador ID"] === 9)) {
      return colors["Hogares por tipo de ingresos laborales"][d["Categoria ID"]];
    }

    else if ([
      "Hogar con ingresos dependientes",
      "Hogar sin ingresos dependientes"
    ].includes(d.Categoria) && (d["Indicador ID"] === 7)) {
      return colors["Hogares por tipo de ingresos laborales"][d["Categoria ID"]];
    }

    else if ([
      "Hogar productor agricola",
      "Hogar productor pecuario",
      "Hogar productor forestal"
    ].includes(d.Categoria)) {
      return colors["Hogares productores"][d["Categoria ID"]];
    }

    else if ([
      "Pelágicos",
      "Demersales",
      "Costeros (pelágicos y demersales)",
      "Crustáceos",
      "Moluscos"
    ].includes(d.Categoria)) {
      return colors["Desembarque de recursos maritimos segun especies"][d["Categoria ID"]];
    }

    else if (d.Categoria === "Nacional" && d["Categoria ID"] === 1) return "#FF847C";
    else if (d.Categoria === "Extranjero" && d["Categoria ID"] === 2) return "#E84A5F";

    else if ([
      "Falta de tiempo",
      "Falta de interés",
      "Falta de dinero",
      "No tiene información oportuna",
      "No hay ofertas",
      "Otra"
    ].includes(d.Categoria)) {
      return colors["Razones no acceder elementos culturales"][d["Categoria ID"]];
    }

    else if ([
      "Muy baja diversidad en el consumo",
      "Baja diversidad en el consumo",
      "Media diversidad en el consumo",
      "Alta diversidad en el consumo"
    ].includes(d.Categoria)) {
      return colors["Diversidad de la demanda cultural"][d["Categoria ID"]];
    }

    else if ([
      "Hombres",
      "Mujeres"
    ].includes(d.Categoria)) {
      return colors["Cultura pueblos indigenas"][d["Categoria ID"]];
    }

    else if ([
      "Otros",
      "Entidades Públicas",
      "Medio De Comunicación",
      "Espacios Públicos",
      "Redes Sociales",
      "Lugares De Consumo",
      "Centros Laborales",
      "Centros Educativos"
    ].includes(d.Categoria)) {
      return colors["Alertas contra el racismo"][d["Categoria ID"]];
    }

  }

  if (key === "Subcategoria") {
    if ([
      `Museo Arqueológico de Áncash "Augusto Soriano Infante"`,
      `Museo Regional de Casma "Max Uhle"`,
      "Museo de Antropolgía, Arqueología e Historia Natural de Ranrahirca",
      "Museo Nacional Chavín",
      "Museo Arqueológico Zonal de Cabana",
      "Museo Arqueológico, Antropológico de Apurímac",
      "Museo de Sitio Wari",
      "Museo de Sitio de Quinua",
      `Museo Histórico Regional "Hipólito Unanue"`,
      "Museo Arqueológico y Etnográfico del Conjunto Monumental Belén",
      "Museo Histórico Regional del Cusco",
      "Museo de Sitio de Chinchero",
      `Museo de Sitio "Manuel Chávez Ballón"`,
      "Museo Amazónico Andino Qhapaq Ñan Quillabamba",
      "Museo de los Pueblos de Paucartambo",
      `Museo Regional "Daniel Hernández Morillo"`,
      `Museo Arqueológico "Samuel Humberto Espinoza Lozano"`,
      `Museo Regional de Ica "Adolfo Bermúdez Jenkins"`,
      `Museo de Sitio "Julio C. Tello" de Paracas`,
      "Museo Regional de Arqueología de Junín",
      "Museo de Sitio de Wariwillka",
      "Museo de Sitio de Chan Chan",
      "Museo Arqueológico Nacional Brüning",
      "Museo Tumbas Reales de Sipán",
      "Museo Nacional de Sicán",
      "Museo de Sitio Túcume",
      "Museo de Sitio Huaca Rajada - Sipán",
      "Museo de Sitio Huaca Chotuna - Chornancap",
      `Museo de Sitio "Arturo Jiménez Borja" - Puruchuco`,
      "Museo de Sitio Huallamarca",
      "Museo de Sitio Pachacamac",
      `Museo de Sitio "El Mirador del Cerro San Cristóbal"`,
      "Museo de Arte Italiano",
      "Museo de Sitio Huaca Pucllana",
      "Museo de la Nación",
      `Casa Museo "José Carlos Mariátegui"`,
      "Museo Nacional de Arqueología, Antropología e Historia del Perú",
      "Museo Nacional de la Cultura Peruana",
      "Museo Amazónico",
      "Museo de Sitio de Narihualá",
      "Sala de Oro del Museo Municipal Vicús",
      `Templo Museo "San Juan de Letrán"`,
      `Templo Museo "Nuestra Señora de la Asunción"`,
      "Museo Lítico de Pukara",
      "Museo Departamental San Martín",
      "Museo de Sitio Las Peañas",
      "Museo Histórico Regional de Tacna",
      `Museo de Sitio Cabeza de Vaca "Gran Chilimasa"`,
      "Lugar de la Memoria, la tolerancia y la inclusión social"
    ].includes(d.Subcategoria) && (d["Categoria ID"] === 3)) {
      return colors["Museos y salas de exposicion visitados"][d["Subcategoria ID"]];
    }

    else if ([
      "Parque Arqueológico Machu Picchu",
      "Monumento Arqueológico de Moray",
      "Zona Arqueológica Monumental Huaca del Sol y de la Luna",
      "Complejo Arqueológico Chan Chan (Palacio Nik-an)",
      "Zona Arqueológica Monumental Chavín de Huantar",
      "Parque Arqueológico Tipon",
      "Centro Arqueológico Ventanilla de Otuzco",
      "Sitio Arqueológico de Sillustani",
      "Reserva Arqueológica Líneas y Geoglifos de Nazca",
      "Paisaje Cultural Arqueológico Cumbemayo",
      "Zona Arqueológica Monumental Kuélap",
      "Zona Arqueológica Monumental Chavín de Huantar",
      "Sitio Arqueológico Pañamarca",
      "Sitio Arqueológico Saihuite",
      "Complejo Arqueológico Toro Muerto",
      "Complejo Arqueológico de Uyo Uyo",
      "Sitio Arqueológico Intihuatana",
      "Paisaje Cultural Arqueológico Cumbemayo",
      "Centro Arqueológico Ventanilla de Otuzco",
      "Monumento Arqueologico Kuntur Wasi",
      "Parque Arqueológico Macchu Picchu (Ruta 1: Camino Inka: Piscacucho Km. 82)",
      "Parque Arqueológico Macchu Picchu (Ruta 2: Camino Inka: Km. 88)",
      "Parque Arqueológico Macchu Picchu (Ruta 5: Camino Iinka: Chanchabamba Km. 104)",
      "Monumento Arqueológico de Raqchi",
      "Monumento Arqueológico de Moray",
      "Parque Arqueológico Tipon",
      "Monumento Arqueológico de Tarawasi",
      "Parque Arqueológico Nacional de Vilcabamba (Choquequirao)",
      "Conjunto Arqueológico de Huchuy Qosco",
      "Parque Arqueológico Machu Picchu",
      "Parque Arqueológico Macchu Picchu (Ingreso Salkantay-Paucarcancha)",
      "Zona Arqueológica Monumental de Garu",
      "Huanucopampa",
      "Sitio Arqueológico Pampas de Huayurí",
      "Monumento Arqueológico de Palpa (Lineas y Geoglifos de Sacramento)",
      "Sitio Arqueológico Centinela",
      "Reserva Arqueológica Líneas y Geoglifos de Nazca",
      "Complejo Arqueológico Chan Chan (Palacio Nik-an)",
      "Zona Arqueológica Monumental Huaca del Sol y de la Luna",
      "Zona Arqueológica Monumental El Brujo",
      "Sitio Arqueológico Huaca Arco Iris (Huaca El Dragón)",
      "Sitio Arqueológico Cerro Ventarrón",
      "Sitio Arqueológico Caral",
      "Zona Arqueológica de Huaycan de Cieneguilla",
      "Complejo Arqueológico Mateo Salado",
      "Sitio Arqueológico de Cerro Baúl",
      "Monumento Arqueológico de Cutimbo",
      "Sitio Arqueológico de Sillustani"
    ].includes(d.Subcategoria)) {
      return colors["Patrimonio cultural segun lugar arqueologico"][d["Subcategoria ID"]];
    }

    else if ([
      "Museo Nacional de Arqueología, Antropología e Historia del Perú",
      "Museo Tumbas Reales de Sipán",
      "Museo de Sitio Pucllana",
      "Museo de Sitio Pachacamac",
      "Museo Histórico Regional de Cusco",
      "Museo Arqueológico y Etnográfico del Conjunto Monumental Belén",
      "Museo de Sitio Wari",
      "Museo Nacional Chavín",
      "Museo Lítico de Pukara",
      "Museo de Sitio Túcume",
      "Museo de la Nación",
      "Lugar de la Memoria, la Tolerancia y la Inclusión Social",
      "Sala de Exhibición de la Zona Arqueológica Monumental de Kotosh",
      "Sala de Exhibición del Monumento Arqueológico de Willkawaín",
      `Sala de Exhibición "Gilberto Tenorio Ruiz"`,
      "Sala de Exhibición de Pikillaqta",
      `Sala de Exhibición del Sitio Arqueológico "Tambo Colorado"`,
      "Sala de Oro del Museo Municipal Vicús",
      "Casa de la Gastronomía Peruana y Museo Postal y Filatélico del Perú"
    ].includes(d.Subcategoria)) {
      return colors["Museos y salas de exposicion mas visitados"][d["Subcategoria ID"]];
    }

    else if ([
      "Orquesta Sinfónica Nacional del Perú",
      "Orquesta Sinfónica Nacional Juvenil Bicentenario del Perú",
      "Coro Nacional del Perú",
      "Coro Nacional de Niños del Perú",
      "Ballet Folclórico Nacional del Perú",
      "Ballet Nacional del Perú"
    ].includes(d.Subcategoria)) {
      return colors["Espectaculos de cultura"][d["Subcategoria ID"]];
    }

  }

  if (key === "Fuerza laboral") {
    if (d["Indicador ID"] === 102) {
      return colors["Vacantes dificiles de cubrir"][d["Fuerza laboral ID"]];
    }
  }

  if (key === "Departamento") {
    if (d["Indicador ID"] === 11 && [
      "Disminuyeron",
      "Aumentaron",
      "No sabe",
      "Siguieron igual"
    ].includes(d.Categoria)) {
      return colors["Percepcion delitos"][d["Categoria ID"]];
    }

    if (d["Indicador ID"] === 18 && [
      "No sabe",
      "Continuará igual de bien",
      "Continuará igual de mal",
      "Empeorará",
      "Mejorará"
    ].includes(d.Categoria)) {
      return colors["Percepcion delitos 2019"][d["Categoria ID"]];
    }

    else if (["01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
              "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
              "21", "22", "23", "24", "25"
    ].includes(d["Departamento ID"])) {
      return colors["Departamento"][d["Departamento ID"]];
    }
  }

  if (key === "Nacion") {
    return "#F08A5D";
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

    // Empleo
    else if (["Ingreso laboral mensual total (monetario y no monetario)"].includes(d.Indicador)) {
      return "#732638";
    }

    else if ([
      "Ingreso bruto de la actividad principal monetario (dependiente)",
      "Ingreso por pago en especie de la actividad principal",
      " Ingreso por actividad principal independiente",
      "Ingreso por autoconsumo de la actividad principal independiente",
    ].includes(d.Indicador)) {
      return colors["Tipos de ingresos actividad principal"][d["Indicador ID"]];
    }

    else if ([
      "Ingreso bruto de la actividad secundaria dependiente",
      "Ingreso pago en especie de la actividad secundaria dependiente",
      "Ingreso neto de la actividad secundaria independiente",
      "Ingreso por autoconsumo de la actividad secundaria independiente",
    ].includes(d.Indicador)) {
      return colors["Tipos de ingresos actividad secundaria"][d["Indicador ID"]];
    }

    else if ([
      "Horas semanales dedicadas al trabajo",
      "Horas semanales dedicadas al trabajo (ocupación principal)",
      "Horas semanales dedicadas al trabajo (ocupación secundaria)",
    ].includes(d.Indicador)) {
      return colors["Horas laborales"][d["Indicador ID"]];
    }

    else if(["Tiempo del negocio o establecimiento independiente"].includes(d.Indicador)) {
      return "#709FB0";
    }

    else if(["Trabajadores asalariados en el negocio o establecimiento independiente"].includes(d.Indicador)) {
      return "#3282B8";
    }

    else if(["Trabajadores no remunerados en el negocio o establecimiento independiente"].includes(d.Indicador)) {
      return "#005086";
    }

    else if ([
      "Lectura y escritura",
      "Cálculo y numérica",
      "Inglés",
      "Técnicas específicas para la ocupación",
      "Comunicación",
      "Liderazgo",
      "Trabajar en equipo",
      "Pensamiento creativo y crítico",
      "Trabajar independientemente",
      "Manejo de tiempo",
      "Estabilidad emocional",
      "Extraversión"
    ].includes(d.Indicador) && d["Categoria ID"] === 4) {
      return colors["Habilidades importantes para las empresas"][d["Indicador ID"]];
    }

    // Salud
    if (d.Indicador === "Afiliado al sistema de prestación de salud" && d.Categoria === "Pertenece a uno" && d["Categoria ID"] === 37) return "#3282B8";
    if (d.Indicador === "Afiliado al sistema de prestación de salud" && d.Categoria === "No pertenece a uno" && d["Categoria ID"] === 38) return "#BBE1FA";
    if (d.Indicador === "Afiliado al sistema de prestación de salud" && d.Categoria === "Total de personas preguntadas" && d["Categoria ID"] === 99) return "#0F4C75";

    // Educacion
    if (d.Indicador === "Gasto Promedio mensual en educación del hogar") return "#6B48FF";

    // Hogares
    if (d.Indicador === "Ingreso promedio mensual de actividades dependientes del hogar") return "#AC005D";
    if (d.Indicador === "Ingreso promedio mensual de actividades independientes del hogar") return "#F85959";
    if (d.Indicador === "Gasto Promedio mensual monetario del hogar") return "#FF9F68";

    // Hogares - Sankeys
    if (d.Indicador === "No hace uso"     && d["Indicador ID"] === 21 && d["Categoria ID"] === 16) return "#78C2C3";
    if (d.Indicador === "Si hace uso"     && d["Indicador ID"] === 21 && d["Categoria ID"] === 17) return "#3F6699";
    if (d.Indicador === "Total población" && d["Indicador ID"] === 21 && d["Categoria ID"] === 99) return "#0D1B4C";

    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 22 && d["Categoria ID"] === 17) return "#A0DBDB";
    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 23 && d["Categoria ID"] === 17) return "#1E6B7F";
    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 24 && d["Categoria ID"] === 17) return "#01AAC1";
    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 25 && d["Categoria ID"] === 17) return "#97ECC5";
    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 26 && d["Categoria ID"] === 17) return "#56A7A7";
    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 27 && d["Categoria ID"] === 17) return "#2E89BA";
    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 28 && d["Categoria ID"] === 17) return "#A5BFDD";
    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 29 && d["Categoria ID"] === 17) return "#6E828A";

    // Instrumentos financieros
    if (d.Indicador === "Total con instrumento financiero" && d["Indicador ID"] === 66 && d["Categoria ID"] === 99) return "#6E5773";
    if (d.Indicador === "Total sin instrumento financiero" && d["Indicador ID"] === 73 && d["Categoria ID"] === 99) return "#D45D79";

    if (d.Indicador === "Si tiene" && d["Indicador ID"] === 67 && d["Categoria"] === "Tiene una cuenta de ahorros"            ) return "#EA9085";
    if (d.Indicador === "Si tiene" && d["Indicador ID"] === 68 && d["Categoria"] === "Tiene una cuenta de ahorro a plazo fijo") return "#8F8787";
    if (d.Indicador === "Si tiene" && d["Indicador ID"] === 69 && d["Categoria"] === "Tiene una cuenta corriente"             ) return "#A64452";
    if (d.Indicador === "Si tiene" && d["Indicador ID"] === 70 && d["Categoria"] === "Tiene una tarjeta de credito"           ) return "#470031";
    if (d.Indicador === "Si tiene" && d["Indicador ID"] === 71 && d["Categoria"] === "Tiene una tarjeta de débito"            ) return "#C02727";

    if (d.Indicador === "No tiene" && d["Categoria ID"] === 36) return "#65799B";
    if (d.Indicador === "No tiene" && d["Categoria ID"] === 72) return "#A12559";
    // if (d.Indicador === "No tiene" && d["Categoria ID"] === 73) return "#F7C873";
    if (d.Indicador === "No tiene" && d["Categoria ID"] === 74) return "#978D58";
    if (d.Indicador === "No tiene" && d["Categoria ID"] === 75) return "#5A5D9D";
    if (d.Indicador === "No tiene" && d["Categoria ID"] === 76) return "#346473";
    if (d.Indicador === "No tiene" && d["Categoria ID"] === 77) return "#DAD773";
    if (d.Indicador === "No tiene" && d["Categoria ID"] === 78) return "#7ECBA1";
    if (d.Indicador === "No tiene" && d["Categoria ID"] === 79) return "#90B2E4";

    else if ([
      "Información",
      "Comunicación",
      "Comprar productos y/o servicios",
      "Operaciones de banca electrónica",
      "Educación formal y actividades de capacitación",
      "Transacciones con organizaciones estatales/autoridades públicas",
      "Actividades de entretenimiento",
      "Vender productos y/o servicios"
    ].includes(d.Indicador)) {
      return colors["Internet segun uso"][d["Indicador ID"]];
    }

    // Gobierno
    else if ([
      "Financiamiento total promedio recibido de municipios provinciales y/o distritales",
      "Gasto total promedio por municipios",
      "Gasto total promedio en personal y obligaciones sociales por municipios",
      "Gasto total promedio en bienes y servicios por municipios",
      "Gasto total promedio en inversión"
    ].includes(d.Indicador)) {
      return colors["Finanzas por municipio"][d["Indicador ID"]];
    }

    // Industrias
    else if ([
      "Anchoveta",
      "Otros"
    ].includes(d.Indicador) && d["Tipo"] === "Pesca marítima") {
      return colors["Desembarque de recursos maritimos por utilizacion"][d["Indicador ID"]];
    }

    else if ([
      "Productos enlatados",
      "Productos congelados",
      "Productos curados",
      "Harina de pescado",
      "Aceite crudo de pescado"
    ].includes(d.Indicador)) {
      return colors["Transformacion de productos pesqueros"][d["Indicador ID"]];
    }

    if (d.Indicador === "Productos frescos") return colors["Transformacion de productos pesqueros"][d["Indicador ID"]];

    else if ([
      "Entrada de turistas",
      "Salida de turistas",
      "Ingreso de divisas (millones de dólares)",
      "Egreso de divisas (millones de dólares)",
      "Ingreso de divisas (dólares per cápita)",
      "Egreso de divisas (dólares per cápita)"
    ].includes(d.Indicador)) {
      return colors["Principales indicadores del sector turismo"][d["Indicador ID"]];
    }

    else if ([
      "Aeropuerto Jorge Chávez",
      "Puesto de control Santa Rosa",
      "Otros puntos"
    ].includes(d.Indicador)) {
      return colors["Ingreso de turistas internacionales"][d["Indicador ID"]];
    }

    else if ([
      "Nacionales",
      "Extranjeros"
    ].includes(d.Indicador)) {
      return colors["Flujo de huespedes en establecimientos"][d["Indicador ID"]];
    }

    else if ([
      "Arribos nacionales",
      "Arribos extranjeros",
      "Pernoctaciones nacionales",
      "Pernoctaciones extranjeros",
      "Permanencia promedio nacionales",
      "Permanencia promedio extranjeros"
    ].includes(d.Indicador)) {
      return colors["Turistas en establecimientos de hospedaje"][d["Indicador ID"]];
    }

    else if ([
      "Hogares agrícolas con riego tecnificado",
      "Hogares agrícolas que tuvieron inversión (gasto en fertilizantes, insecticidas y semillas)",
      "Hogares agrícolas que tuvieron inversión en asistencia técnica"
    ].includes(d.Indicador)) {
      return colors["Tecnologia agricola"][d["Indicador ID"]];
    }

    else if ([
      "Hogares agrícolas que producen subproductos agrícolas",
      "Hogares pecuarios que producen subproductos pecuarios"
    ].includes(d.Indicador)) {
      return colors["Subproductos agropecuarios"][d["Indicador ID"]];
    }


  }

  if (key === "Tipo") {
    if ([
      "Pesca marítima",
      "Pesca continental"
    ].includes(d.Tipo)) {
      return colors["Desembarque de recursos maritimos por utilizacion"][d["Tipo ID"]];
    }

    else if ([
      "Consumo humano directo",
      "Consumo humano indirecto"
    ].includes(d.Tipo)) {
      return colors["Venta interna de productos pesqueros"][d["Tipo ID"]];
    }

    else if ([
      "Nacional",
      "Extranjero"
    ].includes(d.Tipo)) {
      return colors["Patrimonio cultural segun tipo de visita"][d["Tipo ID"]];
    }


  }

  if (key === "Measure") {
    // Educacion
    if ([
      "Primaria o inferior",
      "Secundaria",
      "Superior no universitaria",
      "Universitaria"
    ].includes(d.Measure)) {
      return colors["Nivel academico alcanzado"][d["Measure ID"]];
    }

    else if ([
      "Analfabetismo entre 15 a 19 años",
      "Analfabetismo entre 20 a 29 años",
      "Analfabetismo entre 30 a 39 años",
      "Analfabetismo entre 40 a 49 años",
      "Analfabetismo entre 50 a 59 años",
      "Analfabetismo en edad de 60 años y mas",
    ].includes(d.Measure)) {
      return colors["Analfabetismo segun grupo etario"][d["Measure ID"]];
    }

    // Demografia
    else if ([
      "Población masculina",
      "Población femenina"
    ].includes(d.Measure)) {
      return colors["Composicion demografica por genero"][d["Measure ID"]];
    }

    else if ([
      "Nacimientos anuales",
      "Defunciones anuales",
      "Crecimiento natural"
    ].includes(d["Measure"])) {
      return colors["Crecimiento natural"][d["Measure ID"]];
    }

    else if ([
      "Vivienda inadecuada",
      "Vivienda hacinada",
      "Carecen servicios higiénicos",
      "Menores sin escuela",
      "Alta dependencia económica"
    ].includes(d["Measure"])) {
      return colors["Necesidades basicas insatisfechas"][d["Measure ID"]];
    }

    // Gobierno
    else if ([
      "Municipalidades con bibliotecas",
      "Municipalidades que disponen de servicio bibliotecario",
      "Municipalidades que disponen de computadoras operativos en la biblioteca"
    ].includes(d["Measure"])) {
      return colors["Bibliotecas y servicios bibliotecarios"][d["Measure ID"]];
    }

    else if ([
      "Gestión de los tramites documentarios",
      "Gestión de las licencias de edificación y habilitación urbana",
      "Gestión de las bibliotecas",
      "Gestión del registro civil",
      "Gestión del presupuesto",
      "Gestión de abastecimiento",
      "Gestión de la contabilidad",
      "Gestión de la tesoreria",
      "Gestión del personal",
      "Gestión de la renta y administración tributaria",
      "Gestión del catastro",
      "Gestión de las licencias de funcionamiento"
    ].includes(d["Measure"])) {
      return colors["Portal de transparencia y sistemas informaticos"][d["Measure ID"]];
    }

    else if ([
      "Linea de telefonía fija en servicio",
      "Linea de telefonía móvil en servicio",
      "Servicio de internet"
    ].includes(d["Measure"])) {
      return colors["Conectividad"][d["Measure ID"]];
    }

    else if ([
      "Fotocopiadora",
      "Escáner",
      "Impresora básica",
      "Impresora multifuncional",
      "Proyector multimedia"
    ].includes(d["Measure"])) {
      return colors["Equipamiento"][d["Measure ID"]];
    }

    else if ([
      "Control de aseo; higiene y salubridad",
      "Control de pesas y medidas de mercado",
      "Control de comercio ambulatorio",
      "Control de licencia de funcionamiento",
      "Control de licencia de edificación",
      "Control de certificado de inspección de seguridad en edificaciones",
      "Control de anuncios publicitario",
      "Control de transporte urbano"
    ].includes(d["Measure"])) {
      return colors["Fiscalizacion municipal"][d["Measure ID"]];
    }

    else if (d.Measure === "Licencias para actividades comerciales"              ) return "#09A8FA";
    else if (d.Measure === "Licencias para actividades artesanías y manufactura" ) return "#DD5B82";
    else if (d.Measure === "Licencias para actividades agropecuarias"            ) return "#3D93A3";

    else if ([
      "Funcionarios y/o directivos",
      "Profesionales",
      "Técnicos",
      "Auxiliares",
      "Obreros"
    ].includes(d["Measure"])) {
      return colors["Composicion de empleados municipales segun tipo de trabajador"][d["Measure ID"]];
    }

    else if ([
      "Frecuencia diaria",
      "Frecuencia interdiaria",
      "Frecuencia de dos veces por semana",
      "Frecuencia de una vez por semana"
    ].includes(d["Measure"])) {
      return colors["Frecuencia de recojo de residuos solidos"][d["Measure ID"]];
    }

    else if ([
      "Cobertura inferior al 25%",
      "Cobertura con más del 25% y menos del 49%",
      "Cobertura con más del 50% y menos del 74%",
      "Cobertura superior al 75%"
    ].includes(d["Measure"])) {
      return colors["Cobertura de recojo de residuos solidos"][d["Measure ID"]];
    }

    else if ([
      "Unidades moviles de serenazgo operativos",
      "Equipos de comunicación y videovigilancia"
    ].includes(d["Measure"])) {
      return colors["Equipos de seguridad y unidades de serenazgo"][d["Measure ID"]];
    }

    else if ([
      "Personal femenino",
      "Personal masculino",
      "Personal nombrado femenino",
      "Personal nombrado masculino",
      "Personal contratado femenino",
      "Personal contratado masculino"
    ].includes(d["Measure"])) {
      return colors["Recursos humanos"][d["Measure ID"]];
    }

  }

  if (key === "Tipo de indicador"){
    // Demografia
    if([
      "Evolución poblacion censada urbana",
      "Evolución poblacion censada rural"
    ].includes(d["Tipo de indicador"])) {
      return colors["Composicion demografica urbana rural"][d["Tipo de indicador ID"]];
    }

  }

  if (key === "Sexo_Tipo"){
    // Demografia
    return colors["Proyeccion demografica urbano rural"][d["Sexo_Tipo ID"]];
  }

  if (key === "Industria" && d["Indicador ID"] === 11 && [
    "Disminuyeron",
    "Aumentaron",
    "No sabe",
    "Siguieron igual"
  ].includes(d.Categoria)) {
    return colors["Percepcion delitos"][d["Categoria ID"]];
  }

  if (key === "Industria" && d["Indicador ID"] === 18 && [
    "No sabe",
    "Continuará igual de bien",
    "Continuará igual de mal",
    "Empeorará",
    "Mejorará"
  ].includes(d.Categoria)) {
    return colors["Percepcion delitos 2019"][d["Categoria ID"]];
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

  // Educacion
  if (key === "Tipo de indicador") {
    if (d["Tipo de indicador"] === "Matriculados sistema educativo rural") return "#87DDAC";
    if (d["Tipo de indicador"] === "Matriculados sistema educativo urbano") return "#7AD9F5";
  }

  if (key === "Sub ambito geografico") {
    if ([
      "Urbana",
      "Rural",
      "Costa",
      "Sierra",
      "Selva",
    ].includes(d["Sub ambito geografico"])) {
      return colors["Poblacion economicamente activa segun region"][d["Sub ambito geografico ID"]];
    }
  }

  if (key === "Value") {
    if      (d.Measure === "Licencias para actividades comerciales"              ) return "#09A8FA";
    else if (d.Measure === "Licencias para actividades artesanías y manufactura" ) return "#DD5B82";
    else if (d.Measure === "Licencias para actividades agropecuarias"            ) return "#3D93A3";

    else if ([
      "Inscripciones de hechos vitales en la Oficina de Registro de Estado Civil (OREC)",
      "Recojo de residuos solidos (basura)",
      "Servicio público de anuncios y propaganda",
      "Servicio público de agua potable y desagüe",
      "Servicio de limpieza pública",
      "Servicio público de uso de cementerios",
      "Control del comercio ambulatorio",
      "Realizan control de pesas y medidas",
      "Construcción de cercos",
      "Construcción de caminos rurales",
      "Permiso de ocupación de vía pública",
      "Servicio de registro civil",
      "Servicio bibliotecario",
      "Servicio de conservación de areas verdes",
      "Cobran tasas y arbitrios",
      "Brindan licencias"
    ].includes(d["Type"])) {
      return colors["Servicios publicos"][d["Type ID"]];
    }

  }

  if (key === "Type") {
    if ([
      "Posee servicio de Internet",
      "No posee servicio de Internet"
    ].includes(d["Type"])) {
      return colors["Conectividad gobiernos locales"][d["Type ID"]];
    }

    else if ([
      "Inscripciones de hechos vitales en la Oficina de Registro de Estado Civil (OREC)",
      "Recojo de residuos solidos (basura)",
      "Servicio público de anuncios y propaganda",
      "Servicio público de agua potable y desagüe",
      "Servicio de limpieza pública",
      "Servicio público de uso de cementerios",
      "Control del comercio ambulatorio",
      "Realizan control de pesas y medidas",
      "Construcción de cercos",
      "Construcción de caminos rurales",
      "Permiso de ocupación de vía pública",
      "Servicio de registro civil",
      "Servicio bibliotecario",
      "Servicio de conservación de areas verdes",
      "Cobran tasas y arbitrios",
      "Brindan licencias"
    ].includes(d["Type"])) {
      return colors["Servicios publicos"][d["Type ID"]];
    }

    else if ([
      "Recibe Financiamiento",
      "No Recibe Financiamiento"
    ].includes(d["Type"])) {
      return colors["Financiamiento municipal"][d["Type ID"]];
    }

    else if ([
      "Brinda licencias",
      "No brinda licencias"
    ].includes(d["Type"])) {
      return colors["Planificacion municipal distrital"][d["Type ID"]];
    }

  }

  if (key === "Subactividad economica") {
    if ([
      "Procesamiento y conservación de carnes",
      "Elaboración y preservación de pescado",
      "Elaboración de harina y aceite de pescado",
      "Procesamiento y conservación de frutas y vegetales",
      "Elaboración de aceites y grasas de origen vegetal y animal",
      "Fabricación de productos lácteos",
      "Molinería, fideos, panadería y otros",
      "Elaboración y refinación de azúcar",
      "Elaboración de otros productos alimenticios",
      "Elaboración de alimentos preparados para animales",
      "Elaboración de bebidas y productos del tabaco",
      "Fabricación de textiles",
      "Fabricación de prendas de vestir",
      "Fabricación de cuero y calzado",
      "Fabricación de madera y productos de madera",
      "Fabricación de papel y productos de papel",
      "Impresión y reproducción de grabaciones",
      "Refinación de petróleo",
      "Fabricación de sustancias químicas básicas y abonos",
      "Fabricación de productos químicos",
      "Fabricación de productos farmacéuticos y medicamentos",
      "Fabricacion de productos de caucho y plástico",
      "Fabricación de productos minerales no metálicos",
      "Industria básica de hierro y acero",
      "Industria de metales preciosos y de metales no ferrosos",
      "Fabricación de productos metálicos diversos",
      "Fabricación de productos informáticos, electrónicos y ópticos",
      "Fabricación de maquinaria y equipo",
      "Construcción de material de transporte",
      "Fabricación de muebles",
      "Otras industrias manufactureras"
    ].includes(d["Subactividad economica"])) {
      return colors["Valor agregado bruto"][d["Subactividad economica ID"]];
    }

  }

  if (key === "Grupo economico") {
    if ([
      "Elaboración y conservación de carne",
      "Elaboración y conservación de pescado, crustáceos y moluscos",
      "Elaboración y conservación de frutas, legumbres y hortalizas",
      "Elaboración de aceites y grasas de origen vegetal y animal",
      "Elaboración de productos lácteos",
      "Elaboración de productos de molinería",
      "Elaboración de otros productos alimenticios",
      "Elaboración de piensos preparados para animales",
      "Elaboración de Bebidas"
    ].includes(d["Grupo economico"])) {
      return colors["Produccion de la industria de productos alimenticios y bebidas"][d["Grupo economico ID"]];
    }

    else if ([
      "Hilatura, Tejedura y Acabados de Productos Textiles",
      "Fabricación de Otros Productos Textiles",
      "Fabricación de prendas de vestir, excepto prendas de piel",
      "Fabricación de prendas de tejidos y de punto crochet",
      "Curtido y Adobo de Cueros",
      "Fabricación de Calzado",
      "Productos de madera",
      "Fabricación de Papel y de Productos de Papel"
    ].includes(d["Grupo economico"])) {
      return colors["Produccion de las industrias textiles y otros"][d["Grupo economico ID"]];
    }

    else if ([
      "Fabricación de Productos Metálicos para Uso Estructural",
      "Fabricación de Otros Productos Elaborados de Metal",
      "Fabricación de Motores, Generadores y Transformadores Eléctricos",
      "Fabricación de baterías y acumuladores",
      "Fabricación de cables y dispositivos de cable",
      "Fabricación de maquinaria de uso general",
      "Fabricación de carrocerías para vehículos automotores",
      "Fabricación de otros tipos de equipo de transporte"
    ].includes(d["Grupo economico"])) {
      return colors["Produccion de las industrias de elaborados de metal y otros"][d["Grupo economico ID"]];
    }

  }

    // Gobierno
    if (key === "Nivel Gobierno") {
      if ([
        "Gobierno nacional",
        "Gobiernos locales",
        "Gobiernos regionales"
      ].includes(d["Nivel Gobierno"])) {
        return colors["Presupuestos por tipo de gobierno"][d["Nivel Gobierno ID"]];
      }
    }

    if ( key === "Fuente de Financiamiento") {
      if ([
        "Recursos directamente recaudados",
        "Recursos por operaciones oficiales de credito",
        "Donaciones y transferencias",
        "Recursos determinados"
      ].includes(d["Fuente de Financiamiento"])) {
        return colors["Recaudacion segun composicion geografica"][d["Fuente de Financiamiento ID"]];
      }
    }

    if ( key === "Sector") {
      if ([
        "Gobierno local",
        "Presidencia consejo ministros",
        "Cultura",
        "Ambiental",
        "Justicia",
        "Interior",
        "Relaciones exteriores",
        "Economia y finanzas",
        "Educacion",
        "Salud",
        "Trabajo y promocion del empleo",
        "Agrario y de riego",
        "Energia y minas",
        "Contraloria general",
        "Defensoria del pueblo",
        "Junta nacional de justicia",
        "Ministerio publico",
        "Tribunal constitucional",
        "Defensa",
        "Fuero militar policial",
        "Congreso de la republica",
        "Jurado nacional de elecciones",
        "Oficina nacional de procesos electorales",
        "Registro nacional de identificacion y estado civil",
        "Comercio exterior y turismo",
        "Transportes y comunicaciones",
        "Vivienda construccion y saneamiento",
        "Produccion",
        "Mujer y poblaciones vulnerables",
        "Desarrollo e inclusion social",
        "Mancomunidades",
        "Mancomunidades regionales",
        "Gobiernos regionales"
      ].includes(d["Sector"])) {
        return colors["Recaudacion por sector economico"][d["Sector ID"]];
      }
    }

    if ( key === "Categoria de hospedaje") {
      if ([
        "1 Estrella",
        "2 Estrellas",
        "3 Estrellas",
        "4 Estrellas",
        "5 Estrellas",
        "Albergue",
        "Ecolodge",
        "No Categorizados"
      ].includes(d["Categoria de hospedaje"])) {
        return colors["Indicadores de capacidad de alojamiento"][d["Categoria de hospedaje ID"]];
      }
    }

    if ( key === "Manifestacion 1") {
      if ([
        "No reportado",
        "Animación/mediación sociocultural",
        "Artes escénicas - circo, teatro",
        "Audiovisuales - cine, video y/u otros",
        "Artes escénicas - danza",
        "Artes visuales y artesanía",
        "Interpretación ambiental",
        "Celebración de festividades, fiestas tradicionales y/o rituales",
        "Libro, lectura y/o escritura",
        "Protección del patrimonio cultural y proyección de cultura local",
        "Títeres",
        "Comida / Gastronomía",
        "Música",
        "Deporte, recreación y/o juego",
        "Comunicaciones (periodismo, radio, podcast y/u otra)",
        "Tradición oral propia de pueblos indígenas u originarios"
      ].includes(d["Manifestacion 1"]) && (
        [99,  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16
      ].includes(d["Manifestacion 1 ID"]))) {
        return colors["Organizaciones que trabajan el arte y la cultura"][d["Manifestacion 1 ID"]];
      }
    }

    if ( key === "Actividad 1") {
      if ([
        "Productora",
        "Servicios conexos",
        "Exhibidora",
        "Distribuidora",
        "Formación"
      ].includes(d["Actividad 1"]) && (
        ["1_1", "1_2", "1_3", "1_4", "1_5"
      ].includes(d["Actividad 1 ID"]))) {
        return colors["Empresas y organizaciones cinematograficas"][d["Actividad 1 ID"]];
      }

      else if ([
        "Editorial",
        "Cartonera",
        "Librería",
        "Distribuidora",
        "Revista",
        "Imprenta",
        "Fondos Universitarios",
        "Prensa",
        "Autor-editor",
        "Fanzine"
      ].includes(d["Actividad 1"])) {
        return colors["Agentes del ecosistema del libro"][d["Actividad 1 ID"]];
      }

    }

    if ( key === "Cantidad Agentes") {
      if ([
        "Editorial",
        "Cartonera",
        "Librería",
        "Distribuidora",
        "Revista",
        "Imprenta",
        "Fondos Universitarios",
        "Prensa",
        "Autor-editor",
        "Fanzine"
      ].includes(d["Actividad 1"])) {
        return colors["Agentes del ecosistema del libro"][d["Actividad 1 ID"]];
      }
    }

    if ( key === "Names") {
      if ([
        "Espectáculos de teatro",
        "Espectáculos de danza",
        "Espectáculos de circo",
        "Espectáculos musicales",
        "Funciones de cine",
        "Exposiciones de fotografía, pintura o galerías de arte",
        "Ferias artesanales",
        "Bibliotecas y/o salas de lectura",
        "Ferias de libros",
        "Festivales locales-tradicionales"
      ].includes(d["Names"])) {
        return colors["Demanda de servicios culturales"][d["Indicador ID"]];
      }

    }

    if (key === "Estado Beneficio" && Object.keys(d).includes("Fase Cadena Valor")) {
      return colors["Postulaciones segun fase de la cadena"][d["Estado Beneficio ID"]];
    }

    /*
    if ( key === "Estado Beneficio") {
      if ([
        "No beneficiario",
        "Beneficiario"
      ].includes(d["Estado Beneficio"])) {
        return colors["Postulaciones segun fase de la cadena"][d["Estado Beneficio ID"]];
      }

    }
*/
    if ( key === "Fase Cadena Valor") {
      if ([
        "Producción",
        "Acceso",
        "Creación",
        "Circulación",
        "Formación"
      ].includes(d["Fase Cadena Valor"])) {
        return colors["Postulaciones a estimulos economicos"][d["Fase Cadena Valor ID"]];
      }
    }

    if ( key === "Clasificacion") {
      if ([
        "Institutos Públicos",
        "Institutos de Educación Superior",
        "Institutos de Salud",
        "Centros de Investigación Privada sin Fines de Lucro",
        "Sociedad de Responsabilidad Limitada",
        "Sociedad Colectiva",
        "Sociedad Anónima Cerrada",
        "Sociedad Anónima Abierta",
        "Pública",
        "Asociación",
        "Otra"
      ].includes(d["Clasificacion"])) {
        return colors["Centros de investigacion"][d["Clasificacion ID"]];
      }

    }

    if ( key === "Tipo de gasto label") {
      if      (d["Tipo de gasto label"] === "Gasto interno promedio en I+D") return "#FFD57E";
      else if (d["Tipo de gasto label"] === "Gasto externo promedio en I+D") return "#FCA652";
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
  console.log(key, d);
  // const options = {2: "export", 1: "import"};
  if (key === "Pais" || key === "ISO 3") {
    const icon = key === "Pais" && Array.isArray(d["Pais ID"]) ? d["Continente ID"] : d[`${key} ID`];
    return `/icons/visualizations/Pais/country_${icon}.png`;
  }

  if (key === "Indicador Tributo" && Object.keys(d).includes("Indicador Tributo Parent ID")) {
    return `/icons/visualizations/Subindicador Tributo/${d["Indicador Tributo ID"]}.png`;
  }

  if (key === "Year" && Object.keys(d).includes("Tipo de Gasto")) {
    return `/icons/visualizations/Presupuesto para investigacion/1.png`;
  }

  if (key === "Year" && Object.keys(d).includes("Area de conocimiento")) {
    return `/icons/visualizations/Proyectos de investigacion/1.png`;
  }


  if (key === "Categoria") {

    if (d.Indicador === "No tiene" && d["Categoria ID"] === 73) return `/icons/visualizations/Instrumentos financieros/7373.png`;

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
    ].includes(d.Categoria) && (d["Indicador ID"] === 66)) {
      return `/icons/visualizations/No accede CITE/${d["Categoria ID"]}.png`;
    }

    else if (["Empleo informal"].includes(d.Categoria)) {
      return `/icons/visualizations/Informalidad laboral/43.png`;
    }

    // Empleo
    else if ([
      "Trabajador independiente en la actividad principal",
      "Trabajador independiente en la actividad principal y secundaria",
      "Trabajador independiente en la actividad secundaria",
      "Trabajador no independiente"
    ].includes(d.Categoria)) {
      return `/icons/visualizations/Informalidad laboral/${d["Categoria ID"]}.png`;
    }

    else if ([
      "No está registrado (no tiene ruc)",
      "Persona jurídica (sociedad anónima; srl; sociedad civil; eirl; fundación u asociación, etc)",
      "Persona natural (con ruc, rus, rer, u otro régimen)"
    ].includes(d.Categoria)) {
      return `/icons/visualizations/Negocios o establecimientos independientes/${d["Categoria ID"]}.png`;
    }

    else if ([
      "Otro",
      "Es un trabajo eventual",
      "Le quita demasiado tiempo",
      "Los trámites son muy complicados",
      "No lo considera necesario",
      "No podrá asumir la carga de impuestos si se registra",
      "No sabe dónde o cómo registrarse",
      "No sabe si debe registrarse",
      "Su negocio es pequeño/produce poca cantidad"
    ].includes(d.Categoria) && (d["Indicador ID"] === 75)) {
      return `/icons/visualizations/Composicion por registrados en sunat/${d["Categoria ID"]}.png`;
    }

    else if ([
      "Otro",
      "Como ambulante",
      "Dentro de las habitaciones de su vivienda",
      "En el domicilio de los clientes",
      "En local fijo en mercado público (tienda, stand)",
      "En puesto fijo en la vía pública",
      "En puesto improvisado en la vía pública",
      "En puesto improvisado en mercado público",
      "En su taller comercial dentro de su vivienda y en una habitación de uso exclusivo",
      "En taller, tienda, restaurante, hotel, oficina, consultorio, etc.",
      "En vehículo para transporte de personas o mercaderías"
    ].includes(d.Categoria) && (d["Indicador ID"] === 76)) {
      return `/icons/visualizations/Composicion por negocio o actividad/${d["Categoria ID"]}.png`;
    }

    else if ([
      "No lleva cuentas",
      "Por medio de apuntes, registros o anotaciones personales",
      "Por medio de libros de ingresos y gastos exigidos por la sunat",
      "Por medios de libros o sistema de contabilidad completa"
    ].includes(d.Categoria) && (d["Indicador ID"] === 77)) {
      return `/icons/visualizations/Composicion por tipo de instrumento contable/${d["Categoria ID"]}.png`;
    }

    else if ([
      "Agropecuario",
      "Caza, silvicultura, extracción de madera y pesca",
      "Comercio",
      "Comunicaciones",
      "Construcción",
      "Electricidad, gas, agua",
      "Finanzas y seguros",
      "Hospedaje",
      "Manufactura",
      "Minería y petróleo",
      "Otros servicios excl. públicos",
      "Transporte"
    ].includes(d.Categoria) && (d["Indicador ID"] === 52)) {
      return `/icons/visualizations/Poblacion economicamente ocupada por sector/${d["Categoria ID"]}.png`;
    }

    else if ([
      "Contrato a plazo fijo (sujeto a modalidad)",
      "Contrato indefinido, nombrado, permanente",
      "Contrato por locación de servicios (honorarios profesionales, ruc), snp",
      "Convenios de formación laboral juvenil /prácticas pre-profesioanles",
      "Está en período de prueba",
      "Regimen especial de contratación administrativa (cas)",
      "Sin contrato",
      "Otro"
    ].includes(d.Categoria) && (d["Indicador ID"] === 53)) {
      return `/icons/visualizations/Distribucion poblacion ocupada por contrato/${d["Categoria ID"]}.png`;
    }

    else if ([
      "De 101 a 500 personas",
      "De 21 a 50 personas",
      "De 51 a 100 personas",
      "Hasta 20 personas",
      "Más de 500 personas"
    ].includes(d.Categoria) && (d["Indicador ID"] === 54)) {
      return `/icons/visualizations/Distribucion poblacion ocupada por tamaño/${d["Categoria ID"]}.png`;
    }

    // Salud
    else if ([
      "Essalud",
      "Seguro privado de salud",
      "Entidad prestadora de salud",
      "Seguro ff.aa./policiales",
      "Seguro integral de salud (sis)",
      "Seguro universitario",
      "Seguro escolar privado",
      "Otro"
    ].includes(d.Categoria)) {
      return `/icons/visualizations/Afiliados segun sistema de prestacion/${d["Categoria ID"]}.png`;
    }

    else if ([
      "Acude a establecimiento en su distrito",
      "Acude a establecimiento en otro distrito",
      "No acude a establecimiento de salud"
    ].includes(d.Categoria) && (d["Indicador ID"] === 49)) {
      return `/icons/visualizations/Centros de prestacion de salud/${d["Categoria ID"]}.png`;
    }

    // Educacion
    else if ([
      "Asiste a un centro de educación técnico productiva",
      "De vacaciones",
      "Estoy trabajando",
      "No existe centro de educación básica o superior en el centro poblado",
      "No me interesa/no me gusta el estudio",
      "No tiene la edad suficiente (para el grupo 3-5 años)",
      "Otra razón",
      "Problemas económicos",
      "Problemas familiares",
      "Se dedica a los quehaceres del hogar",
      "Terminó sus estudios: secundarios/ superiores /asiste a academia preuniversitaria"
    ].includes(d.Categoria) && (d["Indicador ID"] === 20)) {
      return `/icons/visualizations/Poblacion no matriculada/${d["Categoria ID"]}.png`;
    }

    else if (d.Indicador === "Porcentaje de menores de 18 a_os matriculados que asisten y tienen atraso escolar") {
      return `/icons/visualizations/Atraso escolar/${d["Categoria ID"]}.png`;
    }

    // Hogares
    else if ([
      "Hogar con ingresos independientes",
      "Hogar sin ingresos independientes"
    ].includes(d.Categoria) && (d["Indicador ID"] === 9)) {
      return `/icons/visualizations/Hogares por tipo de ingresos laborales/${d["Categoria ID"]}.png`;
    }

    else if ([
      "Hogar con ingresos dependientes",
      "Hogar sin ingresos dependientes"
    ].includes(d.Categoria) && (d["Indicador ID"] === 7)) {
      return `/icons/visualizations/Hogares por tipo de ingresos laborales/${d["Categoria ID"]}.png`;
    }

    else if ([
      "Hogar productor agricola",
      "Hogar productor pecuario",
      "Hogar productor forestal"
    ].includes(d.Categoria)) {
      return `/icons/visualizations/Hogares productores/${d["Categoria ID"]}.png`;
    }

    else if ([
      "Pelágicos",
      "Demersales",
      "Costeros (pelágicos y demersales)",
      "Crustáceos",
      "Moluscos"
    ].includes(d.Categoria)) {
      return `/icons/visualizations/Desembarque de recursos maritimos segun especies/${d["Categoria ID"]}.png`;
    }

    else if (d.Categoria === "Nacional" && d["Categoria ID"] === 1) return `/icons/visualizations/Museos y salas de exposicion visitados/1.png`;
    else if (d.Categoria === "Extranjero" && d["Categoria ID"] === 2) return `/icons/visualizations/Museos y salas de exposicion visitados/2.png`;

    else if ([
      "Falta de tiempo",
      "Falta de interés",
      "Falta de dinero",
      "No tiene información oportuna",
      "No hay ofertas",
      "Otra"
    ].includes(d.Categoria)) {
      return `/icons/visualizations/Razones no acceder elementos culturales/${d["Categoria ID"]}.png`;
    }

    else if ([
      "Muy baja diversidad en el consumo",
      "Baja diversidad en el consumo",
      "Media diversidad en el consumo",
      "Alta diversidad en el consumo"
    ].includes(d.Categoria)) {
      return `/icons/visualizations/Diversidad de la demanda cultural/${d["Categoria ID"]}.png`;
    }

    else if ([
      "Hombres",
      "Mujeres"
    ].includes(d.Categoria)) {
      return `/icons/visualizations/Cultura pueblos indigenas/${d["Categoria ID"]}.png`;
    }

    else if ([
      "Otros",
      "Entidades Públicas",
      "Medio De Comunicación",
      "Espacios Públicos",
      "Redes Sociales",
      "Lugares De Consumo",
      "Centros Laborales",
      "Centros Educativos"
    ].includes(d.Categoria)) {
      return `/icons/visualizations/Alertas contra el racismo/${d["Categoria ID"]}.png`;
    }


  }

  if (key === "Subcategoria") {
    if ([
      `Museo Arqueológico de Áncash "Augusto Soriano Infante"`,
      `Museo Regional de Casma "Max Uhle"`,
      "Museo de Antropolgía, Arqueología e Historia Natural de Ranrahirca",
      "Museo Nacional Chavín",
      "Museo Arqueológico Zonal de Cabana",
      "Museo Arqueológico, Antropológico de Apurímac",
      "Museo de Sitio Wari",
      "Museo de Sitio de Quinua",
      `Museo Histórico Regional "Hipólito Unanue"`,
      "Museo Arqueológico y Etnográfico del Conjunto Monumental Belén",
      "Museo Histórico Regional del Cusco",
      "Museo de Sitio de Chinchero",
      `Museo de Sitio "Manuel Chávez Ballón"`,
      "Museo Amazónico Andino Qhapaq Ñan Quillabamba",
      "Museo de los Pueblos de Paucartambo",
      `Museo Regional "Daniel Hernández Morillo"`,
      `Museo Arqueológico "Samuel Humberto Espinoza Lozano"`,
      `Museo Regional de Ica "Adolfo Bermúdez Jenkins"`,
      `Museo de Sitio "Julio C. Tello" de Paracas`,
      "Museo Regional de Arqueología de Junín",
      "Museo de Sitio de Wariwillka",
      "Museo de Sitio de Chan Chan",
      "Museo Arqueológico Nacional Brüning",
      "Museo Tumbas Reales de Sipán",
      "Museo Nacional de Sicán",
      "Museo de Sitio Túcume",
      "Museo de Sitio Huaca Rajada - Sipán",
      "Museo de Sitio Huaca Chotuna - Chornancap",
      `Museo de Sitio "Arturo Jiménez Borja" - Puruchuco`,
      "Museo de Sitio Huallamarca",
      "Museo de Sitio Pachacamac",
      `Museo de Sitio "El Mirador del Cerro San Cristóbal"`,
      "Museo de Arte Italiano",
      "Museo de Sitio Huaca Pucllana",
      "Museo de la Nación",
      `Casa Museo "José Carlos Mariátegui"`,
      "Museo Nacional de Arqueología, Antropología e Historia del Perú",
      "Museo Nacional de la Cultura Peruana",
      "Museo Amazónico",
      "Museo de Sitio de Narihualá",
      "Sala de Oro del Museo Municipal Vicús",
      `Templo Museo "San Juan de Letrán"`,
      `Templo Museo "Nuestra Señora de la Asunción"`,
      "Museo Lítico de Pukara",
      "Museo Departamental San Martín",
      "Museo de Sitio Las Peañas",
      "Museo Histórico Regional de Tacna",
      `Museo de Sitio Cabeza de Vaca "Gran Chilimasa"`,
      "Lugar de la Memoria, la tolerancia y la inclusión social"
    ].includes(d.Subcategoria) && (d["Categoria ID"] === 3)) {
      return `/icons/visualizations/Museos y salas de exposicion mas visitados/museo.png`;
    }

    else if ([
      "Parque Arqueológico Machu Picchu",
      "Monumento Arqueológico de Moray",
      "Zona Arqueológica Monumental Huaca del Sol y de la Luna",
      "Complejo Arqueológico Chan Chan (Palacio Nik-an)",
      "Zona Arqueológica Monumental Chavín de Huantar",
      "Parque Arqueológico Tipon",
      "Centro Arqueológico Ventanilla de Otuzco",
      "Sitio Arqueológico de Sillustani",
      "Reserva Arqueológica Líneas y Geoglifos de Nazca",
      "Paisaje Cultural Arqueológico Cumbemayo"
    ].includes(d.Subcategoria) && ([87, 88, 89, 91, 93, 94, 95, 96, 97, 98].includes(d["Subcategoria ID"]))) {
      return `/icons/visualizations/Patrimonio cultural segun lugar arqueologico/sitio_arqueologico.png`;
    }

    else if ([
      "Zona Arqueológica Monumental Kuélap",
      "Zona Arqueológica Monumental Chavín de Huantar",
      "Sitio Arqueológico Pañamarca",
      "Sitio Arqueológico Saihuite",
      "Complejo Arqueológico Toro Muerto",
      "Complejo Arqueológico de Uyo Uyo",
      "Sitio Arqueológico Intihuatana",
      "Paisaje Cultural Arqueológico Cumbemayo",
      "Centro Arqueológico Ventanilla de Otuzco",
      "Monumento Arqueologico Kuntur Wasi",
      "Parque Arqueológico Macchu Picchu (Ruta 1: Camino Inka: Piscacucho Km. 82)",
      "Parque Arqueológico Macchu Picchu (Ruta 2: Camino Inka: Km. 88)",
      "Parque Arqueológico Macchu Picchu (Ruta 5: Camino Iinka: Chanchabamba Km. 104)",
      "Monumento Arqueológico de Raqchi",
      "Monumento Arqueológico de Moray",
      "Parque Arqueológico Tipon",
      "Monumento Arqueológico de Tarawasi",
      "Parque Arqueológico Nacional de Vilcabamba (Choquequirao)",
      "Conjunto Arqueológico de Huchuy Qosco",
      "Parque Arqueológico Machu Picchu",
      "Parque Arqueológico Macchu Picchu (Ingreso Salkantay-Paucarcancha)",
      "Zona Arqueológica Monumental de Garu",
      "Huanucopampa",
      "Sitio Arqueológico Pampas de Huayurí",
      "Monumento Arqueológico de Palpa (Lineas y Geoglifos de Sacramento)",
      "Sitio Arqueológico Centinela",
      "Reserva Arqueológica Líneas y Geoglifos de Nazca",
      "Complejo Arqueológico Chan Chan (Palacio Nik-an)",
      "Zona Arqueológica Monumental Huaca del Sol y de la Luna",
      "Zona Arqueológica Monumental El Brujo",
      "Sitio Arqueológico Huaca Arco Iris (Huaca El Dragón)",
      "Sitio Arqueológico Cerro Ventarrón",
      "Sitio Arqueológico Caral",
      "Zona Arqueológica de Huaycan de Cieneguilla",
      "Complejo Arqueológico Mateo Salado",
      "Sitio Arqueológico de Cerro Baúl",
      "Monumento Arqueológico de Cutimbo",
      "Sitio Arqueológico de Sillustani"
    ].includes(d.Subcategoria) && ([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38].includes(d["Subcategoria ID"]))) {
      return `/icons/visualizations/Patrimonio cultural segun lugar arqueologico/complejo_arqueologico.png`;
    }

    else if ([
      "Museo Nacional de Arqueología, Antropología e Historia del Perú",
      "Museo Tumbas Reales de Sipán",
      "Museo de Sitio Pucllana",
      "Museo de Sitio Pachacamac",
      "Museo Histórico Regional de Cusco",
      "Museo Arqueológico y Etnográfico del Conjunto Monumental Belén",
      "Museo de Sitio Wari",
      "Museo Nacional Chavín",
      "Museo Lítico de Pukara",
      "Museo de Sitio Túcume",
      "Lugar de la Memoria, la Tolerancia y la Inclusión Social",
      "Museo de la Nación"
    ].includes(d.Subcategoria) && ([99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110].includes(d["Subcategoria ID"]))) {
      return `/icons/visualizations/Museos y salas de exposicion mas visitados/museo.png`;
    }

    else if ([
      "Sala de Exhibición de la Zona Arqueológica Monumental de Kotosh",
      "Sala de Exhibición del Monumento Arqueológico de Willkawaín",
      `Sala de Exhibición "Gilberto Tenorio Ruiz"`,
      "Sala de Exhibición de Pikillaqta",
      `Sala de Exhibición del Sitio Arqueológico "Tambo Colorado"`,
      "Sala de Oro del Museo Municipal Vicús",
      "Casa de la Gastronomía Peruana y Museo Postal y Filatélico del Perú"
    ].includes(d.Subcategoria) && ([110, 111, 112, 113, 114, 115, 116, 117].includes(d["Subcategoria ID"]))) {
      return `/icons/visualizations/Museos y salas de exposicion mas visitados/sala_de_exposicion.png`;
    }

    else if ([
      "Orquesta Sinfónica Nacional del Perú",
      "Orquesta Sinfónica Nacional Juvenil Bicentenario del Perú",
      "Coro Nacional del Perú",
      "Coro Nacional de Niños del Perú",
      "Ballet Folclórico Nacional del Perú",
      "Ballet Nacional del Perú"
    ].includes(d.Subcategoria)) {
      return `/icons/visualizations/Espectaculos de cultura/${d["Subcategoria ID"]}.png`;
    }

    else if (d.Categoria === "Localidades" && d["Categoria ID"] === 33) return `/icons/visualizations/Cultura pueblos indigenas/33.png`;



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

  if (key === "Fuerza laboral") {
    if (d["Indicador ID"] === 102) {
      return `/icons/visualizations/Vacantes dificiles de cubrir/${d["Fuerza laboral ID"]}.png`;
    }
  }

  if (key === "Departamento") {
    if (d["Indicador ID"] === 11 && [
      "Disminuyeron",
      "Aumentaron",
      "No sabe",
      "Siguieron igual"
    ].includes(d.Categoria)) {
      return `/icons/visualizations/Percepcion delitos/${d["Categoria ID"]}.png`;
    }

    else if (d["Indicador ID"] === 18 && [
      "No sabe",
      "Continuará igual de bien",
      "Continuará igual de mal",
      "Empeorará",
      "Mejorará"
    ].includes(d.Categoria)) {
      return `/icons/visualizations/Percepcion delitos 2019/${d["Categoria ID"]}.png`;
    }

    else if (["01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
              "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
              "21", "22", "23", "24", "25"
    ].includes(d["Departamento ID"])) {
      return `/icons/visualizations/Departamentos/${d["Departamento ID"]}.png`;
    }
  }

  if (key === "Nacion") {
      return `/icons/visualizations/Nacion/per.png`;
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

    // Empleo
    else if (["Ingreso laboral mensual total (monetario y no monetario)"].includes(d.Indicador)) {
      return `/icons/visualizations/Ingreso laboral total/55.png`
    }

    else if ([
      "Ingreso bruto de la actividad principal monetario (dependiente)",
      "Ingreso por pago en especie de la actividad principal",
      " Ingreso por actividad principal independiente",
      "Ingreso por autoconsumo de la actividad principal independiente",
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Tipos de ingresos actividad principal/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Ingreso bruto de la actividad secundaria dependiente",
      "Ingreso pago en especie de la actividad secundaria dependiente",
      "Ingreso neto de la actividad secundaria independiente",
      "Ingreso por autoconsumo de la actividad secundaria independiente",
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Tipos de ingresos actividad secundaria/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Horas semanales dedicadas al trabajo",
      "Horas semanales dedicadas al trabajo (ocupación principal)",
      "Horas semanales dedicadas al trabajo (ocupación secundaria)",
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Horas laborales/${d["Indicador ID"]}.png`;
    }

    else if(["Tiempo del negocio o establecimiento independiente"].includes(d.Indicador)) {
      return `/icons/visualizations/Empleo independiente otras caracteristicas/78.png`;
    }

    else if(["Trabajadores asalariados en el negocio o establecimiento independiente"].includes(d.Indicador)) {
      return `/icons/visualizations/Empleo independiente otras caracteristicas/79.png`;
    }

    else if(["Trabajadores no remunerados en el negocio o establecimiento independiente"].includes(d.Indicador)) {
      return `/icons/visualizations/Empleo independiente otras caracteristicas/80.png`;
    }

    else if ([
      "Lectura y escritura",
      "Cálculo y numérica",
      "Inglés",
      "Técnicas específicas para la ocupación",
      "Comunicación",
      "Liderazgo",
      "Trabajar en equipo",
      "Pensamiento creativo y crítico",
      "Trabajar independientemente",
      "Manejo de tiempo",
      "Estabilidad emocional",
      "Extraversión"
    ].includes(d.Indicador) && d["Categoria ID"] === 4) {
      return `/icons/visualizations/Habilidades importantes para las empresas/${d["Indicador ID"]}.png`;
    }

    // Salud
    if (d.Indicador === "Afiliado al sistema de prestación de salud" && d.Categoria === "Pertenece a uno" && d["Categoria ID"] === 37) return "/icons/visualizations/Afiliados segun si tienen prestacion/4837.png";
    if (d.Indicador === "Afiliado al sistema de prestación de salud" && d.Categoria === "No pertenece a uno" && d["Categoria ID"] === 38) return "/icons/visualizations/Afiliados segun si tienen prestacion/4839.png";
    if (d.Indicador === "Afiliado al sistema de prestación de salud" && d.Categoria === "Total de personas preguntadas" && d["Categoria ID"] === 99) return "/icons/visualizations/Afiliados segun si tienen prestacion/4899.png";

    // Educacion
    if (d.Indicador === "Gasto Promedio mensual en educación del hogar") return "/icons/visualizations/Gasto del hogar en educacion/gasto_promedio_hogar.png";

    // Hogares
    if (d.Indicador === "Ingreso promedio mensual de actividades dependientes del hogar") return "/icons/visualizations/Economia del hogar/8.png";
    if (d.Indicador === "Ingreso promedio mensual de actividades independientes del hogar") return "/icons/visualizations/Economia del hogar/10.png";
    if (d.Indicador === "Gasto Promedio mensual monetario del hogar") return "/icons/visualizations/Economia del hogar/11.png";

    // Hogares - Sankeys
    if (d.Indicador === "No hace uso" && d["Indicador ID"] === 21 && d["Categoria ID"] === 16) return `/icons/visualizations/Razones del uso de internet/no_hace_uso.png`;
    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 21 && d["Categoria ID"] === 17) return `/icons/visualizations/Razones del uso de internet/si_hace_uso.png`;
    if (d.Indicador === "Total población" && d["Indicador ID"] === 21 && d["Categoria ID"] === 99) return `/icons/visualizations/Razones del uso de internet/total_poblacion.png`;

    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 22 && d["Categoria ID"] === 17) return `/icons/visualizations/Razones del uso de internet/22.png`;
    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 23 && d["Categoria ID"] === 17) return `/icons/visualizations/Razones del uso de internet/23.png`;
    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 24 && d["Categoria ID"] === 17) return `/icons/visualizations/Razones del uso de internet/24.png`;
    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 25 && d["Categoria ID"] === 17) return `/icons/visualizations/Razones del uso de internet/25.png`;
    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 26 && d["Categoria ID"] === 17) return `/icons/visualizations/Razones del uso de internet/26.png`;
    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 27 && d["Categoria ID"] === 17) return `/icons/visualizations/Razones del uso de internet/27.png`;
    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 28 && d["Categoria ID"] === 17) return `/icons/visualizations/Razones del uso de internet/28.png`;
    if (d.Indicador === "Si hace uso" && d["Indicador ID"] === 29 && d["Categoria ID"] === 17) return `/icons/visualizations/Razones del uso de internet/29.png`;

    // Instrumentos financieros
    if (d.Indicador === "Total con instrumento financiero" && d["Indicador ID"] === 66 && d["Categoria ID"] === 99) return `/icons/visualizations/Instrumentos financieros/6699.png`;
    if (d.Indicador === "Total sin instrumento financiero" && d["Indicador ID"] === 73 && d["Categoria ID"] === 99) return `/icons/visualizations/Instrumentos financieros/7399.png`;

    if (d.Indicador === "Si tiene" && d["Indicador ID"] === 67 && d["Categoria"] === "Tiene una cuenta de ahorros"            ) return `/icons/visualizations/Instrumentos financieros/6717.png`;
    if (d.Indicador === "Si tiene" && d["Indicador ID"] === 68 && d["Categoria"] === "Tiene una cuenta de ahorro a plazo fijo") return `/icons/visualizations/Instrumentos financieros/6817.png`;
    if (d.Indicador === "Si tiene" && d["Indicador ID"] === 69 && d["Categoria"] === "Tiene una cuenta corriente"             ) return `/icons/visualizations/Instrumentos financieros/6917.png`;
    if (d.Indicador === "Si tiene" && d["Indicador ID"] === 70 && d["Categoria"] === "Tiene una tarjeta de credito"           ) return `/icons/visualizations/Instrumentos financieros/7017.png`;
    if (d.Indicador === "Si tiene" && d["Indicador ID"] === 71 && d["Categoria"] === "Tiene una tarjeta de débito"            ) return `/icons/visualizations/Instrumentos financieros/7117.png`;

    if (d.Indicador === "No tiene" && d["Categoria ID"] === 36) return `/icons/visualizations/Instrumentos financieros/7336.png`;
    if (d.Indicador === "No tiene" && d["Categoria ID"] === 72) return `/icons/visualizations/Instrumentos financieros/7372.png`;
    //if (d.Indicador === "No tiene" && d["Categoria ID"] === 73) return `/icons/visualizations/Instrumentos financieros/7373.png`;
    if (d.Indicador === "No tiene" && d["Categoria ID"] === 74) return `/icons/visualizations/Instrumentos financieros/7374.png`;
    if (d.Indicador === "No tiene" && d["Categoria ID"] === 75) return `/icons/visualizations/Instrumentos financieros/7375.png`;
    if (d.Indicador === "No tiene" && d["Categoria ID"] === 76) return `/icons/visualizations/Instrumentos financieros/7376.png`;
    if (d.Indicador === "No tiene" && d["Categoria ID"] === 77) return `/icons/visualizations/Instrumentos financieros/7377.png`;
    if (d.Indicador === "No tiene" && d["Categoria ID"] === 78) return `/icons/visualizations/Instrumentos financieros/7378.png`;
    if (d.Indicador === "No tiene" && d["Categoria ID"] === 79) return `/icons/visualizations/Instrumentos financieros/7379.png`;

    else if ([
      "Información",
      "Comunicación",
      "Comprar productos y/o servicios",
      "Operaciones de banca electrónica",
      "Educación formal y actividades de capacitación",
      "Transacciones con organizaciones estatales/autoridades públicas",
      "Actividades de entretenimiento",
      "Vender productos y/o servicios"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Internet segun uso/${d["Indicador ID"]}.png`;
    }

    // Gobierno
    else if ([
      "Financiamiento total promedio recibido de municipios provinciales y/o distritales",
      "Gasto total promedio por municipios",
      "Gasto total promedio en personal y obligaciones sociales por municipios",
      "Gasto total promedio en bienes y servicios por municipios",
      "Gasto total promedio en inversión"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Finanzas por municipio/${d["Indicador ID"]}.png`;
    }

    // Industria
    else if ([
      "Anchoveta",
      "Otros"
    ].includes(d.Indicador) && d["Tipo"] === "Pesca marítima") {
      return `/icons/visualizations/Desembarque de recursos maritimos por utilizacion/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Productos enlatados",
      "Productos congelados",
      "Productos curados",
      "Harina de pescado",
      "Aceite crudo de pescado"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Transformacion de productos pesqueros/${d["Indicador ID"]}.png`;
    }

    else if (d.Indicador === "Productos frescos") return "/icons/visualizations/Transformacion de productos pesqueros/6.png";

    else if ([
      "Entrada de turistas",
      "Salida de turistas",
      "Ingreso de divisas (millones de dólares)",
      "Egreso de divisas (millones de dólares)",
      "Ingreso de divisas (dólares per cápita)",
      "Egreso de divisas (dólares per cápita)"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Principales indicadores del sector turismo/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Aeropuerto Jorge Chávez",
      "Puesto de control Santa Rosa",
      "Otros puntos"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Ingreso de turistas internacionales/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Nacionales",
      "Extranjeros"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Flujo de huespedes en establecimientos/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Arribos nacionales",
      "Arribos extranjeros",
      "Pernoctaciones nacionales",
      "Pernoctaciones extranjeros",
      "Permanencia promedio nacionales",
      "Permanencia promedio extranjeros"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Turistas en establecimientos de hospedaje/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Hogares agrícolas con riego tecnificado",
      "Hogares agrícolas que tuvieron inversión (gasto en fertilizantes, insecticidas y semillas)",
      "Hogares agrícolas que tuvieron inversión en asistencia técnica"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Tecnologia agricola/${d["Indicador ID"]}.png`;
    }

    else if ([
      "Hogares agrícolas que producen subproductos agrícolas",
      "Hogares pecuarios que producen subproductos pecuarios"
    ].includes(d.Indicador)) {
      return `/icons/visualizations/Subproductos agropecuarios/${d["Indicador ID"]}.png`;
    }

  }

  if (key === "Tipo") {
    if ([
      "Pesca marítima",
      "Pesca continental"
    ].includes(d.Tipo)) {
      return `/icons/visualizations/Desembarque de recursos maritimos por utilizacion/${d["Tipo ID"]}.png`;
    }

    else if ([
      "Consumo humano directo",
      "Consumo humano indirecto"
    ].includes(d.Tipo)) {
      return `/icons/visualizations/Venta interna de productos pesqueros/${d["Tipo ID"]}.png`;
    }

    else if ([
      "Nacional",
      "Extranjero"
    ].includes(d.Tipo)) {
      return `/icons/visualizations/Patrimonio cultural segun tipo de visita/${d["Tipo ID"]}.png`;
    }


  }

  if (key === "Measure") {
    // Educacion
    if ([
      "Primaria o inferior",
      "Secundaria",
      "Superior no universitaria",
      "Universitaria"
    ].includes(d.Measure)) {
      return `/icons/visualizations/Nivel academico alcanzado/${d["Measure ID"]}.png`;
    }

    else if ([
      "Analfabetismo entre 15 a 19 años",
      "Analfabetismo entre 20 a 29 años",
      "Analfabetismo entre 30 a 39 años",
      "Analfabetismo entre 40 a 49 años",
      "Analfabetismo entre 50 a 59 años",
      "Analfabetismo en edad de 60 años y mas",
    ].includes(d.Measure)) {
      return `/icons/visualizations/Analfabetismo segun grupo etario/${d["Measure ID"]}.png`;
    }

    // Demografia
    else if ([
      "Población masculina",
      "Población femenina"
    ].includes(d.Measure)) {
      return `/icons/visualizations/Composicion demografica por genero/${d["Measure ID"]}.png`;
    }

    else if ([
      "Nacimientos anuales",
      "Defunciones anuales",
      "Crecimiento natural"
    ].includes(d["Measure"])) {
      return `/icons/visualizations/Crecimiento natural/${d["Measure ID"]}.png`;
    }

    // Hogares
    else if ([
      "Vivienda inadecuada",
      "Vivienda hacinada",
      "Carecen servicios higiénicos",
      "Menores sin escuela",
      "Alta dependencia económica"
    ].includes(d["Measure"])) {
      return `/icons/visualizations/Necesidades basicas insatisfechas/${d["Measure ID"]}.png`;
    }

    // Gobierno
    else if ([
      "Municipalidades con bibliotecas",
      "Municipalidades que disponen de servicio bibliotecario",
      "Municipalidades que disponen de computadoras operativos en la biblioteca"
    ].includes(d["Measure"])) {
      return `/icons/visualizations/Bibliotecas y servicios bibliotecarios/${d["Measure ID"]}.png`;
    }

    else if ([
      "Gestión de los tramites documentarios",
      "Gestión de las licencias de edificación y habilitación urbana",
      "Gestión de las bibliotecas",
      "Gestión del registro civil",
      "Gestión del presupuesto",
      "Gestión de abastecimiento",
      "Gestión de la contabilidad",
      "Gestión de la tesoreria",
      "Gestión del personal",
      "Gestión de la renta y administración tributaria",
      "Gestión del catastro",
      "Gestión de las licencias de funcionamiento"
    ].includes(d["Measure"])) {
      return `/icons/visualizations/Portal de transparencia y sistemas informaticos/${d["Measure ID"]}.png`;
    }

    else if ([
      "Linea de telefonía fija en servicio",
      "Linea de telefonía móvil en servicio",
      "Servicio de internet"
    ].includes(d["Measure"])) {
      return `/icons/visualizations/Conectividad/${d["Measure ID"]}.png`;
    }

    else if ([
      "Fotocopiadora",
      "Escáner",
      "Impresora básica",
      "Impresora multifuncional",
      "Proyector multimedia"
    ].includes(d["Measure"])) {
      return `/icons/visualizations/Equipamiento/${d["Measure ID"]}.png`;
    }

    else if ([
      "Control de aseo; higiene y salubridad",
      "Control de pesas y medidas de mercado",
      "Control de comercio ambulatorio",
      "Control de licencia de funcionamiento",
      "Control de licencia de edificación",
      "Control de certificado de inspección de seguridad en edificaciones",
      "Control de anuncios publicitario",
      "Control de transporte urbano"
    ].includes(d["Measure"])) {
      return `/icons/visualizations/Fiscalizacion municipal/${d["Measure ID"]}.png`;
    }

    else if (d.Measure === "Licencias para actividades comerciales"              ) return `/icons/visualizations/Planificacion municipal/1.png`;
    else if (d.Measure === "Licencias para actividades artesanías y manufactura" ) return `/icons/visualizations/Planificacion municipal/2.png`;
    else if (d.Measure === "Licencias para actividades agropecuarias"            ) return `/icons/visualizations/Planificacion municipal/3.png`;

    else if ([
      "Funcionarios y/o directivos",
      "Profesionales",
      "Técnicos",
      "Auxiliares",
      "Obreros"
    ].includes(d["Measure"])) {
      return `/icons/visualizations/Composicion de empleados municipales segun tipo de trabajador/${d["Measure ID"]}.png`;
    }

    else if ([
      "Frecuencia diaria",
      "Frecuencia interdiaria",
      "Frecuencia de dos veces por semana",
      "Frecuencia de una vez por semana"
    ].includes(d["Measure"])) {
      return `/icons/visualizations/Frecuencia de recojo de residuos solidos/${d["Measure ID"]}.png`;
    }

    else if ([
      "Cobertura inferior al 25%",
      "Cobertura con más del 25% y menos del 49%",
      "Cobertura con más del 50% y menos del 74%",
      "Cobertura superior al 75%"
    ].includes(d["Measure"])) {
      return `/icons/visualizations/Cobertura de recojo de residuos solidos/${d["Measure ID"]}.png`;
    }

    else if ([
      "Unidades moviles de serenazgo operativos",
      "Equipos de comunicación y videovigilancia"
    ].includes(d["Measure"])) {
      return `/icons/visualizations/Equipos de seguridad y unidades de serenazgo/${d["Measure ID"]}.png`;
    }

    else if ([
      "Personal femenino",
      "Personal masculino",
      "Personal nombrado femenino",
      "Personal nombrado masculino",
      "Personal contratado femenino",
      "Personal contratado masculino"
    ].includes(d["Measure"])) {
      return `/icons/visualizations/Recursos humanos/${d["Measure ID"]}.png`;
    }


  }

  if (key === "Tipo de indicador"){
    // Demografia
    if ([
      "Evolución poblacion censada urbana",
      "Evolución poblacion censada rural"
    ].includes(d["Tipo de indicador"])) {
      return `/icons/visualizations/Composicion demografica urbana rural/${d["Tipo de indicador ID"]}.png`;
    }

  }

  if (key === "Sexo_Tipo"){
    // Demografia
    return `/icons/visualizations/Proyeccion demografica urbano rural/${d["Sexo_Tipo ID"]}.png`;
  }

  if (key === "Industria" && d["Indicador ID"] === 11 && [
    "Disminuyeron",
    "Aumentaron",
    "No sabe",
    "Siguieron igual"
  ].includes(d.Categoria)) {
    return `/icons/visualizations/Percepcion delitos/${d["Categoria ID"]}.png`;
  }

  if (key === "Industria" && d["Indicador ID"] === 18 && [
    "No sabe",
    "Continuará igual de bien",
    "Continuará igual de mal",
    "Empeorará",
    "Mejorará"
  ].includes(d.Categoria)) {
    return `/icons/visualizations/Percepcion delitos 2019/${d["Categoria ID"]}.png`;
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

  // Educacion
  if (key === "Tipo de indicador") {
    if (d["Tipo de indicador"] === "Matriculados sistema educativo rural") return "/icons/visualizations/Matriculas por region geografica/3.png";
    if (d["Tipo de indicador"] === "Matriculados sistema educativo urbano") return "/icons/visualizations/Matriculas por region geografica/4.png";
  }

  if (key === "Sub ambito geografico") {
    if ([
      "Urbana",
      "Rural",
      "Costa",
      "Sierra",
      "Selva",
    ].includes(d["Sub ambito geografico"])) {
      return `/icons/visualizations/Poblacion economicamente activa segun region/${d["Sub ambito geografico ID"]}.png`
    }
  }

  if (key === "Value") {
    if      (d.Measure === "Licencias para actividades comerciales"              ) return `/icons/visualizations/Planificacion municipal/1.png`;
    else if (d.Measure === "Licencias para actividades artesanías y manufactura" ) return `/icons/visualizations/Planificacion municipal/2.png`;
    else if (d.Measure === "Licencias para actividades agropecuarias"            ) return `/icons/visualizations/Planificacion municipal/3.png`;

    else if ([
      "Inscripciones de hechos vitales en la Oficina de Registro de Estado Civil (OREC)",
      "Recojo de residuos solidos (basura)",
      "Servicio público de anuncios y propaganda",
      "Servicio público de agua potable y desagüe",
      "Servicio de limpieza pública",
      "Servicio público de uso de cementerios",
      "Control del comercio ambulatorio",
      "Realizan control de pesas y medidas",
      "Construcción de cercos",
      "Construcción de caminos rurales",
      "Permiso de ocupación de vía pública",
      "Servicio de registro civil",
      "Servicio bibliotecario",
      "Servicio de conservación de areas verdes",
      "Cobran tasas y arbitrios",
      "Brindan licencias"
    ].includes(d["Type"])) {
      return `/icons/visualizations/Servicios publicos/${d["Type ID"]}.png`
    }

    else if ([
      "Posee servicio de Internet",
      "No posee servicio de Internet"
    ].includes(d["Type"])) {
      return `/icons/visualizations/Conectividad gobiernos locales/${d["Type ID"]}.png`
    }

  }

  if (key === "Type") {
    if ([
      "Posee servicio de Internet",
      "No posee servicio de Internet"
    ].includes(d["Type"])) {
      return `/icons/visualizations/Conectividad gobiernos locales/${d["Type ID"]}.png`
    }

    else if ([
      "Inscripciones de hechos vitales en la Oficina de Registro de Estado Civil (OREC)",
      "Recojo de residuos solidos (basura)",
      "Servicio público de anuncios y propaganda",
      "Servicio público de agua potable y desagüe",
      "Servicio de limpieza pública",
      "Servicio público de uso de cementerios",
      "Control del comercio ambulatorio",
      "Realizan control de pesas y medidas",
      "Construcción de cercos",
      "Construcción de caminos rurales",
      "Permiso de ocupación de vía pública",
      "Servicio de registro civil",
      "Servicio bibliotecario",
      "Servicio de conservación de areas verdes",
      "Cobran tasas y arbitrios",
      "Brindan licencias"
    ].includes(d["Type"])) {
      return `/icons/visualizations/Servicios publicos/${d["Type ID"]}.png`
    }

    else if ([
      "Recibe Financiamiento",
      "No Recibe Financiamiento"
    ].includes(d["Type"])) {
      return `/icons/visualizations/Financiamiento municipal/${d["Type ID"]}.png`
    }

    else if ([
      "Brinda licencias",
      "No brinda licencias"
    ].includes(d["Type"])) {
      return `/icons/visualizations/Planificacion municipal distrital/${d["Type ID"]}.png`
    }

  }

  if (key === "Subactividad economica") {
    if ([
      "Procesamiento y conservación de carnes",
      "Elaboración y preservación de pescado",
      "Elaboración de harina y aceite de pescado",
      "Procesamiento y conservación de frutas y vegetales",
      "Elaboración de aceites y grasas de origen vegetal y animal",
      "Fabricación de productos lácteos",
      "Molinería, fideos, panadería y otros",
      "Elaboración y refinación de azúcar",
      "Elaboración de otros productos alimenticios",
      "Elaboración de alimentos preparados para animales",
      "Elaboración de bebidas y productos del tabaco",
      "Fabricación de textiles",
      "Fabricación de prendas de vestir",
      "Fabricación de cuero y calzado",
      "Fabricación de madera y productos de madera",
      "Fabricación de papel y productos de papel",
      "Impresión y reproducción de grabaciones",
      "Refinación de petróleo",
      "Fabricación de sustancias químicas básicas y abonos",
      "Fabricación de productos químicos",
      "Fabricación de productos farmacéuticos y medicamentos",
      "Fabricacion de productos de caucho y plástico",
      "Fabricación de productos minerales no metálicos",
      "Industria básica de hierro y acero",
      "Industria de metales preciosos y de metales no ferrosos",
      "Fabricación de productos metálicos diversos",
      "Fabricación de productos informáticos, electrónicos y ópticos",
      "Fabricación de maquinaria y equipo",
      "Construcción de material de transporte",
      "Fabricación de muebles",
      "Otras industrias manufactureras"
    ].includes(d["Subactividad economica"])) {
      return `/icons/visualizations/Valor agregado bruto/${d["Subactividad economica ID"]}.png`
    }

  }

  if (key === "Grupo economico") {
    if ([
      "Elaboración y conservación de carne",
      "Elaboración y conservación de pescado, crustáceos y moluscos",
      "Elaboración y conservación de frutas, legumbres y hortalizas",
      "Elaboración de aceites y grasas de origen vegetal y animal",
      "Elaboración de productos lácteos",
      "Elaboración de productos de molinería",
      "Elaboración de otros productos alimenticios",
      "Elaboración de piensos preparados para animales",
      "Elaboración de Bebidas"
    ].includes(d["Grupo economico"])) {
      return `/icons/visualizations/Produccion de la industria de productos alimenticios y bebidas/${d["Grupo economico ID"]}.png`
    }

    else if ([
      "Hilatura, Tejedura y Acabados de Productos Textiles",
      "Fabricación de Otros Productos Textiles",
      "Fabricación de prendas de vestir, excepto prendas de piel",
      "Fabricación de prendas de tejidos y de punto crochet",
      "Curtido y Adobo de Cueros",
      "Fabricación de Calzado",
      "Productos de madera",
      "Fabricación de Papel y de Productos de Papel"
    ].includes(d["Grupo economico"])) {
      return `/icons/visualizations/Produccion de las industrias textiles y otros/${d["Grupo economico ID"]}.png`
    }

    else if ([
      "Fabricación de Productos Metálicos para Uso Estructural",
      "Fabricación de Otros Productos Elaborados de Metal",
      "Fabricación de Motores, Generadores y Transformadores Eléctricos",
      "Fabricación de baterías y acumuladores",
      "Fabricación de cables y dispositivos de cable",
      "Fabricación de maquinaria de uso general",
      "Fabricación de carrocerías para vehículos automotores",
      "Fabricación de otros tipos de equipo de transporte"
    ].includes(d["Grupo economico"])) {
      return `/icons/visualizations/Produccion de las industrias de elaborados de metal y otros/${d["Grupo economico ID"]}.png`
    }


  }

  // Gobierno
  if (key === "Nivel Gobierno") {
    if ([
      "Gobierno nacional",
      "Gobiernos locales",
      "Gobiernos regionales"
    ].includes(d["Nivel Gobierno"])) {
      return `/icons/visualizations/Presupuestos por tipo de gobierno/${d["Nivel Gobierno ID"]}.png`
    }
  }

  if ( key === "Fuente de Financiamiento") {
    if ([
      "Recursos directamente recaudados",
      "Recursos por operaciones oficiales de credito",
      "Donaciones y transferencias",
      "Recursos determinados"
    ].includes(d["Fuente de Financiamiento"])) {
      return `/icons/visualizations/Recaudacion segun composicion geografica/${d["Fuente de Financiamiento ID"]}.png`
    }
  }

  if ( key === "Sector") {
    if ([
      "Gobierno local",
      "Presidencia consejo ministros",
      "Cultura",
      "Ambiental",
      "Justicia",
      "Interior",
      "Relaciones exteriores",
      "Economia y finanzas",
      "Educacion",
      "Salud",
      "Trabajo y promocion del empleo",
      "Agrario y de riego",
      "Energia y minas",
      "Contraloria general",
      "Defensoria del pueblo",
      "Junta nacional de justicia",
      "Ministerio publico",
      "Tribunal constitucional",
      "Defensa",
      "Fuero militar policial",
      "Congreso de la republica",
      "Jurado nacional de elecciones",
      "Oficina nacional de procesos electorales",
      "Registro nacional de identificacion y estado civil",
      "Comercio exterior y turismo",
      "Transportes y comunicaciones",
      "Vivienda construccion y saneamiento",
      "Produccion",
      "Mujer y poblaciones vulnerables",
      "Desarrollo e inclusion social",
      "Mancomunidades",
      "Mancomunidades regionales",
      "Gobiernos regionales"
    ].includes(d["Sector"])) {
      return `/icons/visualizations/Recaudacion por sector economico/${d["Sector ID"]}.png`
    }
  }

  if ( key === "Categoria de hospedaje") {
    if ([
      "1 Estrella",
      "2 Estrellas",
      "3 Estrellas",
      "4 Estrellas",
      "5 Estrellas",
      "Albergue",
      "Ecolodge",
      "No Categorizados"
    ].includes(d["Categoria de hospedaje"])) {
      return `/icons/visualizations/Indicadores de capacidad de alojamiento/${d["Categoria de hospedaje ID"]}.png`
    }
  }

  if ( key === "Manifestacion 1") {
    if ([
      "No reportado",
      "Animación/mediación sociocultural",
      "Artes escénicas - circo, teatro",
      "Audiovisuales - cine, video y/u otros",
      "Artes escénicas - danza",
      "Artes visuales y artesanía",
      "Interpretación ambiental",
      "Celebración de festividades, fiestas tradicionales y/o rituales",
      "Libro, lectura y/o escritura",
      "Protección del patrimonio cultural y proyección de cultura local",
      "Títeres",
      "Comida / Gastronomía",
      "Música",
      "Deporte, recreación y/o juego",
      "Comunicaciones (periodismo, radio, podcast y/u otra)",
      "Tradición oral propia de pueblos indígenas u originarios"
    ].includes(d["Manifestacion 1"]) && (
      [99,  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16
    ].includes(d["Manifestacion 1 ID"]))) {
      return `/icons/visualizations/Organizaciones que trabajan el arte y la cultura/${d["Manifestacion 1 ID"]}.png`
    }
  }

  if ( key === "Actividad 1") {
    if ([
      "Productora",
      "Servicios conexos",
      "Exhibidora",
      "Distribuidora",
      "Formación"
    ].includes(d["Actividad 1"]) && (
      ["1_1", "1_2", "1_3", "1_4", "1_5"
    ].includes(d["Actividad 1 ID"]))) {
      return `/icons/visualizations/Empresas y organizaciones cinematograficas/${d["Actividad 1 ID"]}.png`
    }

    else if ([
      "Editorial",
      "Cartonera",
      "Librería",
      "Distribuidora",
      "Revista",
      "Imprenta",
      "Fondos Universitarios",
      "Prensa",
      "Autor-editor",
      "Fanzine"
    ].includes(d["Actividad 1"])) {
      return `/icons/visualizations/Agentes del ecosistema del libro/${d["Actividad 1 ID"]}.png`
    }

  }

  if ( key === "Cantidad Agentes") {
    if ([
      "Editorial",
      "Cartonera",
      "Librería",
      "Distribuidora",
      "Revista",
      "Imprenta",
      "Fondos Universitarios",
      "Prensa",
      "Autor-editor",
      "Fanzine"
    ].includes(d["Actividad 1"])) {
      return `/icons/visualizations/Agentes del ecosistema del libro/${d["Actividad 1 ID"]}.png`
    }

  }

  if ( key === "Names") {
    if ([
      "Espectáculos de teatro",
      "Espectáculos de danza",
      "Espectáculos de circo",
      "Espectáculos musicales",
      "Funciones de cine",
      "Exposiciones de fotografía, pintura o galerías de arte",
      "Ferias artesanales",
      "Bibliotecas y/o salas de lectura",
      "Ferias de libros",
      "Festivales locales-tradicionales"
    ].includes(d["Names"])) {
      return `/icons/visualizations/Demanda de servicios culturales/${d["Indicador ID"]}.png`
    }

  }

  if (key === "Estado Beneficio" && Object.keys(d).includes("Fase Cadena Valor")) {
    return `/icons/visualizations/Postulaciones segun fase de la cadena/${d["Estado Beneficio ID"]}.png`;
  }
/*
  if ( key === "Estado Beneficio") {
    if ([
      "No beneficiario",
      "Beneficiario"
    ].includes(d["Estado Beneficio"])) {
      return `/icons/visualizations/Postulaciones segun fase de la cadena/${d["Estado Beneficio ID"]}.png`
    }

  }
*/
  if ( key === "Fase Cadena Valor") {
    if ([
      "Producción",
      "Acceso",
      "Creación",
      "Circulación",
      "Formación"
    ].includes(d["Fase Cadena Valor"])) {
      return `/icons/visualizations/Postulaciones a estimulos economicos/${d["Fase Cadena Valor ID"]}.png`
    }
  }

  if ( key === "Clasificacion") {
    if ([
      "Institutos Públicos",
      "Institutos de Educación Superior",
      "Institutos de Salud",
      "Centros de Investigación Privada sin Fines de Lucro",
      "Sociedad de Responsabilidad Limitada",
      "Sociedad Colectiva",
      "Sociedad Anónima Cerrada",
      "Sociedad Anónima Abierta",
      "Pública",
      "Asociación",
      "Otra"
    ].includes(d["Clasificacion"])) {
      return `/icons/visualizations/Centros de investigacion/${d["Clasificacion ID"]}.png`
    }

  }

  if ( key === "Tipo de gasto label") {
    if      (d["Tipo de gasto label"] === "Gasto interno promedio en I+D") return `/icons/visualizations/Tipo de centro de investigacion/Interno.png`;
    else if (d["Tipo de gasto label"] === "Gasto externo promedio en I+D") return `/icons/visualizations/Tipo de centro de investigacion/Externo.png`;
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
    "Measure ID": mean,
    "Indicador Tributo ID": mean,
    "Industria ID": mean,
    //"Rubro ID": mean,
    "Sector ID": mean,
    "Subconcepto ID": mean,
    "Estado Beneficio ID": mean,
    //"Subactividad economica ID": mean,
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
        const availableItems = Object.entries(d).filter(h => h[1] === item);
        let itemId = availableItems.length > 1 ? availableItems[1][0] : availableItems[0][0];
        //let itemId = Object.entries(d).find(h => h[1] === item)[0];
        if (itemId.includes(" ID")) itemId = itemId.replace(" ID", "");

        return findColorV2(itemId, d);
      },
      backgroundImage(d, i) {
        const item = this._parent._groupBy[0](d);
        const availableItems = Object.entries(d).filter(h => h[1] === item);
        let itemId = availableItems.length > 1 ? availableItems[1][0] : availableItems[0][0]
        //let itemId = Object.entries(d).find(h => h[1] === item)[0];
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
          const availableItems = Object.entries(d).filter(h => h[1] === item);
          let itemId = availableItems.length > 1 ? availableItems[1][0] : availableItems[0][0]
          //let itemId = Object.entries(d).find(h => h[1] === item)[0];
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
          const availableParents = Object.entries(d).filter(h => h[1] === parentName);
          let parent = availableParents.length > 1 ? availableParents[1] : availableParents[0] || [undefined];
          //let parent = Object.entries(d).find(h => h[1] === parentName) || [undefined];
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
