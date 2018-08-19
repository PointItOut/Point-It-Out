
const tutorialQuestions = [{
  text: 'Touch the red square',
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
