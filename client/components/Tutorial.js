import React, {Component} from 'react'

const tutorialQuestions = [{
  theQuestion: 'Touch the red square',
  choices: [{
    theChoice: 'Not me',
    isCorrect: false
  }, {
    theChoice: 'Not me',
    isCorrect: false
  }, {
    theChoice: 'Not me',
    isCorrect: false
  }, {
    theChoice: 'Touch me!',
    isCorrect: true
  }]
}, {
  theQuestion: 'Touch the purple square',
  choices: [{
    theChoice: 'Touch me!',
    isCorrect: true
  }, {
    theChoice: 'Not me',
    isCorrect: false
  }, {
    theChoice: 'Not me',
    isCorrect: false
  }, {
    theChoice: 'Not me',
    isCorrect: false
  }]
}, {
  theQuestion: 'Touch the yellow square',
  choices: [{
    theChoice: 'Not me',
    isCorrect: false
  }, {
    theChoice: 'Not me',
    isCorrect: false
  }, {
    theChoice: 'Touch me!',
    isCorrect: true
  }, {
    theChoice: 'Not me',
    isCorrect: false
  }]
}, {
  theQuestion: 'Touch the green square',
  choices: [{
    theChoice: 'Not me',
    isCorrect: false
  }, {
    theChoice: 'Touch me!',
    isCorrect: true
  }, {
    theChoice: 'Not me',
    isCorrect: false
  }, {
    theChoice: 'Not me',
    isCorrect: false
  }]
}]


// tutorial component must use webcam and canvas...
// how to use diffy though?

class Tutorial extends Component {
  constructor() {
    super()
    this.state = {
      currentQuestion: 0
    }
  }
  render() {
    return <div>This is the tutorial component</div>
  }
}

export default Tutorial
