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
const tick = new Sound('/sounds/clock-tick1.mp3')

// before game starts?
const waiting = new Sound('/sounds/doh_de_oh.mp3') // for lobby?

// when you get an answer right?
const levelUp = new Sound('/sounds/wood_plank_flicks.mp3')
const giggle = new Sound('/sounds/giggle_5.mp3')

// when you get an answer wrong?
const wrongHorn = new Sound('/sounds/horn_squeeze_clown.mp3')
const awwWrong = new Sound('/sounds/end.mp3')

// end of game?
const applause = new Sound('/sounds/applause7.mp3')
const yay = new Sound('/sounds/happykids.mp3')

// export default [ waiting, yay, levelUp, gasp, somethingFalling, wrongHorn, glassShatter, endForLoser, applause ]

export default {
  waiting, yay, levelUp, wrongHorn, awwWrong, applause, giggle, tick
}
