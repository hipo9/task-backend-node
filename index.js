const express = require('express');
const { authRoute, tasksRoute } = require('./routes');
const { corsMiddleware } = require('./middleware/cors');

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(corsMiddleware());
//sive para deshabilitar el header algo asi
// app.disable('x-powered-by');


app.use('/api/auth', authRoute);
app.use('/api/tasks', tasksRoute);

// starts a simple http server locally on port 3000
app.listen(process.env.PORT, '127.0.0.1', () => {
  console.log('-----------------------------');
  console.log(`Server on running on port ${process.env.PORT}`);
  console.log('-----------------------------');
});

// run with `node server.mjs`

/* 
Dependencias 
npm i express mysql2 bcryptjs cors dotenv express-validator jsonwebtoken bcryptjs
npm i express
npm install --save mysql2     ----> para la base de datos de mysql 
npm i bcryptjs   ---> para incriptar contraseña
npm i express-validator ----> validar campos de entrada para expresss 
 */

/* 
* --------------------Crear Conneccion a la base de datos usando singleton----------------------
- crear la clase
- crear la propiedad instancia y pool(conexion)
      - verificar si la instancia esta vacia, si esta vacia crear la instancia  ConnecctionDB.instance = this;
- crear metodo de connet 
                                 ?-------- en un trycatch-------
  - crear un objeto literal para los datos de conxion s la base de datos como host, port etc...
  -verificar si pool(conexion) esta vacio si esta vacio crear en ella una conexion await creat3ePool({datosConxcion}) y mandar un consolelog si la conexion fue exitosa
  - si cae en al catch agrega mensaje u agrega un null al pool
  - el metodo retornara la coxion 
                                * -------- crear metodo execute query -------
  para executar cualquier consulta, y solo llamar el metodo de donde quieras, recibira dos paramentros
    -lka quwery y el value para hacer la consulta 
    const [rows, fields] = await pool.execute(query, values);
    retornanra return { rows, fields };
    si hay error mandaras mensajes de error de consulta throw { message: sqlMessage, codeError: sqlState };
                                * -------- crear metodo cerrar conexion-------

      async closeConnection() {
    if (this._pool === null) {
      console.log('La conexión ya está cerrada o no existe');
      return;
    }
    try {
      await this._pool.end();
      console.log('Conexión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar la conexión:', error.message);
    } finally {
      this._pool = null;
    }
  }
}
                  * -------- instanciar la clase y exportar el metodo con la cual se accedera la coneccio-------
*/
