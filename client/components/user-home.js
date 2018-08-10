import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setCategory } from '../store/category'

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
    this.renderCategoryChoices = this.renderCategoryChoices.bind(this)
    this.handleChooseCategory = this.handleChooseCategory.bind(this)
  }

  handlePlay() {
    this.setState({
      choosingCategory: true
    })
  }

  renderCategoryChoices() {
    const { handleChooseCategory } = this
    return (
      <div>
        <button onClick={() => handleChooseCategory('geography')} >geography</button>
        <button onClick={() => handleChooseCategory('art')}> art</button>
        <button onClick={() => handleChooseCategory('history')}>history</button>
      </div>
    )
  }

  handleChooseCategory(category) {
    const { chooseCategory } = this.props
    chooseCategory(category)
    this.setState({
      choosingMode: true
    })
  }

  render() {
    const { email } = this.props
    return (
      <div>
        <h3>Welcome, {email}</h3>
        {
          (!this.state.choosingCategory ? <button onClick={this.handlePlay}>Play</button> : null)
        }

        {
          ((!this.state.choosingMode && this.state.choosingCategory) ? this.renderCategoryChoices() : null)
        }

        {
          ((this.state.choosingMode) ? (
            <div>
              <button>Challenge a Friend</button>
              <button onClick={() => this.props.history.push('/solo')}>Challenge Yourself</button>
            </div>
          ) : null)

        }
      </div>
    )

  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    chooseCategory: category => dispatch(setCategory(category))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
