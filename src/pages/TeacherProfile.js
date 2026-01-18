import "../styles/TeacherProfile.css";
import Images from "../assets/images";

const TeacherProfile = () => {
  return (
    <div className="profile-wrapper">
      <h1>My Profile</h1>

      <div className="profile-card">
        <div className="profile-left">
          <img
            src={Images.profile}
            alt="Teacher"
            className="profile-img"
          />
        </div>

        <div className="profile-right">
          <div className="profile-field">
            <label>Name</label>
            <p>Rahul Sharma</p>
          </div>

          <div className="profile-field">
            <label>Email</label>
            <p>rahul@school.com</p>
          </div>

          <div className="profile-field">
            <label>Subject</label>
            <p>Mathematics</p>
          </div>

          <div className="profile-field">
            <label>Class Teacher</label>
            <p>8-A</p>
          </div>

          <button className="edit-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
