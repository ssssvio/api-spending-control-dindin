const pool = require("../db/dbConfigs");

const atualizarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id: transacao_id } = req.params
    const usuario_id = req.usuario.id;
    try {
        const query = `
        UPDATE transacoes
        SET tipo = $1, descricao = $2, valor = $3, data = $4, categoria_id = $5
        WHERE id = $6 AND usuario_id = $7
        RETURNING *;
        `;
        const { rowCount } = await pool.query(query, [tipo, descricao, valor, data, categoria_id, transacao_id, usuario_id]);
        if (rowCount < 1) {
            return res.status(404).json({ mensagem: 'Transação não encontrada ou não pertence a este usuário.' });
        }
        return res.status(201).send();
    } catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro interno no servidor :/" });
    }
}

module.exports = atualizarTransacao;