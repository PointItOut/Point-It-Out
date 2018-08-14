import React, {Component} from 'react'
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'

class Opentok extends React.Component {
  render() {
    const currentgame = this.props.currentgame
    const token = this.props.token
    const user = this.props.user
    return (
      <OTSession
        apiKey="46169082"
        sessionId={currentgame.sessionId}
        token={token}
      >
        <OTPublisher
          properties={{
            // publishVideo,
            width: 300,
            height: 300,
            name: user.name
          }}
        />
        <OTStreams>
          <OTSubscriber
            properties={{
              width: 200,
              height: 200
            }}
          />
        </OTStreams>
      </OTSession>
    )
  }
}

export default Opentok
