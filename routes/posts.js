const express = require('express'),
      middleware = require('../middleware'),
      Post = require('../models/post');

const router = express.Router();

// Posts - Index
router.get('/', (req, res) => {
    Post.find({}, (error, allPosts) => {
      if (error) {
        console.log(error);
      } else {
        res.render('posts/index', {posts: allPosts});
      }
    });
});

// Posts - Create
router.post('/', (req, res) => {
  Post.create(req.body.post, (error, newlyCreatedPost) => {
    if (error) {
      console.log(error);
      res.redirect('/posts');
    } else {
      res.redirect('/posts');
    }
  });
});

// Posts - New
router.get('/new', (req, res) => {
  res.render('posts/new');
});

// Posts - Show
router.get('/:id', (req, res) => {
  Post.findById(req.params.id).populate('comments').exec((error, foundPost) => {
    if (error) {
      console.log(error);
    } else {
      res.render('posts/show', {post: foundPost});
    }
  });
});

// Posts - Edit
router.get('/:id/edit', (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    if (error) {
        console.log(error);
        res.redirect('/posts');
    } else {
        res.render('posts/edit', {post: foundPost});
    }
  });
});

// Posts - Update
router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body.post, (error, updatedPost) => {
    if (error) {
        console.log(error);
        res.redirect('/posts');
    } else {
        res.redirect('/posts/' + req.params.id);
    }
  });
});

// Posts - Destroy
router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, (error, removedPost) => {
      if (error) {
        console.log(error);
        res.redirect('/posts');
      } else {
        res.redirect('/posts');
      }
  });
});

module.exports = router;