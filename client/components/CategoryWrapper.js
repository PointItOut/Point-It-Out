import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {AddCategory, CategoryChoices} from './index'
import {
  setCurrentCategory,
  retrievePrivateCategories,
  retrievePublicCategories
} from '../store/categories'

class CategoryWrapper extends Component {
  constructor() {
    super()
    this.state = {
      loaded: false,
      makeNewCategory: false
    }
    this.handleMakeCategory = this.handleMakeCategory.bind(this)
  }

  handleMakeCategory() {
    this.setState({
      makeNewCategory: true
    })
  }

  componentDidMount() {
    const {fetchPublicCategories, fetchUserCategories, user} = this.props
    fetchPublicCategories()
    fetchUserCategories(user.id)
    this.setState({
      loaded: true
    })
  }

  render() {
    const {categories, handleChooseCategory} = this.props
    const {loaded, makeNewCategory} = this.state
    if (loaded) {
      return (
        <div>
          <h4 className="text-center">Step 1: Choose a Category</h4>
          <p>Public categories</p>
          <CategoryChoices
            categories={categories.public}
            chooseCategory={handleChooseCategory}
          />
          <p>Your custom categories</p>
          <CategoryChoices
            categories={categories.private}
            chooseCategory={handleChooseCategory}
          />
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={this.handleMakeCategory}
          >
            Add a category
          </button>
          {makeNewCategory ? <AddCategory /> : null}
        </div>
      )
    } else {
      return <div />
    }
  }
}

const mapState = state => ({
  categories: state.categories,
  user: state.user
})

//currently, the category gets set but it doesn't update the UserHome state...
const mapDispatch = dispatch => ({
  fetchPublicCategories: () => dispatch(retrievePublicCategories()),
  fetchUserCategories: userId => dispatch(retrievePrivateCategories(userId))
})

export default connect(mapState, mapDispatch)(CategoryWrapper)

// PROP TYPES
CategoryWrapper.propTypes = {
  categories: PropTypes.object,
  user: PropTypes.object,
  fetchPublicCategories: PropTypes.func,
  fetchUserCategories: PropTypes.func,
  handleChooseCategory: PropTypes.func
}
