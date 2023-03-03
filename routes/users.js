const express = require('express');
const { check, body } = require('express-validator');

const User = require('../models/user');

const usersController = require('../controllers/users');

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
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ where: { email: value } }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-Mail adress already exists.');
          }
        });
      })
      .normalizeEmail(),
    body('first_name').trim().not().isEmpty(),
    body('last_name').trim().isLength({ min: 3 }),
    body('sex').isIn(['M', 'F']).withMessage('Sex has to be "M" or "F"!'),
  ],
  usersController.updateUser
);

module.exports = router;
