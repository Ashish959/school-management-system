import { useEffect, useState } from "react";
import api from "../services/api";
import AddTeacherModal from "../components/AddTeacherModal";
import "../styles/Teachers.css";
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const loadTeachers = async () => {
    const res = await api.get("/teachers");
    setTeachers(res.data);
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  return (
    <div className="teachers-page">
      {/* HEADER */}
      <div className="teachers-header">
        <h2>Teachers</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Teacher
        </button>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="teachers-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((t, index) => (
              <tr key={t.id}>
                <td>{index + 1}</td>
                <td>{t.firstName} {t.lastName}</td>
                <td>{t.subject}</td>
                <td>{t.phoneNumber}</td>
                <td>
                  <span className={`status ${t.isActive ? "active" : "inactive"}`}>
                    {t.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <button className="action-btn">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <AddTeacherModal
          onClose={() => setShowModal(false)}
          onSuccess={loadTeachers}
        />
      )}
    </div>
  );
};

export default Teachers;
