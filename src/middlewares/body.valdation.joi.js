const knex = require("../dbConfig/db")
const { schemaUsuario } = require("../utils/user.validationJoi")

const bodyValidationJoi = async (req, res, next) => {
    try {
        await schemaUsuario.validateAsync(req.body)
        const temEmail = await knex('usuarios')
            .where('email', '=', req.body.email)
            .first()
        if (temEmail) {
            return res.status(400).json({ message: 'Informe um e-mail diferente!' })
        }
        next()
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = bodyValidationJoi;
