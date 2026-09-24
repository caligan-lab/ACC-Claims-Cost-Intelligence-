const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'out');
const mime = { '.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff2':'font/woff2' };
http.createServer((req,res)=>{
  let fp = path.join(ROOT, req.url==='/'?'index.html':req.url);
  if(fs.existsSync(fp)&&fs.statSync(fp).isDirectory()) fp = path.join(fp,'index.html');
  fs.readFile(fp,(e,d)=>{ if(e){res.writeHead(404);res.end('Not found');return;} res.writeHead(200,{'Content-Type':mime[path.extname(fp)]||'application/octet-stream'}); res.end(d); });
}).listen(PORT,()=>console.log(`Dashboard: http://localhost:${PORT}`));
