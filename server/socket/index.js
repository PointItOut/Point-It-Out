module.exports = io => {
  let list = {}

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.broadcast.emit('new-connection', 'a new person join the room')

    socket.on('purple', payload => {
      socket.broadcast.emit('purple', payload)
    })

    socket.on('webcam', payload => {
      socket.broadcast.emit('webcam', payload)
    })

    socket.on('questions', payload => {
      socket.broadcast.emit('questions', payload)
    })

    socket.on('new-score', payload => {
      const name = payload.username
      list[name] = payload.total
      socket.emit('new-score', list)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
