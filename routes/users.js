const express = require('express');
const { check, body } = require('express-validator');

const User = require('../models/user');

const usersController = require('../controllers/users');
const isAuth = require('../middleware/auth');

const router = express.Router();

// GET All Users
router.get('/profiles', usersController.getUsers);

// GET One User
router.get('/profile/:userId', usersController.getUser);

// POST User Registration
router.post(
  '/user/register',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password').trim().not().isEmpty(),
    body('first_name').trim().not().isEmpty(),
  ],
  usersController.register
);

// POST User Authorization
router.post('/user/login', usersController.login);

// PUT User Editing
router.put(
  '/profile/:userId',
  isAuth,
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('first_name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter first name'),
    body('last_name')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Please enter last name'),
    body('sex')
      .isIn(['M', 'F', undefined])
      .withMessage('Sex has to be "M" or "F"!'),
  ],
  usersController.updateUser
);

module.exports = router;
