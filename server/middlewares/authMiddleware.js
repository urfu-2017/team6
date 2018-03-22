const isNotAuthorizedOnAnotherPage = req => {
    return !req.user && req.url !== '/login' && !req.url.startsWith('/auth')
}

export default (req, res, next) => {
    if (isNotAuthorizedOnAnotherPage(req)) {
        res.redirect('/login')
    }

    next()
}
