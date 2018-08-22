import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {makeNewCategory} from '../store/categories'

class AddCategory extends Component {
  constructor() {
    super()
    this.state = {
      newCategoryName: '',
      invalidName: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    const {categories} = this.props
    const publicNames = categories.public.map(category => category.name)
    const privateNames = categories.private.map(category => category.name)
    const categoryNames = [...publicNames, privateNames]

    if (categoryNames.indexOf(evt.target.value) === -1) {
      this.setState({
        newCategoryName: evt.target.value,
        invalidName: false
      })
    } else {
      // the name is already in use
      this.setState({
        newCategoryName: evt.target.value,
        invalidName: true
      })
    }
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const {submitNewCategory, user} = this.props
    const {newCategoryName} = this.state
    submitNewCategory({name: newCategoryName}, user.id)
  }

  render() {
    const {handleSubmit, handleChange} = this
    const {newCategoryName, invalidName} = this.state

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <div className="col-sm-12">
              <label htmlFor="newGame">Name for new category</label>
              <input
                type="text"
                className="form-control"
                name="newCategory"
                value={newCategoryName}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="btn btn-primary"
                disabled={invalidName}
              >
                Submit
              </button>
              {invalidName ? (
                <span>This name is in use, please choose a new name</span>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    categories: state.categories,
    user: state.user
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    submitNewCategory: (category, userId) =>
      dispatch(makeNewCategory(category, userId))
  }
}

export default connect(mapState, mapDispatchToProps)(AddCategory)

// PROP TYPES
AddCategory.propTypes = {
  categories: PropTypes.object,
  user: PropTypes.object,
  submitNewCategory: PropTypes.func
}
