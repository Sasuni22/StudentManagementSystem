import { Link } from 'react-router-dom';
import "../styles/loginButton.css";  // Import the login button styles

export default function LoginButton() {
  return (
    <div className="login-container">
      <Link to="/login">
        <button className="login-btn">LOGIN</button>
      </Link>
    </div>
  );
}
