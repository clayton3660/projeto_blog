const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});
//relacionamentos

Category.hasMany(Article); // um para muitos
Article.belongsTo(Category); // um para um

//Article.sync({ force: true }); // sincronizar banco de dados, precisa ser feito em todos os arquivos relacionados
// após sincronizar com o banco, remover a linha Article.sync({ force: true }); dos arquivos relacionados
