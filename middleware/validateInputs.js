const express = require('express');
const { response } = express();
const { validationResult } = require('express-validator');

//para validar las entradas del input, antes de cualquier ejecucat cualquier enpoint
const validateInputs = (req, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Hay un error de validadcion');
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = {
  validateInputs,
};
