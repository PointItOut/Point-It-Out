
const tutorialQuestions = [{
  theQuestion: 'Touch the red square',
  choices: [{
    theChoice: 'Purple',
    isCorrect: false
  }, {
    theChoice: 'Green',
    isCorrect: false
  }, {
    theChoice: 'Yellow',
    isCorrect: false
  }, {
    theChoice: 'RED!',
    isCorrect: true
  }]
}, {
  theQuestion: 'Touch the purple square',
  choices: [{
    theChoice: 'PURPLE!',
    isCorrect: true
  }, {
    theChoice: 'Green',
    isCorrect: false
  }, {
    theChoice: 'Yellow',
    isCorrect: false
  }, {
    theChoice: 'Red',
    isCorrect: false
  }]
}, {
  theQuestion: 'Touch the yellow square',
  choices: [{
    theChoice: 'Purple',
    isCorrect: false
  }, {
    theChoice: 'Green',
    isCorrect: false
  }, {
    theChoice: 'YELLOW!',
    isCorrect: true
  }, {
    theChoice: 'Red',
    isCorrect: false
  }]
}, {
  theQuestion: 'Touch the green square',
  choices: [{
    theChoice: 'Purple',
    isCorrect: false
  }, {
    theChoice: 'GREEN!',
    isCorrect: true
  }, {
    theChoice: 'Yellow',
    isCorrect: false
  }, {
    theChoice: 'Red',
    isCorrect: false
  }]
}]

module.exports = tutorialQuestions
