// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// import AdminDashboard from "./pages/AdminDashboard";
// import TeacherDashboard from "./pages/TeacherDashboard";
// import StudentDashboard from "./pages/StudentDashboard";

// import Students from "./pages/Students";
// import Teachers from "./pages/Teachers";
// import TeacherStudents from "./pages/TeacherStudents";

// import ProtectedRoute from "./routes/ProtectedRoute";
// import DashboardLayout from "./components/DashboardLayout";
// import TeacherProfile from "./pages/TeacherProfile";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* PUBLIC */}
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* ADMIN */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<AdminDashboard />} />
//           <Route path="students" element={<Students />} />
//           <Route path="teachers" element={<Teachers />} />
//         </Route>

//         <Route
//           path="/teacher"
//           element={
//             <ProtectedRoute allowedRoles={["teacher"]}>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<TeacherDashboard />} />
//           <Route path="students" element={<TeacherStudents />} />
//           <Route path="profile" element={<TeacherProfile />} />
//         </Route>

//         {/* STUDENT */}
//         <Route
//           path="/student"
//           element={
//             <ProtectedRoute allowedRoles={["student"]}>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<StudentDashboard />} />
//         </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import TeacherStudents from "./pages/TeacherStudents";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import TeacherProfile from "./pages/TeacherProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
        </Route>

        {/* TEACHER */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TeacherDashboard />} />
          <Route path="students" element={<TeacherStudents />} />
          <Route path="profile" element={<TeacherProfile />} />
        </Route>

        {/* STUDENT */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<h2>Page Not Found</h2>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
