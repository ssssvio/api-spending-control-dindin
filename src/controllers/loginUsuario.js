const { sign } = require('jsonwebtoken');
const senhaJwt = require('../senhaJWT');
const pool = require('../db/dbConfigs');

const loginUsuario = async (req, res) => {
    const { email } = req.body;
    try {
        const { rows } = await pool.query('select * from usuarios where email = $1', [email]);
        const token = sign({ id: rows[0].id }, senhaJwt, { expiresIn: '8h' });
        const { senha: _, ...usuarioLogago } = rows[0];
        return res.json({ usuario: usuarioLogago, token });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor :/' });
    }
}
module.exports = loginUsuario;