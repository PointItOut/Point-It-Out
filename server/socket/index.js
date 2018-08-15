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
      const Game = payload.gameName
      socket.join(Game);
      const name = payload.username
      if (!list[Game]) {
        list[Game] = {}
      }
      list[Game][name] = payload.total
      io.in(Game).emit('new-score', list[Game]);
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
