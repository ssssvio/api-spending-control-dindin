const express = require('express');
const { listarUsuarios, cadastrarUsuario } = require('../controllers/usuario');
const bodyValidationJoi = require('../middlewares/body.valdation.joi');
const routes = express();

routes.post('/usuario', bodyValidationJoi, cadastrarUsuario);
routes.get('/usuario', listarUsuarios);

module.exports = routes;