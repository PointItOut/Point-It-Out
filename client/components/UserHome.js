import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setCurrentCategory } from '../store/categories'
import { getQuestions } from '../store/questions'
import { AddGame, JoinGame, CategoryWrapper, CategoryOverview } from './index'



/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      choosingMode: false,
      choosingCategory: false,
      partnerMode: false
    }
    this.handlePlay = this.handlePlay.bind(this)
    this.handleChooseMode = this.handleChooseMode.bind(this)
    this.handleChooseCategory = this.handleChooseCategory.bind(this)
  }

  handlePlay() {
    this.setState({
      choosingCategory: true,
      active: true
    })
  }

  handleChooseMode(currentMode) {
    if (currentMode === 'partner') {
      this.setState({ partnerMode: true })
    }
    const { loadQuestions } = this.props
    //load questions dispatches a thunk to get the questions and  dispatch an action to put them on state and redirect the user to the play page
    loadQuestions(this.props.chosenCategory, currentMode)
    //can add more functionality here as needed

    // this.props.history.push(`/${currentMode}`)
  }

  handleChooseCategory(category) {
    const { chooseCategory } = this.props
    chooseCategory(category)
    this.setState({
      choosingMode: true
    })
  }

  render() {
    const { username } = this.props
    const { choosingCategory, choosingMode, partnerMode } = this.state

    return (
      <div className="container">
        <h3>Welcome, {username}</h3>
        {!choosingCategory ? (
          <div>
            <button
              type="button"
              onClick={this.handlePlay}
              className="btn btn-info"
            >
              Play
            </button>
            <JoinGame />
          </div>
        ) : null}

        {!choosingMode && choosingCategory ? (
          <CategoryWrapper handleChooseCategory={this.handleChooseCategory} />
        ) : null}

        {choosingMode ? (
          <CategoryOverview chooseMode={this.handleChooseMode} />
        ) : null}

        {partnerMode ? <AddGame /> : null}
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
    username: state.user.userName
  }
}

const mapDispatch = dispatch => {
  return {
    chooseCategory: category => dispatch(setCurrentCategory(category)),
    loadQuestions: (category, currentMode) =>
      dispatch(getQuestions(category, currentMode))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  username: PropTypes.string.isRequired
}
