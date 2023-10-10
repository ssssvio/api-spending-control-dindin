const pool = require("../db/dbConfigs");

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body
    try {
        const usuario_id = req.usuario.id
        const query = (`
            insert into transacoes
            (tipo, descricao, valor, data, categoria_id, usuario_id)
            values
            ($1, $2, $3, $4, $5, $6) 
            returning *
            `);
        const transacoes = await pool.query(query, [tipo, descricao, valor, data, categoria_id, usuario_id]);
        return res.status(201).json(transacoes.rows[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro interno no servidor :/" })
    }
}

module.exports = cadastrarTransacao;