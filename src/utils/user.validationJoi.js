const joi = require("joi");

exports.schemaUsuario = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório!',
        'string.empty': 'Todos os campos devem ser prenchidos!'
    }),

    email: joi.string().email().required().messages({
        'any.required': 'O campo e-mail é obrigatório!',
        "string.email": 'O e-mail deve ser válido!',
        'string.empty': 'Todos os campos devem ser prenchidos!'
    }),

    senha: joi.string().min(6).required().messages({
        'any.required': 'O campo senha é obrigatório!',
        'string.min': 'A senha deve conter no mínimo 6 caracteres!',
        'string.empty': 'Todos os campos devem ser prenchidos!'
    }),

    idade: joi.number().min(18).positive().required().messages({
        'any.required': 'O campo idade é obrigatório!',
        'number.base': 'Informe somente números',
        'number.min': 'Menor de idade!'
    }),
});