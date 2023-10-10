const pool = require("../db/dbConfigs");

const listarCategoria = async (req, res) => {
    try {
        const { rows, rowCount } = await pool.query(`select * from categorias`);
        if (rowCount < 1) {
            return res.status(400).json([]);
        }
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro interno no servidor :/" })
    }
}

module.exports = listarCategoria;