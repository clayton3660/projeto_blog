const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

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
    console.log('Conecatdo com o banco!'); // mensagem se realizou a conexão
  })
  .catch((error) => {
    //mensagem se não conseguiu realizar a conexão
    console.log(error, 'Falha ao se conectar com o banco de dados');
  });

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(8080, () => {
  console.log('Servidor Ok');
});
