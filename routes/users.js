const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');

const usersController = require('../controllers/users');

const router = express.Router();

// GET all users
router.get('/profiles', usersController.getUsers);

// POST register user
router.post(
  '/user/register',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((userEmail) => {
        return new Promise((resolve, reject) => {
          User.findOne({ where: { email: userEmail } }).then((emailExist) => {
            if (emailExist !== null) {
              reject(new Error('Email already exists.'));
            } else {
              resolve(true);
            }
          });
        });
      })
      .normalizeEmail(),
    body('password').trim().not().isEmpty(),
    body('first_name').trim().not().isEmpty(),
  ],
  usersController.register
);

module.exports = router;
