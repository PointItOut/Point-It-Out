import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class UserTopScores extends React.Component {
  constructor() {
    super()
    this.state = {
      topScores: [],
      loaded: false
    }
  }

  async componentDidMount() {
    const {user} = this.props
    const {data} = await axios.get(`/api/users/${user.id}/scores`)
    this.setState({
      topScores: data,
      loaded: true
    })
  }

  render() {
    const {topScores, loaded} = this.state
    if (loaded) {
      return (
        <div className="card">
          <div className="card-header blue-header">
            <h4 className="text-center">YOUR TOP SCORES</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive-sm">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="column">Category</th>
                    <th scope="column" className="text-right">
                      Top Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topScores.map(scoreInfo => {
                    return (
                      <tr key={scoreInfo.category.id}>
                        <th scope="row">
                          {scoreInfo.category.name.toUpperCase()}
                        </th>
                        <th scope="row" className="text-right">
                          {scoreInfo.userHighScore}
                        </th>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
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
