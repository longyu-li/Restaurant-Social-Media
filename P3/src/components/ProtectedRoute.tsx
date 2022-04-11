import React, {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {Navigate, useLocation} from "react-router-dom";

const ProtectedRoute: React.FC = ({
  children
}) => {
  const { tokens } = useContext(AuthContext);
  const location = useLocation();

  if (!tokens) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children as JSX.Element;

}

export default ProtectedRoute;