function isNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'You are already logged in.');
        res.redirect('/events');
    }
}

module.exports = isNotAuthenticated