var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var blog = require('./Blog.js')

var db = 'mongodb://localhost/blog';
mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
  res.send('hello word')
});

app.get('/blog', function(req, res){
  blog.find({}).exec(function(err, blog){
if (err){
  res.send('err has ocurred')
}else {
  console.log(blog);
  res.json(blog);
}
  });
});

app.post('/blog', function (req, res){
var nblog = new blog();
nblog.title = req.body.title;
nblog.author = req.body.author;
nblog.category = req.body.category;
nblog.save(function(err, blog){
if(err){
  console.log('err has ocurred');
}else{
  console.log(blog);
  res.json(blog);
}
});
});
app.put('/blog/:id', function(req, res){
blog.findOneAndUpdate({
  _id:req.params.id},{$set: {title: req.body.title, author: req.body.author, category: req.body.category}})
  .exec(function(err, blog){
  if(err){
    console.log("has a errod");
  }  else{
    console.log(blog);
    res.json(blog);
  }
  });
});
app.delete('/blog/:id', function(req, res){
  blog.findOneAndRemove({
    _id:req.params.id}, function(err, blog){
      if(err){
        console.log("Has a errod");
      }else{
        console.log(blog);
        res.json(blog);
      }
    });

});


app.listen(1235);
