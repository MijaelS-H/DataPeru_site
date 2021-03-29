# ITPProducción

Este repositorio contiene el código fuente para compilar el código del sitio web
del lado del cliente, y ejecutar el proceso de renderizado de lado del servidor,
para el sitio web de la plataforma ITPProducción.

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
