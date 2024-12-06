import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserProfile, changePassword } from "../apis/fetchapi";

function Profile() {
  const [profileData, setProfileData] = useState({ username: "", email: "" });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile()
      .then((res) => {
        const profile = res.data;
        console.log(profile); 
        setProfileData({
          username: profile.username,
          email: profile.email,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch profile data.");
      });
  }, [navigate]);

  const handleChangePassword = () => {
    changePassword({ old_password: oldPassword, new_password: newPassword })
      .then(() => {
        toast.success("Password changed successfully.");
        navigate("/home");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error changing password.");
      });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h3>Profile Details</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <strong>Username:</strong>
                <span className="ms-2">{profileData.username}</span>
              </div>
              <div className="mb-3">
                <strong>Email:</strong>
                <span className="ms-2">{profileData.email}</span>
              </div>
              <h4 className="text-primary mt-4">Change Password</h4>
              <div className="mb-3">
                <label className="form-label">Old Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button className="btn btn-success" onClick={handleChangePassword}>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
