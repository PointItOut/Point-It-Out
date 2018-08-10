import React, {Component} from 'react'
import { connect } from 'react-redux'
import CameraCanvas from './CameraCanvas'

class SoloMode extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h2>Solo Mode</h2>
        <CameraCanvas />
      </div>
    )
  }
}

const mapState = state => {
  return {
    category: state.category
  }
}


export default connect(mapState)(SoloMode)



