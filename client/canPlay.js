//functions to test whether a user can play the game and dispatch toast notificaitons if they cannot
//to play the user's screen has to be wider than 1200 pixels and they have to have camera enabled

//toast notificaiton library
import ButterToast, {CinnamonSugar} from 'butter-toast'

//checks whether the screen is too small
export const isScreenSmall = function() {
  const userWindow = window.innerWidth
  if (userWindow < 1200) {
    return 'Your screen is too small to play Point It Out. Please try again on a larger screen.'
  } else return false
}

export const noCamera = function() {}

export const noPlay = function() {
  const toast = CinnamonSugar.crisp({
    theme: 'danger',
    icon: 'exclamation-triangle',
    message:
      'Your screen is too small to play point it out. Please try again on a larger screen.',
    toastTimeout: 5000
  })
  ButterToast.raise(toast)
}
