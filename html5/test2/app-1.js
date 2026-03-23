const user = require('./user'); // user.js에서 user 가져오기
const hello = require('./hello'); // hello.js에서 hello 가져오기

console.log(user);
// console.log(hello);

hello(user); // 모듈에서 가져온 user 변수와 hello 함수 사용하기
