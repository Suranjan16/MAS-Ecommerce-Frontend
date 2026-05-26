import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProfile } from "../services/profileService";

function Navbar() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const [profileName, setProfileName] = useState(
        localStorage.getItem("profileName") || ""
    );

    useEffect(() => {
        const fetchProfileName = async () => {
            if (!token) return;

            try {
                const data = await getProfile();

                if (data.name) {
                    localStorage.setItem("profileName", data.name);
                    setProfileName(data.name);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfileName();
    }, [token]);

    const getInitial = (name) => {
        if (!name || name.trim() === "") {
            return "U";
        }

        return name.trim().charAt(0).toUpperCase();
    };

    return (
        <nav style={navbarStyle}>
            <div>
                <Link to="/home" style={logoLinkStyle}>
                    MAS
                </Link>
            </div>

            <div style={rightSectionStyle}>
                <Link to="/home" style={navItemStyle}>
                    🏠 Home
                </Link>

                {token && (
                    <Link to="/cart" style={navItemStyle}>
                        🛒 Cart
                    </Link>
                )}

                {role === "ADMIN" && (
                    <Link to="/admin" style={navItemStyle}>
                        ⚙️ Admin
                    </Link>
                )}

                {token ? (
                    <Link to="/profile" style={profileAvatarStyle}>
                        {getInitial(profileName)}
                    </Link>
                ) : (
                    <Link to="/login" style={loginButtonStyle}>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "70px",
    backgroundColor: "#111827",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 35px",
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0,0,0,0.12)"
};

const logoLinkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "30px",
    fontWeight: "bold",
    letterSpacing: "1px"
};

const rightSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "24px"
};

const navItemStyle = {
    color: "#e5e7eb",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    paddingBottom: "4px",
    borderBottom: "2px solid transparent"
};

const profileAvatarStyle = {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: "#2563eb",
    color: "white",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px",
    boxShadow: "0 2px 8px rgba(37,99,235,0.35)"
};

const loginButtonStyle = {
    padding: "10px 18px",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    boxShadow: "0 2px 8px rgba(37,99,235,0.35)"
};

export default Navbar;