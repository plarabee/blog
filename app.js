// Dependencies
const express = require('express'),
      bodyParser = require('body-parser'),
      dotenv = require('dotenv');
      LocalStrategy = require('passport-local'),
      methodOverride = require('method-override'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      seedDB = require('./seeds');
// Models
const Comment = require('./models/comment'), 
      Post = require('./models/post'),
      User = require('./models/user');
// Routes
const commentRoutes = require('./routes/comments');
      indexRoutes = require('./routes/index'),
      postRoutes = require('./routes/posts');

// App Configuration
dotenv.config();
mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
seedDB();

// Passport Configuration
app.use(require('express-session')({
  secret: process.env.PASSPORT_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Make user data available to all templates
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });

// Route Configuration
app.use('/', indexRoutes);
app.use('/posts/:id/comments', commentRoutes);
app.use('/posts', postRoutes);

// Server Configuration
app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
  console.log('Blog has started and is listening on ' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT);
});