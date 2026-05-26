import { Link } from "react-router-dom";

function Navbar() {
    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");

    const profileName = localStorage.getItem("profileName");

    const getInitial = (name) => {
        if (!name || name.trim() === "") {
            return "U";
        }

        return name.trim().charAt(0).toUpperCase();
    };

    return (
        <nav style={navbarStyle}>
            <div style={logoStyle}>
                <Link to="/home" style={logoLinkStyle}>
                    MAS
                </Link>
            </div>

            <div style={navLinksStyle}>
                <Link to="/home" style={linkStyle}>
                    Home
                </Link>

                {token && (
                    <Link to="/cart" style={linkStyle}>
                        Cart
                    </Link>
                )}

                {role === "ADMIN" && (
                    <Link to="/admin" style={linkStyle}>
                        Admin
                    </Link>
                )}

                {token && (
                    <Link
                        to="/profile"
                        style={profileAvatarStyle}
                    >
                        {getInitial(profileName)}
                    </Link>
                )}

                {!token && (
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
    padding: "0 30px",
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0,0,0,0.12)"
};

const logoStyle = {
    display: "flex",
    alignItems: "center"
};

const logoLinkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "28px",
    fontWeight: "bold",
    letterSpacing: "1px"
};

const navLinksStyle = {
    display: "flex",
    alignItems: "center",
    gap: "18px"
};

const linkStyle = {
    color: "#e5e7eb",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "15px"
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
    fontSize: "18px"
};

const loginButtonStyle = {
    padding: "10px 16px",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
};

export default Navbar;