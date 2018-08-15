import React, {Component} from 'react'
import { connect } from 'react-redux'
import CategoryChoices from './CategoryChoices';
import { setCurrentCategory, retrievePrivateCategories, retrievePublicCategories } from '../store/categories'

class CategoryWrapper extends Component {
  constructor() {
    super()
    this.state = {
      loaded: false
    }
    this.handleChooseCategory = this.handleChooseCategory.bind(this)
  }

  componentDidMount() {
    const { fetchPublicCategories, fetchUserCategories, user } = this.props
    fetchPublicCategories()
    fetchUserCategories(user.id)
    this.setState({
      loaded: true
    })
  }

  handleChooseCategory(category) {
    const { chooseCategory } = this.props
    chooseCategory(category)
    // history.push?
  }

  render() {
    const { categories } = this.props
    if (this.state.loaded) {
      return (
        <div>
          <button>Make your own Category!</button>

          <h2>Public Categories:</h2>
          <CategoryChoices categories={categories.public} chooseCategory={this.handleChooseCategory} />
          <h2>Private Categories:</h2>
          <CategoryChoices categories={categories.private} chooseCategory={this.handleChooseCategory} />
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
  chooseCategory: category => {
    dispatch(setCurrentCategory(category))
  },
  fetchPublicCategories: () => dispatch(retrievePublicCategories()),
  fetchUserCategories: userId => dispatch(retrievePrivateCategories(userId))
})

export default connect(mapState, mapDispatch)(CategoryWrapper)
