fs = require('fs');
const data = fs.readFileSync('./example.txt', 'utf-8'); // 인코딩 지정
console.log(data);

let data2 = '';
fs.readFile('./example.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  }
  data2 = data;
});

console.log(data2);
