# POINT-IT-OUT:

Point-it-out is a augmented-reality review game you can play alone or with a friend. It works on any computer with a webcam. Users race against the clock to answer as many questions as possible, earning points (and the possibility to sabotage your opponent!) along the way. Teachers, students, and game night hosts can create their own quizzes tailored to their needs. To check it out for yourself, head on over to https://point-it-out.herokuapp.com

#### PREREQUESITES:
After forking and cloning the project, run 'npm install' to download all the necessary dependencies. You must create two databases for the project: pointItOut and pointItOut-test.

#### GETTING STARTED:
The command 'npm run start-dev' will run the app in development mode on your local machine. To run the server and/or webpack separately, use 'npm run start-server' and 'npm run build-client.'

#### SCREENSHOT:
![screenshot1](./public/images/screenshot1.png)


#### RUNNING TESTS:
All test files end with .spec.js. The command 'npm test' will run all tests for the project. You must have a database named pointItOut-test in order to run the test files.

## AUTHORS:
Alexandra Ash,
Amy Berg,
Kate Dubitski Kopitchinski,
Sivan Gilead

## Built with:
Node, Express, Sequelize, PostgreSQL, React, Redux, React-Redux, React-Router, React-Konva, Opentak

Diffy.js was used for movement tracking: https://www.npmjs.com/package/diffyjs



## Customize

Now that you've got the code, follow these steps to get acclimated:

* Update project name and description in `package.json` and `.travis.yml` files
* `npm install`, or `yarn install` - whatever you're into
* Create two postgres databases: `boilermaker` and `boilermaker-test` (you can substitute these with the name of your own application - just be sure to go through and change the `package.json` and `.travis.yml` to refer to the new name)
  * By default, running `npm test` will use `boilermaker-test`, while regular development uses `boilermaker`
* Create a file called `secrets.js` in the project root

  * This file is `.gitignore`'d, and will _only_ be required in your _development_ environment
  * Its purpose is to attach the secret env variables that you'll use while developing
  * However, it's **very** important that you **not** push it to Github! Otherwise, _prying eyes_ will find your secret API keys!
  * It might look like this:

  ```
    process.env.GOOGLE_CLIENT_ID = 'hush hush'
    process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
    process.env.GOOGLE_CALLBACK = '/auth/google/callback'
  ```

* To use OAuth with Google, complete the step above with a real client ID and client secret from Google
  * You can get them here: https://console.developers.google.com/apis/credentials
* Finally, complete the section below to set up your linter
