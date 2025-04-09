
import { Navigate } from "react-router"
import { useAuth } from "../AuthContext"
import { BarLoader } from "react-spinners"

const ProfilePage: React.FC = () => {
    const { user, loading, logoutUser } = useAuth()

    if (loading) {
        return (
          <div style={{ textAlign: "center", margin: "50px" }}>
            <BarLoader color="#646cff" loading={true} />
          </div>
        )
      }

    if (!user) {
        return <Navigate to={'/login'} />
    }

    const isExpired = user.exp * 1000 > Date.now()

    if(!isExpired) {
        logoutUser()
        return <Navigate to={'/login'} />
    }
 
    return (
        <div>
            <h1>Profile Page</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    )
}
export default ProfilePage