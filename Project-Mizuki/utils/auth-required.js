// utils/auth-required.js
module.exports = function(req, res, next) {
	if (req.session.user && req.session.user.active) return next();
	return res.redirect('/?next=' + req.originalUrl);
};