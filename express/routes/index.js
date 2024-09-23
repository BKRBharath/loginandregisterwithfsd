var express = require('express');
var router = express.Router();
var User = require('../modals/user');
var bcrypt = require('bcryptjs');
var token;
var jwt = require('jsonwebtoken');



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/register', (req,res)=>{
  User.findOne({username:req.body.username})
  .then((user)=>{
    if(user){
      res.send("User already existed")
    }
    else{
      hashedpassword=bcrypt.hashSync(req.body.password,8);
       var user=new User({
        username:req.body.username,
        password:hashedpassword
      });
      user.save()
      .then((user)=>{
        res.send("user registered successfully")
      })
      .catch((err)=>{
        res.send(err)
      })
    }
  })
  .catch((err)=>{
    res.send(err)
  })
})

router.post('/login',(req,res)=>{
  User.findOne({username:req.body.username})
  .then((user)=>{
    if(user){
      if(bcrypt.compareSync(req.body.password,user.password)){
        res.send({
          message:"User Logined Successfully",
          username:user.username
        })
      }
      else{
        res.send("Invalid credentials ")
      }
    }
    else{
      res.send("User not found")
    }
  })
  .catch((err)=>{
    console.log(err)
  })
})




module.exports = router;
