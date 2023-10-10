const { hash } = require("bcrypt");
const pool = require("../db/dbConfigs");

const atualizarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const senhaCriptografada = await hash(senha, 10);
        const atualizarDadosUsuario = await pool.query(
            `update usuarios set 
            nome = $1, email = $2, senha = $3 
            where id = $4`,
            [nome, email, senhaCriptografada, req.usuario.id]
        );
        return res.status(201).send()
    } catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro interno no servidor :/" })
    }
}

module.exports = atualizarUsuario;