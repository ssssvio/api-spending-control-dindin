const express = require('express');
const routes = express();

const validarDados = require('../middlewares/validarDados');
const criarUsuario = require('../controllers/criarUsuario');
const validarSenha = require('../middlewares/validarSenha');
const loginUsuario = require('../controllers/loginUsuario');
const autenticarUsuario = require('../middlewares/autenticacao');
const listarUsuario = require('../controllers/listarUsuario');
const atualizarUsuario = require('../controllers/atualizarUsuario');
const listarCategoria = require('../controllers/listarCategorias');
const listarTransacoes = require('../controllers/listarTransacoesUsuario');
const detalharTransacao = require('../controllers/detalharTransacao');
const cadastrarTransacao = require('../controllers/cadastrarTransacao');
const validarDadosTransacoes = require('../middlewares/validarDadosTransacoes');
const atualizarTransacao = require('../controllers/atualizarTransacao');
const excluirTransacao = require('../controllers/excluirTransacao');
const extratoUsuario = require('../controllers/extratoUsuario');

routes.post('/usuario', validarDados, criarUsuario);
routes.post('/login', validarSenha, loginUsuario);

routes.use(autenticarUsuario);

routes.get('/transacao', listarTransacoes);
routes.get('/usuario', listarUsuario);
routes.get('/categoria', listarCategoria);
routes.get('/transacao/extrato', extratoUsuario);
routes.get('/transacao/:id', detalharTransacao);

routes.put('/usuario', validarDados, atualizarUsuario);
routes.put('/transacao/:id', validarDadosTransacoes, atualizarTransacao);

routes.post('/transacao', validarDadosTransacoes, cadastrarTransacao);

routes.delete('/transacao/:id', excluirTransacao);

module.exports = routes;