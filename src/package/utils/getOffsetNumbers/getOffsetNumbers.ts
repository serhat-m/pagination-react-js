type OffsetNumbers = {
  pageNumbers: number[]
  firstNumber: number | undefined
  lastNumber: number | undefined
  activeNumber: number
  offset: number
  permanentFirstNumber?: boolean
  permanentLastNumber?: boolean
}

export function getOffsetNumbers({
  pageNumbers,
  firstNumber,
  lastNumber,
  activeNumber,
  offset,
  permanentFirstNumber,
  permanentLastNumber,
}: OffsetNumbers) {
  const pageOffsetNumbers: number[] = []

  if (!firstNumber || !lastNumber) {
    return { pageOffsetNumbers }
  }

  // Example: Offset: 3, Current page: 1
  // With these settings there is no possible offset before page 1 -> [] 1 [2 3 4]. The goal is to always return (offset * 2 + activeNumber) values -> In this case 1 [2 3 4] [6 7 8]
  const additionalOffsetStart = firstNumber + offset * 2 + (permanentFirstNumber ? 1 : 0)
  const additionalOffsetEnd = lastNumber - offset * 2 - (permanentLastNumber ? 1 : 0)

  for (const pageNumber of pageNumbers) {
    if (
      pageNumber === activeNumber ||
      (pageNumber <= activeNumber + offset && pageNumber > activeNumber) ||
      (pageNumber >= activeNumber - offset && pageNumber < activeNumber) ||
      (activeNumber - offset <= firstNumber && pageNumber <= additionalOffsetStart) ||
      (activeNumber + offset >= lastNumber && pageNumber >= additionalOffsetEnd)
    ) {
      pageOffsetNumbers.push(pageNumber)
    }
  }

  return { pageOffsetNumbers }
}
