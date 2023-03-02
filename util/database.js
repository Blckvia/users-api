const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'user-db',
  `${process.env.MYSQL_USER}`,
  `${process.env.MYSQL_PASSWORD}`,
  {
    dialect: 'mysql',
    host: 'localhost',
  }
);

module.exports = sequelize;
