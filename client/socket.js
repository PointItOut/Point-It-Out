import io from 'socket.io-client'
import { gotList } from './store/opponent'
import { gotQuestionsForCategory } from './store/questions'
const socket = io(window.location.origin)
import store from './store'

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('new-connection', payload => {
  console.log(payload)
})

socket.on('purple', payload => {
  console.log(payload)
})

socket.on('webcam', payload => {
  console.log(payload)
})

socket.on('new-score', newlist => {
  store.dispatch(gotList(newlist))
})

socket.on('questions', payload => {
  console.log('im here', payload)
  store.dispatch(gotQuestionsForCategory(payload))
})

export default socket
