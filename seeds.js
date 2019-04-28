var mongoose = require("mongoose");
var Post = require("./models/post");
var Comment   = require("./models/comment");
var User = require('./models/user');
 
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
        let adminUser = new User({username: 'admin', isAdmin: true});
        User.register(adminUser, 'admin', (error, user) => {
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