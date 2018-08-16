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

  render() {
    const {categoryDisplayed} = this.state
    const {currentCategory, user} = this.props

    if (categoryDisplayed) {
      return (
        <div>
          {currentCategory &&
          !categoryDisplayed.public &&
          currentCategory.id !== categoryDisplayed.id ? (
            <button type="button" className="btn btn-info">
              Add to my account
            </button>
          ) : null}
          <h1>{categoryDisplayed.name}</h1>
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
