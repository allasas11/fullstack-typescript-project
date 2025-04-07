import { NavLink } from "react-router"
import LogoutButton from "../components/LogoutButton"


function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/main">Main</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
      <LogoutButton />
    </nav>
  )
}

export default Navbar