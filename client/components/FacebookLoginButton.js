import React from 'react'
import FacebookLogin from 'react-facebook-login'

class FacebookLoginButton extends React.Component {
  responseFacebook(response) {
    console.log(response)
  }

  render() {
    return (
      <FacebookLogin
        appId="237563910291590"
        autoLoad={true}
        fields="name,email,picture"
        cssClass="btn btn-main"
        callback={this.responseFacebook}
      />
    )
  }
}

export default FacebookLoginButton
