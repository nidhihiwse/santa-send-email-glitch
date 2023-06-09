import { useState } from 'react';
import './SantaForm.css';
import { useNavigate } from "react-router-dom";

interface FormData {
  id: string;
  message: string;
}

function SantaForm() {
  const [formData, setFormData] = useState<FormData>({
    id: '',
    message: '',
  });

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(name + " changed to " + value);
  }

  const navigate = useNavigate();
  const errorMessage1 = 'User age is over 10';
  const errorMessage2 = 'User is not registered';


  const submitHandler = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(formData);

    await fetch('http://localhost:3000/send', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        Response
        return response.text();
      } else {
        throw new Error('Request failed');
      }
    })
    .then((data) => {
      console.log(data); 
      if(data === 'underAge') {
        alert('Message Send!');
      } else if (data === 'overAge') {
        navigate('/error', { state: { replace: true, message: errorMessage1 }});
      } else {
        navigate('/error', { state: { replace: true, message: errorMessage2 }});
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="form-wrapper container-fluid">

      <div className="row">
        
        <div className="col-sm-12">

          <h2>A letter to Santa</h2>
          <form onSubmit={submitHandler}>

            <div className="input-grp">
              <label htmlFor="userid">UserId:</label>
              <input id="id" type="text" className="input-grp form-control" placeholder=" Id"
              name="id"
              value={formData.id}
              onChange={handleInputChange} required/>
            </div>

            <div className="input-grp">
            <label htmlFor="Message">Message:</label>
            <textarea id="message" className="form-control" placeholder="Gifts"
              name="message"
              value={formData.message}
              onChange={handleInputChange} />
            </div>

            <br/>
            <button className="btn-submit btn btn-primary">Send</button>
          </form>        
        </div>
      </div>

    </div>
  )
}

export default SantaForm;
