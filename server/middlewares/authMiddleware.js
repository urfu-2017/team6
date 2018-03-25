const isNotAuthorizedOnAnotherPage = req =>
    !req.user && req.url !== '/login' && !req.url.startsWith('/auth')

export default (req, res, next) => {
    if (isNotAuthorizedOnAnotherPage(req)) {
        return res.redirect('/login')
    }

    return next()
}
