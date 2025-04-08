import { Navigate, Outlet } from "react-router"
import { useAuth } from "../AuthContext"
import { BarLoader } from "react-spinners"


const PrivateRoute: React.FC = () => {
    const { user, loading, logoutUser } = useAuth()

    if (loading) {
        return (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <BarLoader color="#646cff" loading={true} />
          </div>
        )
      }

    if(!user) {
        return <Navigate to={'/login'} />
    }

    const isExpired = user.exp * 1000 < Date.now()

    if(!isExpired) {
        logoutUser()
        return <Navigate to={'/login'} />
    }

    return (
        <Outlet />
    )
}

export default PrivateRoute
