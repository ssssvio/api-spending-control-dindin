const listarUsuario = async (req, res) => {
    try {
        const dadosUsuario = {
            id: req.usuario.id,
            nome: req.usuario.nome,
            email: req.usuario.email
        }
        return res.status(200).json(dadosUsuario);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor :/' });
    }
}
module.exports = listarUsuario;