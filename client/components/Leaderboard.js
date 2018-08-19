import React from 'react'
import {connect} from 'react-redux'

const Leaderboard = props => {
  const categoryDisplayed = props.categoryDisplayed
  const sortedScores = categoryDisplayed.topScores.sort(function(a, b) {
    return b.userHighScore - a.userHighScore
  })
  for (let i = 0; i < sortedScores.length; i++) {
    sortedScores[i].place = i + 1
  }
  console.log('sorted scores with places', sortedScores)

  return (
    <div className="main-container col-sm-12 col-md-8 offset-md-2">
      <h2 className="text-center">
        {categoryDisplayed.name.toUpperCase()} CHAMPIONS
      </h2>
      <div className="table-responsive-sm">
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th scope="column">Place</th>
              <th scope="column">User</th>
              <th scope="column">Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedScores.map(scoreInfo => (
              <tr key={scoreInfo.userId}>
                <th scope="row">
                  <span className="badge badge-pill badge-danger">
                    {scoreInfo.place}
                  </span>
                </th>
                <th scope="row">{scoreInfo.userName}</th>
                <th scope="row">{scoreInfo.userHighScore}</th>
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
