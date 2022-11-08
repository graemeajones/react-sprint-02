import { Link } from 'react-router-dom';
import Icon from '../UI/Icons.js';
import { useAuth } from '../auth/useAuth.js';
import './Header.scss';

export default function Header() {
  // Initialisation ------------------------------
  const { loggedinUser } = useAuth();

  // State ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <header className="Header">
      <Link to='/'><Icon.Group /></Link>
      <Link to={'/'}><h1>joinMe</h1></Link>
      {
        loggedinUser &&
         <div className="welcome"><p>{`Welcome ${loggedinUser.UserFirstname} (${loggedinUser.UserUsertypeName})`}</p></div>
      }
    </header>
  );
}
