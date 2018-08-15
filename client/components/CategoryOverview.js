import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
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
    const {currentCategory} = this.props

    if (categoryDisplayed) {
      return (
        <div>
          {currentCategory && currentCategory.id === categoryDisplayed.id
            ? this.renderModeOptions()
            : null}

          {currentCategory &&
          !categoryDisplayed.public &&
          currentCategory.id !== categoryDisplayed.id ? (
            <button>Add to my account</button>
          ) : null}
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
