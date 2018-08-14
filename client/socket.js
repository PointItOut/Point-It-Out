import io from 'socket.io-client'
import { gotList } from './store/opponent'
const socket = io(window.location.origin)

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
  store.dispatch(gotList(newlist));
});

export default socket
