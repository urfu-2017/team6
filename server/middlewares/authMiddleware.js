const isNotAuthorizedOnAnotherPage = req =>
    !req.user && req.url !== '/login' &&
    !req.url.startsWith('/auth') &&
    !req.url.startsWith('/_next') &&
    !req.url.startsWith('/static')

export default (req, res, next) => {
    if (isNotAuthorizedOnAnotherPage(req)) {
        return res.redirect('/login')
    }

    return next()
}
