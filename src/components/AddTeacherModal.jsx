import { useState } from "react";
import api from "../services/api";
import "../styles/AddTeacherModal.css";

const AddTeacherModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    subject: "",
    qualification: "",
    joiningDate: "",
    email: "",
    phoneNumber: "",
  });

  const [error, setError] = useState("");
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setExists(false);
  };

  const checkExists = async (field) => {
    if (!form[field]) return;

    try {
      const res = await api.get("/teachers/check", {
        params: { [field]: form[field] },
      });

      if (res.data?.exists) {
        setExists(true);
        setError("Email or phone number already exists");
      }
    } catch {
      setExists(false);
    }
  };

  const handleSubmit = async () => {
    if (exists) return;

    try {
      setLoading(true);
      await api.post("/teachers", form);
      onSuccess();
      onClose();
    } catch {
      setError("Unable to add teacher. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-top">
          <h2>Add Teacher</h2>
          <button className="icon-close" onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <div className="modal-content">

          <div className="row">
            <div className="field">
              <input name="firstName" required onChange={handleChange} />
              <label>First Name</label>
            </div>

            <div className="field">
              <input name="lastName" required onChange={handleChange} />
              <label>Last Name</label>
            </div>
          </div>

          <div className="field">
            <input name="subject" onChange={handleChange} />
            <label>Subject</label>
          </div>

          <div className="field">
            <input name="qualification" onChange={handleChange} />
            <label>Qualification</label>
          </div>

          <div className="field">
            <input type="date" name="joiningDate" onChange={handleChange} />
            <label>Joining Date</label>
          </div>

          <div className="field">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={() => checkExists("email")}
            />
            <label>Email Address</label>
          </div>

          <div className="field">
            <input
              type="tel"
              name="phoneNumber"
              maxLength="10"
              onChange={handleChange}
              onBlur={() => checkExists("phoneNumber")}
            />
            <label>Phone Number</label>
          </div>

          {error && <p className="form-error">{error}</p>}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-primary"
            disabled={exists || loading}
            onClick={handleSubmit}
          >
            {loading ? "Saving..." : "Save Teacher"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddTeacherModal;
