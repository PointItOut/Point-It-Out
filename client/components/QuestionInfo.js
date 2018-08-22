import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

const QuestionInfo = ({question, handleDelete}) => {
  const totalGuesses = question.correctGuesses + question.incorrectGuesses
  const percentCorrect = Math.round(
    question.correctGuesses / totalGuesses * 100
  )
  const percentIncorrect = Math.round(
    question.incorrectGuesses / totalGuesses * 100
  )
  return (
    <div key={question.id}>
      <span>
        <FontAwesomeIcon
          className="blueIconLink"
          icon={faTrash}
          onClick={() => handleDelete(question.id)}
        />
        &nbsp;
        {question.text}
      </span>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${percentCorrect}%`,
            backgroundImage: 'none',
            backgroundColor: '#FFBB28'
          }}
        >
          {question.correctGuesses}
        </div>
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${percentIncorrect}%`,
            backgroundImage: 'none',
            backgroundColor: '#FF8042'
          }}
        >
          {question.incorrectGuesses}
        </div>
      </div>
      <br />
    </div>
  )
}

export default QuestionInfo
