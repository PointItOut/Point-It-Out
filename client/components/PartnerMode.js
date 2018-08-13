import React, { Component } from 'react'
import { connect } from 'react-redux'

class PartnerMode extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <h2>Partner Mode</h2>
            </div>
        )
    }
}

const mapState = state => {
    return {
        category: state.category
    }
}


export default connect(mapState)(PartnerMode)



