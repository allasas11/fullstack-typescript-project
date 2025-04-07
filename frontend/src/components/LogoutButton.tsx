import React from 'react'
import { useNavigate } from 'react-router'

const LogoutButton: React.FC = () => {
    const navigate = useNavigate()
    const logoutHandler = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem('token')
            navigate('/login')
        }
    }
    return (
        <button onClick={logoutHandler}>Logout</button>
    )
}
export default LogoutButton