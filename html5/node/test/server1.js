const http = require('http');

let count = 0;

const server = http.createServer((req, res) => {
  count++;

  if (req.url === '/home') {
    res.end('HOME now ' + count);
  } else if (req.url === '/about') {
    res.end('ABOUT now ' + count);
  } else {
    res.end('not found now ' + count);
  }
});

server.listen(3000, () => {
  console.log('http://localhost:3000 서버 실행 중');
});
