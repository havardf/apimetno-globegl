const http = require('http');
const fs = require('fs');
let html;
let json_d;
let clusteredLocsCSV
let worldPop
fs.readFile('./index.html', function (err, data) {
  if (err) {
    throw err;
  }
  html = data;
});fs.readFile('./datasets/countries_with_req_freq.json', function (err, data) {
  if (err) {
    throw err;
  }
  json_d = data;
});fs.readFile('./datasets/clustered_locations.csv', function (err, data) {
  if (err) {
    throw err;
  }
  clusteredLocsCSV = data;
});fs.readFile('./datasets/world_population.csv', function (err, data) {
  if (err) {
    throw err;
  }
  worldPop = data;
});
http.createServer((req, res) => {
  res.statusCode = 200;if(req.url.indexOf('.json') != -1){
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.write(json_d);
   res.end();
   return;
  }
  if(req.url.indexOf('.csv') != -1){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(clusteredLocsCSV);
    res.end();
    return;
   }res.writeHeader(200, {"Content-Type": "text/html"});
  res.write(html);
  res.end();
}).listen(8080);