import AuthService from "../services/auth-service";
import { Navigate } from "react-router-dom";

function AuthRoute({ children }) {
  return AuthService.isAuthenticated() ? children : <Navigate to="/login" />;
}

export default AuthRoute;
