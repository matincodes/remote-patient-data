module.exports = {
    ensureAuthenticated: function (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Unauthourized, Please login first!');
    res.redirect('/users/login');
  },
  userStay: function(req, res, next) {
    if(req.isAuthenticated()) {
      res.redirect('/dashboard');
    }
    return next();
  }
}