import io from 'socket.io-client'
import { gotList } from './store/opponent'
import { gotQuestionsForCategory } from './store/questions'
const socket = io(window.location.origin)
import store from './store'
import { startGame } from './store/game'
import history from './history'

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('new-connection', payload => {
  console.log(payload)
})

socket.on('purple', payload => {
  console.log(payload)
})


socket.on('redirect', payload => {
  store.dispatch(startGame(false))
  history.push('/home')
})

socket.on('webcam', payload => {
  console.log(payload)
})

socket.on('new-score', newlist => {
  console.log('receieved new-game', newlist);
  store.dispatch(gotList(newlist))
})

socket.on('questions', payload => {
  store.dispatch(gotQuestionsForCategory(payload))
})

socket.on('startGame', payload => {
  store.dispatch(startGame(payload))
})

export default socket
