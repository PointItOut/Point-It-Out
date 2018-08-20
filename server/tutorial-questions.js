
const tutorialQuestions = [{
  text: 'Touch the red square',
  id: 1,
  choices: [{
    text: 'Purple',
    isCorrect: false
  }, {
    text: 'Green',
    isCorrect: false
  }, {
    text: 'Yellow',
    isCorrect: false
  }, {
    text: 'RED!',
    isCorrect: true
  }]
}, {
  text: 'Touch the purple square',
  id: 2,
  choices: [{
    text: 'PURPLE!',
    isCorrect: true
  }, {
    text: 'Green',
    isCorrect: false
  }, {
    text: 'Yellow',
    isCorrect: false
  }, {
    text: 'Red',
    isCorrect: false
  }]
}, {
  text: 'Touch the yellow square',
  id: 3,
  choices: [{
    text: 'Purple',
    isCorrect: false
  }, {
    text: 'Green',
    isCorrect: false
  }, {
    text: 'YELLOW!',
    isCorrect: true
  }, {
    text: 'Red',
    isCorrect: false
  }]
}, {
  text: 'Touch the green square',
  id: 4,
  choices: [{
    text: 'Purple',
    isCorrect: false
  }, {
    text: 'GREEN!',
    isCorrect: true
  }, {
    text: 'Yellow',
    isCorrect: false
  }, {
    text: 'Red',
    isCorrect: false
  }]
}]

module.exports = tutorialQuestions
