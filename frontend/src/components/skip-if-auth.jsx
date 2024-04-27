import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

// eslint-disable-next-line react/prop-types
export const SkipIfAuth = ({ children }) => {
  const { user } = useAuthStore();
  if (user) {
    // user is not authenticated
    return <Navigate to="/questions" />;
  }
  return children;
};
