module.exports.checkAuth = function (req, res, next) {

    const UsuarioId = req.session.usuarioid;

    if (!UsuarioId) {
        res.redirect('/login')
    }
    next()
}