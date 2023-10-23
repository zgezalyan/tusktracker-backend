const { body, validationResult } = require('express-validator');

exports.validateUserRegistration = [
  // Validate username
  body('username')
    .trim()
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .isAlphanumeric().withMessage('Username must contain only letters and numbers'),

  // Validate email
  body('email')
    .trim()
    .isEmail().withMessage('Invalid email address'),

  // Validate password
  body('password')
    .trim()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  
  // Custom validation to confirm password
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must match');
      }
      return true;
    }),

  // Check for errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];