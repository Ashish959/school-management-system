import { useState } from "react";
import api from "../services/api";
import "../styles/AddStudentModal.css";

const AddStudentModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    className: "",
    sectionName: "",
    rollNumber: "",
    fatherName: "",
    phoneNumber: "",
    email: "",
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [rollExists, setRollExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setErrors((e) => ({ ...e, photo: "Only JPG or PNG allowed" }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors((e) => ({ ...e, photo: "Max file size is 2MB" }));
      return;
    }

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
    setErrors((e) => ({ ...e, photo: "" }));
  };

  const checkRollNumber = async () => {
    if (!form.rollNumber) return;

    try {
      const res = await api.get("/students/check", {
        params: { rollNumber: form.rollNumber },
      });

      if (res.data?.exists) {
        setRollExists(true);
        setErrors((e) => ({ ...e, rollNumber: "Roll number already exists" }));
      } else {
        setRollExists(false);
      }
    } catch {
      setRollExists(false);
    }
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async () => {
    if (rollExists) return;

    const required = [
      "firstName",
      "lastName",
      "gender",
      "dateOfBirth",
      "className",
      "sectionName",
      "rollNumber",
      "fatherName",
      "phoneNumber",
      "email",
    ];

    let temp = {};
    required.forEach((f) => {
      if (!form[f]) temp[f] = "Required";
    });

    if (Object.keys(temp).length) {
      setErrors(temp);
      return;
    }

    try {
      setLoading(true);
      setProgress(0);

      const data = new FormData();
      Object.keys(form).forEach((k) => data.append(k, form[k]));
      if (photo) data.append("photo", photo);

      await api.post("/students", data, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      onSuccess();
      onClose();
    } catch {
      setErrors({ submit: "Failed to add student" });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-top">
          <h2>Add Student</h2>
          <button className="icon-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="modal-content">
          {/* PHOTO */}
          <div className="photo-upload">
            <label className="photo-box">
              {preview ? <img src={preview} alt="Student" /> : "Upload Photo"}
              <input type="file" hidden onChange={handlePhotoChange} />
            </label>
            {errors.photo && <p className="error">{errors.photo}</p>}
          </div>

          <div className="row">
            <Input id="firstName" name="firstName" label="First Name" error={errors.firstName} onChange={handleChange} />
            <Input id="lastName" name="lastName" label="Last Name" error={errors.lastName} onChange={handleChange} />
          </div>

          <div className="row">
            <Select id="gender" name="gender" label="Gender" error={errors.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>

            <Input id="dob" type="date" name="dateOfBirth" label="DOB" error={errors.dateOfBirth} onChange={handleChange} />
          </div>

          <div className="row">
            <Input id="class" name="className" label="Class" error={errors.className} onChange={handleChange} />
            <Input id="section" name="sectionName" label="Section" error={errors.sectionName} onChange={handleChange} />
          </div>

          <Input
            id="roll"
            name="rollNumber"
            label="Roll Number"
            error={errors.rollNumber}
            onChange={handleChange}
            onBlur={checkRollNumber}
          />

          <Input id="father" name="fatherName" label="Father Name" error={errors.fatherName} onChange={handleChange} />
          <Input id="phone" type="tel" name="phoneNumber" label="Phone" error={errors.phoneNumber} onChange={handleChange} />
          <Input id="email" type="email" name="email" label="Email" error={errors.email} onChange={handleChange} />

          {/* PROGRESS BAR */}
          {loading && (
            <div className="progress-wrap">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
              <span>{progress}%</span>
            </div>
          )}

          {errors.submit && <p className="error">{errors.submit}</p>}
        </div>

        <div className="modal-footer">
          <button className="btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" disabled={loading || rollExists} onClick={handleSubmit}>
            {loading ? "Saving..." : "Save Student"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------- REUSABLE INPUTS ---------- */

const Input = ({ label, error, id, ...props }) => (
  <div className={`field ${error ? "invalid" : ""}`}>
    <input id={id} placeholder=" " aria-invalid={!!error} {...props} />
    <label htmlFor={id}>{label}</label>
    {error && <span className="error">{error}</span>}
  </div>
);

const Select = ({ label, error, id, children, ...props }) => (
  <div className={`field ${error ? "invalid" : ""}`}>
    <select id={id} aria-invalid={!!error} {...props}>
      <option value="" disabled hidden />
      {children}
    </select>
    <label htmlFor={id}>{label}</label>
    {error && <span className="error">{error}</span>}
  </div>
);

export default AddStudentModal;
