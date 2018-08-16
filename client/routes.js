import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  SoloMode,
  PartnerMode,
  CategoryOverview,
  Lobby,
  Splash
} from './components'

import {me} from './store'
// import { Stage, Layer, Rect, Text } from 'react-konva'
// import MyApp from './components/camera'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}

          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route
                path="/categories/:categoryId"
                component={CategoryOverview}
              />
              <Route path="/home" component={UserHome} />
              <Route path="/solo" component={SoloMode} />
              {/* <Route exact path="/game/:name" component={Lobby} /> */}
              <Route exact path="/game/:name" component={PartnerMode} />
              {/* <Route path="/game/:name/start" component={PartnerMode} /> */}

              <Route component={Splash} />
            </Switch>
          )}
          {/* Displays our splash page component as a fallback */}
          <Route component={Splash} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
