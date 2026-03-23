function wait3초(콜백) {
  setTimeout(() => {
    콜백('완료!');
  }, 3000);
}
console.log('시작');

wait3초((결과) => {
  console.log(결과);
  console.log('다음 코드');
});
