class Sound {
  constructor(src) {
    this.sound = document.createElement('audio')
    this.sound.src = src
    this.sound.setAttribute('preload', 'auto')
    this.sound.setAttribute('controls', 'none')
    this.sound.style.display = 'none'
    document.body.appendChild(this.sound)
  }

  play = function() {
    this.sound.play()
  }

  stop = function() {
    this.sound.pause()
  }
}

// we access the sounds files in the public folder

// before game starts?
const waiting = new Sound('/sounds/doh_de_oh.mp3') // for lobby?

// when you get an answer right?
const yay = new Sound('/sounds/happykids.mp3')
const levelUp = new Sound('/sounds/wood_plank_flicks.mp3')

// when you get an answer wrong?
const gasp = new Sound('/sounds/gasp_8.mp3')
const somethingFalling = new Sound('/sounds/back_board.mp3')
const wrongHorn = new Sound('/sounds/horn_squeeze_clown.mp3')
const glassShatter = new Sound('/sounds/small_glass_pane_shatter.mp3')

// end of game?
const endForLoser = new Sound('/sounds/end.mp3') // for loser at end?

const applause = new Sound('/sounds/applause7.mp3') // for winner at end?

module.exports = [ waiting, yay, levelUp, gasp, somethingFalling, wrongHorn, glassShatter, endForLoser, applause ]

