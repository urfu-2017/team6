export default (req, res, next) => {
    if (!req.user && req.url !== '/login' && !req.url.startsWith('/auth')) {
        res.redirect('/login')
    }

    next()
}
