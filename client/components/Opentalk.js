import React, { Component } from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react'

class Opentok extends React.Component {
  render() {
    const currentgame = this.props.currentgame
    const token = this.props.token
    return (
      <OTSession
        apiKey="46169082"
        sessionId={currentgame.sessionId}
        token={token}
      >
        <OTPublisher />
        <OTStreams>
          <OTSubscriber />
        </OTStreams>
      </OTSession>
    )
  }
}

export default Opentok
