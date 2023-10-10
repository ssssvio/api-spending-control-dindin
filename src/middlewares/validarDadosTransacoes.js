const validarDadosTransacoes = async (req, res, next) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    try {
        if (isNaN(valor) || valor <= 0) {
            return res.status(400).json({ mensagem: 'Informe um valor válido!' })
        }
        if (isNaN(categoria_id)) {
            return res.status(400).json({ mensagem: 'Informe uma categoria válida!' })
        }
        if (tipo !== "entrada" && tipo !== "saida") {
            return res.status(400).json({ mensagem: 'Esse tipo de transação não existe, por favor preencha tipo com entrada ou saida.' })
        }
        if ((!descricao) || (!valor) || (!data) || (!categoria_id) || (!tipo)) {
            return res.status(400).json({ mensagem: 'Dados insuficientes, informe todos os campos!' })
        }
        next()
    } catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro interno no servidor :/" })
    }
}

module.exports = validarDadosTransacoes;