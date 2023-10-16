const knex = require("../dbConfig/db");

const listarUsuarios = async (req, res) => {
    const usuarios = await knex('usuarios');
    return res.json(usuarios);
}

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const novoUsuario = {
            nome,
            email,
            senha
        }
        const cadastroUsuario = await knex('usuarios')
            .insert(novoUsuario)
            .returning('*')
        return res.json(cadastroUsuario)
    } catch (error) {
        return res.status(500).json({ message: 'Ocorreu um erro interno no servidor :/ ' });
    }
}

module.exports = {
    cadastrarUsuario,
    listarUsuarios
}