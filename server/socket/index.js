module.exports = io => {
  let list = {}
  let questions = {}
  let games = {}

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.broadcast.emit('new-connection', 'a new person join the room')

    socket.on('purple', payload => {
      socket.broadcast.emit('purple', payload)
    })

    socket.on('webcam', payload => {
      socket.broadcast.emit('webcam', payload)
    })
    // socket.on('redirect', payload => {
    //   io.in(game).emit('redirect', 'history')
    // })

    socket.on('delete-game', gameName => {
      console.log('gameName', gameName);
      io.in(gameName).emit('redirect', 'home')
      let newGames = {}
      let newquestions = {}
      let newlist = {}
      for (let game in games) {
        if (game !== gameName) {
          newGames[game] = games[game]
          newquestions[game] = questions[game]
          newlist[game] = list[game]
        }
      }
      questions = newquestions
      games = newGames
      list = newlist

      io.of('/').in(gameName).clients((error, socketIds) => {
        console.log('error = ' + error + ', socketIds = ' + socketIds);
        if (error) throw error;
        socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(gameName));
      });
      console.log('================>', list, games, questions)
    })

    socket.on('questions', payload => {
      const Game = payload.gameName
      if (!questions[Game]) {
        const currentquestions = payload.questions
        questions[Game] = currentquestions
      }

      socket.emit('questions', questions[Game])
      // socket.broadcast.emit('questions', questions[Game])
    })

    socket.on('startGame', payload => {
      const game = payload.currentgame.name
      if (!games[game]) {
        games[game] = true
      }
      socket.join(game)
      io.in(game).emit('startGame', games[game])


    }
    )

    socket.on('new-score', payload => {
      const Game = payload.gameName
      console.log('new-score game', Game);
      socket.join(Game)
      const name = payload.username
      if (!list[Game]) {
        list[Game] = {}
      }
      list[Game][name] = payload.total
      io.in(Game).emit('new-score', list[Game])
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
