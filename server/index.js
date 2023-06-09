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

app.post('/send', async (request, response) => {
  let data = request.body;
  let user = await checkIfUserExists(data.id)

  if (user) { // user is present and registered
    response.send(await isUserUnderAge(data, user, 10))    
  } else {
    response.send("unregistered");
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


// start mail sender every 15 seconds
setInterval(sendEmail, 15000);
