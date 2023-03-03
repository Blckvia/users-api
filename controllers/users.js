const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const clearImage = require('../helpers/deleteImageHelper');

exports.getUsers = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  let offset = (currentPage - 1) * perPage;
  let totalItems;
  User.count()
    .then((count) => {
      totalItems = count;
      return User.findAll({ offset: offset, limit: perPage });
    })
    .then((users) => {
      if (!users) {
        const error = new Error('Could not find users.');
        err.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: 'Fethed users successfully',
        users: users,
        totalItems: totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'User fetched', user: user });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.register = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const first_name = req.body.first_name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        first_name: first_name,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: 'User created!', userId: result.id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ where: { email: email } })
    .then((user) => {
      console.log(user);
      if (!user) {
        const error = new Error('A user with this email could not be found');
        error.statusCode = 401; // using 401 instead of 404 coz 401 is using for unauthenticated users and it's good as well.
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.id.toString(),
        },
        'somesuperprivateandlongstring',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser.id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const sex = req.body.sex;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path.replace('\\', '/');
  }
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl === undefined) {
        imageUrl = user.imageUrl;
      }
      if (imageUrl !== user.imageUrl) {
        clearImage(user.imageUrl);
      }
      user.first_name = first_name;
      user.last_name = last_name;
      user.imageUrl = imageUrl;
      user.email = email;
      user.sex = sex;
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'User updated!', user: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
