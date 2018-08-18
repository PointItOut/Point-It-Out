//functions to test whether a user can play the game and dispatch toast notificaitons if they cannot
//to play the user's screen has to be wider than 1200 pixels and they have to have camera enabled

//toast notificaiton library
import ButterToast, {CinnamonSugar} from 'butter-toast'

//checks whether the screen is too small
export const isScreenLarge = function() {
  const userWindow = window.innerWidth
  if (userWindow > 1200) {
    return true
  } else return false
}

export const tooSmallToast = function() {
  const toast = CinnamonSugar.crisp({
    theme: 'danger',
    icon: 'exclamation-triangle',
    message:
      'Your screen is too small to play Point It Out. Please try again on a larger screen.',
    toastTimeout: 5000
  })
  ButterToast.raise(toast)
}

//if user denies webcam access or otherwise does not have a media stream
export const noMediaStream = function() {
  const toast = CinnamonSugar.crisp({
    theme: 'danger',
    icon: 'exclamation-triangle',
    message:
      'Your webcam is not enabled. Your webcam must be enabled to play Point It Out',
    sticky: true
    // toastTimeout: 10000
  })
  ButterToast.raise(toast)
}
