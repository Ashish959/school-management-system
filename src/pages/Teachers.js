import "../styles/Teachers.css";

const Teachers = () => {
  const teachers = [
    { id: 1, name: "Rohit Sharma", subject: "Maths", phone: "9876543210", status: "Active" },
    { id: 2, name: "Anita Verma", subject: "Science", phone: "9123456780", status: "Active" },
    { id: 3, name: "Suresh Kumar", subject: "English", phone: "9988776655", status: "Inactive" },
  ];

  return (
    <div className="teachers-page">
      {/* PAGE HEADER */}
      <div className="teachers-header">
        <h2>Teachers</h2>
        <button className="add-btn">+ Add Teacher</button>
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
                <td>{t.name}</td>
                <td>{t.subject}</td>
                <td>{t.phone}</td>
                <td>
                  <span className={`status ${t.status.toLowerCase()}`}>
                    {t.status}
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
    </div>
  );
};

export default Teachers;
