import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrophy} from '@fortawesome/free-solid-svg-icons'

const Leaderboard = props => {
  const categoryDisplayed = props.categoryDisplayed
  const sortedScores = categoryDisplayed.topScores.sort(function(a, b) {
    return b.userHighScore - a.userHighScore
  })

  //assigns a place number and a blue color to each trophy
  for (let i = 0; i < sortedScores.length; i++) {
    sortedScores[i].place = i + 1
    sortedScores[i].color = '#0096cc'
  }
  //assigns gold, silver and bronze for first second and third trophies
  if (sortedScores[0]) sortedScores[0].color = '#ffbb28'
  if (sortedScores[1]) sortedScores[1].color = '#7b7b7b'
  if (sortedScores[2]) sortedScores[2].color = '#cd7f32'

  return (
    <div className="main-container">
      <h3 className="text-center">Champions</h3>

      <div className="table-responsive-sm">
        <table className="table table-hover">
          <thead className="accent-header">
            <tr>
              <th scope="column">Place</th>
              <th scope="column">User</th>
              <th scope="column" className="text-right">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedScores.map(scoreInfo => (
              <tr key={scoreInfo.userId}>
                <th scope="row">
                  <span className="fa-layers fa-fw">
                    <FontAwesomeIcon
                      icon={faTrophy}
                      transform="grow-15 right-1 down-3"
                      color={scoreInfo.color}
                    />
                    <span className="fa-layers-text fa-inverse">
                      {scoreInfo.place}
                    </span>
                  </span>
                </th>
                <th scope="row">{scoreInfo.userName}</th>
                <th scope="row" className="text-right">
                  {scoreInfo.userHighScore}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapState = state => ({
  currentCategory: state.categories.current
})
export default connect(mapState)(Leaderboard)

// PROP TYPES
Leaderboard.propTypes = {
  currentCategory: PropTypes.object,
  categoryDisplayed: PropTypes.object
}
