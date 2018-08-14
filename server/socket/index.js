module.exports = io => {
  let list = {}

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.broadcast.emit('new-connection', 'a new person join the room');

    socket.on('purple', payload => {
      socket.broadcast.emit('purple', payload);

    })

    socket.on('webcam', payload => {
      socket.broadcast.emit('webcam', payload);

    })

    socket.on('new-score', total => {
      const name = req.user.name
      list[name] = total
      socket.broadcast.emit('new-score', list);
    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
