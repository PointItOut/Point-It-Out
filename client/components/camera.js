
import React, { Component } from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";

class MyApp extends React.Component {
    render() {
        return (
            <OTSession apiKey="46169082" sessionId="1_MX40NjE2OTA4Mn5-MTUzMzg1MTQwMjY2OX4zdHJFUFF2WXZUOWNESWhKSGRTUzFzNGV-fg" token="T1==cGFydG5lcl9pZD00NjE2OTA4MiZzaWc9NGJjZmJjNDhiNWZmZGRmYzE0MmFkZWI4ZjU4OTdjNzU5OTljNjU4ZTpzZXNzaW9uX2lkPTFfTVg0ME5qRTJPVEE0TW41LU1UVXpNemcxTVRRd01qWTJPWDR6ZEhKRlVGRjJXWFpVT1dORVNXaEtTR1JUVXpGek5HVi1mZyZjcmVhdGVfdGltZT0xNTMzODUxNDg3Jm5vbmNlPTAuNjI3NzgyMTk4Mjk5OTY3NiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTMzODczMDg3JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9">
                <OTPublisher />
                <OTStreams>
                    <OTSubscriber />
                </OTStreams>
            </OTSession>
        );
    }
}

export default MyApp 