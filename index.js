'use strict'

//let movies=require("./lib/movies");
var Movies = require("./models/moviedata");
const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout:'main'}));
app.set("view engine", ".html");

app.get('/', function(req,res){
     Movies.find({},function(err, movies){              
    if (err) return next(err);   
    //if (!movies) return next();
    //console.log(movies.length);
    res.type('text/html');    
    res.render('home',{movie:movies});       
    });    
});

app.post('/get', function(req,res){
     Movies.findOne({title: req.body.title},function(err, movies){     
   if (err) return next(err);   
   //if (!movies) return next();              
    res.type('text/html');  
    res.render('details', {title: req.body.title, result:movies,pageheader: 'You are searching '+req.body.title});    
    });      
});

app.get('/about', function(req,res){
    res.type('text/html');
    res.render('about');
});

app.get('/delete', function(req,res){    
    Movies.findOneAndRemove({title: req.query.title},function(err, movies){             
    if (err) return next(err);                                  
    Movies.count({},function(err,count){
    //console.log(count);
    res.type('text/html'); 
    res.render('delete', {title: req.query.title, result: count});  
        })  
            });                             
    });

app.get('/get', function(req,res){
    Movies.findOne({title: req.query.title},function(err, movies){     
    if (err) return next(err);                                  
    //if(!movies) return next(); 
    res.type('text/html');  
    res.render('details', {title: req.query.title, result:movies,pageheader: 'You are searching '+req.query.title});    
    });      
});

app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});
        
app.listen(app.get('port'), function() {
    console.log('Express started');    
});
/*
app.get('/', function(req,res){
    let show=movies.getAll();
    res.type('text/html');    
    res.render('home',{movie:show});     
});

app.get('/get', function(req,res){
    let header = 'Searching for the movie: ' + req.query.title;
    let found = movies.get(req.query.title);
    res.type('text/html');  
    res.render('details', {title: req.query.title, result: found, pageheader: header});
});
        
app.get('/about', function(req,res){
    res.type('text/html');
    res.render('about');
});

app.get('/delete', function(req,res){    
    let result= movies.delete(req.query.title); 
    console.log(result.totalremain);
    res.render('delete', {title: req.query.title, result: result});   
});

app.post('/get', function(req,res){
    let header = 'Searching for the movie: ' + req.body.title;
    let found = movies.get(req.body.title);
    res.render('details', {title: req.body.title, result: found, pageheader: header});
});

app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});
*/