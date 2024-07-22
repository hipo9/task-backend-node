const { response } = require('express');
const { createUser, loginUser } = require('../model/userModel');
const { generateWJT } = require('../helpers/generateJwt');

async function registerUser(req, res = response) {
  const { name, email, password } = req.body;

  const result = await createUser({ email, password, name });
  const { ok, status, message, user } = result;
  console.log(user);
  if (!ok) {
    return res.status(status).json({
      ok: ok,
      msg: message,
    });
  }

  if (ok) {
    const token = generateWJT(user.id, user.name);
    console.log(user);
    return res
      .status(status)
      .json({ ok: true, id: user.id, name: user.name, token });
  }
}

async function login(req, res = response) {
  const { email, password } = req.body;
  console.log({ email, password });
  const { ok, message, status, user } = await loginUser({ email, password });

  if (!ok) {
    return res.status(status).json({ ok, message });
  }
  //!TODO: Generar JWT//sin await porque no me funcionaba
  const token = generateWJT(user.id, user.name);
  res.status(201).json({ ok, id: user.id, name: user.name, token });
}

const revalidateToken = (req, res = response) => {
  const { id, name } = req;
  //* Generar un nuevo JTW y retorna en esta peticion
  const newToken = generateWJT(id, name);

  res.json({
    ok: true,
    token: newToken,
    id,
    name,
  });
};
module.exports = {
  registerUser,
  login,
  revalidateToken,
};
