import React from 'react'
import FacebookLogin from 'react-facebook-login'

// class FacebookLoginButton extends React.Component {
//   responseFacebook(response) {
//     console.log('facebook responce', response)
//   }
//   componentWillMount() {}
//   render() {
//     return (
//       <FacebookLogin
//         appId="237563910291590"
//         autoLoad={true}
//         fields="name,email,picture"
//         cssClass="btn btn-main"
//         callback={this.responseFacebook}
//       />
//     )
//   }
// }

const FacebookLoginButton = () => {
  return (
    <a href="/auth/facebook">
      <button type="button" className="btn btn-main">
        Login with Facebook
      </button>
    </a>
  )
}

export default FacebookLoginButton
