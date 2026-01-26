// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { isLoggedIn, role } = useSelector((state) => state.auth);

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   // ✅ FIX: normalize role
//   const normalizedRole = role?.toLowerCase();

//   if (allowedRoles && !allowedRoles.includes(normalizedRole)) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }


  if (allowedRoles && user?.role) {
    const userRole = user.role.toLowerCase();
    const roles = allowedRoles.map((r) => r.toLowerCase());

    if (!roles.includes(userRole)) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
