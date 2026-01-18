// import Images from "../assets/images";
// import "../styles/Sidebar.css";

// const Sidebar = ({ collapsed }) => {
//   return (
//     <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
//       {/* LOGO */}
//       <div className="sidebar-logo">
//         <div className="logo-circle">
//           <img src={Images.logo} alt="School Logo" />
//         </div>

//         {/* {!collapsed && (
//           <div className="logo-text">
//             <span>School</span>
//             <small>Management</small>
//           </div>
//         )} */}
//       </div>

//       {/* MENU */}
//       <ul className="sidebar-menu">
//         <li>
//           <span className="icon">🏠</span>
//           {!collapsed && <span className="text">Dashboard</span>}
//         </li>

//         <li>
//           <span className="icon">🎓</span>
//           {!collapsed && <span className="text">Students</span>}
//         </li>

//         <li>
//           <span className="icon">👨‍🏫</span>
//           {!collapsed && <span className="text">Teachers</span>}
//         </li>

//         <li>
//           <span className="icon">👪</span>
//           {!collapsed && <span className="text">Parents</span>}
//         </li>

//         <li>
//           <span className="icon">📚</span>
//           {!collapsed && <span className="text">Library</span>}
//         </li>

//         <li>
//           <span className="icon">⚙️</span>
//           {!collapsed && <span className="text">Settings</span>}
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import { NavLink, useLocation } from "react-router-dom";
import Images from "../assets/images";
import "../styles/Sidebar.css";

const Sidebar = ({ collapsed }) => {
  const { pathname } = useLocation();

  // Detect role by URL (simple & working)
  const isTeacher = pathname.startsWith("/teacher");
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* LOGO */}
      <div className="sidebar-logo">
        <div className="logo-circle">
          <img src={Images.logo} alt="School Logo" />
        </div>

        {!collapsed && (
          <div className="logo-text">
            <span>School</span>
            <small>Management</small>
          </div>
        )}
      </div>

      {/* MENU */}
      <ul className="sidebar-menu">

        {/* ADMIN MENU */}
        {isAdmin && (
          <>
            <li>
              <NavLink to="/admin" end>
                <span className="icon">🏠</span>
                {!collapsed && <span className="text">Dashboard</span>}
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/students">
                <span className="icon">🎓</span>
                {!collapsed && <span className="text">Students</span>}
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/teachers">
                <span className="icon">👨‍🏫</span>
                {!collapsed && <span className="text">Teachers</span>}
              </NavLink>
            </li>
          </>
        )}

        {/* TEACHER MENU */}
        {isTeacher && (
          <>
            <li>
              <NavLink to="/teacher" end>
                <span className="icon">🏠</span>
                {!collapsed && <span className="text">Dashboard</span>}
              </NavLink>
            </li>

            <li>
              <NavLink to="/teacher/students">
                <span className="icon">🎓</span>
                {!collapsed && <span className="text">My Students</span>}
              </NavLink>
            </li>

            <li>
              <NavLink to="/teacher/profile">
                <span className="icon">⚙️</span>
                {!collapsed && <span className="text">Profile</span>}
              </NavLink>
            </li>
          </>
        )}

      </ul>
    </div>
  );
};

export default Sidebar;
