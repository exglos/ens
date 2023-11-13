import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    // const auth = useSelector((state) => state.auth)
    const auth = localStorage.getItem("token")
    const location = useLocation()
    if (!auth) {
        return <Navigate to="/admin/login" state={{ from: location }} replace/>
    }
    return children
}

export default ProtectedRoute
