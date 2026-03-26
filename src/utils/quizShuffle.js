/**
 * Fisher-Yates shuffle — returns a new array with elements in random order.
 */
function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Shuffles both question order and option order for a quiz.
 * Returns a new array — the source data is never mutated.
 *
 * Each returned question has its `options` in a random order
 * and `correctIndex` updated to point to the correct answer.
 */
export function shuffleQuiz(questions) {
  return shuffle(questions).map((q) => {
    const correctAnswer = q.options[q.correctIndex]
    const shuffledOptions = shuffle(q.options)
    return {
      ...q,
      options: shuffledOptions,
      correctIndex: shuffledOptions.indexOf(correctAnswer),
    }
  })
}
