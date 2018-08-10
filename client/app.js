import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import { withRouter } from 'react-router-dom'

const App = (props) => {
  return (
    <div>
      {
        props.location.pathname.includes('solo') ? null : <Navbar />
      }
      <Routes />
    </div>
  )
}

export default withRouter(App)

