import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProfile } from "../services/profileService";

import { toast } from "react-toastify";

function Profile() {
    const [profile, setProfile] = useState({
        name: "",
        dob: "",
        gender: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await getProfile();

            setProfile(data);

            localStorage.setItem(
                "profileName",
                data.name || "U"
            );
        } catch (error) {
            console.log(error);
            toast.error("Failed to load profile");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("profileName");

        toast.success("Logout successful");

        navigate("/login");

        window.location.reload();
    };

    const getInitial = (name) => {
        if (!name || name.trim() === "") {
            return "U";
        }

        return name.trim().charAt(0).toUpperCase();
    };

    return (
        <div style={pageStyle}>
            <div style={profileCardStyle}>
                <div style={avatarStyle}>
                    {getInitial(profile.name)}
                </div>

                <h2 style={profileNameStyle}>
                    {profile.name || "User"}
                </h2>

                <p style={profileInfoStyle}>
                    DOB: {profile.dob || "Not added"}
                </p>

                <p style={profileInfoStyle}>
                    Gender: {profile.gender || "Not added"}
                </p>

                <div style={menuStyle}>
                    <button
                        style={menuButtonStyle}
                        onClick={() => navigate("/profile/update")}
                    >
                        Update Profile
                    </button>

                    <button
                        style={menuButtonStyle}
                        onClick={() => navigate("/orders")}
                    >
                        My Orders
                    </button>

                    <button
                        style={logoutButtonStyle}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

const pageStyle = {
    minHeight: "100vh",
    paddingTop: "90px",
    backgroundColor: "#f9fafb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const profileCardStyle = {
    width: "420px",
    padding: "35px",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 2px 14px rgba(0,0,0,0.12)",
    textAlign: "center"
};

const avatarStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "42px",
    fontWeight: "bold",
    margin: "0 auto 18px"
};

const profileNameStyle = {
    marginBottom: "10px",
    color: "#111827"
};

const profileInfoStyle = {
    color: "#6b7280",
    margin: "8px 0"
};

const menuStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "25px"
};

const menuButtonStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    backgroundColor: "white",
    color: "#111827",
    fontWeight: "bold",
    cursor: "pointer"
};

const logoutButtonStyle = {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#ef4444",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
};

export default Profile;