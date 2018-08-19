import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class UserTopScores extends React.Component {
  constructor() {
    super()
    this.state = {
      topScores: [],
      loaded: false
    }
  }

  async componentDidMount() {
    const { user } = this.props
    const { data } = await axios.get(`/api/users/${user.id}/scores`)
    this.setState({
      topScores: data,
      loaded: true
    })
  }

  render() {
    const { topScores, loaded } = this.state
    if (loaded) {
      return (
        <div>
          <h4>Your top scores:</h4>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {
                topScores.map(scoreInfo => {
                  return (
                  <tr key={scoreInfo.category.id}>
                    <th>{scoreInfo.category.name}</th>
                    <th>{scoreInfo.userHighScore}</th>
                  </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      )
    } else {
      return <div />
    }
  }
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(UserTopScores)

// PROP TYPES
UserTopScores.propTypes = {
  user: PropTypes.object
}
