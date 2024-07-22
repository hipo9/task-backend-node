const bcrypt = require('bcryptjs');
const { connection } = require('../database/conectDB');

async function createUser({ name, email, password }) {
  
  let user = await findUserByEmail({ email });
  if (user.length)
    return { ok: false, message: 'User already exists ', status: 400 };

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const values = [name, email, hashedPassword];
    const { rows, fields } = await connection.executeQuery(query, values);

    if (rows.affectedRows !== 0) {
      const user = { id: rows.insertId, name: name };
      return {
        ok: true,
        message: 'Se inserto correctamente',
        status: 201,
        user,
      };
    }
  } catch (error) {
    console.error('Error in createUser:', error);
    return {
      ok: false,
      message: 'Something went wrong, please contact the administrator',
      status: 500,
    };
  }
}

async function loginUser({ email, password }) {
  let userFound = await findUserByEmail({ email }); //verificar si lla exite el el ususario,con un metodo que evuelva el usuario
  if (userFound.length === 0)
    return { ok: false, message: 'Invalid email or password', status: 400 };

  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const values = [email];

    const { rows } = await connection.executeQuery(query, values);
    const [user] = rows;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return {
        ok: false,
        message: 'Invalid email or password match pass',
        status: 400,
      };
    return { ok: true, message: 'sesion correcta', user: user, status: 201 };
  } catch ({ message, codeError }) {
    return { ok: false, msg: message, codeError };
  }
}
async function findUserByEmail({ email }) {
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const { rows } = await connection.executeQuery(query, [email]);
    return rows;
  } catch (error) {
    console.log('error: ' + error);
    return [];
  }
}
module.exports = {
  createUser,
  findUserByEmail,
  loginUser,
};
