import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'

class CategoryOverview extends Component {
  constructor() {
    super()
    this.state = {
      categoryDisplayed: null
    }
    this.renderModeOptions = this.renderModeOptions.bind(this)
    this.handleAddToAccount = this.handleAddToAccount.bind(this)
  }

  async componentDidMount() {
    // if we are navigating from the userhome, there is no match.params so we use the 'currentcategory'
    // if there is match.params, we know we navigated there ourselves by typing it into the url bar, so we use the id in the url
    const {match, currentCategory} = this.props
    const categoryId = match ? match.params.categoryId : currentCategory.id

    if (categoryId) {
      const {data} = await axios.get(`/api/categories/${categoryId}`)
      this.setState({
        categoryDisplayed: data
      })
    }
  }

  async componentDidUpdate(prevProps) {
    // sometimes we try to componentDidMount before we have the new currentcategory
    const {match, currentCategory} = this.props
    if (prevProps.currentCategory !== currentCategory) {
      const {data} = await axios.get(`/api/categories/${currentCategory.id}`)
      this.setState({
        categoryDisplayed: data
      })
    }
  }

  async handleAddToAccount(){
    const { history, user } = this.props
    const { categoryDisplayed } = this.state
    // update user categories subscription by creating a UserCategory instance
    const { data } = await axios.put(`/api/users/${user.id}/categories`, { categoryId: categoryDisplayed.id })
    history.push('/home')
  }

  renderModeOptions() {
    const {chooseMode} = this.props
    return (
      <div>
        <button
          type="button"
          className="btn btn-info"
          onClick={() => chooseMode('solo')}
        >
          Challenge Yourself!
        </button>
        <button
          type="button"
          className="btn btn-info"
          onClick={() => chooseMode('partner')}
        >
          Challenge a Friend!
        </button>
      </div>
    )
  }

  render() {
    const {categoryDisplayed} = this.state
    const {currentCategory, user, match} = this.props

    if (categoryDisplayed) {
      return (
        <div>
          { !categoryDisplayed.public && match ? (<button type="button" className="btn btn-info" onClick={this.handleAddToAccount}>
              Add to my account
            </button>) : null }

          <h1>{categoryDisplayed.name}</h1>

          { // if you are looking at a category you made, you can delete the category from the database
            !categoryDisplayed.public && categoryDisplayed.authorId === user.id ? <button>Delete Category</button> : null
          }

          { // if you are looking at a private category you are subscribed to (i.e. no match.params) and it is NOT a category you made, you can unsubscribe from the category
            !categoryDisplayed.public && !match && (categoryDisplayed.authorId !== user.id) ? <button>Unsubscribe from Category</button> : null
          }

          {user.id === categoryDisplayed.authorId ? (
            <Link to={`/categories/${categoryDisplayed.id}/edit`}>Edit</Link>
          ) : null}

          <h3>{categoryDisplayed.questionTotal} questions</h3>
          <div>
            <h4>Leaderboard:</h4>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {categoryDisplayed.topScores.map(scoreInfo => (
                  <tr key={scoreInfo.userId}>
                    <th>{scoreInfo.userName}</th>
                    <th>{scoreInfo.userHighScore}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapState = state => ({
  currentCategory: state.categories.current,
  user: state.user
})

export default connect(mapState)(CategoryOverview)
