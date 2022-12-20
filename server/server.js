const path = require('path');
const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const port = 3000

//require routers
//const router = require('')

app.use(cors())
app.use(express.json());

//define route handlers for different http route endpoints
//example:
app.use('/tamagotchi', routes)


// app.get('/', (req, res) => {
//   res.send('Hello World from server!')
// })

/**
 * handle parsing request body?
 */
// app.use(express.json());


// catch-all route handler for any requests to an unknown route
app.use((req, res) => {
    console.log('catch-all route handler deployed');
    res.sendStatus(404);
  });

//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' }, 
    };
    const errorObj = Object.assign(defaultErr, err);
    console.log('ERROR: ', errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(port, () => {
  console.log(`Tamagotchi listening on port ${port}`)
})