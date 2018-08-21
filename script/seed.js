'use strict'

const db = require('../server/db')
const {
  User,
  Question,
  Choice,
  Category,
  UserCategory
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //USER
  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      userName: 'Cody'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      userName: 'Murphy'
    }),
    User.create({
      email: 'bruno@email.com',
      password: '123',
      userName: 'Bruno'
    }),
    User.create({
      email: 'fira@email.com',
      password: '123',
      userName: 'Fira'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  // CATEGORIES
  const categories = await Promise.all([
    Category.create({
      name: 'state capitals',
      public: true
    }),
    Category.create({
      name: 'pets of fullstack',
      public: true
    })
  ])

  const [stateCapitals, fullstackPets] = categories
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded successfully`)

  // USERS_CATEGORIES
  const usersCategories = await Promise.all([
    UserCategory.create({
      userId: 1,
      categoryId: 1,
      userHighScore: 20
    }),
    UserCategory.create({
      userId: 2,
      categoryId: 1,
      userHighScore: 18
    }),
    UserCategory.create({
      userId: 3,
      categoryId: 1,
      userHighScore: 12
    }),
    UserCategory.create({
      userId: 4,
      categoryId: 1,
      userHighScore: 14
    })
  ])
  console.log(`seeded ${usersCategories.length} user_category instances`)
  console.log('seeded successfully')

  //QUESTIONS
  // state capital questions

  const questions = await Promise.all([
    Question.create({
      text: 'What is the capital of Alabama?'
    }),
    Question.create({
      text: 'What is the capital of Alaska?'
    }),
    Question.create({
      text: 'What is the capital of Arizona?'
    }),
    Question.create({
      text: 'What is the capital of Arkansas?'
    }),
    Question.create({
      text: 'What is the capital of California?'
    }),
    Question.create({
      text: 'What is the capital of Colorado?'
    }),
    Question.create({
      text: 'What is the capital of Connecticut?'
    }),
    Question.create({
      text: 'What is the capital of Delaware?'
    }),
    Question.create({
      text: 'What is the capital of Florida?'
    }),
    Question.create({
      text: 'What is the capital of Georgia?'
    }),
    Question.create({
      text: 'What is the capital of Hawaii?'
    }),
    Question.create({
      text: 'What is the capital of Idaho?'
    }),
    Question.create({
      text: 'What is the capital of Illinois?'
    }),
    Question.create({
      text: 'What is the capital of Indiana?'
    }),
    Question.create({
      text: 'What is the capital of Iowa?'
    }),
    Question.create({
      text: 'What is the capital of Kansas?'
    }),
    Question.create({
      text: 'What is the capital of Kentucky?'
    }),
    Question.create({
      text: 'What is the capital of Louisiana?'
    }),
    Question.create({
      text: 'What is the capital of Maine?'
    }),
    Question.create({
      text: 'What is the capital of Maryland?'
    }),
    Question.create({
      text: 'What is the capital of Massachusetts?'
    }),
    Question.create({
      text: 'What is the capital of Michigan?'
    }),
    Question.create({
      text: 'What is the capital of Minnesota?'
    }),
    Question.create({
      text: 'What is the capital of Mississippi?'
    }),
    Question.create({
      text: 'What is the capital of Missouri?'
    }),
    Question.create({
      text: 'What is the capital of Montana?'
    }),
    Question.create({
      text: 'What is the capital of Nebraska?'
    }),
    Question.create({
      text: 'What is the capital of Nevada?'
    }),
    Question.create({
      text: 'What is the capital of New Hampshire?'
    }),
    Question.create({
      text: 'What is the capital of New Jersey?'
    }),
    Question.create({
      text: 'What is the capital of New Mexico?'
    }),
    Question.create({
      text: 'What is the capital of New York?'
    }),
    Question.create({
      text: 'What is the capital of North Dakota?'
    }),
    Question.create({
      text: 'What is the capital of North Carolina?'
    }),
    Question.create({
      text: 'What is the capital of Ohio?'
    }),
    Question.create({
      text: 'What is the capital of Oklahoma?'
    }),
    Question.create({
      text: 'What is the capital of Oregon?'
    }),
    Question.create({
      text: 'What is the capital of Pennsylvania?'
    }),
    Question.create({
      text: 'What is the capital of Rhode Island?'
    }),
    Question.create({
      text: 'What is the capital of South Carolina?'
    }),
    Question.create({
      text: 'What is the capital of South Dakota?'
    }),
    Question.create({
      text: 'What is the capital of Tennessee?'
    }),
    Question.create({
      text: 'What is the capital of Texas?'
    }),
    Question.create({
      text: 'What is the capital of Utah?'
    }),
    Question.create({
      text: 'What is the capital of Vermont?'
    }),
    Question.create({
      text: 'What is the capital of Virginia?'
    }),
    Question.create({
      text: 'What is the capital of Washington?'
    }),
    Question.create({
      text: 'What is the capital of West Virginia?'
    }),
    Question.create({
      text: 'What is the capital of Wisconsin?'
    }),
    Question.create({
      text: 'What is the capital of Wyoming?'
    })
  ])

  const [
    Alabama,
    Alaska,
    Arizona,
    Arkansas,
    California,
    Colorado,
    Connecticut,
    Delaware,
    Florida,
    Georgia,
    Hawaii,
    Idaho,
    Illinois,
    Indiana,
    Iowa,
    Kansas,
    Kentucky,
    Louisiana,
    Maine,
    Maryland,
    Massachusetts,
    Michigan,
    Minnesota,
    Mississippi,
    Missouri,
    Montana,
    Nebraska,
    Nevada,
    NewHampshire,
    NewJersey,
    NewMexico,
    NewYork,
    NorthDakota,
    NorthCarolina,
    Ohio,
    Oklahoma,
    Oregon,
    Pennsylvania,
    RhodeIsland,
    SouthCarolina,
    SouthDakota,
    Tennessee,
    Texas,
    Utah,
    Vermont,
    Virginia,
    Washington,
    WestVirginia,
    Wisconsin,
    Wyoming
  ] = questions

  // assign each question to the stateCapitals category
  const associatedToCategory = await Promise.all(questions.map(question => question.setCategory(stateCapitals)))

  console.log(`seeded ${questions.length} state capital questions`)
  console.log(`seeded successfully`)

  //CHOICES
  const alabamaChoices = await Promise.all([
    Choice.create({
      text: 'Montgomery',
      isCorrect: true
    }),
    Choice.create({
      text: 'Mobile'
    }),
    Choice.create({
      text: 'Selma'
    }),
    Choice.create({
      text: 'Birmingham'
    })
  ])

  await Promise.all(alabamaChoices.map(choice => choice.setQuestion(Alabama)))

  const alaskaChoices = await Promise.all([
    Choice.create({
      text: 'Juneau',
      isCorrect: true
    }),
    Choice.create({
      text: 'Anchorage'
    }),
    Choice.create({
      text: 'Fairbanks'
    }),
    Choice.create({
      text: 'Dawson'
    })
  ])

  await Promise.all(alaskaChoices.map(choice => choice.setQuestion(Alaska)))

  const arizonaChoices = await Promise.all([
    Choice.create({
      text: 'Phoenix',
      isCorrect: true
    }),
    Choice.create({
      text: 'Flagstaff'
    }),
    Choice.create({
      text: 'Scottsdale'
    }),
    Choice.create({
      text: 'Tuscon'
    })
  ])

  await Promise.all(arizonaChoices.map(choice => choice.setQuestion(Arizona)))

  const arkansasChoices = await Promise.all([
    Choice.create({
      text: 'Little Rock',
      isCorrect: true
    }),
    Choice.create({
      text: 'Harrison'
    }),
    Choice.create({
      text: 'Clarksville'
    }),
    Choice.create({
      text: 'Newport'
    })
  ])

  await Promise.all(arkansasChoices.map(choice => choice.setQuestion(Arkansas)))

  const californiaChoices = await Promise.all([
    Choice.create({
      text: 'Sacramento',
      isCorrect: true
    }),
    Choice.create({
      text: 'Los Angeles'
    }),
    Choice.create({
      text: 'San Francisco'
    }),
    Choice.create({
      text: 'San Diego'
    })
  ])

  await Promise.all(californiaChoices.map(choice => choice.setQuestion(California)))

  const coloradoChoices = await Promise.all([
    Choice.create({
      text: 'Denver',
      isCorrect: true
    }),
    Choice.create({
      text: 'Boulder'
    }),
    Choice.create({
      text: 'Aspen'
    }),
    Choice.create({
      text: 'Grover'
    })
  ])

  await Promise.all(coloradoChoices.map(choice => choice.setQuestion(Colorado)))

  const connecticutChoices = await Promise.all([
    Choice.create({
      text: 'Hartford',
      isCorrect: true
    }),
    Choice.create({
      text: 'Bridgeport'
    }),
    Choice.create({
      text: 'New Haven'
    }),
    Choice.create({
      text: 'Stamford'
    })
  ])

  await Promise.all(connecticutChoices.map(choice => choice.setQuestion(Connecticut)))

  const delawareChoices = await Promise.all([
    Choice.create({
      text: 'Dover',
      isCorrect: true
    }),
    Choice.create({
      text: 'Wilmington'
    }),
    Choice.create({
      text: 'Kenton'
    }),
    Choice.create({
      text: 'Bridgeville'
    })
  ])

  await Promise.all(delawareChoices.map(choice => choice.setQuestion(Delaware)))

  const floridaChoices = await Promise.all([
    Choice.create({
      text: 'Tallahassee',
      isCorrect: true
    }),
    Choice.create({
      text: 'Fort Lauderdale'
    }),
    Choice.create({
      text: 'Orlando'
    }),
    Choice.create({
      text: 'Tampa'
    })
  ])

  await Promise.all(floridaChoices.map(choice => choice.setQuestion(Florida)))

  const georgiaChoices = await Promise.all([
    Choice.create({
      text: 'Atlanta',
      isCorrect: true
    }),
    Choice.create({
      text: 'Clayton'
    }),
    Choice.create({
      text: 'Decatur'
    }),
    Choice.create({
      text: 'Douglas'
    })
  ])

  await Promise.all(georgiaChoices.map(choice => choice.setQuestion(Georgia)))

  const hawaiiChoices = await Promise.all([
    Choice.create({
      text: 'Honolulu',
      isCorrect: true
    }),
    Choice.create({
      text: 'Oahu'
    }),
    Choice.create({
      text: 'Maui'
    }),
    Choice.create({
      text: 'Waikiki'
    })
  ])

  await Promise.all(hawaiiChoices.map(choice => choice.setQuestion(Hawaii)))

  const idahoChoices = await Promise.all([
    Choice.create({
      text: 'Boise',
      isCorrect: true
    }),
    Choice.create({
      text: 'Idaho Falls'
    }),
    Choice.create({
      text: 'Fairfield'
    }),
    Choice.create({
      text: 'Rigby'
    })
  ])

  await Promise.all(idahoChoices.map(choice => choice.setQuestion(Idaho)))

  const illinoisChoices = await Promise.all([
    Choice.create({
      text: 'Springfield',
      isCorrect: true
    }),
    Choice.create({
      text: 'Chicago'
    }),
    Choice.create({
      text: 'Bloomington'
    }),
    Choice.create({
      text: 'Hillsboro'
    })
  ])

  await Promise.all(illinoisChoices.map(choice => choice.setQuestion(Illinois)))

  const indianaChoices = await Promise.all([
    Choice.create({
      text: 'Indianapolis',
      isCorrect: true
    }),
    Choice.create({
      text: 'Gary'
    }),
    Choice.create({
      text: 'Fort Wayne'
    }),
    Choice.create({
      text: 'Evansville'
    })
  ])

  await Promise.all(indianaChoices.map(choice => choice.setQuestion(Indiana)))

  const iowaChoices = await Promise.all([
    Choice.create({
      text: 'Des Moines',
      isCorrect: true
    }),
    Choice.create({
      text: 'Ames'
    }),
    Choice.create({
      text: 'Clinton'
    }),
    Choice.create({
      text: 'Council Bluffs'
    })
  ])

  await Promise.all(iowaChoices.map(choice => choice.setQuestion(Iowa)))

  const kansasChoices = await Promise.all([
    Choice.create({
      text: 'Topkea',
      isCorrect: true
    }),
    Choice.create({
      text: 'Kansas City'
    }),
    Choice.create({
      text: 'Lawrence'
    }),
    Choice.create({
      text: 'Wichita'
    })
  ])

  await Promise.all(kansasChoices.map(choice => choice.setQuestion(Kansas)))

  const kentuckyChoices = await Promise.all([
    Choice.create({
      text: 'Frankfort',
      isCorrect: true
    }),
    Choice.create({
      text: 'Independence'
    }),
    Choice.create({
      text: 'Liberty'
    }),
    Choice.create({
      text: 'Irvine'
    })
  ])

  await Promise.all(kentuckyChoices.map(choice => choice.setQuestion(Kentucky)))

  const louisianaChoices = await Promise.all([
    Choice.create({
      text: 'Baton Rouge',
      isCorrect: true
    }),
    Choice.create({
      text: 'New Orleans'
    }),
    Choice.create({
      text: 'Arcadia'
    }),
    Choice.create({
      text: 'Columbia'
    })
  ])

  await Promise.all(louisianaChoices.map(choice => choice.setQuestion(Louisiana)))

  const maineChoices = await Promise.all([
    Choice.create({
      text: 'Augusta',
      isCorrect: true
    }),
    Choice.create({
      text: 'Portland'
    }),
    Choice.create({
      text: 'Ellsworth'
    }),
    Choice.create({
      text: 'Bangor'
    })
  ])

  await Promise.all(maineChoices.map(choice => choice.setQuestion(Maine)))

  const marylandChoices = await Promise.all([
    Choice.create({
      text: 'Annapolis',
      isCorrect: true
    }),
    Choice.create({
      text: 'Baltimore'
    }),
    Choice.create({
      text: 'Rockville'
    }),
    Choice.create({
      text: 'Cambridge'
    })
  ])

  await Promise.all(marylandChoices.map(choice => choice.setQuestion(Maryland)))

  const massachusettsChoices = await Promise.all([
    Choice.create({
      text: 'Boston',
      isCorrect: true
    }),
    Choice.create({
      text: 'Salem'
    }),
    Choice.create({
      text: 'Worcester'
    }),
    Choice.create({
      text: 'Springfield'
    })
  ])

  await Promise.all(massachusettsChoices.map(choice => choice.setQuestion(Massachusetts)))

  const michiganChoices = await Promise.all([
    Choice.create({
      text: 'Lansing',
      isCorrect: true
    }),
    Choice.create({
      text: 'Dearborn'
    }),
    Choice.create({
      text: 'Grand Rapids'
    }),
    Choice.create({
      text: 'Ann Arbor'
    })
  ])

  await Promise.all(michiganChoices.map(choice => choice.setQuestion(Michigan)))

  const minnesotaChoices = await Promise.all([
    Choice.create({
      text: 'Saint Paul',
      isCorrect: true
    }),
    Choice.create({
      text: 'Minneapolis'
    }),
    Choice.create({
      text: 'Duluth'
    }),
    Choice.create({
      text: 'Rochester'
    })
  ])

  await Promise.all(minnesotaChoices.map(choice => choice.setQuestion(Minnesota)))

  const mississippiChoices = await Promise.all([
    Choice.create({
      text: 'Jackson',
      isCorrect: true
    }),
    Choice.create({
      text: 'Biloxi'
    }),
    Choice.create({
      text: 'Columbus'
    }),
    Choice.create({
      text: 'Louisville'
    })
  ])

  await Promise.all(mississippiChoices.map(choice => choice.setQuestion(Mississippi)))

  const missouriChoices = await Promise.all([
    Choice.create({
      text: 'Jefferson City',
      isCorrect: true
    }),
    Choice.create({
      text: 'Kansas City'
    }),
    Choice.create({
      text: 'St. Louis'
    }),
    Choice.create({
      text: 'Columbia'
    })
  ])

  await Promise.all(missouriChoices.map(choice => choice.setQuestion(Missouri)))

  const montanaChoices = await Promise.all([
    Choice.create({
      text: 'Helena',
      isCorrect: true
    }),
    Choice.create({
      text: 'Billings'
    }),
    Choice.create({
      text: 'Bozeman'
    }),
    Choice.create({
      text: 'Missoula'
    })
  ])

  await Promise.all(montanaChoices.map(choice => choice.setQuestion(Montana)))

  const nebraskaChoices = await Promise.all([
    Choice.create({
      text: 'Lincoln',
      isCorrect: true
    }),
    Choice.create({
      text: 'Omaha'
    }),
    Choice.create({
      text: 'Fremont'
    }),
    Choice.create({
      text: 'Columbus'
    })
  ])

  await Promise.all(nebraskaChoices.map(choice => choice.setQuestion(Nebraska)))

  const nevadaChoices = await Promise.all([
    Choice.create({
      text: 'Carson City',
      isCorrect: true
    }),
    Choice.create({
      text: 'Las Vegas'
    }),
    Choice.create({
      text: 'Ely'
    }),
    Choice.create({
      text: 'Reno'
    })
  ])

  await Promise.all(nevadaChoices.map(choice => choice.setQuestion(Nevada)))

  const newHampshireChoices = await Promise.all([
    Choice.create({
      text: 'Concord',
      isCorrect: true
    }),
    Choice.create({
      text: 'Dover'
    }),
    Choice.create({
      text: 'Manchester'
    }),
    Choice.create({
      text: 'Nashua'
    })
  ])

  await Promise.all(newHampshireChoices.map(choice => choice.setQuestion(NewHampshire)))

  const newJerseyChoices = await Promise.all([
    Choice.create({
      text: 'Trenton',
      isCorrect: true
    }),
    Choice.create({
      text: 'Camden'
    }),
    Choice.create({
      text: 'Newark'
    }),
    Choice.create({
      text: 'Jersey City'
    })
  ])

  await Promise.all(newJerseyChoices.map(choice => choice.setQuestion(NewJersey)))

  const newMexicoChoices = await Promise.all([
    Choice.create({
      text: 'Santa Fe',
      isCorrect: true
    }),
    Choice.create({
      text: 'El Paso'
    }),
    Choice.create({
      text: 'Albuquerque'
    }),
    Choice.create({
      text: 'Carlsbad'
    })
  ])

  await Promise.all(newMexicoChoices.map(choice => choice.setQuestion(NewMexico)))

  const newYorkChoices = await Promise.all([
    Choice.create({
      text: 'Albany',
      isCorrect: true
    }),
    Choice.create({
      text: 'Rochester'
    }),
    Choice.create({
      text: 'New York'
    }),
    Choice.create({
      text: 'Buffalo'
    })
  ])

  await Promise.all(newYorkChoices.map(choice => choice.setQuestion(NewYork)))

  const northDakotaChoices = await Promise.all([
    Choice.create({
      text: 'Bismarck',
      isCorrect: true
    }),
    Choice.create({
      text: 'Fargo'
    }),
    Choice.create({
      text: 'Grand Forks'
    }),
    Choice.create({
      text: 'Minot'
    })
  ])

  await Promise.all(northDakotaChoices.map(choice => choice.setQuestion(NorthDakota)))

  const northCarolinaChoices = await Promise.all([
    Choice.create({
      text: 'Raleigh',
      isCorrect: true
    }),
    Choice.create({
      text: 'Charlotte'
    }),
    Choice.create({
      text: 'Chapel Hill'
    }),
    Choice.create({
      text: 'Greensboro'
    })
  ])

  await Promise.all(northCarolinaChoices.map(choice => choice.setQuestion(NorthCarolina)))

  const ohioChoices = await Promise.all([
    Choice.create({
      text: 'Columbus',
      isCorrect: true
    }),
    Choice.create({
      text: 'Cleveland'
    }),
    Choice.create({
      text: 'Cincinnati'
    }),
    Choice.create({
      text: 'Canton'
    })
  ])

  await Promise.all(ohioChoices.map(choice => choice.setQuestion(Ohio)))

  const oklahomaChoices = await Promise.all([
    Choice.create({
      text: 'Oklahoma City',
      isCorrect: true
    }),
    Choice.create({
      text: 'Tulsa'
    }),
    Choice.create({
      text: 'Norman'
    }),
    Choice.create({
      text: 'Claremore'
    })
  ])

  await Promise.all(oklahomaChoices.map(choice => choice.setQuestion(Oklahoma)))

  const oregonChoices = await Promise.all([
    Choice.create({
      text: 'Salem',
      isCorrect: true
    }),
    Choice.create({
      text: 'Portland'
    }),
    Choice.create({
      text: 'Eugene'
    }),
    Choice.create({
      text: 'Oregon City'
    })
  ])

  await Promise.all(oregonChoices.map(choice => choice.setQuestion(Oregon)))

  const pennsylvaniaChoices = await Promise.all([
    Choice.create({
      text: 'Harrisburg',
      isCorrect: true
    }),
    Choice.create({
      text: 'Philadelphia'
    }),
    Choice.create({
      text: 'Pittsburgh'
    }),
    Choice.create({
      text: 'Erie'
    })
  ])

  await Promise.all(pennsylvaniaChoices.map(choice => choice.setQuestion(Pennsylvania)))

  const rhodeIslandChoices = await Promise.all([
    Choice.create({
      text: 'Providence',
      isCorrect: true
    }),
    Choice.create({
      text: 'Newport'
    }),
    Choice.create({
      text: 'Warwick'
    }),
    Choice.create({
      text: 'Cranston'
    })
  ])

  await Promise.all(rhodeIslandChoices.map(choice => choice.setQuestion(RhodeIsland)))

  const southCarolinaChoices = await Promise.all([
    Choice.create({
      text: 'Columbia',
      isCorrect: true
    }),
    Choice.create({
      text: 'Charleston'
    }),
    Choice.create({
      text: 'Greenville'
    }),
    Choice.create({
      text: 'Marion'
    })
  ])

  await Promise.all(southCarolinaChoices.map(choice => choice.setQuestion(SouthCarolina)))

  const southDakotaChoices = await Promise.all([
    Choice.create({
      text: 'Pierre',
      isCorrect: true
    }),
    Choice.create({
      text: 'Sioux Falls'
    }),
    Choice.create({
      text: 'Rapid City'
    }),
    Choice.create({
      text: 'Alexandria'
    })
  ])

  await Promise.all(southDakotaChoices.map(choice => choice.setQuestion(SouthDakota)))

  const tennesseeChoices = await Promise.all([
    Choice.create({
      text: 'Nashville',
      isCorrect: true
    }),
    Choice.create({
      text: 'Chattanooga'
    }),
    Choice.create({
      text: 'Greeneville'
    }),
    Choice.create({
      text: 'Knoxville'
    })
  ])

  await Promise.all(tennesseeChoices.map(choice => choice.setQuestion(Tennessee)))

  const texasChoices = await Promise.all([
    Choice.create({
      text: 'Austin',
      isCorrect: true
    }),
    Choice.create({
      text: 'Dallas'
    }),
    Choice.create({
      text: 'Houston'
    }),
    Choice.create({
      text: 'Galveston'
    })
  ])

  await Promise.all(texasChoices.map(choice => choice.setQuestion(Texas)))

  const utahChoices = await Promise.all([
    Choice.create({
      text: 'Salt Lake City',
      isCorrect: true
    }),
    Choice.create({
      text: 'Farmington'
    }),
    Choice.create({
      text: 'Fillmore'
    }),
    Choice.create({
      text: 'St. George'
    })
  ])

  await Promise.all(utahChoices.map(choice => choice.setQuestion(Utah)))

  const vermontChoices = await Promise.all([
    Choice.create({
      text: 'Montpelier',
      isCorrect: true
    }),
    Choice.create({
      text: 'Burlington'
    }),
    Choice.create({
      text: 'Bennington'
    }),
    Choice.create({
      text: 'Newport'
    })
  ])

  await Promise.all(vermontChoices.map(choice => choice.setQuestion(Vermont)))

  const virginiaChoices = await Promise.all([
    Choice.create({
      text: 'Richmond',
      isCorrect: true
    }),
    Choice.create({
      text: 'Jamestown'
    }),
    Choice.create({
      text: 'Williamsburg'
    }),
    Choice.create({
      text: 'Salem'
    })
  ])

  await Promise.all(virginiaChoices.map(choice => choice.setQuestion(Virginia)))

  const washingtonChoices = await Promise.all([
    Choice.create({
      text: 'Olympia',
      isCorrect: true
    }),
    Choice.create({
      text: 'Seattle'
    }),
    Choice.create({
      text: 'Tacoma'
    }),
    Choice.create({
      text: 'Vancouver'
    })
  ])

  await Promise.all(washingtonChoices.map(choice => choice.setQuestion(Washington)))

  const westVirginiaChoices = await Promise.all([
    Choice.create({
      text: 'Charleston',
      isCorrect: true
    }),
    Choice.create({
      text: 'Huntington'
    }),
    Choice.create({
      text: 'Fairmont'
    }),
    Choice.create({
      text: 'Clarksburg'
    })
  ])

  await Promise.all(westVirginiaChoices.map(choice => choice.setQuestion(WestVirginia)))

  const wisconsinChoices = await Promise.all([
    Choice.create({
      text: 'Madison',
      isCorrect: true
    }),
    Choice.create({
      text: 'Milwaukee'
    }),
    Choice.create({
      text: 'Green Bay'
    }),
    Choice.create({
      text: 'Eau Claire'
    })
  ])

  await Promise.all(wisconsinChoices.map(choice => choice.setQuestion(Wisconsin)))

  const wyomingChoices = await Promise.all([
    Choice.create({
      text: 'Cheyenne',
      isCorrect: true
    }),
    Choice.create({
      text: 'Jackson'
    }),
    Choice.create({
      text: 'Casper'
    }),
    Choice.create({
      text: 'Rock Springs'
    })
  ])

  await Promise.all(wyomingChoices.map(choice => choice.setQuestion(Wyoming)))

  console.log(`seeded ${200} state capital choices`)
  console.log(`seeded successfully`)


  // FULLSTACK PETS QUESTIONS
  const petQuestions = await Promise.all([
    Question.create({
      text: 'What kind of dog is Cody?'
    }),
    Question.create({
      text: 'What kind of animal is Fira?'
    }),
    Question.create({
      text: "Who is Bruno's human?"
    }),
    Question.create({
      text: "What is David Yang's verdict on pugs?"
    }),
    Question.create({
      text: "Who wants to get a bun?"
    })
  ])

  /*
  await Promise.all(petQuestions.map(ques => ques.setCategory(fullstackPets)))

  const [codyQues, firaQues, brunoQues, davidQues, bunQues] = questions

  // FULLSTACK PETS CHOICES

  const codyChoices = await Promise.all([
    Choice.create({
      text: 'a majestic pug',
      isCorrect: true
    }),
    Choice.create({
      text: 'a regal goldendoodle'
    }),
    Choice.create({
      text: 'a wise bloodhound'
    }),
    Choice.create({
      text: 'a confident chihuahua'
    })
  ])

  await Promise.all(codyChoices.map(choice => choice.setQuestion(codyQues)))

  const firaChoices = await Promise.all([
    Choice.create({
      text: 'Snake',
      isCorrect: true
    }),
    Choice.create({
      text: 'Parrot'
    }),
    Choice.create({
      text: 'Guniea Pig'
    }),
    Choice.create({
      text: 'Sloth'
    })
  ])

  await Promise.all(firaChoices.map(choice => choice.setQuestion(firaQues)))

  const brunoChoices = await Promise.all([
    Choice.create({
      text: 'Aleks'
    }),
    Choice.create({
      text: 'John'
    }),
    Choice.create({
      text: 'Tom'
    }),
    Choice.create({
      text: 'Dan'
    })
  ])

  await Promise.all(brunoChoices.map(choice => choice.setQuestion(brunoQues)))

  const davidChoices = await Promise.all([
    Choice.create({
      text: 'not actually adorable'
    }),
    Choice.create({
      text: 'completely breathtaking'
    }),
    Choice.create({
      text: 'a bit suspicious'
    }),
    Choice.create({
      text: 'a bit intimidating'
    })
  ])

  await Promise.all(davidChoices.map(choice => choice.setQuestion(davidQues)))

  const bunChoices = await Promise.all([
    Choice.create({
      text: 'Jess'
    }),
    Choice.create({
      text: 'Chris'
    }),
    Choice.create({
      text: 'Everyone',
      isCorrect: true
    }),
    Choice.create({
      text: 'Nimit'
    })
  ])

  await Promise.all(bunChoices.map(choice => choice.setQuestion(bunQues)))
  */

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
