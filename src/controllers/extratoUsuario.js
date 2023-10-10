const pool = require("../db/dbConfigs");

const extratoUsuario = async (req, res) => {
    try {
        const usuarioId = req.usuario.id
        const { rowCount } = await pool.query(
            `select * from transacoes where usuario_id = $1 `, [usuarioId]
        );
        if (rowCount < 1) {
            return res.status(404).json({ mensagem: "Não há movimentação nessa conta." })
        }
        const { rows: entrada } = await pool.query(
            `select sum(valor) from transacoes 
            where tipo = 'entrada' and usuario_id = $1`, [usuarioId]
        );
        const { rows: saida } = await pool.query(
            `select sum(valor) from transacoes 
            where tipo = 'saida' and usuario_id = $1`, [usuarioId]
        );
        return res.status(200).json({
            "entrada": entrada[0].sum,
            "saida": saida[0].sum
        })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor :/' });
    }
}

module.exports = extratoUsuario;