import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './ErrorPage.css';

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage = location.state?.message;

  function clickHandler() {
    navigate('/', { replace: true });
  }

  return (
    <div className="msg-container container-fluid">
      <div className="row">
        <div className="message col-sm-12">
          <h2>{errorMessage}</h2>
          <button onClick={clickHandler} className="btn-submit btn btn-primary">Go back</button>
        </div>
      </div>
     </div>
  )
}

export default ErrorPage;