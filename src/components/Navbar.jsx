import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getProfile } from "../services/profileService";

function Navbar() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const [profileName, setProfileName] = useState(
        localStorage.getItem("profileName") || ""
    );

    const [searchText, setSearchText] = useState("");

    const navigate = useNavigate();

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

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchText.trim() === "") {
            navigate("/home");
            return;
        }

        navigate(`/home?search=${encodeURIComponent(searchText)}`);
    };

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

            <form onSubmit={handleSearch} style={searchFormStyle}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={searchInputStyle}
                />

                <button type="submit" style={searchButtonStyle}>
                    Search
                </button>
            </form>

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
    display: "grid",
    gridTemplateColumns: "160px 1fr auto",
    alignItems: "center",
    gap: "25px",
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

const searchFormStyle = {
    display: "flex",
    width: "100%",
    maxWidth: "520px",
    justifySelf: "center"
};

const searchInputStyle = {
    flex: 1,
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px 0 0 8px",
    fontSize: "15px",
    outline: "none"
};

const searchButtonStyle = {
    padding: "10px 16px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    borderRadius: "0 8px 8px 0",
    fontWeight: "bold",
    cursor: "pointer"
};

const rightSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "22px"
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