import React, {Component} from 'react'
import axios from 'axios'

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

    const { questionName, answer, choice1, choice2, choice3 } = this.state

    const postBody = {
      question: {
        theQuestion: questionName,
        categoryId: +this.props.match.params.categoryId
      },
      choices: [
        { theChoice: answer, isCorrect: true },
        { theChoice: choice1, isCorrect: false },
        { theChoice: choice2, isCorrect: false },
        { theChoice: choice3, isCorrect: false }
      ]
    }

    const { data } = await axios.post('/api/questions', postBody)

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

  async componentDidMount() {
    const { categoryId } = this.props.match.params
    const { data } = await axios.get(`/api/categories/${categoryId}`)

    this.setState({
      categoryName: data.name,
      questionList: data.questions
    })
  }

  render() {
    // will have a button to return the user to /home?
    const { questionName, answer, choice1, choice2, choice3 } = this.state
    const { history } = this.props

    const invalidInfo = !questionName || !answer || !choice1 || !choice2 || !choice3;
    const { categoryName, questionList } = this.state

    return (
      <div>
        <h2>{categoryName}</h2>
          <button onClick={() => history.push('/home')}>Go home</button>
          <h3>Add a new question:</h3>
          <form id="new-question-form" onSubmit={this.handleAddQuestion}>
            <div className="form-group">
              <label htmlFor="questionName" >Question text</label>
              <input
                type="text"
                name="questionName"
                value={this.state.questionName}
                onChange={this.handleChange}
              />

              <label htmlFor="answer">Correct choice</label>
              <input
                type="text"
                name="answer"
                value={this.state.answer}
                onChange={this.handleChange}
              />

              <label htmlFor="choice1">Choice</label>
              <input
                type="text"
                name="choice1"
                value={this.state.choice1}
                onChange={this.handleChange}
              />

              <label htmlFor="choice2">Choice</label>
              <input
                type="text"
                name="choice2"
                value={this.state.choice2}
                onChange={this.handleChange}
              />

              <label htmlFor="choice3">Choice</label>
              <input
                type="text"
                name="choice3"
                value={this.state.choice3}
                onChange={this.handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-info"
              disabled={invalidInfo}
            >
              Add Question
            </button>
          </form>

        <h4>Current Questions:</h4>
        {
          questionList.map(question => (
            <h6 key={question.id}>{question.theQuestion}</h6>
          ))
        }
      </div>
    )
  }
}

export default EditCategory
