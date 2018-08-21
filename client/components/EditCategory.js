import React, {Component} from 'react'
import axios from 'axios'
import { PieChart, QuestionInfo } from './index'

class EditCategory extends Component {
  constructor() {
    super()
    this.state = {
      categoryName: '',
      questionList: [],
      questionName: '',
      answer: '',
      choice1: '',
      choice2: '',
      choice3: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAddQuestion = this.handleAddQuestion.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleAddQuestion(evt) {
    evt.preventDefault()
    const {questionName, answer, choice1, choice2, choice3} = this.state
    const postBody = {
      question: {
        text: questionName,
        categoryId: +this.props.match.params.categoryId
      },
      choices: [
        {text: answer, isCorrect: true},
        {text: choice1, isCorrect: false},
        {text: choice2, isCorrect: false},
        {text: choice3, isCorrect: false}
      ]
    }
    const {data} = await axios.post('/api/questions', postBody)
    this.setState(prevState => {
      return {
        questionList: [...prevState.questionList, data],
        questionName: '',
        answer: '',
        choice1: '',
        choice2: '',
        choice3: ''
      }
    })
  }

  async handleDelete(questionId) {
    const categoryId = +this.props.match.params.categoryId
    await axios.delete(`/api/questions/${categoryId}/${questionId}`)
    this.setState(prevState => {
      return {
        questionList: prevState.questionList.filter(
          ques => ques.id !== questionId
        )
      }
    })
  }

  async componentDidMount() {
    const {categoryId} = this.props.match.params
    const {data} = await axios.get(`/api/categories/${categoryId}`)

    this.setState({
      categoryName: data.name,
      questionList: data.questions
    })
  }

  render() {
    // will have a button to return the user to /home?
    const {questionName, answer, choice1, choice2, choice3, questionList, categoryName} = this.state
    const {history} = this.props

    const invalidInfo =
      !questionName || !answer || !choice1 || !choice2 || !choice3

    const totalAnswersCorrect = questionList.reduce((total, question) => {
      return total + question.correctGuesses
    }, 0)

    const totalAnswersIncorrect = questionList.reduce((total, question) => {
      return total + question.incorrectGuesses
    }, 0)

    return (
      <div className="container">
        <div className="row">
          <div className="main-container col-sm-12 col-md-8">
            <h2 className="text-center">{categoryName.toUpperCase()}</h2>

            <PieChart totalCorrect={totalAnswersCorrect} totalIncorrect={totalAnswersIncorrect} />

            <h3>Create a new question</h3>
            <form id="new-question-form" onSubmit={this.handleAddQuestion}>
              <div className="form-group row">
                <div className="col-sm-12">
                  <label htmlFor="questionName">Question text:</label>
                  <input
                    type="text"
                    name="questionName"
                    className="form-control"
                    value={this.state.questionName}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-sm-12">
                  <label htmlFor="answer">Correct Answer:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="answer"
                    value={this.state.answer}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-sm-12">
                  <label htmlFor="choice1">Choice:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="choice1"
                    value={this.state.choice1}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-sm-12">
                  <label htmlFor="choice2">Choice:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="choice2"
                    value={this.state.choice2}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-sm-12">
                  <label htmlFor="choice3">Choice:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="choice3"
                    value={this.state.choice3}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-main"
                disabled={invalidInfo}
              >
                Add Question
              </button>
            </form>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header blue-header">
                <h4>Current Questions</h4>
              </div>
              <div className="card-body">
                {questionList.map(question => (
                  <QuestionInfo
                    key={question.id}
                    question={question}
                    handleDelete={this.handleDelete}
                  />
                ))}
              </div>
            </div>
            <button
              className="btn btn-main"
              onClick={() => history.push('/home')}
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default EditCategory
