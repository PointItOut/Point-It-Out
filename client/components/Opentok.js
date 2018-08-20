import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'

class Opentok extends React.Component {
  render() {
    const { currentgame, token } = this.props

    return (
      <div className="card">
        <div className="card-header blue-header">
          <h4>PLAYERS</h4>
        </div>
        <div className="opentokContainer card-body">
          <OTSession
            apiKey="46169082"
            sessionId={currentgame.sessionId}
            token={token}
          >
            <OTPublisher
              properties={{
                // publishVideo,
                width: 300,
                height: 300
              }}
            />
            <OTStreams>
              <OTSubscriber
                properties={{
                  width: 150,
                  height: 150
                }}
              />
            </OTStreams>
          </OTSession>
        </div>
      </div>
    )
  }
}

export default Opentok

// PROP TYPES
Opentok.propTypes = {
  currentgame: PropTypes.object,
  token: PropTypes.string
}
