const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Post = require('./models/post');
const Comment   = require('./models/comment');
const User = require('./models/user');
 
function seedDB(){
   Post.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed post!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
        });
   }); 

    User.remove({}, (error) => {
        if (error) {
          console.log(error);
        }
        let adminUser = new User({username: process.env.ADMIN_USER, isAdmin: true});
        User.register(adminUser, process.env.ADMIN_PASSWORD, (error, user) => {
              if (error) {
                console.log(error);
              } else {
                console.log('Created admin user');
              }
          }
        )
    });
}
 
module.exports = seedDB;