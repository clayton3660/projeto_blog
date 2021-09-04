const express = require('express');
const router = express.Router();
const Category = require('./Category'); // -> importar para ter comandos para inserir no banco de dados
const slugify = require('slugify');

router.get('/admin/categories/new', (req, res) => {
  res.render('admin/categories/new');
});

router.post('/categories/save', (req, res) => {
  var title = req.body.title;
  if (title != undefined) {
    Category.create({
      // -> comandos para inserir no banco de dados
      title: title,
      slug: slugify(title), // utilizado para colocar tudo em minusculo e remover os espaços
    }).then(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/admin/categories/new');
  }
});
router.get('/admin/categories', (req, res) => {
  Category.findAll().then((categories) => {
    res.render('admin/categories/index', { categories: categories });
  });
});
router.post('/categories/delete', (req, res) => {
  var id = req.body.id;
  if(id != undefined) {
    if(!isNaN(id)) {
      Category.destroy({
        where: { id: id }
      }).then(() => {
        res.redirect('/admin/categories')
      });
    }else { // Não for um numero
      res.redirect('/admin/categories')
    }
  }else {// null
    res.redirect('/admin/categories')
  }
})

module.exports = router;
