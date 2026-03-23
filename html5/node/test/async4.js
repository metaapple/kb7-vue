function wait3초() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('완료!'), 3000);
  });
}
async function main() {
  console.log('시작');
  const 결과 = await wait3초();
  console.log(결과);
  console.log('다음 코드'); // 자연스럽게 마지막에 나옴
}
main();
