import { useState } from "react";
import api from "../services/api";
import "../styles/Students.css";

const AddStudentModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        AdmissionNo: "",
        FirstName: "",
        LastName: "",
        Gender: "",
        DateOfBirth: "",
        ClassName: "",
        SectionName: "",
        FatherName: "",
        PhoneNumber: "",
        EmailAddress: "",
        CreatedBy: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await api.post("/students", formData);
        onSuccess();
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Add Student</h3>

                <form onSubmit={handleSubmit} className="modal-form">
                    <input name="AdmissionNo" placeholder="Admission No" onChange={handleChange} required />
                    <input name="FirstName" placeholder="First Name" onChange={handleChange} required />
                    <input name="LastName" placeholder="Last Name" onChange={handleChange} required />
                    <input name="Gender" placeholder="Gender" onChange={handleChange} required />
                    <input type="date" name="DateOfBirth" placeholder="DateOf Birth" onChange={handleChange} required />
                    <input name="ClassName" placeholder="Class Name" onChange={handleChange} required />
                    <input name="SectionName" placeholder="Section Name" onChange={handleChange} required />
                    <input name="FatherName" placeholder="Father Name" onChange={handleChange} required />
                    <input name="PhoneNumber" placeholder="Phone Number" onChange={handleChange} required />
                    <input name="EmailAddress" placeholder="Email Address" onChange={handleChange} required />
                    <input name="CreatedBy" placeholder="Created By" onChange={handleChange} required />
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" className="btn-save">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudentModal;
