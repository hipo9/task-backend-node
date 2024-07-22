const { check } = require('express-validator');

const fieldsTaks = [
  check('title', 'Title must be at least 3 characters long')
    .notEmpty()
    .isLength({ min: 3 }),
  check('description', 'Description is required').notEmpty().trim(),
  check('completed', 'completed must be a boolean true/false or 1/0').isBoolean().notEmpty(),
];

module.exports = { fieldsTaks };
