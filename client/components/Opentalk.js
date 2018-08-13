
import React, { Component } from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";

class Opentok extends React.Component {
    render() {
        const currentgame = this.props.currentgame
        const user = this.props.user
        return (
            <OTSession apiKey="46169082" sessionId={currentgame.sessionId} token={user.token}>
                <OTPublisher />
                <OTStreams>
                    <OTSubscriber />
                </OTStreams>
            </OTSession>
        );
    }
}

export default Opentok