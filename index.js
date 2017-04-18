var http = require("http"), 
    fs=require("fs"),
    qs=require("querystring"),
    movies=require("./lib/movies");

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

var url=req.url.split("?")
var params=qs.parse(url[1]);
var path=url[0].toLowerCase();
    
switch(path){
case '/':
        serveStaticFile(res, '/public/home.html','text/html');
        break;
        
case '/about':
        serveStaticFile(res, '/public/about.html','text/html');
        break;

case '/get':
        var movie = movies.get(params.title)        
        res.writeHead(200,{'Content-Type':'text/plain '})
        if(movie==undefined){
            res.end('error:no record has been found')
        }
        else{
        res.end('You are searching for '+params.title+"\n"+'The detail information is '+JSON.stringify(movie))};
        break;
        
case '/delete':
        var movie=movies.delete(params.title)
        res.writeHead(200,{'Content-Type':'text/plain '})
        res.end('You are deleting for '+params.title+"\n"+JSON.stringify(movie));
        break;

default:
        serveStaticFile(res, '/public/404.html','text/html',404);
        break; 
}
    
}).listen(process.env.PORT || 3000);