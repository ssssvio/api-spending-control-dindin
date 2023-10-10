const { compare } = require("bcrypt");
const pool = require("../db/dbConfigs");

const validarSenha = async (req, res, next) => {
    const { email, senha } = req.body;
    try {
        const { rowCount: emailExistente, rows } = await pool.query('select * from usuarios where email = $1', [email]);
        if (emailExistente < 1) {
            return res.status(400).json({ mensagem: 'Email ou senha inválida.' });
        }
        const senhaValida = await compare(senha, rows[0].senha);
        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Email ou senha inválida.' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor :/' });
    }
}
module.exports = validarSenha;