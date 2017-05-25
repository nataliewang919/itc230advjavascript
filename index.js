'use strict'

//let movies=require("./lib/movies");
var http=require('http');
var Movies = require("./models/moviedata");
const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

app.use('/api', require('cors')());

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout:'main'}));
app.set("view engine", ".html");

//api routes
app.get('/api/v1/movies', (req,res,next)=>{
    Movies.find({},(err, movies)=>{              
    
    if(err||!movies)
    {
      return next(err);
    }
    else
    {
        res.json(movies);
    }  
        
    });    
});

app.post('/api/v1/movie/:title', (req,res,next)=>{
Movies.findOne({title: req.params.title},(err, movies)=>{     
   if(err||!movies)
   {
        return next(err);
    }
    
    else
    {
        res.json(movies);
    }   
    
    });      
});


app.get('/api/v1/delete/:title', (req,res, next)=>{    
    Movies.remove({title: req.params.title},(err, result)=>{  
        
        if(err)
    {
       return next (err);
    } 
        
    else
    {
        //console.log(result)
        res.json({deleted: result.result.n});   
    }                                                                     
            });                             
    });

app.get('/api/v1/movie/:title', (req,res,next)=>{
   Movies.findOne({title: req.params.title},(err, movies)=>{     
   if(err||!movies)
   {
        return next(err);
    }
    
    else
    {
        res.json(movies);
    }   
    
    });      
});

app.get('/api/v1/add/:title/:director?/:reldate?', (req,res,next)=>{
//console.log(req.params);

let title=req.params.title;
Movies.update({title: title}, {title:title, director: req.params.director, reldate: req.params.reldate }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});

//end api routes        


app.get('/', (req,res)=>{
     Movies.find({},(err, movies)=>{              
    if (err) return next(err);   
    //if (!movies) return next();
    //console.log(movies.length);
    res.type('text/html');    
    res.render('home',{movie:movies});       
    });    
});

app.post('/get', (req,res)=>{
     Movies.findOne({title: req.body.title},(err, movies)=>{     
   if (err) return next(err);   
   //if (!movies) return next();              
    res.type('text/html');  
    res.render('details', {title: req.body.title, result:movies,pageheader: 'You are searching '+req.body.title});    
    });      
});

app.get('/about', (req,res)=>{
    res.type('text/html');
    res.render('about');
});



app.get('/delete', (req,res)=>{    
    Movies.findOneAndRemove({title: req.query.title},(err, movies)=>{             
    if (err) return next(err);                                  
    Movies.count({},(err,count)=>{
    //console.log(count);
    if(err) return next(err);
    if(count==0){
    res.type('text/html'); 
    res.render('delete', {title: req.query.title, result: 'zero'});   
    }else{
    res.type('text/html'); 
    res.render('delete', {title: req.query.title, result: count});
    }
        })  
            });                             
    });

app.get('/get', (req,res)=>{
    Movies.findOne({title: req.query.title},(err, movies)=>{     
    if (err) return next(err);                                  
    //if(!movies) return next(); 
    res.type('text/html');  
    res.render('details', {title: req.query.title, result:movies,pageheader: 'You are searching '+req.query.title});    
    });      
});

app.use((req,res)=>{
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