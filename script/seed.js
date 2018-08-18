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
    })
  ])

  const [stateCapitals] = categories
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
      theQuestion: 'What is the capital of Alabama?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Alaska?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Arizona?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Arkansas?'
    }),
    Question.create({
      theQuestion: 'What is the capital of California?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Colorado?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Connecticut?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Delaware?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Florida?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Georgia?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Hawaii?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Idaho?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Illinois?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Indiana?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Iowa?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Kansas?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Kentucky?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Louisiana?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Maine?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Maryland?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Massachusetts?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Michigan?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Minnesota?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Mississippi?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Missouri?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Montana?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Nebraska?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Nevada?'
    }),
    Question.create({
      theQuestion: 'What is the capital of New Hampshire?'
    }),
    Question.create({
      theQuestion: 'What is the capital of New Jersey?'
    }),
    Question.create({
      theQuestion: 'What is the capital of New Mexico?'
    }),
    Question.create({
      theQuestion: 'What is the capital of New York?'
    }),
    Question.create({
      theQuestion: 'What is the capital of North Dakota?'
    }),
    Question.create({
      theQuestion: 'What is the capital of North Carolina?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Ohio?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Oklahoma?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Oregon?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Pennsylvania?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Rhode Island?'
    }),
    Question.create({
      theQuestion: 'What is the capital of South Carolina?'
    }),
    Question.create({
      theQuestion: 'What is the capital of South Dakota?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Tennessee?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Texas?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Utah?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Vermont?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Virginia?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Washington?'
    }),
    Question.create({
      theQuestion: 'What is the capital of West Virginia?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Wisconsin?'
    }),
    Question.create({
      theQuestion: 'What is the capital of Wyoming?'
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

  console.log(`seeded ${questions.length} questions`)
  console.log(`seeded successfully`)

  //CHOICES
  const alabamaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Montgomery',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Mobile'
    }),
    Choice.create({
      theChoice: 'Selma'
    }),
    Choice.create({
      theChoice: 'Birmingham'
    })
  ])

  await Promise.all(alabamaChoices.map(choice => choice.setQuestion(Alabama)))

  const alaskaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Juneau',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Anchorage'
    }),
    Choice.create({
      theChoice: 'Fairbanks'
    }),
    Choice.create({
      theChoice: 'Dawson'
    })
  ])

  await Promise.all(alaskaChoices.map(choice => choice.setQuestion(Alaska)))

  const arizonaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Phoenix',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Flagstaff'
    }),
    Choice.create({
      theChoice: 'Scottsdale'
    }),
    Choice.create({
      theChoice: 'Tuscon'
    })
  ])

  await Promise.all(arizonaChoices.map(choice => choice.setQuestion(Arizona)))

  const arkansasChoices = await Promise.all([
    Choice.create({
      theChoice: 'Little Rock',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Harrison'
    }),
    Choice.create({
      theChoice: 'Clarksville'
    }),
    Choice.create({
      theChoice: 'Newport'
    })
  ])

  await Promise.all(arkansasChoices.map(choice => choice.setQuestion(Arkansas)))

  const californiaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Sacramento',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Los Angeles'
    }),
    Choice.create({
      theChoice: 'San Francisco'
    }),
    Choice.create({
      theChoice: 'San Diego'
    })
  ])

  await Promise.all(californiaChoices.map(choice => choice.setQuestion(California)))

  const coloradoChoices = await Promise.all([
    Choice.create({
      theChoice: 'Denver',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Boulder'
    }),
    Choice.create({
      theChoice: 'Aspen'
    }),
    Choice.create({
      theChoice: 'Grover'
    })
  ])

  await Promise.all(coloradoChoices.map(choice => choice.setQuestion(Colorado)))

  const connecticutChoices = await Promise.all([
    Choice.create({
      theChoice: 'Hartford',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Bridgeport'
    }),
    Choice.create({
      theChoice: 'New Haven'
    }),
    Choice.create({
      theChoice: 'Stamford'
    })
  ])

  await Promise.all(connecticutChoices.map(choice => choice.setQuestion(Connecticut)))

  const delawareChoices = await Promise.all([
    Choice.create({
      theChoice: 'Dover',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Wilmington'
    }),
    Choice.create({
      theChoice: 'Kenton'
    }),
    Choice.create({
      theChoice: 'Bridgeville'
    })
  ])

  await Promise.all(delawareChoices.map(choice => choice.setQuestion(Delaware)))

  const floridaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Tallahassee',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Fort Lauderdale'
    }),
    Choice.create({
      theChoice: 'Orlando'
    }),
    Choice.create({
      theChoice: 'Tampa'
    })
  ])

  await Promise.all(floridaChoices.map(choice => choice.setQuestion(Florida)))

  const georgiaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Atlanta',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Clayton'
    }),
    Choice.create({
      theChoice: 'Decatur'
    }),
    Choice.create({
      theChoice: 'Douglas'
    })
  ])

  await Promise.all(georgiaChoices.map(choice => choice.setQuestion(Georgia)))

  const hawaiiChoices = await Promise.all([
    Choice.create({
      theChoice: 'Honolulu',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Oahu'
    }),
    Choice.create({
      theChoice: 'Maui'
    }),
    Choice.create({
      theChoice: 'Waikiki'
    })
  ])

  await Promise.all(hawaiiChoices.map(choice => choice.setQuestion(Hawaii)))

  const idahoChoices = await Promise.all([
    Choice.create({
      theChoice: 'Boise',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Idaho Falls'
    }),
    Choice.create({
      theChoice: 'Fairfield'
    }),
    Choice.create({
      theChoice: 'Rigby'
    })
  ])

  await Promise.all(idahoChoices.map(choice => choice.setQuestion(Idaho)))

  const illinoisChoices = await Promise.all([
    Choice.create({
      theChoice: 'Springfield',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Chicago'
    }),
    Choice.create({
      theChoice: 'Bloomington'
    }),
    Choice.create({
      theChoice: 'Hillsboro'
    })
  ])

  await Promise.all(illinoisChoices.map(choice => choice.setQuestion(Illinois)))

  const indianaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Indianapolis',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Gary'
    }),
    Choice.create({
      theChoice: 'Fort Wayne'
    }),
    Choice.create({
      theChoice: 'Evansville'
    })
  ])

  await Promise.all(indianaChoices.map(choice => choice.setQuestion(Indiana)))

  const iowaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Des Moines',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Ames'
    }),
    Choice.create({
      theChoice: 'Clinton'
    }),
    Choice.create({
      theChoice: 'Council Bluffs'
    })
  ])

  await Promise.all(iowaChoices.map(choice => choice.setQuestion(Iowa)))

  const kansasChoices = await Promise.all([
    Choice.create({
      theChoice: 'Topkea',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Kansas City'
    }),
    Choice.create({
      theChoice: 'Lawrence'
    }),
    Choice.create({
      theChoice: 'Wichita'
    })
  ])

  await Promise.all(kansasChoices.map(choice => choice.setQuestion(Kansas)))

  const kentuckyChoices = await Promise.all([
    Choice.create({
      theChoice: 'Frankfort',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Independence'
    }),
    Choice.create({
      theChoice: 'Liberty'
    }),
    Choice.create({
      theChoice: 'Irvine'
    })
  ])

  await Promise.all(kentuckyChoices.map(choice => choice.setQuestion(Kentucky)))

  const louisianaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Baton Rouge',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'New Orleans'
    }),
    Choice.create({
      theChoice: 'Arcadia'
    }),
    Choice.create({
      theChoice: 'Columbia'
    })
  ])

  await Promise.all(louisianaChoices.map(choice => choice.setQuestion(Louisiana)))

  const maineChoices = await Promise.all([
    Choice.create({
      theChoice: 'Augusta',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Portland'
    }),
    Choice.create({
      theChoice: 'Ellsworth'
    }),
    Choice.create({
      theChoice: 'Bangor'
    })
  ])

  await Promise.all(maineChoices.map(choice => choice.setQuestion(Maine)))

  const marylandChoices = await Promise.all([
    Choice.create({
      theChoice: 'Annapolis',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Baltimore'
    }),
    Choice.create({
      theChoice: 'Rockville'
    }),
    Choice.create({
      theChoice: 'Cambridge'
    })
  ])

  await Promise.all(marylandChoices.map(choice => choice.setQuestion(Maryland)))

  const massachusettsChoices = await Promise.all([
    Choice.create({
      theChoice: 'Boston',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Salem'
    }),
    Choice.create({
      theChoice: 'Worcester'
    }),
    Choice.create({
      theChoice: 'Springfield'
    })
  ])

  await Promise.all(massachusettsChoices.map(choice => choice.setQuestion(Massachusetts)))

  const michiganChoices = await Promise.all([
    Choice.create({
      theChoice: 'Lansing',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Dearborn'
    }),
    Choice.create({
      theChoice: 'Grand Rapids'
    }),
    Choice.create({
      theChoice: 'Ann Arbor'
    })
  ])

  await Promise.all(michiganChoices.map(choice => choice.setQuestion(Michigan)))

  const minnesotaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Saint Paul',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Minneapolis'
    }),
    Choice.create({
      theChoice: 'Duluth'
    }),
    Choice.create({
      theChoice: 'Rochester'
    })
  ])

  await Promise.all(minnesotaChoices.map(choice => choice.setQuestion(Minnesota)))

  const mississippiChoices = await Promise.all([
    Choice.create({
      theChoice: 'Jackson',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Biloxi'
    }),
    Choice.create({
      theChoice: 'Columbus'
    }),
    Choice.create({
      theChoice: 'Louisville'
    })
  ])

  await Promise.all(mississippiChoices.map(choice => choice.setQuestion(Mississippi)))

  const missouriChoices = await Promise.all([
    Choice.create({
      theChoice: 'Jefferson City',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Kansas City'
    }),
    Choice.create({
      theChoice: 'St. Louis'
    }),
    Choice.create({
      theChoice: 'Columbia'
    })
  ])

  await Promise.all(missouriChoices.map(choice => choice.setQuestion(Missouri)))

  const montanaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Helena',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Billings'
    }),
    Choice.create({
      theChoice: 'Bozeman'
    }),
    Choice.create({
      theChoice: 'Missoula'
    })
  ])

  await Promise.all(montanaChoices.map(choice => choice.setQuestion(Montana)))

  const nebraskaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Lincoln',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Omaha'
    }),
    Choice.create({
      theChoice: 'Fremont'
    }),
    Choice.create({
      theChoice: 'Columbus'
    })
  ])

  await Promise.all(nebraskaChoices.map(choice => choice.setQuestion(Nebraska)))

  const nevadaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Carson City',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Las Vegas'
    }),
    Choice.create({
      theChoice: 'Ely'
    }),
    Choice.create({
      theChoice: 'Reno'
    })
  ])

  await Promise.all(nevadaChoices.map(choice => choice.setQuestion(Nevada)))

  const newHampshireChoices = await Promise.all([
    Choice.create({
      theChoice: 'Concord',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Dover'
    }),
    Choice.create({
      theChoice: 'Manchester'
    }),
    Choice.create({
      theChoice: 'Nashua'
    })
  ])

  await Promise.all(newHampshireChoices.map(choice => choice.setQuestion(NewHampshire)))

  const newJerseyChoices = await Promise.all([
    Choice.create({
      theChoice: 'Trenton',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Camden'
    }),
    Choice.create({
      theChoice: 'Newark'
    }),
    Choice.create({
      theChoice: 'Jersey City'
    })
  ])

  await Promise.all(newJerseyChoices.map(choice => choice.setQuestion(NewJersey)))

  const newMexicoChoices = await Promise.all([
    Choice.create({
      theChoice: 'Santa Fe',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'El Paso'
    }),
    Choice.create({
      theChoice: 'Albuquerque'
    }),
    Choice.create({
      theChoice: 'Carlsbad'
    })
  ])

  await Promise.all(newMexicoChoices.map(choice => choice.setQuestion(NewMexico)))

  const newYorkChoices = await Promise.all([
    Choice.create({
      theChoice: 'Albany',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Rochester'
    }),
    Choice.create({
      theChoice: 'New York'
    }),
    Choice.create({
      theChoice: 'Buffalo'
    })
  ])

  await Promise.all(newYorkChoices.map(choice => choice.setQuestion(NewYork)))

  const northDakotaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Bismarck',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Fargo'
    }),
    Choice.create({
      theChoice: 'Grand Forks'
    }),
    Choice.create({
      theChoice: 'Minot'
    })
  ])

  await Promise.all(northDakotaChoices.map(choice => choice.setQuestion(NorthDakota)))

  const northCarolinaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Raleigh',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Charlotte'
    }),
    Choice.create({
      theChoice: 'Chapel Hill'
    }),
    Choice.create({
      theChoice: 'Greensboro'
    })
  ])

  await Promise.all(northCarolinaChoices.map(choice => choice.setQuestion(NorthCarolina)))

  const ohioChoices = await Promise.all([
    Choice.create({
      theChoice: 'Columbus',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Cleveland'
    }),
    Choice.create({
      theChoice: 'Cincinnati'
    }),
    Choice.create({
      theChoice: 'Canton'
    })
  ])

  await Promise.all(ohioChoices.map(choice => choice.setQuestion(Ohio)))

  const oklahomaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Oklahoma City',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Tulsa'
    }),
    Choice.create({
      theChoice: 'Norman'
    }),
    Choice.create({
      theChoice: 'Claremore'
    })
  ])

  await Promise.all(oklahomaChoices.map(choice => choice.setQuestion(Oklahoma)))

  const oregonChoices = await Promise.all([
    Choice.create({
      theChoice: 'Salem',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Portland'
    }),
    Choice.create({
      theChoice: 'Eugene'
    }),
    Choice.create({
      theChoice: 'Oregon City'
    })
  ])

  await Promise.all(oregonChoices.map(choice => choice.setQuestion(Oregon)))

  const pennsylvaniaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Harrisburg',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Philadelphia'
    }),
    Choice.create({
      theChoice: 'Pittsburgh'
    }),
    Choice.create({
      theChoice: 'Erie'
    })
  ])

  await Promise.all(pennsylvaniaChoices.map(choice => choice.setQuestion(Pennsylvania)))

  const rhodeIslandChoices = await Promise.all([
    Choice.create({
      theChoice: 'Providence',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Newport'
    }),
    Choice.create({
      theChoice: 'Warwick'
    }),
    Choice.create({
      theChoice: 'Cranston'
    })
  ])

  await Promise.all(rhodeIslandChoices.map(choice => choice.setQuestion(RhodeIsland)))

  const southCarolinaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Columbia',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Charleston'
    }),
    Choice.create({
      theChoice: 'Greenville'
    }),
    Choice.create({
      theChoice: 'Marion'
    })
  ])

  await Promise.all(southCarolinaChoices.map(choice => choice.setQuestion(SouthCarolina)))

  const southDakotaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Pierre',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Sioux Falls'
    }),
    Choice.create({
      theChoice: 'Rapid City'
    }),
    Choice.create({
      theChoice: 'Alexandria'
    })
  ])

  await Promise.all(southDakotaChoices.map(choice => choice.setQuestion(SouthDakota)))

  const tennesseeChoices = await Promise.all([
    Choice.create({
      theChoice: 'Nashville',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Chattanooga'
    }),
    Choice.create({
      theChoice: 'Greeneville'
    }),
    Choice.create({
      theChoice: 'Knoxville'
    })
  ])

  await Promise.all(tennesseeChoices.map(choice => choice.setQuestion(Tennessee)))

  const texasChoices = await Promise.all([
    Choice.create({
      theChoice: 'Austin',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Dallas'
    }),
    Choice.create({
      theChoice: 'Houston'
    }),
    Choice.create({
      theChoice: 'Galveston'
    })
  ])

  await Promise.all(texasChoices.map(choice => choice.setQuestion(Texas)))

  const utahChoices = await Promise.all([
    Choice.create({
      theChoice: 'Salt Lake City',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Farmington'
    }),
    Choice.create({
      theChoice: 'Fillmore'
    }),
    Choice.create({
      theChoice: 'St. George'
    })
  ])

  await Promise.all(utahChoices.map(choice => choice.setQuestion(Utah)))

  const vermontChoices = await Promise.all([
    Choice.create({
      theChoice: 'Montpelier',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Burlington'
    }),
    Choice.create({
      theChoice: 'Bennington'
    }),
    Choice.create({
      theChoice: 'Newport'
    })
  ])

  await Promise.all(vermontChoices.map(choice => choice.setQuestion(Vermont)))

  const virginiaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Richmond',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Jamestown'
    }),
    Choice.create({
      theChoice: 'Williamsburg'
    }),
    Choice.create({
      theChoice: 'Salem'
    })
  ])

  await Promise.all(virginiaChoices.map(choice => choice.setQuestion(Virginia)))

  const washingtonChoices = await Promise.all([
    Choice.create({
      theChoice: 'Olympia',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Seattle'
    }),
    Choice.create({
      theChoice: 'Tacoma'
    }),
    Choice.create({
      theChoice: 'Vancouver'
    })
  ])

  await Promise.all(washingtonChoices.map(choice => choice.setQuestion(Washington)))

  const westVirginiaChoices = await Promise.all([
    Choice.create({
      theChoice: 'Charleston',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Huntington'
    }),
    Choice.create({
      theChoice: 'Fairmont'
    }),
    Choice.create({
      theChoice: 'Clarksburg'
    })
  ])

  await Promise.all(westVirginiaChoices.map(choice => choice.setQuestion(WestVirginia)))

  const wisconsinChoices = await Promise.all([
    Choice.create({
      theChoice: 'Madison',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Milwaukee'
    }),
    Choice.create({
      theChoice: 'Green Bay'
    }),
    Choice.create({
      theChoice: 'Eau Claire'
    })
  ])

  await Promise.all(wisconsinChoices.map(choice => choice.setQuestion(Wisconsin)))

  const wyomingChoices = await Promise.all([
    Choice.create({
      theChoice: 'Cheyenne',
      isCorrect: true
    }),
    Choice.create({
      theChoice: 'Jackson'
    }),
    Choice.create({
      theChoice: 'Casper'
    }),
    Choice.create({
      theChoice: 'Rock Springs'
    })
  ])

  await Promise.all(wyomingChoices.map(choice => choice.setQuestion(Wyoming)))

  console.log(`seeded ${200} choices`)
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
