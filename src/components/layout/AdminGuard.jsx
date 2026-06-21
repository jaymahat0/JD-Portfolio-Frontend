import { Navigate } from "react-router-dom";

function AdminGuard({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default AdminGuard;
