import { useState } from "react";
import api from "../services/api";
import "../styles/AddStudentModal.css";

const AddStudentModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    Gender: "",
    DateOfBirth: "",
    ClassName: "",
    SectionName: "",
    RollNumber: "",
    FatherName: "",
    PhoneNumber: "",
    Email: "",
  });


  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const [errors, setErrors] = useState({});
  const [rollExists, setRollExists] = useState(false);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setErrors((e) => ({
        ...e,
        Photo: "Only JPG or PNG allowed",
      }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors((e) => ({
        ...e,
        Photo: "Max file size is 2MB",
      }));
      return;
    }

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
    setErrors((e) => ({ ...e, Photo: "" }));
  };


  /* ---------- CHECK ROLL ---------- */

  const checkRollNumber = async () => {
    if (!form.RollNumber) return;
    try {
      const res = await api.get("/students/CheckRoll", {params: { rollNumber: form.RollNumber }, });
      if (res.data?.exists) {
        setRollExists(true);
        setErrors((e) => ({
          ...e,
          RollNumber: "Roll number already exists",
        }));

      } else {
        setRollExists(false);
      }
    } catch {
      setRollExists(false);
    }
  };


  /* ---------- SUBMIT ---------- */

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (rollExists) return;

    const required = [
      "FirstName",
      "LastName",
      "Gender",
      "DateOfBirth",
      "ClassName",
      "SectionName",
      "RollNumber",
      "FatherName",
      "PhoneNumber",
      "Email",
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
      Object.keys(form).forEach((k) => {
        data.append(k, form[k]);
      });


      if (photo) {
        data.append("Photo", photo); // MUST MATCH DTO
      }


      await api.post("/students", data, {
        onUploadProgress: (e) => {
          const percent = Math.round(
            (e.loaded * 100) / e.total
          );
          setProgress(percent);
        },
      });
      onSuccess();
      onClose();


    } catch (err) {
      console.error(err);
      setErrors({
        submit: "Failed to add student",
      });

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="modal-backdrop" onClick={onClose}>

      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="modal-top">
          <h2>Add Student</h2>
          <button className="icon-close" onClick={onClose}> ×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            {/* Photo */}

            <div className="photo-upload">
              <label className="photo-box">
                {preview ? (<img src={preview} alt="Student" />) : ("Upload Photo")}

                <input type="file"  hidden onChange={handlePhotoChange}   accept="image/png, image/jpeg, image/jpg" />
              </label>

              {errors.Photo && (<p className="error">{errors.Photo}</p>)}
            </div>

            <div className="row">
              <Input name="FirstName" label="First Name" error={errors.FirstName} onChange={handleChange} maxlength="20"/>
              <Input name="LastName" label="Last Name" error={errors.LastName} onChange={handleChange}maxlength="20" />
            </div>
            <div className="row">
              <Select name="Gender" label="Gender" error={errors.Gender} onChange={handleChange}>
                 <option value="Gender">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
              <Input type="date" name="DateOfBirth" label="DOB" error={errors.DateOfBirth} onChange={handleChange} />
            </div>
            <div className="row">
              <Input name="ClassName" label="Class" error={errors.ClassName} onChange={handleChange} maxlength="10" />
              <Input name="SectionName" label="Section" error={errors.SectionName} onChange={handleChange} maxlength="10" />
            </div>
            <div className="row">
            <Input name="RollNumber" label="Roll Number" error={errors.RollNumber} onChange={handleChange} onBlur={checkRollNumber} maxlength="10" />
            <Input name="FatherName" label="Father Name" error={errors.FatherName} onChange={handleChange} maxlength="30"/>
            </div>
            <div className="row">
            <Input type="tel" name="PhoneNumber" label="Phone" error={errors.PhoneNumber} onChange={handleChange} maxlength="10" />
            <Input type="email" name="Email" label="Email" error={errors.Email} onChange={handleChange} />
               </div>
            {loading && (
              <div className="progress-wrap">
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                />
                <span>{progress}%</span>
              </div>
            )}
            {errors.submit && (<p className="error">{errors.submit}</p>)}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading || rollExists}>
              {loading ? "Saving..." : "Save Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


/* ---------- INPUT ---------- */

const Input = ({ label, error, ...props }) => (
  <div className={`field ${error ? "invalid" : ""}`}>

    <input placeholder=" " aria-invalid={!!error} {...props} />
    <label>{label}</label>
    {error && (<span className="error">{error}</span>)}
  </div>
);

const Select = ({ label, error, children, ...props }) => (
  <div className={`field ${error ? "invalid" : ""}`}>

    <select aria-invalid={!!error} {...props} >
      <option value="" disabled hidden />
      {children}
    </select>
    <label>{label}</label>

    {error && (<span className="error">{error}</span>)}
  </div>
);

export default AddStudentModal;
