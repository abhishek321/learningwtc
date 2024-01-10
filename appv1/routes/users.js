const express = require('express');
const { body,param } = require('express-validator');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const usersController = require('../controllers/users');

// Signup route with validations
router.post(
    '/signup',
    [
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('age').optional({ nullable: true, checkFalsy: true }).isInt().withMessage('Age must be a number'),
    ],
    usersController.signup
);

// Login route with validations
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    usersController.login
);

// Update user profile (protected route example)
router.put(
  '/profile',
  [
      authMiddleware, // Ensure the user is authenticated
      body('firstName').optional({ nullable: true, checkFalsy: true }).isString().withMessage('First name must be a string'),
      body('lastName').optional({ nullable: true, checkFalsy: true }).isString().withMessage('Last name must be a string'),
      body('age').optional({ nullable: true, checkFalsy: true }).isInt().withMessage('Age must be a number'),
  ],
  usersController.updateUserProfile
);

// Delete user (protected route example)
router.delete(
  '/delete/:id',
  [
      authMiddleware, // Ensure the user is authenticated
      param('id').isMongoId().withMessage('Invalid user ID'), // Validate the user ID parameter
  ],
  usersController.deleteUser
);
router.get(
  '/:id',
  [
      authMiddleware, // Ensure the user is authenticated
      param('id').isMongoId().withMessage('Invalid user ID'), // Validate the user ID parameter
  ],
  usersController.getUser
);

module.exports = router;
