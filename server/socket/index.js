module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.broadcast.emit('new-connection', 'a new person join the room');

    socket.on('purple', payload => {
      socket.broadcast.emit('purple', payload);

    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
