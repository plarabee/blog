const express = require('express');
const router = express.Router({mergeParams: true});
const Comment = require('../models/comment');
const middleware = require('../middleware');
const Post = require('../models/post');

// Comments - New
router.get('/new', middleware.isLoggedIn, (req ,res) => {
  Post.findById(req.params.id, (error, post) => {
    if (error) {
      console.log(error);
    } else {
      res.render('comments/new', {post: post});
    }
  });
});

// Comments - Create
router.post('/', middleware.isLoggedIn, (req, res) => {
  Post.findById(req.params.id).populate('comments').exec((error, post) => {
    if (error) {
      console.log(error);
      res.redirect('/posts/' + post._id);
    } else {
      Comment.create(req.body.comment, (error, comment) => {
        if (error) {
          console.log(error);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          post.comments.push(comment);
          post.save();
          res.redirect('/posts/' + post._id);
        }});
    }
  });
});

// Comments - Edit
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (error, foundComment) => {
    if (error) {
      res.redirect('back');
    } else {
      res.render('comments/edit', {post_id: req.params.id, comment: foundComment});
    }
  });
});

// Comments - Update
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (error, updatedComment) => {
    if (error) {
      res.redirect('back');
    } else {
      res.redirect('/posts/' + req.params.id);
    }
  });
});

// Comments - Delete
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (error) => {
    if (error) {
      res.redirect('back');
    } else {
      res.redirect('/posts/' + req.params.id);
    }
  });
});

module.exports = router;