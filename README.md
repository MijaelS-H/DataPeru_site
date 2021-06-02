# Plataforma de datos ITP: Sitio ITPProducción

## Descripción
El presente repositorio tiene como objetivo contener el código fuente para compilar el código del sitio web del lado del cliente, y ejecutar el proceso de renderizado de lado del servidor, para el sitio web de la plataforma ITP Producción.

## Estructura del Repositorio

El repositorio actual se encuentra estructurado de la siguiente forma:

### .vscode/

La carpeta .vscode corresponde a la recopilación de configuraciones establecidas para el uso y codificación de la presente plataforma en el editor de texto Visual Studio Code. Su contenido no presenta mayor importancia en el desarrollo del presente proyecto.

### api/

La carpeta api corresponde a la ruta en la cual se definen aquellos endpoints customizados que permiten obtener datos y registros en formatos particulares o mediante llamadas particulares, lo que permite la generación de múltiples secciones de contenido. A diferencia de los endpoints utilizados a través de Tesseract, los endpoints disponibles en la carpeta api corresponde a enlaces internos a los cuales el usuario no posee acceso mediante el explorador de cubos, pero sí a través de un enlace directo. Entre los endpoints correspondientes se encuentran los customAttributes, atributos particulares utilizados en la generación de cada perfil que permiten la construcción de variables customizadas que permiten mejorar el rendimiento del sitio durante la generación de contenido.

### app/

La carpeta app corresponde al núcleo del contenido del sitio en construcción. En ella se encuentran los componentes y páginas que componen el sitio completo. Como todo proyecto de React, el contenido de esta carpeta está estructurado según la funcionalidad de cada elemento desarrollado. De esta forma es posible encontrar una carpeta de componentes (/components) y una carpeta de páginas (/pages), las cuales contienen elementos dinámicos y de utilización común a través del sitio (navbar, footer, search, entre otros) y la generación de páginas estáticas disponibles en el sitio, respectivamente. Adicionalmente la carpeta app presenta elementos de configuración de diseño y visualizaciones estándar que permiten controlar dichos aspectos en la plataforma de manera transversal. Finalmente, es posible encontrar la definición de rutas disponibles en el sitio mediante el archivo routes.jsx disponible en el directorio raíz de la carpeta app.

### locales/

La carpeta locales incluye los archivos de traducción del sitio, en caso de que este requiera estar disponible en más de un idioma. Dado que el presente proyecto no aspira a ser una plataforma multi-idioma, solo es posible encontrar el archivo de traducción al español, el cual es utilizado para traducir los elementos base de Canon al español.

### scripts/

La carpeta scripts incluye los scripts desarrollados por el equipo consultor para la obtención de registros de elementos georreferenciados asociados al Ministerio de Cultura. En esta carpeta se encontrarán scripts de Python que realizan automáticamente la descarga de elementos georreferenciados y su almacenamiento en archivos consumibles por el sitio en desarrollo.

### static/

La carpeta static almacena los registros estáticos utilizados en la plataforma de desarrollo como lo son íconos, imágenes, mapas o shapes, entre otros. Todo elemento existente en dicha carpeta puede ser utilizado en la generación de contenido y páginas estáticas del sitio, por lo que corresponde a uno de los directorios más relevantes del repositorio.

### types/

Carpeta de configuración global que no tiene mayor incidencia en el desarrollo del presente proyecto.


## Ejecución

Antes que nada, se debe revisar que las variables del entorno estén configuradas
correctamente. El archivo [`example.env`](./example.env) contiene las variables
del entorno que se necesitan para la ejecución, pero su aplicación depende del
sistema operativo que posee el usuario. Asegúrese que los valores sean correctos.

Para compilar y ejecutar el servidor en modo producción, ejecute los comandos:

```bash
npm run build
node index.js
```
