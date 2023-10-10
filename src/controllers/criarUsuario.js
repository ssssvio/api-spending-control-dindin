const { hash } = require('bcrypt');
const pool = require('../db/dbConfigs');

const criarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const senhaCriptografada = await hash(senha, 10);
        const { rows } = await pool.query(
            'insert into usuarios (nome, email, senha) values ($1,$2,$3) returning *',
            [nome, email, senhaCriptografada]
        );
        const { senha: _, ...usuario } = rows[0];
        return res.status(201).json(usuario);
    } catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro interno no servidor :/" })
    }
}

module.exports = criarUsuario;