const { body, validationResult } = require('express-validator');
const { CustomError } = require('../middleware/errors');

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
        throw new CustomError({ errors: errors.array() }, 404);
    }
    next();
  },
];

exports.validateTaskCreation = [
    body('user')
      .trim()
      .exists().withMessage('User name should be provided')
      .isAlphanumeric().withMessage('Parameters must contain only letters and numbers'),

    body('title')
      .trim()
      .exists().withMessage('Title of the task should be provided')
      .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),    

    // Check for errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
             throw new CustomError('Validation errors', 404, errors.array());
        }
        next();
    },
]

exports.validateTaskDescription = [
  body('description')
    .trim()
    .exists().withMessage('Description should be provided')
    .isLength({ min: 3 }).withMessage('Description must be at least 3 characters long'),   
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError('Validation errors', 404, errors.array());
    }
    next();
  },
]

exports.validateTaskTags = [
  body('tags')
    .trim()
    .exists().withMessage('Tags should be provided')
    .isArray().withMessage('Tags should be provided as array'),   
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError('Validation errors', 404, errors.array());
    }
    next();
  },
]

exports.validateTaskTitle = [
  body('title')
    .trim()
    .exists().withMessage('Title should be provided')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError('Validation errors', 404, errors.array());
    }
    next();
  },
]

exports.validateTaskParent = [
  body('parentId')
    .trim()
    .notEmpty().withMessage('Parent task id should be provided'),    
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError('Validation errors', 404, errors.array());
    }
    next();
  },
]