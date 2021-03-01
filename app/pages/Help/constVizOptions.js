import {abbreviate, commas, percentagenumber} from "../../helpers/utils";

const defaultAxisConfig = {
  barConfig: {
    stroke: "#919295",
    strokeWidth: 0.5
  },
  shapeConfig: {
    fill: "#919295",
    stroke: "#919295",
    labelConfig: {
      fontColor: "#919295"
    }
  }
};

export const vizOptions = [
  {
    config: {
      groupBy: ["id"],
      discrete: "x",
      height: 450,
      legendConfig: {
        shapeConfig: {
          fill: "D3PLUS-COMMON-RESET"
        }
      },
      shapeConfig: {
        fill: "D3PLUS-COMMON-RESET"
      },
      stacked: false,
      tooltipConfig: {
        tbody: [
          ["Valor", d => d.y]
        ]
      },
      x: "x",
      xConfig: {
        ...defaultAxisConfig
      },
      y: "y",
      yConfig: {
        ...defaultAxisConfig,
        tickFormat: d => d
      }
    },
    nodes: [],
    links: [],
    data: [
      {id: "alpha", x: 4, y: 7},
      {id: "alpha", x: 5, y: 25},
      {id: "alpha", x: 6, y: 13},
      {id: "beta",  x: 4, y: 17},
      {id: "beta",  x: 5, y: 8},
      {id: "beta",  x: 6, y: 13}
    ],
    item: "Bar chart",
    type: "BarChart",
    activeIcon: "/icons/help/bar_chart_red_icon.svg",
    inactiveIcon: "/icons/help/bar_chart_white_icon.svg",
    howTexts: [
      "El gráfico de barras clásico utiliza barras horizontales o verticales para mostrar comparaciones numéricas discretas entre categorías. Un eje del gráfico muestra las categorías específicas que se están comparando y el otro eje representa una escala de valores discretos.",
      "Los gráficos de barra se distinguen de los histogramas porque no muestran desarrollos contínuos durante un intervalo. Los datos discretos del gráfico de barras son datos categóricos y, por lo tanto, responden a la pregunta de '¿cuántos? en cada categoría."
    ],
    useTexts: [
      "Un defecto importante de los gráficos de barra es que el etiquetado se vuelve problemático cuando hay una gran cantidad de barras."
    ],
    useTabs: [
      "Comparaciones",
      "Patrones"
    ]
  },
  {
    config: {
      colorScale: "Porcentaje de municipalidades que administran establecimientos de salud",
      colorScaleConfig: {
        color: "D3PLUS-COMMON-RESET",
        axisConfig: {
          shapeConfig: {
            labelConfig: {
              fontColor: "#919295"
            }
          },
          tickFormat: d => percentagenumber(d / 100)
        }
      },
      colorScalePosition: "right",
      groupBy: ["Departamento ID"],
      height: 450,
      tooltipConfig: {
        tbody: [
          ["Valor", d => percentagenumber(d["Porcentaje de municipalidades que administran establecimientos de salud"] / 100)]
        ]
      },
      topojson: "/topojson/Department.json",
      topojsonId: d => d.properties.CCDD,
      topojsonFill: "#ccc"
    },
    nodes: [],
    links: [],
    data: [
      {
        "Year": 2019,
        "Departamento ID": "01",
        "Departamento": "Amazonas",
        "Porcentaje de municipalidades que administran establecimientos de salud": 19.047618865966797
      },
      {
        "Year": 2019,
        "Departamento ID": "02",
        "Departamento": "Áncash",
        "Porcentaje de municipalidades que administran establecimientos de salud": 16.867469787597656
      },
      {
        "Year": 2019,
        "Departamento ID": "03",
        "Departamento": "Apurímac",
        "Porcentaje de municipalidades que administran establecimientos de salud": 22.619047164916992
      },
      {
        "Year": 2019,
        "Departamento ID": "04",
        "Departamento": "Arequipa",
        "Porcentaje de municipalidades que administran establecimientos de salud": 21.10091781616211
      },
      {
        "Year": 2019,
        "Departamento ID": "05",
        "Departamento": "Ayacucho",
        "Porcentaje de municipalidades que administran establecimientos de salud": 31.93277359008789
      },
      {
        "Year": 2019,
        "Departamento ID": "06",
        "Departamento": "Cajamarca",
        "Porcentaje de municipalidades que administran establecimientos de salud": 16.535432815551758
      },
      {
        "Year": 2019,
        "Departamento ID": "07",
        "Departamento": "Callao",
        "Porcentaje de municipalidades que administran establecimientos de salud": 85.71428680419922
      },
      {
        "Year": 2019,
        "Departamento ID": "08",
        "Departamento": "Cusco",
        "Porcentaje de municipalidades que administran establecimientos de salud": 24.10714340209961
      },
      {
        "Year": 2019,
        "Departamento ID": "09",
        "Departamento": "Huancavelica",
        "Porcentaje de municipalidades que administran establecimientos de salud": 16
      },
      {
        "Year": 2019,
        "Departamento ID": "10",
        "Departamento": "Huánuco",
        "Porcentaje de municipalidades que administran establecimientos de salud": 13.095237731933594
      },
      {
        "Year": 2019,
        "Departamento ID": "11",
        "Departamento": "Ica",
        "Porcentaje de municipalidades que administran establecimientos de salud": 9.302325248718262
      },
      {
        "Year": 2019,
        "Departamento ID": "12",
        "Departamento": "Junín",
        "Porcentaje de municipalidades que administran establecimientos de salud": 18.54838752746582
      },
      {
        "Year": 2019,
        "Departamento ID": "13",
        "Departamento": "La Libertad",
        "Porcentaje de municipalidades que administran establecimientos de salud": 39.759037017822266
      },
      {
        "Year": 2019,
        "Departamento ID": "14",
        "Departamento": "Lambayeque",
        "Porcentaje de municipalidades que administran establecimientos de salud": 26.3157901763916
      },
      {
        "Year": 2019,
        "Departamento ID": "15",
        "Departamento": "Lima",
        "Porcentaje de municipalidades que administran establecimientos de salud": 26.3157901763916
      },
      {
        "Year": 2019,
        "Departamento ID": "16",
        "Departamento": "Loreto",
        "Porcentaje de municipalidades que administran establecimientos de salud": 16.98113250732422
      },
      {
        "Year": 2019,
        "Departamento ID": "17",
        "Departamento": "Madre de Dios",
        "Porcentaje de municipalidades que administran establecimientos de salud": 0
      },
      {
        "Year": 2019,
        "Departamento ID": "18",
        "Departamento": "Moquegua",
        "Porcentaje de municipalidades que administran establecimientos de salud": 10
      },
      {
        "Year": 2019,
        "Departamento ID": "19",
        "Departamento": "Pasco",
        "Porcentaje de municipalidades que administran establecimientos de salud": 13.793103218078613
      },
      {
        "Year": 2019,
        "Departamento ID": "20",
        "Departamento": "Piura",
        "Porcentaje de municipalidades que administran establecimientos de salud": 53.846153259277344
      },
      {
        "Year": 2019,
        "Departamento ID": "21",
        "Departamento": "Puno",
        "Porcentaje de municipalidades que administran establecimientos de salud": 12.727272987365723
      },
      {
        "Year": 2019,
        "Departamento ID": "22",
        "Departamento": "San Martín",
        "Porcentaje de municipalidades que administran establecimientos de salud": 25.97402572631836
      },
      {
        "Year": 2019,
        "Departamento ID": "23",
        "Departamento": "Tacna",
        "Porcentaje de municipalidades que administran establecimientos de salud": 21.428571701049805
      },
      {
        "Year": 2019,
        "Departamento ID": "24",
        "Departamento": "Tumbes",
        "Porcentaje de municipalidades que administran establecimientos de salud": 30.769229888916016
      },
      {
        "Year": 2019,
        "Departamento ID": "25",
        "Departamento": "Ucayali",
        "Porcentaje de municipalidades que administran establecimientos de salud": 35.29411697387695
      }
    ],
    item: "Choroplet map",
    type: "Geomap",
    activeIcon: "/icons/help/choropleth_map_red_icon.svg",
    inactiveIcon: "/icons/help/choropleth_map_white_icon.svg",
    howTexts: [
      "Un mapa coroplético muestra áreas o regiones geográficas divididas que están coloreadas en relación con una variable de datos. Esto proporciona una forma de visualizar valores en un área geográfica, que puede mostrar variaciones o patrones en la ubicación mostrada.",
      "La variable de datos usa una progresión de color para representarse a sí misma en cada región del mapa. Por lo general, esto puede ser una combinación de un color a otro o una progresión de tono."
    ],
    useTexts: [
      "Una desventaja del uso del color es que no se pueden leer ni comparar con precisión los valores del mapa. Otro problema es que las regiones más grandes aparacen más enfatizadas que las más pequeñas por lo que la percepción del espectador de los valores sombreados se ve afectada.",
      "Un error común al producir mapas cloropléticos es codificar valores de datos sin procesar en lugar de utilizar valores normalizados para producir un mapa de densidad."
    ],
    useTabs: [
      "Comparaciones",
      "Localización",
      "Patrones"
    ]
  },
  {
    config: {
      groupBy: ["Race"],
      value: d => d.Valor,
      height: 450,
      legendConfig: {
        shapeConfig: {
          fill: "D3PLUS-COMMON-RESET"
        }
      },
      shapeConfig: {
        fill: "D3PLUS-COMMON-RESET"
      },
      tooltipConfig: {
        tbody: [
          ["Valor", d => d.Valor]
        ]
      }
    },
    nodes: [],
    links: [],
    data: [
      {Race: "alpha", Valor: 40},
      {Race: "beta", Valor: 20},
      {Race: "gamma", Valor: 25},
      {Race: "delta", Valor: 10},
      {Race: "epsilon", Valor: 5}
    ],
    item: "Donnut chart",
    type: "Donut",
    activeIcon: "/icons/help/donut_chart_red_icon.svg",
    inactiveIcon: "/icons/help/donut_chart_white_icon.svg",
    howTexts: [
      "Un gráfico de donut o gráfico de anillos es en escencia, un gráfico circular con un área del centro recortada.",
      "Los gráficos circulares son criticados por enfocar a los lectores en las áreas proporcionales de los cortes entre sí y con el gráfico en su conjunto. Esto hace que sea complicado ver las diferencias entre los sectores, especialmente cuando se intenta comparar varios gráficos circulares juntos.",
      "Un gráfico de donut soluciona en cierto nivel dicho problema al restar importancia al uso del área, enfocando la atención de los lectores en la longitud de los arcos.",
      "Adicionalmente, los gráficos de donuts permiten utilizar el espacion en blanco dentro de ellos para mostrar más información en su interior."
    ],
    useTexts: [],
    useTabs: [
      "Comparaciones",
      "Parte de un todo",
      "Proporciones"
    ]
  },
  {
    config: {
      groupBy: ["CITE", "Year"],
      discrete: "x",
      height: 450,
      legendConfig: {
        shapeConfig: {
          fill: "D3PLUS-COMMON-RESET"
        }
      },
      shapeConfig: {
        fill: "D3PLUS-COMMON-RESET"
      },
      tooltipConfig: {
        tbody: [
          ["Valor", d => d.Cantidad]
        ]
      },
      x: "Year",
      xConfig: {
        ...defaultAxisConfig,
        title: "Año",
        titleConfig: {
          fontColor: "#919295"
        }
      },
      y: "Cantidad",
      yConfig: {
        ...defaultAxisConfig,
        tickFormat: d => d,
        titleConfig: {
          fontColor: "#919295"
        }
      }
    },
    nodes: [],
    links: [],
    data: [
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2018,
        "Cantidad": 64
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2019,
        "Cantidad": 62
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Cantidad": 56
      }
    ],
    item: "Histogram",
    type: "BarChart",
    activeIcon: "/icons/help/histogram_red_icon.svg",
    inactiveIcon: "/icons/help/histogram_white_icon.svg",
    howTexts: [
      "Un histograma visualiza la distribución de datos durante un intervalo continuo o un periodo de tiempo determinado. Cada barra en un histograma representa la frecuencia tabulada para cada intervalo."
    ],
    useTexts: [
      "Los histogramas ayudan a dar una estimación de dónde se concentran los valores, cuáles son los extremos y si hay valores inusuales. También son útiles para ofrecer una visión aproximada de la distribución de probabilidad"
    ],
    useTabs: [
      "Comparaciones",
      "Datos temporales",
      "Distribución",
      "Patrones",
      "Rangos"
    ]
  },
  {
    config: {
      groupBy: ["id"],
      height: 450,
      legendConfig: {
        shapeConfig: {
          fill: "D3PLUS-COMMON-RESET"
        }
      },
      shapeConfig: {
        Line: {
          stroke: "D3PLUS-COMMON-RESET"
        }
      },
      tooltipConfig: {
        tbody: [
          ["Valor eje x", d => d.x],
          ["Valor eje y", d => d.y]
        ]
      },
      xConfig: {
        ...defaultAxisConfig
      },
      yConfig: {
        ...defaultAxisConfig,
        tickFormat: d => d
      }
    },
    nodes: [],
    links: [],
    data: [
      {id: "alpha", x: 4, y: 7},
      {id: "alpha", x: 5, y: 25},
      {id: "alpha", x: 6, y: 13},
      {id: "beta",  x: 4, y: 17},
      {id: "beta",  x: 5, y: 8},
      {id: "beta",  x: 6, y: 13}
    ],
    item: "Line chart",
    type: "LinePlot",
    activeIcon: "/icons/help/line_chart_red_icon.svg",
    inactiveIcon: "/icons/help/line_chart_white_icon.svg",
    howTexts: [
      "Los gráficos de líneas se utilizan para mostrar valores cuantitativos durante un intervalo o periodo de tiempo contínuo. Un gráfico de línes se usa con mayor frecuencia para mostrar tendencias y analizar cómo los datos han cambiado con el tiempo.",
      "Se dibujan trazando primeramente los puntos de datos en una cuadrícula de coordenadas cartesiandas y luego conectando una línea entre todos estos puntos. Normalmente, el eje Y tiene un valor cuantitativo, mientras que el eje X es una escala de tiempo o una secuencia de intervalos. Los valores negativos se pueden mostrar por debajo del eje X.",
      "La dirección de las líneas en el gráfico funcionan como una buena metáfora de los datos: una pendiente hacia arriba indica dónde han aumentado los valores, mientras que, una pendiente negativa indica dónde dichos valores han disminuido. El recorrido de la línea a través del gráfico puede crear patrones que revelen tendencias en un conjunto de datos."
    ],
    useTexts: [
      "Cuando se agrupan con otras líneas (otras series de datos), las líneas individuales se pueden comparar entre sí. Sin embargo, es recomendado no utilizar más de 4 líneas por gráfico, ya que esto hace que el gráfico esté desordenado y se más difícil de leer. Una solución a esto es dividir el gráfico en múltiplos más pequeños."
    ],
    useTabs: [
      "Patrones",
      "Datos temporales",
      "Comparaciones"
    ]
  },
  {
    config: {
      groupBy: ["Modalidad", "Tipo trabajador"],
      height: 450,
      colorScale: "Cantidad",
      colorScaleConfig: {
        color: "D3PLUS-COMMON-RESET",
        scale: "linear",
        axisConfig: {
          shapeConfig: {
            labelConfig: {
              fontColor: "#919295"
            }
          },
          tickFormat: d => Math.round(d)
        }
      },
      column: "Modalidad",
      row: "Tipo trabajador",
      shapeConfig: {
        fill: "D3PLUS-COMMON-RESET"
      },
      tooltipConfig: {
        tbody: [
          ["Valor", function(d) {
            return Math.round(d.Cantidad);
          }]
        ]
      }
    },
    nodes: [],
    links: [],
    data: [
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 1,
        "Modalidad": "Contrato Administrativo de Servicios",
        "Tipo trabajador ID": 1,
        "Tipo trabajador": "Administrativo",
        "Cantidad": 7
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 1,
        "Modalidad": "Contrato Administrativo de Servicios",
        "Tipo trabajador ID": 2,
        "Tipo trabajador": "Directivo",
        "Cantidad": 1
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 1,
        "Modalidad": "Contrato Administrativo de Servicios",
        "Tipo trabajador ID": 3,
        "Tipo trabajador": "Operativo",
        "Cantidad": 3
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 1,
        "Modalidad": "Contrato Administrativo de Servicios",
        "Tipo trabajador ID": 4,
        "Tipo trabajador": "Practicante",
        "Cantidad": 0
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 1,
        "Modalidad": "Contrato Administrativo de Servicios",
        "Tipo trabajador ID": 5,
        "Tipo trabajador": "Tecnico",
        "Cantidad": 39
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 2,
        "Modalidad": "Contrato a Plazo Indeterminado",
        "Tipo trabajador ID": 1,
        "Tipo trabajador": "Administrativo",
        "Cantidad": 0
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 2,
        "Modalidad": "Contrato a Plazo Indeterminado",
        "Tipo trabajador ID": 2,
        "Tipo trabajador": "Directivo",
        "Cantidad": 0
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 2,
        "Modalidad": "Contrato a Plazo Indeterminado",
        "Tipo trabajador ID": 3,
        "Tipo trabajador": "Operativo",
        "Cantidad": 0
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 2,
        "Modalidad": "Contrato a Plazo Indeterminado",
        "Tipo trabajador ID": 4,
        "Tipo trabajador": "Practicante",
        "Cantidad": 0
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 2,
        "Modalidad": "Contrato a Plazo Indeterminado",
        "Tipo trabajador ID": 5,
        "Tipo trabajador": "Tecnico",
        "Cantidad": 0
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 3,
        "Modalidad": "Practicantes",
        "Tipo trabajador ID": 1,
        "Tipo trabajador": "Administrativo",
        "Cantidad": 0
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 3,
        "Modalidad": "Practicantes",
        "Tipo trabajador ID": 2,
        "Tipo trabajador": "Directivo",
        "Cantidad": 0
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 3,
        "Modalidad": "Practicantes",
        "Tipo trabajador ID": 3,
        "Tipo trabajador": "Operativo",
        "Cantidad": 0
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 3,
        "Modalidad": "Practicantes",
        "Tipo trabajador ID": 4,
        "Tipo trabajador": "Practicante",
        "Cantidad": 0
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 3,
        "Modalidad": "Practicantes",
        "Tipo trabajador ID": 5,
        "Tipo trabajador": "Tecnico",
        "Cantidad": 0
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 4,
        "Modalidad": "Servicios de Terceros",
        "Tipo trabajador ID": 1,
        "Tipo trabajador": "Administrativo",
        "Cantidad": 0
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 4,
        "Modalidad": "Servicios de Terceros",
        "Tipo trabajador ID": 2,
        "Tipo trabajador": "Directivo",
        "Cantidad": 0
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 4,
        "Modalidad": "Servicios de Terceros",
        "Tipo trabajador ID": 3,
        "Tipo trabajador": "Operativo",
        "Cantidad": 1
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 4,
        "Modalidad": "Servicios de Terceros",
        "Tipo trabajador ID": 4,
        "Tipo trabajador": "Practicante",
        "Cantidad": 0
      },
      {
        "CITE ID": 28,
        "CITE": "CITEmadera Lima",
        "Year": 2020,
        "Modalidad ID": 4,
        "Modalidad": "Servicios de Terceros",
        "Tipo trabajador ID": 5,
        "Tipo trabajador": "Tecnico",
        "Cantidad": 5
      }],
    item: "Matrix",
    type: "Matrix",
    activeIcon: "/icons/help/heat_map_red_icon.svg",
    inactiveIcon: "/icons/help/heat_map_white_icon.svg",
    howTexts: [
      "Una matriz o mapa de calor visualiza los datos a través de variaciones en el color. Cuando se aplican a un formato tabular, los mapas de calor son útiles para realizar un análisis cruazo de datos multivariados, colocando variables en filas y columnas y coloreando las celdas dentro de la tabla. Son una buena opción de visualización para analizar la varianza entre múltiple variables, detectar patrones, analizar similitud entre variables y analizar correlación entre ellas.",
      "Normalmente, todas las filas corresponden a una categoría y las columnas corresponden a otra categoría. Las filas y columnas individiuales se dividien en subcategorías, coincidiendo entre sí en una matriz. Las celdas contenidas dentro de la tabla contienen datos categóricos codificados por colores o datos numéricos, que se basan en una escala de colores. Los datos contenidos dentro de una celda se basan en la relación entre las dos variables en la fila y columna de conexión.",
      "Se requiere una leyenda junto con el mapa de calor para que este sea comprensible por el usuario. Los datos categóricos son codificados por colores, mientras que los datos numéricos requieren una escala de colores que se mezcla de un color a otro, para representar la diferencia entre valores altos y bajos. Se puede usar una selección de colores sólidos para represenar múltiples randos de valores, o puede utilizarse una escala de degradado para un solo rango combinando dos o más colores juntos."
    ],
    useTexts: [
      "Debido a su dependencia del color para comunicar valores, los mapas de calor son un gráfico más adecuado para mostrar una vista generalizada de datos numéricos, ya que es más complejo distinguir con precisión las diferencias entre tonos de color y extraer puntos de datos específicos.",
      "Las matrices o mapas de calor también pueden ser utilizados para mostrar los cambios en los datos a lo largo del tiempo si una de las filas o columnas está configurada en intervalos de tiempo. Un ejemplo de esto sería usar un mapa de calor para comparar los cambios de temperatura durante el año en varias ciudades, para ver dónde están los lugares más cálidos o más fríos."
    ],
    useTabs: [
      "Comparaciones",
      "Datos temporales",
      "Patrones",
      "Relaciones"
    ]
  },
  {
    config: {
      groupBy: ["Sexo"],
      height: 450,
      discrete: "y",
      legendConfig: {
        shapeConfig: {
          fill: "D3PLUS-COMMON-RESET"
        }
      },
      shapeConfig: {
        fill: "D3PLUS-COMMON-RESET"
      },
      stacked: true,
      tooltipConfig: {
        tbody: [
          ["Año", 2017],
          ["Sexo", d => d.Sexo],
          ["Población", d => commas(Math.abs(d.Poblacion))]
        ]
      },
      x: "Poblacion",
      xConfig: {
        ...defaultAxisConfig,
        tickFormat: d => abbreviate(Math.abs(d)),
        title: "Población",
        titleConfig: {
          fontColor: "#919295"
        }
      },
      y: "Grupo de edad",
      yConfig: {
        ticks: [],
        title: false
      }
    },
    nodes: [],
    links: [],
    data: [
      {
        "Grupo de edad ID": 1,
        "Grupo de edad": "De 0 a 4 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 1445122
      },
      {
        "Grupo de edad ID": 1,
        "Grupo de edad": "De 0 a 4 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -1385933
      },
      {
        "Grupo de edad ID": 2,
        "Grupo de edad": "De 5 a 9 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 1473968
      },
      {
        "Grupo de edad ID": 2,
        "Grupo de edad": "De 5 a 9 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -1417319
      },
      {
        "Grupo de edad ID": 3,
        "Grupo de edad": "De 10 a 15 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 1483727
      },
      {
        "Grupo de edad ID": 3,
        "Grupo de edad": "De 10 a 15 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -1430083
      },
      {
        "Grupo de edad ID": 4,
        "Grupo de edad": "De 15 a 19 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 1466289
      },
      {
        "Grupo de edad ID": 4,
        "Grupo de edad": "De 15 a 19 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -1420257
      },
      {
        "Grupo de edad ID": 5,
        "Grupo de edad": "De 20 a 24 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 1438000
      },
      {
        "Grupo de edad ID": 5,
        "Grupo de edad": "De 20 a 24 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -1401017
      },
      {
        "Grupo de edad ID": 6,
        "Grupo de edad": "De 25 a 29 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 1371191
      },
      {
        "Grupo de edad ID": 6,
        "Grupo de edad": "De 25 a 29 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -1344048
      },
      {
        "Grupo de edad ID": 7,
        "Grupo de edad": "De 30 a 34 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 1251238
      },
      {
        "Grupo de edad ID": 7,
        "Grupo de edad": "De 30 a 34 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -1233884
      },
      {
        "Grupo de edad ID": 8,
        "Grupo de edad": "De 35 a 39 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 1156915
      },
      {
        "Grupo de edad ID": 8,
        "Grupo de edad": "De 35 a 39 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -1145477
      },
      {
        "Grupo de edad ID": 9,
        "Grupo de edad": "De 40 a 44 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 1038422
      },
      {
        "Grupo de edad ID": 9,
        "Grupo de edad": "De 40 a 44 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -1034343
      },
      {
        "Grupo de edad ID": 10,
        "Grupo de edad": "De 45 a 49 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 899326
      },
      {
        "Grupo de edad ID": 10,
        "Grupo de edad": "De 45 a 49 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -903752
      },
      {
        "Grupo de edad ID": 11,
        "Grupo de edad": "De 50 a 54 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 774590
      },
      {
        "Grupo de edad ID": 11,
        "Grupo de edad": "De 50 a 54 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -788241
      },
      {
        "Grupo de edad ID": 12,
        "Grupo de edad": "De 55 a 59 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 634510
      },
      {
        "Grupo de edad ID": 12,
        "Grupo de edad": "De 55 a 59 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -658490
      },
      {
        "Grupo de edad ID": 13,
        "Grupo de edad": "De 60 a 64 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 501128
      },
      {
        "Grupo de edad ID": 13,
        "Grupo de edad": "De 60 a 64 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -532940
      },
      {
        "Grupo de edad ID": 14,
        "Grupo de edad": "De 65 a 69 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 379352
      },
      {
        "Grupo de edad ID": 14,
        "Grupo de edad": "De 65 a 69 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -415647
      },
      {
        "Grupo de edad ID": 15,
        "Grupo de edad": "De 70 a 74 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 271687
      },
      {
        "Grupo de edad ID": 15,
        "Grupo de edad": "De 70 a 74 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -311231
      },
      {
        "Grupo de edad ID": 16,
        "Grupo de edad": "De 75 a 79 años",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 186805
      },
      {
        "Grupo de edad ID": 16,
        "Grupo de edad": "De 75 a 79 años",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -229221
      },
      {
        "Grupo de edad ID": 17,
        "Grupo de edad": "80 años y mas",
        "Sexo ID": 1,
        "Sexo": "Hombre",
        "Poblacion": 166789
      },
      {
        "Grupo de edad ID": 17,
        "Grupo de edad": "80 años y mas",
        "Sexo ID": 2,
        "Sexo": "Mujer",
        "Poblacion": -235076
      }
    ],
    item: "Population pyramid",
    type: "BarChart",
    activeIcon: "/icons/help/population_pyramid_red_icon.svg",
    inactiveIcon: "/icons/help/population_pyramid_white_icon.svg",
    howTexts: [
      "Una pirámide poblacional es un par de histogramas consecutivos (para cada sexo) que muestra la distribución de una población en todos los grupos de edad y en ambos sexos. El eje X se utiliza para trazar números de población y el eje Y enumera todos los grupos de edad.",
      "Las pirámides poblacionales son ideales para detectar cambios o diferencias en los patrones de población. Se pueden utilizar múltiples pirámides de población para comparar patrones entre naciones o grupos de población seleccionados.",
      "La forma de una pirámide poblacional se puede utilizar para interpretar una población. Por ejemplo, una pirámide con una base muy ancha y una sección superior estrecha sugiere una población con altas tasas de fertilidad y mortalidad. Por otra parte, una pirámide con una mitad superior más ancha y una base más estrecha sugeriría una población que envejece con bajas tasas de fertilidad."
    ],
    useTexts: [
      "Las pirámides poblacionales también se pueden utilizar para especular sobre el desarrollo futuro de una población. Una población que envejece y no se reproduce eventualmente enfrentaría problemas como tener suficiente descendencia para cuidar a los ancianos. Otras teorías, como el 'aumento de la juventud', afirman que cuando hay un aumento amplio en el rango de edad de 16 a 30 años, especialmente en los hombres, esto conduce al malestar social, la guerra y el terrorismo.",
      "Esto hace que las pirámides poblacionales sean útiles para campos como la ecología, la sociología y la economía."
    ],
    useTabs: [
      "Comparaciones",
      "Distribución",
      "Patrones"
    ]
  },
  {
    config: {
      height: 450,
      shapeConfig: {
        fill: "D3PLUS-COMMON-RESET"
      }
    },
    nodes: [
      {id: "alpha"},
      {id: "beta"},
      {id: "gamma"},
      {id: "epsilon"},
      {id: "zeta"}
    ],
    links: [
      {source: "alpha", target: "beta"},
      {source: "alpha", target: "gamma"},
      {source: "epsilon", target: "zeta"}
    ],
    data: [],
    item: "Sankey diagram",
    type: "Sankey",
    activeIcon: "/icons/help/sankey_red_icon.svg",
    inactiveIcon: "/icons/help/sankey_white_icon.svg",
    howTexts: [
      "Los diagramas sankey muestran los flujos y sus cantidades en proporción entre sí. El ancho de las flechas o líneas se usa para mostrar sus magnitudes, por lo que cuanto más grande es la flecha, mayor es la cantidad de flujo. Las flechas o líneas de flujo pueden combinarse o dividirse en sus trayectorias en cada etapa de un proceso. El color se puede utilizar para dividir el diagrama en diferentes categorías o para mostrar la transición de un estado del proceso a otro."
    ],
    useTexts: [
      "Normalmente, los diagramas sankey se utilizan para mostrrar visualmente la transferencia de energía, dinero o materiales, pero se pueden utilizar para mostrar el flujo de cualquier proceso de sistema aislado."
    ],
    useTabs: [
      "Funcionalidades",
      "Flujos",
      "Procesos",
      "Proporciones"
    ]
  },
  {
    config: {
      groupBy: ["id"],
      height: 450,
      legendConfig: {
        shapeConfig: {
          fill: "D3PLUS-COMMON-RESET"
        }
      },
      shapeConfig: {
        fill: "D3PLUS-COMMON-RESET"
      },
      tooltipConfig: {
        tbody: [
          ["Valor eje x", d => d.x],
          ["Valor eje y", d => d.y]
        ]
      },
      xConfig: {
        ...defaultAxisConfig
      },
      yConfig: {
        ...defaultAxisConfig,
        tickFormat: d => d
      }
    },
    nodes: [],
    links: [],
    data: [
      {id: "alpha", x: 4, y: 7},
      {id: "alpha", x: 5, y: 25},
      {id: "alpha", x: 6, y: 13},
      {id: "beta",  x: 4, y: 17},
      {id: "beta",  x: 5, y: 8},
      {id: "beta",  x: 6, y: 13}
    ],
    item: "Stacked area",
    type: "StackedArea",
    activeIcon: "/icons/help/area_chart_red_icon.svg",
    inactiveIcon: "/icons/help/area_chart_white_icon.svg",
    howTexts: [
      "Los gráficos de área apilados o stacked area funcionan de la misma manera que un gráfico de área simple, excepto por el uso de múltiples series de datos que comienzan cada punto desde el punto definido por la serie de datos anterior.",
      "El gráfico de áreas apiladas también usan las áreas para transmitir números enteros, por lo que no funcionan para valores negativos. En general, son útiles para comparar múltiples variables que cambian a través del tiempo."
    ],
    useTexts: [],
    useTabs: [
      "Comparaciones",
      "Datos temporales",
      "Patrones"
    ]
  },
  {
    config: {
      discrete: "x",
      groupBy: ["id"],
      height: 450,
      legendConfig: {
        shapeConfig: {
          fill: "D3PLUS-COMMON-RESET"
        }
      },
      shapeConfig: {
        fill: "D3PLUS-COMMON-RESET"
      },
      stacked: true,
      tooltipConfig: {
        tbody: [
          ["Valor", d => d.y]
        ]
      },
      x: "x",
      xConfig: {
        ...defaultAxisConfig
      },
      y: "y",
      yConfig: {
        ...defaultAxisConfig,
        tickFormat: d => d
      }
    },
    nodes: [],
    links: [],
    data: [
      {id: "alpha", x: 4, y: 7},
      {id: "alpha", x: 5, y: 25},
      {id: "alpha", x: 6, y: 13},
      {id: "beta",  x: 4, y: 17},
      {id: "beta",  x: 5, y: 8},
      {id: "beta",  x: 6, y: 13}
    ],
    item: "Stacked bar chart",
    type: "BarChart",
    activeIcon: "/icons/help/stacked_barchart_red_icon.svg",
    inactiveIcon: "/icons/help/stacked_barchart_white_icon.svg",
    howTexts: [
      "Los gráficos de barras apilados o stacked bar chart se utilizan para mostrar cómo se divide una categoría más grande en categorías más pequeñas y cuál es la relación de cada parte con la cantidad total."
    ],
    useTexts: [
      "Existen dos tipos de gráficos de barra apilados: los gráficos de barra apilados simples y los gráficos de barra apilados porcentuales.",
      "Los gráficos de barra apilados simples asignan cada valor del segmento después del anterior. El valor total de la barra corresponde a la acumulación del valor de cada segmento apilado. Es ideal para comparar cantidades totales en cada barra segmentada.",
      "Por otra parte, los gráficos de barra apilados porcentuales visualizan el procentaje del total de cada grupo y están representados por el porcentaje de cada valor respecto a la cantidad total de cada grupo. Esto hace que sea más fácil ver las diferencias relativas entre cantidades en cada grupo.",
      "Un defecto imporatnte de los gráficos de barra apilados corresponde a que se vuelven más difíciles de leer a medida que la cantidad de segmentos aumenta. También es difícil comparar cada segmento entre sí, ya que no están alineados en una línea base común."
    ],
    useTabs: [
      "Comparaciones",
      "Proporciones"
    ]
  },
  {
    nodes: [],
    links: [],
    data: [
      {parent: "Group 1", id: "alpha", value: 29},
      {parent: "Group 1", id: "beta", value: 10},
      {parent: "Group 1", id: "gamma", value: 2},
      {parent: "Group 2", id: "delta", value: 29},
      {parent: "Group 2", id: "eta", value: 25}
    ],
    config: {
      groupBy: ["parent", "id"],
      sum: "value",
      height: 450,
      legendConfig: {
        shapeConfig: {
          fill: "D3PLUS-COMMON-RESET"
        }
      },
      shapeConfig: {
        fill: "D3PLUS-COMMON-RESET"
      },
      tooltipConfig: {
        tbody: [
          ["Share", (d, i, x) => percentagenumber(x.share)]
        ]
      }
    },
    item: "Treemap",
    type: "Treemap",
    activeIcon: "/icons/help/treemap_red_icon.svg",
    inactiveIcon: "/icons/help/treemap_white_icon.svg",
    howTexts: [
      "Los mapas de árbol o treemap son una forma alternativa de visualizar la estructura jerárquica de un diagrama de árbol al mismo tiempo que muestran cantidades para cada categoría a través del tamaño del área. A cada categoría se le asigna un área rectangular con sus rectángulos de subcategoría anidados dentro de ella.",
      "Cuando se asigna una cantidad a una categoría, el tamaño de su área se muestra en proporción a esa cantidad y a las otras cantidades dentro de la misma categoría principal en una relación de parte a todo. Además, el tamaño del área de la categoría principal es el total de sus subcategorías. Si no se asigna ninguna cantidad a una subcategoría, entonces su área se divide por igual entre las otras subcategorías dentro de su categoría principal.",
      "La forma en que los rectángulos se dividen y ordenan en sub-rectángulos depende del algoritmo de ordenamiento en mosaico utilizado. Se han desarrollado muchos algoritmos de ordenamiento en mosaico, pero el 'algoritmo cuadriculado' que mantiene cada rectángulo lo más cuadrado posible es el que se usa comúnmente."
    ],
    useTexts: [
      "Ben Shneiderman desarrolló originalmente los treemaps como una forma de visualizar un vasto directorio de archivos en un computador, sin ocupar demasiado espacio en la pantalla. Esto hace que sea una opción más compacta y que ahorra espacio para mostrar jerarquías, que brinda una descripción general rápida de la estructura. Los mapas de árbol también son excelentes para comparar las proporciones entre categorías a través del tamaño de su área.",
      "La desventaja de un mapa de árbol es que no muestra los niveles jerárquicos con tanta claridad como otros gráficos que visualizan datos jerárquicos."
    ],
    useTabs: [
      "Comparaciones",
      "Jerarquías",
      "Parte de un todo",
      "Proporciones"
    ]
  }
];
