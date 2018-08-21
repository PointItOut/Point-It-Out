
const tutorialQuestions = [{
  text: 'Touch the red square',
  id: 1,
  choices: [{
    id: 1,
    text: 'Purple',
    isCorrect: false,
    questionId: 1
  }, {
    id: 2,
    text: 'Green',
    isCorrect: false,
    questionId: 1
  }, {
    id: 3,
    text: 'Yellow',
    isCorrect: false,
    questionId: 1
  }, {
    id: 4,
    text: 'RED!',
    isCorrect: true,
    questionId: 1
  }]
}, {
  text: 'Touch the purple square',
  id: 2,
  choices: [{
    id: 5,
    text: 'PURPLE!',
    isCorrect: true,
    questionId: 2
  }, {
    id: 6,
    text: 'Green',
    isCorrect: false,
    questionId: 2
  }, {
    id: 7,
    text: 'Yellow',
    isCorrect: false,
    questionId: 2
  }, {
    id: 8,
    text: 'Red',
    isCorrect: false,
    questionId: 2
  }]
}, {
  text: 'Touch the yellow square',
  id: 3,
  choices: [{
    id: 9,
    text: 'Purple',
    isCorrect: false,
    questionId: 3
  }, {
    id: 10,
    text: 'Green',
    isCorrect: false,
    questionId: 3
  }, {
    id: 11,
    text: 'YELLOW!',
    isCorrect: true,
    questionId: 3
  }, {
    id: 12,
    text: 'Red',
    isCorrect: false,
    questionId: 3
  }]
}, {
  text: 'Touch the green square',
  id: 4,
  choices: [{
    id: 13,
    text: 'Purple',
    isCorrect: false,
    questionId: 4
  }, {
    id: 14,
    text: 'GREEN!',
    isCorrect: true,
    questionId: 4
  }, {
    id: 15,
    text: 'Yellow',
    isCorrect: false,
    questionId: 4
  }, {
    id: 16,
    text: 'Red',
    isCorrect: false,
    questionId: 4
  }]
}]

module.exports = tutorialQuestions
