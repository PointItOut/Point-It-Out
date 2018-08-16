import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setCurrentCategory} from '../store/categories'
import {getQuestions} from '../store/questions'
import {JoinGame, CategoryWrapper, CategoryOverview, ModeOptions} from './index'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      choosingMode: false,
      choosingCategory: false
    }
    this.handlePlay = this.handlePlay.bind(this)
    this.handleChooseCategory = this.handleChooseCategory.bind(this)
  }

  handlePlay() {
    this.setState({
      choosingCategory: true
    })
  }

  handleChooseCategory(category) {
    const {chooseCategory} = this.props
    chooseCategory(category)
    this.setState({
      choosingMode: true
    })
  }

  render() {
    const {username} = this.props
    const {choosingCategory, choosingMode} = this.state

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
          <div>
            <ModeOptions
              chosenCategory={this.props.chosenCategory}
              loadQuestions={this.props.loadQuestions}
            />
            <CategoryOverview />
          </div>
        ) : null}
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
