import { useState } from "react";
import api from "../services/api";
import "../styles/AddTeacherModal.css";

const AddTeacherModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    subject: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/teachers", form);
      onSuccess();
      onClose();
    } catch (err) {
      alert("Failed to add teacher");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Teacher</h3>

        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          name="subject"
          placeholder="Subject"
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          autoComplete="off"
        />

        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddTeacherModal;
