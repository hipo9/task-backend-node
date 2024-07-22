const { createPool } = require('mysql2/promise');

class ConnecctionDB {
  constructor() {
    if (!ConnecctionDB.instance) {
      this._pool = null;
      ConnecctionDB.instance = this;
    }
    return ConnecctionDB.instance;
  }

  async connect() {
    const DEFAULT_CONFIG = {
      host: 'localhost',
      user: 'root',
      port: 3307,
      password: '123',
      database: 'tasks',
    };

    if (!this._pool) {
      try {
        this._pool = createPool(DEFAULT_CONFIG);
        console.log('successful conecction to the MySQL database');
      } catch (error) {
        console.error(
          'Error connecting to the MySQL database :(',
          error.message
        );
        this._pool = null;
      }
    }
    return this._pool;
  }

  async executeQuery(query, values) {
    const pool = await this.connect(); // Garantiza que tenemos una conexión activa
    try {
      const [rows, fields] = await pool.execute(query, values);
      return { rows, fields };
    } catch (error) {
      console.log(error);
      const { sqlState, sqlMessage } = error;
      throw { message: sqlMessage, codeError: sqlState };
    }
  }

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

const connection = new ConnecctionDB();

module.exports = {
  connection,
};
