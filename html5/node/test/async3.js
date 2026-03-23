function wait3초() {
  let p = new Promise((resolve) => {
    setTimeout(() => resolve('완료!'), 3000);
  });
  return p;
}

console.log('시작');

wait3초().then((결과) => {
  console.log(결과);
  console.log('다음 코드');
});
