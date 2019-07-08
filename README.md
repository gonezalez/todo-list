# todo-list
> ### Aplicacion Full-Stack de Lista de tareas utilizando Node (Express + PostgresSQL) con endpoints de CRUD, registro y autenticacion. Cliente desarrollado con React, Redux y Reatcstrap. Desplegado en Heroku y utilizando el servicio de Postgres as a Service de ElephantSQL.

- [Demo](https://aqueous-sands-53314.herokuapp.com/)

# Correr localmente

- Clonar repositorio
- `npm install` para instalar dependencias del api rest.
- `npm run server` para ejecutar el api en modo desarrollo.
- `npm client-install` para instalar dependencias del cliente.
- `npm run cliente` para ejecutar el cliente.
- `npm run dev` para ejecutar tanto el api como el cliente.

## Dependencias

- [express](https://github.com/expressjs/express) - Frameworl de servidor
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Para generar JWTs que se usan en la autenticación.
- [concurrently](https://github.com/kimmobrunfeldt/concurrently) - Correr comandos concurrentemente.
- [sequelize](https://github.com/sequelize/sequelize) - ORM.
- [config](https://github.com/lorenwest/node-config) - Manejo de configuraciones.
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Utilizado para encriptar contraseñas.

## Estructura

- `server.js` - Es el punto de entrada de la aplicación. Define el servidor. Define el servidor express y las rutas principales.
- `config/` - Es donde se encuentra centralizada la configuracion utilizado en diferentes partes de la aplicacion como los datos para la conexión de la bd.
- `routes/api/` - Esta carpeta contiene las rutas definidas para el api.
- `routes/api/auth` - Rutas de autenticación.
- `routes/api/todos` - Rutas de crud de tareas.
- `routes/api/users` - Rutas para creacion de usuarios.
- `models/` - Contiene los esquemas definidos utilizando sequelize.
- `sql/` - Contiene scripts que deben correrse en la bases de datos a la que se conectara nuestra aplicacion.
- `database/` - Configuracion y creacion de conexión a base de datos Postgres en elephantSQL.
- `middleware/` - Middlewares que pueden ser utilizados en diferentes rutas de la aplicación, como el middle de autenticación.
- `client/` - Contiene la aplicacion cliente. Fue generada utilizando create-react-app

## Autenticación

Las peticiones son autenticadas utilizando el header `x-auth-token` generado con JWT. Se definio un middleware `middleware/auth.js` que se usa para autenticar las peticiones.

## Deploy

Esta es una aplicación full-stack desarrollada para ser desplegada en heroku. Por lo que posee un script "heroku-postbuild" el cual es ejecutado por el servidor de heroku luego de desplegar nuestra api, asi desplegar tanto el api como el cliente.
