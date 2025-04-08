import { NavLink } from "react-router"
import LogoutButton from "../components/LogoutButton"
import { useAuth } from "../AuthContext"


function Navbar() {

  const { user } = useAuth()

  return (
    <nav>

      <ul>

        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/main">Main</NavLink>
        </li>

        {user && (
          <>

            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/settings">Settings</NavLink>
            </li>

          </>
        )}

        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>

        <li>
          <NavLink to="/groups">Groups</NavLink>
        </li>

        {user ? (
          <li>
            <LogoutButton />
          </li>
          ) : (

            <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>

            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
          ) 
        }

        {user && <p>Hello, {user.username}</p>}

      </ul>
      
    </nav>
  )
}

export default Navbar