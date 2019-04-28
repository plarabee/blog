const Post = require('../models/post');
const Comment = require('../models/comment');

const middlewareObject = {};

middlewareObject.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}
  
middlewareObject.checkCommentOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (error, foundComment) => {
      if (error) {
        res.redirect('back');
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
}

middlewareObject.checkAdmin = function(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.redirect('back');
  }
}    

module.exports = middlewareObject;