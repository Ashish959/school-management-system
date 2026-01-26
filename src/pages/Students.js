import { useEffect, useState } from "react";
import api from "../services/api";
import AddStudentModal from "../components/AddStudentModal";
import "../styles/Students.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // LOAD STUDENTS
  // const loadStudents = async () => {
  //   const res = await api.get("/students");
  //   setStudents(res.data);
  // };
const loadStudents = async () => {
  try {
    const res = await api.get("/students");
    setStudents(res.data);
  } catch (err) {
    console.error("Students API error:", err);

    if (err.response?.status === 401) {
      alert("Unauthorized - please login again");
    } else {
      alert("Server error while loading students");
    }
  }
};
  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="students-page">
      {/* HEADER */}
      <div className="students-header">
        <h2>Students</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Student
        </button>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Admission No</th>
              <th>Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, index) => (
              <tr key={s.studentId}>
                <td>{index + 1}</td>
                <td>{s.admissionNo}</td>
                <td>{s.firstName} {s.lastName}</td>
                <td>{s.className}</td>
                <td>{s.sectionName}</td>
                <td>{s.phoneNumber}</td>
                <td>
                  <span className={`status ${s.isActive ? "active" : "inactive"}`}>
                    {s.isActive ? "Active" : "Inactive"}
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
        <AddStudentModal
          onClose={() => setShowModal(false)}
          onSuccess={loadStudents}
        />
      )}
    </div>
  );
};

export default Students;
