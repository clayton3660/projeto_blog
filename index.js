const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController'); //importando rotas arquivo controller
const articlesController = require('./articles/ArticlesController'); //importando rotas arquivo controller

const Article = require('./articles/Article');
const Category = require('./categories/Category');

//configurando view engine
app.set('view engine', 'ejs');

//configurando arquivos estaticos
app.use(express.static('public'));

// configurando bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database

connection // -> objeto de conexão importado acima
  .authenticate() // aqui autentica com as informações do arquivo database.js
  .then(() => {
    console.log('Conectado com o banco!'); // mensagem se realizou a conexão
  })
  .catch((error) => {
    //mensagem se não conseguiu realizar a conexão
    console.log(error, 'Falha ao se conectar com o banco de dados');
  });

app.use('/', categoriesController); // -> utilizar as rotas que estão dentro do arquivo controllers
app.use('/', articlesController); // -> utilizar as rotas que estão dentro do arquivo controllers

app.get('/', (req, res) => {
  Article.findAll({
    order: [
      ['id','DESC']
    ]
  }).then((articles) => {
    res.render('index', { articles: articles });
  });
});
app.get('/:slug', (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug,
    },
  }).then((article) => {
    if (article != undefined) {
      res.render('article', {article:article});
    } else {
      res.redirect('/');
    }
  }).catch (err => {
    res.redirect('/');
  })
});

app.listen(8080, () => {
  console.log('Servidor Ok');
});
