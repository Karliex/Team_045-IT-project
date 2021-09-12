module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/login');
  }},
  
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();            // continues to other handlers for this route
    }
    res.redirect('/search'); // redirects to serach page if logged in     
  }
};
  