import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAutContext";
import { useEffect } from "react";

export default function LoginGuard({ children }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthContext()

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/main")
        }
    }, [isAuthenticated, navigate])

    return children
}