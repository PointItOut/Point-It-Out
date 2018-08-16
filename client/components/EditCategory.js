import React, {Component} from 'react'
import {connect} from 'react-redux'
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
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleAddQuestion(evt) {
    evt.preventDefault()

    // submit new question and choices

    // clear state
    this.setState({
      questionName: '',
      answer: '',
      choice1: '',
      choice2: '',
      choice3: ''
    })

    // refetch category & question info from db?
  }

  async componentDidMount() {
    const { categoryId } = this.props.match.params
    const { data } = await axios.get(`/api/categories/${categoryId}`)

    this.setState({
      categoryName: data.name,
      questionList: data.questions
    })
  }

  componentDidUpdate() {
    // re-fetch category with its updated question list?
  }

  render() {
    // will have a button to return the user to /home
    const { questionName, answer, choice1, choice2, choice3 } = this.state

    const invalidInfo = !questionName || !answer || !choice1 || !choice2 || !choice3;
    const { categoryName, questionList } = this.state

    return (
      <div>
        <h2>{categoryName}</h2>
          <h3>Add a new question:</h3>
          <form id="new-question-form">
            <div className="form-group">
              <label>Question text</label>
              <input
                type="text"
                name="questionName"
                value={this.state.questionName}
                onChange={this.handleChange}
              />

              <label>Correct choice</label>
              <input
                type="text"
                name="answer"
                value={this.state.answer}
                onChange={this.handleChange}
              />

              <label>Choice</label>
              <input
                type="text"
                name="choice1"
                value={this.state.choice1}
                onChange={this.handleChange}
              />

              <label>Choice</label>
              <input
                type="text"
                name="choice2"
                value={this.state.choice2}
                onChange={this.handleChange}
              />

              <label>Choice</label>
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
              onSubmit={this.handleAddQuestion}
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
