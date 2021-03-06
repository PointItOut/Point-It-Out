import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setCurrentCategory, setCategory} from '../store/categories'
import {getQuestions} from '../store/questions'
import {
  JoinGame,
  CategoryWrapper,
  CategoryOverview,
  ModeOptions,
  UserTopScores
} from './index'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      choosingMode: false,
      choosingCategory: true
    }

    this.handleChooseCategory = this.handleChooseCategory.bind(this)
    this.resetCategory = this.resetCategory.bind(this)
  }

  handleChooseMode(currentMode) {
    if (currentMode === 'partner') {
      this.setState({partnerMode: true})
    }
    const {loadQuestions} = this.props
    //load questions dispatches a thunk to get the questions and  dispatch an action to put them on state and redirect the user to the play page
    loadQuestions(this.props.chosenCategory, currentMode)
  }

  handleChooseCategory(category) {
    const {chooseCategory} = this.props
    chooseCategory(category)
    this.setState({
      choosingMode: true
    })
  }

  resetCategory() {
    this.props.clearCurrentCategory()
    this.setState({
      choosingCategory: true,
      choosingMode: false
    })
  }

  render() {
    const {categories, user} = this.props
    const {choosingCategory, choosingMode, partnerMode} = this.state
    console.log('user is', user)
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <div className="main-container">
              <h2 className="text-center">START NEW GAME</h2>
              {!choosingMode && choosingCategory ? (
                <CategoryWrapper
                  handleChooseCategory={this.handleChooseCategory}
                />
              ) : null}

              {choosingMode ? (
                <div>
                  <ModeOptions
                    chosenCategory={this.props.chosenCategory}
                    loadQuestions={this.props.loadQuestions}
                    resetCategory={this.resetCategory}
                  />
                </div>
              ) : null}
            </div>
            <CategoryOverview resetCategory={this.resetCategory} />
          </div>
          <div className="col-md-4">
            <JoinGame />
            <UserTopScores />
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    chosenCategory: state.categories.current,
    categories: state.categories,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    chooseCategory: category => dispatch(setCurrentCategory(category)),
    loadQuestions: (category, currentMode) =>
      dispatch(getQuestions(category, currentMode)),
    clearCurrentCategory: () => dispatch(setCategory({}))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {}
