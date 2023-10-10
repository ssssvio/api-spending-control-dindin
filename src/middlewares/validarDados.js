const pool = require("../db/dbConfigs")

const validarDados = async (req, res, next) => {
    const { nome, email, senha } = req.body
    try {
        if ((!nome) || (!email) || (!senha)) {
            return res.status(400).json({ mensagem: "Por favor insira todos os dados!" });
        }
        const { rowCount: emailExistente } = await pool.query('select * from usuarios where email = $1', [email]);
        if (emailExistente === 1) {
            return res.status(400).json({ mensagem: "Já existe um usuário com esse e-mail informado!" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Ocorreu um erro interno no servidor :/' })
    }
}

module.exports = validarDados;