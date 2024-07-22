/* Rutas de Usuario / auth 
host + /api/auth */
const { Router } = require('express');
const { validateInputs, validateJWT } = require('../middleware/');
const { registerUser, login, revalidateToken } = require('../controller/');
const { fieldsRegister, fieldsLogin } = require('../validations');

const router = Router();

router.post('/register', [...fieldsRegister, validateInputs], registerUser);
router.post('/login', [...fieldsLogin, validateInputs], login);
//el validateJWT(middleware) interzecta si hay o no un token valido, agregaosm propiedades al request como name id para que esas
//mismas propiedades sean recuperadas en realidateToken el controlador y para generar nuevo token
router.get('/renew', validateJWT, revalidateToken);

module.exports = router;
