const Sequelize = require('sequelize');
const connections = require('../database/database');

const Category = connection.define('categories', {
  title: {
    type: sequelize.STRING,
    allowNull: false,
  },
  slug: {
    sequelize: STRING,
    allowNull: false,
  },
});

module.exports = Category;
