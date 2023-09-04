function generateNumArr(loopStart: number, loopMax: number) {
  const numArr = []

  for (let i = loopStart; i <= loopMax; i++) {
    numArr.push(i)
  }

  return numArr
}

export default generateNumArr
