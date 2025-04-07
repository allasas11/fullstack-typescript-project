
import { Navigate } from "react-router"

const ProfilePage: React.FC = () => {
    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to={'/login'} />
    }
 
    return (
        <div>
            <h1>ProfilePage</h1>
        </div>
    )
}
export default ProfilePage