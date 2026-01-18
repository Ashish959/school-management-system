import { useState } from "react";
import "../styles/TeacherStudents.css";

const initialStudents = [
  { id: 1, name: "Aman Verma", roll: 12, status: "present" },
  { id: 2, name: "Riya Sharma", roll: 15, status: "absent" },
  { id: 3, name: "Kunal Singh", roll: 18, status: "present" },
];

const TeacherStudents = () => {
  const [students, setStudents] = useState(initialStudents);

  const toggleStatus = (id) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === id
          ? { ...s, status: s.status === "present" ? "absent" : "present" }
          : s
      )
    );
  };

  return (
    <div>
      <h1>My Students</h1>

      <div className="attendance-card">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Roll</th>
              <th>Name</th>
              <th>Status</th>
              <th>Mark</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.roll}</td>
                <td>{s.name}</td>

                <td>
                  <span className={`badge ${s.status}`}>
                    {s.status}
                  </span>
                </td>

                <td>
                  <button
                    className={`toggle-btn ${s.status}`}
                    onClick={() => toggleStatus(s.id)}
                  >
                    {s.status === "present" ? "Mark Absent" : "Mark Present"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherStudents;
