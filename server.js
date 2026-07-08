 var http = require('http'), fs = require('fs'), path = require('path'), url = require('url');
 var root = __dirname;
 var mime = {
   '.html': 'text/html;charset=utf-8',
   '.css': 'text/css',
   '.js': 'application/javascript',
   '.png': 'image/png',
   '.jpg': 'image/jpeg',
   '.svg': 'image/svg+xml',
   '.json': 'application/json',
   '.md': 'text/plain;charset=utf-8'
 };
 http.createServer(function (req, res) {
   var filePath = path.join(root, url.parse(req.url).pathname === '/' ? '/index.html' : url.parse(req.url).pathname);
   fs.readFile(filePath, function (err, data) {
     if (err) { res.writeHead(404); res.end('Not Found'); return; }
     res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream' });
     res.end(data);
   });
 }).listen(8080, function () { console.log('http://localhost:8080'); });
