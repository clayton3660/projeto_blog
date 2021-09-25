const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController'); //importando rotas arquivo controller
const articlesController = require('./articles/ArticlesController'); //importando rotas arquivo controller
const usersController = require('./users/UsersController'); //importando rotas arquivo controller

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User'); // importando arquivo para sincronizar o banco de dados

//configurando view engine
app.set('view engine', 'ejs');

//sessions

app.use(session({
  secret: 'qualquercoisa', cookie: {maxAge: 3000000 }
}))


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
app.use('/', usersController); // -> utilizar as rotas que estão dentro do arquivo controllers


// app.get('/session', (req, res) => {
//   req.session.treinamento = "Formação NOde.js"
//   req.session.ano = 2019
//   req.session.email = "email@email.com"
//   req.session.user = {
//     username: "Claytonsilva",
//     email: "email@claytonsilva.com",
//     id:10
//   }
//   res.send("Sessão gerada!")
// })

// app.get('/read', (req, res) => {
//   res.json({
//     trenamento: req.session.trenamento,
//     ano: req.session.ano,
//     email: req.session.email,
//     user: req.session.user
//   })
// })

app.get('/', (req, res) => {
  Article.findAll({
    order: [['id', 'DESC']],
    limit: 4
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render('index', { articles: articles, categories: categories });
    });
  });
});
app.get('/:slug', (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render('article', { article: article, categories: categories });
        });
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => {
      res.redirect('/');
    });
});

app.get('/category/:slug', (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
    where: {
      slug: slug,
    },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category != undefined) {
        Category.findAll().then((categories) => {
          res.render('index', {
            articles: category.articles,
            categories: categories,
          });
        });
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => {
      res.redirect('/');
    });
});

app.listen(8080, () => {
  console.log('Servidor Ok');
});
