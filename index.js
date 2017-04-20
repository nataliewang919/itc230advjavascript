'use strict'
var http = require("http"), 
    fs=require("fs"),
    qs=require("querystring");
let movies=require("./lib/movies");


function serveStaticFile(res,path, contentType, responseCode){
    if(!responseCode)responseCode=200;
    fs.readFile(__dirname+path, function(err,data){
            if(err){
              res.writeHead(500, {'content-Type':'text/plain'});
              res.send('500-internal error');
}else{
              res.writeHead(responseCode,
                 {'Content-Type':contentType});
              res.end(data);
}
    });
}

http.createServer(function(req,res) {

let url=req.url.split("?")
let params=qs.parse(url[1]);
let path=url[0].toLowerCase();
    
switch(path){
case '/':
        serveStaticFile(res, '/public/home.html','text/html');
        break;
        
case '/about':
        serveStaticFile(res, '/public/about.html','text/html');
        break;

case '/get':
        let movie = movies.get(params.title)        
        res.writeHead(200,{'Content-Type':'text/plain '})        
        let results = (movie) ? JSON.stringify(movie) : "Not found";
        res.end('You are searching for '+params.title+"\n"+'The detail information is '+results);
        break;
        
case '/delete':
        let deletemovie=movies.delete(params.title)
        res.writeHead(200,{'Content-Type':'text/plain '})
        res.end('You are deleting for '+params.title+"\n"+JSON.stringify(deletemovie));
        break;

default:
        serveStaticFile(res, '/public/404.html','text/html',404);
        break; 
}
    
}).listen(process.env.PORT || 3000);