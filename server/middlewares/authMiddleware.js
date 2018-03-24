const isNotAuthorizedOnAnotherPage = req =>
    !req.user && req.url !== '/login' && !req.url.startsWith('/auth')

export default (req, res, next) => {
    if (isNotAuthorizedOnAnotherPage(req)) {
        res.redirect('/login')
    }

    next()
}
