const Sequelize = require('sequelize');
const connections = require('../database/database');

const Article = connection.define('articles', {
  title: {
    type: sequelize.STRING,
    allowNull: false,
  },
  slug: {
    sequelize: STRING,
    allowNull: false,
  },
  body: {
    type: sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Article;
