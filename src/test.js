const asyncFunc = async () => {
  const randomNum = Math.ceil(Math.random() * 100);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (randomNum > 50) {
        return resolve('asdsdsd');
      }
      return reject('000000');
    }, 5000);
  });

  const res = await promise;

  console.log(res);
  console.log('8888');
}

async function test() {
  await asyncFunc();
  console.log('999');
}


export default test;
