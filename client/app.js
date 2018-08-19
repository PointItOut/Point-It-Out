import React from 'react'

import {Navbar, Footer} from './components'
import Routes from './routes'
import {withRouter} from 'react-router-dom'
//for toast notifications
import ButterToast from 'butter-toast'

const App = props => {
  return (
    <div>
      {props.location.pathname.includes('solo') ||
      props.location.pathname.includes('game') ? null : (
        <Navbar />
      )}
      <div className="mainPage">
        <Routes />
        <ButterToast trayPosition="bottom-right" />
      </div>
      <Footer />
    </div>
  )
}

export default withRouter(App)
