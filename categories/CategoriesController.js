const express = require('express');
const router = express.Router();

router.get('/categories', (req, res) => {
  res.send('Rota de categorias');
});

router.get('/admin/catergories/new', (req, res) => {
  res.send('rota para criar uma nova catergoria');
});

module.exports = router;
