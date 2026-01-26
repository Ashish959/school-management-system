
import "../styles/TeacherDashboard.css";

const TeacherDashboard = () => {
  return (
    <div>
      <h1>Teacher Dashboard</h1>

      <div className="teacher-cards">
        <div className="teacher-card">
          <h3>Total Students</h3>
          <p>32</p>
        </div>

        <div className="teacher-card present">
          <h3>Present Today</h3>
          <p>28</p>
        </div>

        <div className="teacher-card absent">
          <h3>Absent Today</h3>
          <p>4</p>
        </div>

        <div className="teacher-card">
          <h3>My Class</h3>
          <p>8-A</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
