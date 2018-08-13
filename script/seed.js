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
    //Geography
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
      theQuestion: `Which is the world's highest mountain?`,
      category: 'geography'
    }),
    Question.create({
      theQuestion: 'What is the biggest desert in the world?',
      category: 'geography'
    }),
    Question.create({
      theQuestion: 'Which US state is the Grand Canyon located in?',
      category: 'geography'
    }),
    Question.create({
      theQuestion: 'Which is the longest river in the world',
      category: 'geography'
    }),
    Question.create({
      theQuestion:
        'Which is the smallest country, measured by total land area?',
      category: 'geography'
    }),

    //History
    Question.create({
      theQuestion: 'World War I began in which year?',
      category: 'history'
    }),
    Question.create({
      theQuestion: 'Who was the first president to live in the White House?',
      category: 'history'
    }),

    //Art
    Question.create({
      theQuestion: `Who painted 'The Starry Night'?`,
      category: 'art'
    }),
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

      questionId: 1
    }),
    Choice.create({
      theChoice: 'Saint Petersburg',
      isCorrect: false,

      questionId: 1
    }),
    Choice.create({
      theChoice: 'Yekaterinburg',
      isCorrect: false,

      questionId: 1
    }),
    Choice.create({
      theChoice: 'Kazan',
      isCorrect: false,

      questionId: 1
    }),

    Choice.create({
      theChoice: 'Atlantic Ocean',
      isCorrect: true,

      questionId: 2
    }),
    Choice.create({
      theChoice: 'Arctic Ociean',
      isCorrect: false,

      questionId: 2
    }),
    Choice.create({
      theChoice: 'Pacific Ociean',
      isCorrect: false,

      questionId: 2
    }),
    Choice.create({
      theChoice: 'Southern Ociean',
      isCorrect: false,

      questionId: 2
    }),

    Choice.create({
      theChoice: 'Missouri River',
      isCorrect: true,

      questionId: 3
    }),
    Choice.create({
      theChoice: 'Mississippi River',
      isCorrect: false,

      questionId: 3
    }),
    Choice.create({
      theChoice: 'Yukon River',
      isCorrect: false,

      questionId: 3
    }),
    Choice.create({
      theChoice: 'Rio Grande',
      isCorrect: false,

      questionId: 3
    }),

    Choice.create({
      theChoice: 'Mount Everest',
      isCorrect: true,

      questionId: 4
    }),
    Choice.create({
      theChoice: 'Makalu',
      isCorrect: false,

      questionId: 4
    }),
    Choice.create({
      theChoice: 'K2',
      isCorrect: false,

      questionId: 4
    }),
    Choice.create({
      theChoice: 'Kilimanjaro',
      isCorrect: false,

      questionId: 4
    }),

    Choice.create({
      theChoice: 'Sahara',
      isCorrect: true,

      questionId: 5
    }),
    Choice.create({
      theChoice: 'Arabian',
      isCorrect: false,

      questionId: 5
    }),
    Choice.create({
      theChoice: 'Great Australian',
      isCorrect: false,

      questionId: 5
    }),
    Choice.create({
      theChoice: 'Negev',
      isCorrect: false,

      questionId: 5
    }),

    Choice.create({
      theChoice: 'Arizona',
      isCorrect: true,

      questionId: 6
    }),
    Choice.create({
      theChoice: 'New-Mexico',
      isCorrect: false,

      questionId: 6
    }),
    Choice.create({
      theChoice: 'Wyoming',
      isCorrect: false,

      questionId: 6
    }),
    Choice.create({
      theChoice: 'Nevada',
      isCorrect: false,

      questionId: 6
    }),

    Choice.create({
      theChoice: 'Nile River',
      isCorrect: true,

      questionId: 7
    }),
    Choice.create({
      theChoice: 'Amazon River',
      isCorrect: false,

      questionId: 7
    }),
    Choice.create({
      theChoice: 'Congo River',
      isCorrect: false,

      questionId: 7
    }),
    Choice.create({
      theChoice: 'Danube River',
      isCorrect: false,

      questionId: 7
    }),

    Choice.create({
      theChoice: 'Vatican',
      isCorrect: true,

      questionId: 8
    }),
    Choice.create({
      theChoice: 'Monoco',
      isCorrect: false,

      questionId: 8
    }),
    Choice.create({
      theChoice: 'Maldives',
      isCorrect: false,

      questionId: 8
    }),
    Choice.create({
      theChoice: 'Tuvalu',
      isCorrect: false,

      questionId: 8
    }),

    //History
    Choice.create({
      theChoice: '1914',
      isCorrect: true,

      questionId: 9
    }),
    Choice.create({
      theChoice: '1942',
      isCorrect: false,

      questionId: 9
    }),
    Choice.create({
      theChoice: '1917',
      isCorrect: false,

      questionId: 9
    }),
    Choice.create({
      theChoice: '1924',
      isCorrect: false,

      questionId: 9
    }),

    Choice.create({
      theChoice: 'John Adams',
      isCorrect: true,

      questionId: 10
    }),
    Choice.create({
      theChoice: 'George Washington',
      isCorrect: false,

      questionId: 10
    }),
    Choice.create({
      theChoice: 'Franklin Pierce',
      isCorrect: false,

      questionId: 10
    }),
    Choice.create({
      theChoice: 'John Tyler',
      isCorrect: false,

      questionId: 10
    }),

    //Art

    Choice.create({
      theChoice: 'Vincent van Gogh',
      isCorrect: true,
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/9/9b/Vincent_van_Gogh_-_s0273V1962_-_Van_Gogh_Museum.jpg',
      questionId: 11
    }),
    Choice.create({
      theChoice: 'Pablo Picasso',
      isCorrect: false,
      picture:
        'https://commons.wikimedia.org/wiki/File:Portrait_de_Picasso,_1908.jpg#/media/File:Portrait_de_Picasso,_1908.jpg',
      questionId: 11
    }),
    Choice.create({
      theChoice: 'Paul Cézanne',
      isCorrect: false,
      picture:
        'https://commons.wikimedia.org/wiki/File:Paul_C%C3%A9zanne_158.jpg#/media/File:Paul_C%C3%A9zanne_158.jpg',
      questionId: 11
    }),
    Choice.create({
      theChoice: 'Camille Pissarro',
      isCorrect: false,
      picture:
        'https://commons.wikimedia.org/wiki/File:Pissarro-portrait-c1900.jpg#/media/File:Pissarro-portrait-c1900.jpg',
      questionId: 11
    }),

    Choice.create({
      theChoice: 'Purple',
      isCorrect: true,
      picture:
        'https://commons.wikimedia.org/wiki/File:Color_icon_purple.svg#/media/File:Color_icon_purple.svg',
      questionId: 12
    }),
    Choice.create({
      theChoice: 'Yello',
      isCorrect: false,
      picture:
        'https://commons.wikimedia.org/wiki/File:Color_icon_yellow.svg#/media/File:Color_icon_yellow.svg',
      questionId: 12
    }),
    Choice.create({
      theChoice: 'Green',
      isCorrect: false,
      picture:
        'https://commons.wikimedia.org/wiki/File:Color_icon_green.svg#/media/File:Color_icon_green.svg',
      questionId: 12
    }),
    Choice.create({
      theChoice: 'Red',
      isCorrect: false,
      picture:
        'https://commons.wikimedia.org/wiki/File:Color_icon_red.svg#/media/File:Color_icon_red.svg',
      questionId: 12
    }),

    Choice.create({
      theChoice: 'Purple',
      isCorrect: false,

      questionId: 13
    }),
    Choice.create({
      theChoice: 'Yello',
      isCorrect: true,

      questionId: 13
    }),
    Choice.create({
      theChoice: 'Green',
      isCorrect: false,

      questionId: 13
    }),
    Choice.create({
      theChoice: 'Red',
      isCorrect: false,

      questionId: 13
    }),

    Choice.create({
      theChoice: 'Purple',
      isCorrect: false,

      questionId: 14
    }),
    Choice.create({
      theChoice: 'Yello',
      isCorrect: false,

      questionId: 14
    }),
    Choice.create({
      theChoice: 'Green',
      isCorrect: true,

      questionId: 14
    }),
    Choice.create({
      theChoice: 'Red',
      isCorrect: false,

      questionId: 14
    }),

    Choice.create({
      theChoice: 'Purple',
      isCorrect: false,

      questionId: 15
    }),
    Choice.create({
      theChoice: 'Yello',
      isCorrect: false,

      questionId: 15
    }),
    Choice.create({
      theChoice: 'Green',
      isCorrect: false,

      questionId: 15
    }),
    Choice.create({
      theChoice: 'Red',
      isCorrect: true,

      questionId: 15
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
