const { check } = require('express-validator');
const fieldsLogin = [
  check('email', 'Email is required').isEmail().trim(),
  check('password', 'Password must be at least 6 characters long')
    .isLength({ min: 6 })
    .trim(),
];

const fieldsRegister = [
  check('name', 'Name is required').not().isEmpty().trim(),
  check('email', 'Email is required').isEmail().trim(),
  check('password', 'Password must be at least 6 characters long')
    .isLength({ min: 6 })
    .trim(),
];

module.exports = { fieldsRegister, fieldsLogin };
