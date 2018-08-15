
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'

class CategoryOverview extends Component {
  constructor() {
    super()
    this.state = {
      categoryDisplayed: null
    }
    this.renderModeOptions = this.renderModeOptions.bind(this)
  }

  async componentDidMount() {
    // fetch category information based on the id in the url
    const { categoryId } = this.props.match.params
    const { data } = await axios.get(`/api/categories/${categoryId}`)
    this.setState({
      categoryDisplayed: data
    })
  }

  renderModeOptions() {
    return (
      <div>
        <button>Challenge Yourself!</button>
        <button>Challenge a Friend!</button>
      </div>
    )
  }

  render() {
    const { categoryDisplayed } = this.state
    const { currentCategory } = this.props
    if (categoryDisplayed) {
      return (
        <div>
          {
            currentCategory && (currentCategory.id === categoryDisplayed.id ) ? this.renderModeOptions() : null
          }

          {
            currentCategory && !categoryDisplayed.public && (currentCategory.id !== categoryDisplayed.id) ? <button>Add to my account</button> : null
          }
          <h1>{categoryDisplayed.name}</h1>
          <h3>{categoryDisplayed.questionTotal} questions</h3>
          <div>
            <h4>Leaderboard:</h4>
            {/* still need to get and display leaderboard */}
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapState = state => ({
  currentCategory: state.categories.current
})


export default connect(mapState)(CategoryOverview)
