const jwt = require("jsonwebtoken");
const pool = require("../db/dbConfigs");

const autenticarUsuario = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(403).json({ mensagem: 'Para acessar este recurso um token de autenticação deve ser enviado!' });
    }
    const token = authorization.split(' ')[1];
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const { rows, rowCount } = await pool.query('select * from usuarios where id = $1', [id]);
        if (rowCount < 1) {
            return res.status(403).json({ mensagem: 'Não autorizado!' })
        }
        req.usuario = rows[0];
        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(403).json({ mensagem: 'Não autorizado, informe um token válido!' })
        }
        return res.status(500).json({ mensagem: 'Erro interno do servidor :/ ' });
    }
}

module.exports = autenticarUsuario;