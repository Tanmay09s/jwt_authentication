import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

 const handleLogout = async () => {
  console.log("Logout button clicked");

  await logout();

  navigate("/login");
};

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-400"
        >
          JWT Auth
        </Link>

        <div className="flex items-center gap-6">

          <Link to="/">Home</Link>

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span className="text-green-400">
                Hello, {user.name}
              </span>

              <Link to="/dashboard">
                Dashboard
              </Link>

              <Link to="/profile">
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded cursor-pointer"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;