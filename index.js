var http = require("http"), 
    fs=require("fs");

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

var path=req.url.toLowerCase();
    
switch(path){
case '/':
        serveStaticFile(res, '/public/home.html','text/html');
        break;
case '/about':
        serveStaticFile(res, '/public/about.html','text/html');
        break;
default:
        serveStaticFile(res, '/public/404.html','text/html',404);
        break; 

}
    
}).listen(process.env.PORT || 3000);