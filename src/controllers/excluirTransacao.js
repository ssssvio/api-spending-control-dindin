const pool = require("../db/dbConfigs");

const excluirTransacao = async (req, res) => {
    const { id } = req.params
    const usuarioId = (req.usuario.id);
    try {
        const { rowCount } = await pool.query(
            `select * from transacoes where id = $1 and usuario_id = $2`
            , [id, usuarioId]);
        if (rowCount < 1) {
            return res.status(404).json({ mensagem: "Transação não encontrada!" })
        }
        const excluirTransacao = await pool.query(
            `delete from transacoes where id = $1 and usuario_id = $2`
            , [id, usuarioId]);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor :/' });
    }
}

module.exports = excluirTransacao;