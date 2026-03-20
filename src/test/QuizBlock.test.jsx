import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import QuizBlock from '../components/interactive/QuizBlock'

// framer-motion can cause issues in jsdom — provide a minimal stub
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }) => <>{children}</>
}))

const sampleQuestions = [
  {
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
    correctIndex: 0,
    explanation: 'HTML stands for Hyper Text Markup Language.'
  },
  {
    question: 'Which CSS property controls text color?',
    options: ['font-color', 'text-color', 'color', 'foreground'],
    correctIndex: 2,
    explanation: 'The "color" property sets the text color.'
  }
]

// ─── rendering ────────────────────────────────────────────────────────────────

describe('QuizBlock rendering', () => {
  it('renders nothing when questions array is empty', () => {
    const { container } = render(<QuizBlock questions={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders nothing when questions prop is not provided', () => {
    const { container } = render(<QuizBlock />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the first question text', () => {
    render(<QuizBlock questions={sampleQuestions} />)
    expect(screen.getByText('What does HTML stand for?')).toBeInTheDocument()
  })

  it('renders all answer options for the first question', () => {
    render(<QuizBlock questions={sampleQuestions} />)
    expect(screen.getByText('Hyper Text Markup Language')).toBeInTheDocument()
    expect(screen.getByText('High Tech Modern Language')).toBeInTheDocument()
    expect(screen.getByText('Hyper Transfer Markup Language')).toBeInTheDocument()
    expect(screen.getByText('Home Tool Markup Language')).toBeInTheDocument()
  })

  it('renders "Knowledge Check" header', () => {
    render(<QuizBlock questions={sampleQuestions} />)
    expect(screen.getByText('Knowledge Check')).toBeInTheDocument()
  })

  it('shows question counter "Question 1 of 2"', () => {
    render(<QuizBlock questions={sampleQuestions} />)
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()
  })
})

// ─── answer selection ─────────────────────────────────────────────────────────

describe('QuizBlock answer selection', () => {
  it('Submit button ("Check Answer") is disabled before selecting an answer', () => {
    render(<QuizBlock questions={sampleQuestions} />)
    const submitBtn = screen.getByRole('button', { name: /check answer/i })
    expect(submitBtn).toBeDisabled()
  })

  it('clicking an answer enables the Submit button', () => {
    render(<QuizBlock questions={sampleQuestions} />)
    fireEvent.click(screen.getByText('Hyper Text Markup Language'))
    const submitBtn = screen.getByRole('button', { name: /check answer/i })
    expect(submitBtn).not.toBeDisabled()
  })

  it('clicking an answer selects it (option button is present and clickable)', () => {
    render(<QuizBlock questions={sampleQuestions} />)
    const option = screen.getByText('High Tech Modern Language')
    expect(() => fireEvent.click(option)).not.toThrow()
  })
})

// ─── submitting an answer ─────────────────────────────────────────────────────

describe('QuizBlock submit', () => {
  it('shows explanation after submitting an answer', () => {
    render(<QuizBlock questions={sampleQuestions} />)
    fireEvent.click(screen.getByText('Hyper Text Markup Language'))
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }))
    expect(screen.getByText(/HTML stands for Hyper Text Markup Language/i)).toBeInTheDocument()
  })

  it('shows "Next Question" button after submitting', () => {
    render(<QuizBlock questions={sampleQuestions} />)
    fireEvent.click(screen.getByText('Hyper Text Markup Language'))
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }))
    expect(screen.getByRole('button', { name: /next question/i })).toBeInTheDocument()
  })

  it('answer buttons are disabled after submitting', () => {
    render(<QuizBlock questions={sampleQuestions} />)
    fireEvent.click(screen.getByText('High Tech Modern Language'))
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }))
    // All option buttons should be disabled
    const optionBtns = screen.getAllByRole('button').filter(btn =>
      sampleQuestions[0].options.some(opt => btn.textContent?.includes(opt))
    )
    optionBtns.forEach(btn => expect(btn).toBeDisabled())
  })
})

// ─── multi-question navigation ────────────────────────────────────────────────

describe('QuizBlock multi-question flow', () => {
  it('advances to the second question after clicking Next', () => {
    render(<QuizBlock questions={sampleQuestions} />)

    // Answer Q1
    fireEvent.click(screen.getByText('Hyper Text Markup Language'))
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }))
    fireEvent.click(screen.getByRole('button', { name: /next question/i }))

    // Should now see Q2
    expect(screen.getByText('Which CSS property controls text color?')).toBeInTheDocument()
  })

  it('shows "See Results" button on the last question', () => {
    render(<QuizBlock questions={sampleQuestions} />)

    // Answer Q1 and advance
    fireEvent.click(screen.getByText('Hyper Text Markup Language'))
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }))
    fireEvent.click(screen.getByRole('button', { name: /next question/i }))

    // Submit Q2 answer
    fireEvent.click(screen.getByText('color'))
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }))

    expect(screen.getByRole('button', { name: /see results/i })).toBeInTheDocument()
  })
})

// ─── results / score ─────────────────────────────────────────────────────────

describe('QuizBlock results', () => {
  function completeQuiz(getCorrect = [true, true]) {
    render(<QuizBlock questions={sampleQuestions} onComplete={vi.fn()} />)

    // Q1
    const q1Answer = getCorrect[0] ? 'Hyper Text Markup Language' : 'High Tech Modern Language'
    fireEvent.click(screen.getByText(q1Answer))
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }))
    fireEvent.click(screen.getByRole('button', { name: /next question/i }))

    // Q2
    const q2Answer = getCorrect[1] ? 'color' : 'font-color'
    fireEvent.click(screen.getByText(q2Answer))
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }))
    fireEvent.click(screen.getByRole('button', { name: /see results/i }))
  }

  it('shows "Quiz Complete!" on the results screen', () => {
    completeQuiz([true, true])
    expect(screen.getByText('Quiz Complete!')).toBeInTheDocument()
  })

  it('shows correct score 2/2 when both answers are correct', () => {
    completeQuiz([true, true])
    expect(screen.getByText('2/2')).toBeInTheDocument()
  })

  it('shows 100% when all answers are correct', () => {
    completeQuiz([true, true])
    expect(screen.getByText('100% correct')).toBeInTheDocument()
  })

  it('calls onComplete callback with a score', () => {
    const onComplete = vi.fn()
    render(<QuizBlock questions={sampleQuestions} onComplete={onComplete} />)

    // Q1 correct
    fireEvent.click(screen.getByText('Hyper Text Markup Language'))
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }))
    fireEvent.click(screen.getByRole('button', { name: /next question/i }))

    // Q2 correct
    fireEvent.click(screen.getByText('color'))
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }))
    fireEvent.click(screen.getByRole('button', { name: /see results/i }))

    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(typeof onComplete.mock.calls[0][0]).toBe('number')
  })

  it('shows Try Again button on results screen', () => {
    completeQuiz([true, true])
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })

  it('resets the quiz when Try Again is clicked', () => {
    completeQuiz([true, true])
    fireEvent.click(screen.getByRole('button', { name: /try again/i }))
    expect(screen.getByText('What does HTML stand for?')).toBeInTheDocument()
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()
  })
})
