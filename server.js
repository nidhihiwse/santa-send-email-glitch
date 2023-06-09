// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const { API_BASE_URL } = require('./Constants')
const { checkIfUserExists, isUserUnderAge } = require('./server/UserHandler')

app.use(bodyParser());
app.use(morgan());

// Enable CORS for all routes
app.use(cors());


// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/send', (request, response) => {
  response.send("SS");
});

app.post('/send', async (request, response) => {
  let data = request.body;
  let user = await checkIfUserExists(data.id)

  if (user) { // user is present and registered
    response.send(await isUserUnderAge(user, 10))    
  } else {
    response.send("unregistered");
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
