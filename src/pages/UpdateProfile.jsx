import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getProfile,
    updateProfile
} from "../services/profileService";

import { toast } from "react-toastify";

function UpdateProfile() {
    const [profile, setProfile] = useState({
        name: "",
        dob: "",
        gender: ""
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await getProfile();

            setProfile(data);
        } catch (error) {
            console.log(error);

            toast.error("Failed to load profile");
        }
    };

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await updateProfile(profile);

            localStorage.setItem(
                "profileName",
                profile.name || "U"
            );

            toast.success(response);

            navigate("/profile");
        } catch (error) {
            console.log(error);

            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <h1 style={titleStyle}>Update Profile</h1>

                <p style={subtitleStyle}>
                    Update your personal details
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={fieldStyle}>
                        <label style={labelStyle}>
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={profile.name || ""}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            style={inputStyle}
                        />
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>
                            Date of Birth
                        </label>

                        <input
                            type="date"
                            name="dob"
                            value={profile.dob || ""}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>
                            Gender
                        </label>

                        <select
                            name="gender"
                            value={profile.gender || ""}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="">
                                Select Gender
                            </option>

                            <option value="Male">
                                Male
                            </option>

                            <option value="Female">
                                Female
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...buttonStyle,
                            opacity: loading ? 0.7 : 1,
                            cursor: loading
                                ? "not-allowed"
                                : "pointer"
                        }}
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        style={backButtonStyle}
                    >
                        Back to Profile
                    </button>
                </form>
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

const cardStyle = {
    width: "420px",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "14px",
    boxShadow: "0 2px 14px rgba(0,0,0,0.12)"
};

const titleStyle = {
    textAlign: "center",
    marginBottom: "8px",
    color: "#111827"
};

const subtitleStyle = {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: "25px"
};

const fieldStyle = {
    marginBottom: "18px"
};

const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    color: "#374151"
};

const inputStyle = {
    width: "100%",
    padding: "11px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box"
};

const buttonStyle = {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold"
};

const backButtonStyle = {
    width: "100%",
    padding: "11px",
    marginTop: "12px",
    border: "1px solid #d1d5db",
    backgroundColor: "white",
    color: "#374151",
    borderRadius: "8px",
    cursor: "pointer"
};

export default UpdateProfile;