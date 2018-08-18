import React, {Component} from 'react'
import {connect} from 'react-redux'
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
          <button
            type="button"
            className="btn btn-main"
            onClick={this.handleMakeCategory}
          >
            Make your own Category!
          </button>

          {makeNewCategory ? <AddCategory /> : null}

          <h2>Public Categories:</h2>
          <CategoryChoices
            categories={categories.public}
            chooseCategory={handleChooseCategory}
          />
          <h2>Private Categories:</h2>
          <CategoryChoices
            categories={categories.private}
            chooseCategory={handleChooseCategory}
          />
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
