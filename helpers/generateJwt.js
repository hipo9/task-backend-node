const jwt = require('jsonwebtoken');

const generateWJT = (id, name) => {
  const payload = { id, name };
  //generar el token
  const token = jwt.sign(payload, process.env.SECRET_JWT_SEED, {
    expiresIn: '2h',
  });
  if (!token) {
    return 'Cannot generate token';
  }
  return token;
};
module.exports = {
  generateWJT,
};
