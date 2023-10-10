const pool = require("../db/dbConfigs");

const listarTransacoes = async (req, res) => {
    const { filtro } = req.query;
    let query = `
        SELECT t.*, c.descricao AS categoria_nome
        FROM transacoes t
        JOIN categorias c ON t.categoria_id = c.id
        WHERE t.usuario_id = $1
    `;
    const params = [req.usuario.id];
    if (filtro) {
        query += ` AND c.descricao = ANY($2::text[])`;
        params.push(filtro);
    }
    try {
        const { rows, rowCount } = await pool.query(query, params);
        if (rowCount < 1) {
            return res.status(400).json([]);
        }
        const transacoesFormatadas = rows.map((row) => ({
            id: row.id,
            tipo: row.tipo,
            descricao: row.descricao,
            valor: row.valor,
            data: row.data,
            usuario_id: row.usuario_id,
            categoria_id: row.categoria_id,
            categoria_nome: row.categoria_nome,
        }));
        return res.status(200).json(transacoesFormatadas);
    } catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro interno no servidor :/" });
    }
};

module.exports = listarTransacoes;
