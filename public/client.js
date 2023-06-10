
// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');


// define variables that reference elements on our page
const santaForm = document.forms[0];

// listen for the form to be submitted and add a new dream when it is
santaForm.onsubmit = function (event) {
  // TODO: check the text isn't more than 100chars before submitting
  // event.preventDefault();
};

function openModal(htmlContent) {
  var modal = document.getElementById('myModal');
  document.getElementById('modalHtmlContent').innerHTML = htmlContent;
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById('myModal');
  modal.style.display = "none";
}

function formDataHandler() {
  event.preventDefault(); // Prevent form submission

  var userid = document.getElementById("userid").value;
  var wish = document.getElementById("wish").value;

  // Create an object with the data to send
  var formData = {
    id: userid,
    message: wish
  };

  fetch('https://foregoing-kiwi-giver.glitch.me/send', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error('Request failed');
    }
  })
  .then(html => {
      console.log(html);
      openModal(html)
  })
  .catch((error) => {
    console.log(error);
  });
}