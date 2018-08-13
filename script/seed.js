'use strict'

const db = require('../server/db')
const {User, Question, Choice} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //USER
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', userName: 'Cody'}),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      userName: 'Murphy'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  //QUESTIONS
  const questions = await Promise.all([
    Question.create({
      theQuestion: 'What is the capital of Russia?',
      category: 'geography'
    }),
    Question.create({
      theQuestion: 'Which ocean lies on the east of the United States?',
      category: 'geography'
    }),
    Question.create({
      theQuestion: 'Which is the longest river in the US?',
      category: 'geography'
    }),
    Question.create({
      theQuestion: 'World War I began in which year?',
      category: 'history'
    }),
    Question.create({
      theQuestion: 'Who was the first president to live in the White House?',
      category: 'history'
    }),
    // Question.create({
    //   theQuestion: `Who painted 'The Starry Night'?`,
    //   category: 'art'
    // }),
    Question.create({
      theQuestion: `Click on purple square`,
      category: 'art'
    }),
    Question.create({
      theQuestion: `Click on yellow square`,
      category: 'art'
    }),
    Question.create({
      theQuestion: `Click on green square`,
      category: 'art'
    }),
    Question.create({
      theQuestion: `Click on red square`,
      category: 'art'
    })
  ])
  console.log(`seeded ${questions.length} questions`)
  console.log(`seeded successfully`)

  //CHOICES
  const choices = await Promise.all([
    //Geography
    Choice.create({
      theChoice: 'Moscow',
      isCorrect: true,
      isPicture: false,
      questionId: 1
    }),
    Choice.create({
      theChoice: 'Saint Petersburg',
      isCorrect: false,
      isPicture: false,
      questionId: 1
    }),
    Choice.create({
      theChoice: 'Yekaterinburg',
      isCorrect: false,
      isPicture: false,
      questionId: 1
    }),
    Choice.create({
      theChoice: 'Kazan',
      isCorrect: false,
      isPicture: false,
      questionId: 1
    }),

    Choice.create({
      theChoice: 'Atlantic Ocean',
      isCorrect: true,
      isPicture: false,
      questionId: 2
    }),
    Choice.create({
      theChoice: 'Arctic Ociean',
      isCorrect: false,
      isPicture: false,
      questionId: 2
    }),
    Choice.create({
      theChoice: 'Pacific Ociean',
      isCorrect: false,
      isPicture: false,
      questionId: 2
    }),
    Choice.create({
      theChoice: 'Southern Ociean',
      isCorrect: false,
      isPicture: false,
      questionId: 2
    }),

    Choice.create({
      theChoice: 'Missouri River',
      isCorrect: true,
      isPicture: false,
      questionId: 3
    }),
    Choice.create({
      theChoice: 'Mississippi River',
      isCorrect: false,
      isPicture: false,
      questionId: 3
    }),
    Choice.create({
      theChoice: 'Yukon River',
      isCorrect: false,
      isPicture: false,
      questionId: 3
    }),
    Choice.create({
      theChoice: 'Rio Grande',
      isCorrect: false,
      isPicture: false,
      questionId: 3
    }),

    //History
    Choice.create({
      theChoice: '1914',
      isCorrect: true,
      isPicture: false,
      questionId: 4
    }),
    Choice.create({
      theChoice: '1942',
      isCorrect: false,
      isPicture: false,
      questionId: 4
    }),
    Choice.create({
      theChoice: '1917',
      isCorrect: false,
      isPicture: false,
      questionId: 4
    }),
    Choice.create({
      theChoice: '1924',
      isCorrect: false,
      isPicture: false,
      questionId: 4
    }),

    Choice.create({
      theChoice: 'John Adams',
      isCorrect: true,
      isPicture: false,
      questionId: 5
    }),
    Choice.create({
      theChoice: 'George Washington',
      isCorrect: false,
      isPicture: false,
      questionId: 5
    }),
    Choice.create({
      theChoice: 'Franklin Pierce',
      isCorrect: false,
      isPicture: false,
      questionId: 5
    }),
    Choice.create({
      theChoice: 'John Tyler',
      isCorrect: false,
      isPicture: false,
      questionId: 5
    }),

    //Art
    //TODO Only add this after we have an ID for the art questions
    // Choice.create({
    //   theChoice: 'Vincent van Gogh',
    //   isCorrect: true,
    //   isPicture: false,
    //   questionId:
    // }),
    // Choice.create({
    //   theChoice: 'Pablo Picasso',
    //   isCorrect: false,
    //   isPicture: false,
    //   questionId:
    // }),
    // Choice.create({
    //   theChoice: 'Paul Cézanne',
    //   isCorrect: false,
    //   isPicture: false,
    //   questionId:
    // }),
    // Choice.create({
    //   theChoice: 'Camille Pissarro',
    //   isCorrect: false,
    //   isPicture: false,
    //   questionId:
    // }),

    Choice.create({
      theChoice: 'Purple',
      isCorrect: true,
      isPicture: false,
      questionId: 6
    }),
    Choice.create({
      theChoice: 'Yello',
      isCorrect: false,
      isPicture: false,
      questionId: 6
    }),
    Choice.create({
      theChoice: 'Green',
      isCorrect: false,
      isPicture: false,
      questionId: 6
    }),
    Choice.create({
      theChoice: 'Red',
      isCorrect: false,
      isPicture: false,
      questionId: 6
    }),

    Choice.create({
      theChoice: 'Purple',
      isCorrect: false,
      isPicture: false,
      questionId: 7
    }),
    Choice.create({
      theChoice: 'Yello',
      isCorrect: true,
      isPicture: false,
      questionId: 7
    }),
    Choice.create({
      theChoice: 'Green',
      isCorrect: false,
      isPicture: false,
      questionId: 7
    }),
    Choice.create({
      theChoice: 'Red',
      isCorrect: false,
      isPicture: false,
      questionId: 7
    }),

    Choice.create({
      theChoice: 'Purple',
      isCorrect: false,
      isPicture: false,
      questionId: 8
    }),
    Choice.create({
      theChoice: 'Yello',
      isCorrect: false,
      isPicture: false,
      questionId: 8
    }),
    Choice.create({
      theChoice: 'Green',
      isCorrect: true,
      isPicture: false,
      questionId: 8
    }),
    Choice.create({
      theChoice: 'Red',
      isCorrect: false,
      isPicture: false,
      questionId: 8
    }),

    Choice.create({
      theChoice: 'Purple',
      isCorrect: false,
      isPicture: false,
      questionId: 9
    }),
    Choice.create({
      theChoice: 'Yello',
      isCorrect: false,
      isPicture: false,
      questionId: 9
    }),
    Choice.create({
      theChoice: 'Green',
      isCorrect: false,
      isPicture: false,
      questionId: 9
    }),
    Choice.create({
      theChoice: 'Red',
      isCorrect: true,
      isPicture: false,
      questionId: 9
    })
  ])
  console.log(`seeded ${choices.length} choices`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
