const pool = require("../db/dbConfigs");

const detalharTransacao = async (req, res) => {
    const { id } = req.params
    const usuarioId = req.usuario.id
    try {
        const { rowCount, rows } = await pool.query(`select * from transacoes where id = $1 and usuario_id = $2`, [id, usuarioId]);
        if (rowCount < 1) {
            return res.status(400).json({ mensagem: 'Transação não encontrada.' })
        }
        const categoria = await pool.query(`select * from categorias where id = $1`, [rows[0].categoria_id]);
        const transacaoDetalhada = {
            id: rows[0].id,
            tipo: rows[0].tipo,
            descricao: rows[0].descricao,
            valor: rows[0].valor,
            data: rows[0].data,
            usuario_id: rows[0].usuario_id,
            categoria_id: rows[0].categoria_id,
            categoria_nome: categoria.rows[0].descricao
        }
        return res.status(200).json(transacaoDetalhada);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor :/' });
    }
}

module.exports = detalharTransacao;