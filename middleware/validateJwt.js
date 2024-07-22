const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
  // x-token header
  const token = req.header('x-token');
  
  if (!token) {
    //Si el token no viene, si no viene quiere decir que no se ha iniciado sesion
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la peticion',
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);


    const { id, name } = payload;
    req.id = id;
    req.name = name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token',
    });
  }
  next();
};

module.exports = {
  validateJWT,
};
