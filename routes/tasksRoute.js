/* Rutas de Usuario / auth 
host + /api/auth */
const { Router } = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controller');
const { validateJWT } = require('../middleware/validateJwt');
const { fieldsTaks } = require('../validations');
const { validateInputs } = require('../middleware');

const router = Router();

router.use(validateJWT);
router.get('/', getTasks);
router.post('/', [...fieldsTaks, validateInputs], createTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

module.exports = router;
