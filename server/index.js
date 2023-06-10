const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const { checkIfUserExists, isUserUnderAge } = require('./UserHandler')
const { sendEmail } = require('./SendEmail')

app.use(bodyParser());
app.use(morgan());

// Enable CORS for all routes
app.use(cors());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/', async (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
})

app.get('/test', async (request, response) => {
  response.send("Working");
})

app.post('/send', async (request, response) => {
  let data = request.body;
  console.log(data)
  let user = await checkIfUserExists(data.id)
  if (user) { // user is present and registered
    let ageRes = await isUserUnderAge(data, user, 10);
    if (ageRes === "overAge") {
      response.sendFile(__dirname + '/views/error-overage.html');
    } else {
      response.sendFile(__dirname + '/views/message-sent.html');
    }   
  } else {
    response.sendFile(__dirname + '/views/error-unregistered.html');
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// start mail sender every 15 seconds
setInterval(sendEmail, 15000);
