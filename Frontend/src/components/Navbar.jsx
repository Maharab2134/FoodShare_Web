import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/authSlice";
import { Menu, X, User, Bell } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  console.log(user);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    navigate("/");
  };

  // notification badge count for volunteers (sessionStorage updated by notifications component)
  const [notifyCount, setNotifyCount] = useState(() => {
    try {
      return Number(sessionStorage.getItem("fs_notifications_count") || 0);
    } catch (e) {
      return 0;
    }
  });

  // listen for same-tab updates and storage events
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "fs_notifications_count") {
        setNotifyCount(Number(e.newValue || 0));
      }
    };
    const onCustom = () => {
      setNotifyCount(
        Number(sessionStorage.getItem("fs_notifications_count") || 0)
      );
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("fs_notifications_updated", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("fs_notifications_updated", onCustom);
    };
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold hover:text-indigo-500">
          FoodShare
        </a>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex space-x-6 items-center">
          {!(user && user.role === "volunteer") && (
            <>
              <a href="/" className="hover:text-indigo-500">
                Home
              </a>
              <a href="/about" className="hover:text-indigo-500">
                About
              </a>
              <a href="/food-available" className="hover:text-indigo-500">
                Food Available
              </a>
              <a href="/donate" className="hover:text-indigo-500">
                Donate
              </a>
            </>
          )}
          {user && user.role === "volunteer" && (
            <button
              onClick={() => navigate("/volunteer")}
              aria-label="Open volunteer dashboard"
              className="relative hover:text-indigo-400"
              title="Volunteer alerts"
            >
              <Bell size={18} />
              {notifyCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {notifyCount}
                </span>
              )}
            </button>
          )}
          {user ? (
            <div className="relative group">
              {/* User Name & Icon (Hoverable) */}
              <div className="flex items-center space-x-2 cursor-pointer hover:text-indigo-500">
                <User size={20} />
                <span>Hi, {user?.name?.split(" ")[0] || "User"}</span>
              </div>

              {/* Dropdown on Hover */}
              <div className="absolute left-0 right-0 mt-2 w-40 bg-gray-700 text-white shadow-lg rounded-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <a
                  href={`/profile/${user.email}`}
                  className="block px-4 py-3 border-b border-gray-600 hover:bg-gray-600 rounded-t-lg"
                >
                  Go to Profile
                </a>
                <button
                  className="block w-full text-left px-4 py-3 hover:bg-gray-600 rounded-b-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <a href="/login" className="hover:text-indigo-500">
              Sign In
            </a>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
          {!(user && user.role === "volunteer") && (
            <>
              <a
                href="/"
                className="block px-4 py-3 border-b border-gray-700 hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                href="/about"
                className="block px-4 py-3 border-b border-gray-700 hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a
                href="/food-available"
                className="block px-4 py-3 border-b border-gray-700 hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Food Available
              </a>
              <a
                href="/donate"
                className="block px-4 py-3 border-b border-gray-700 hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Donate
              </a>
            </>
          )}
          {user && user.role === "volunteer" && (
            <button
              onClick={() => {
                navigate("/volunteer");
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-3 border-b border-gray-700 hover:bg-gray-700 flex items-center space-x-2"
            >
              <Bell size={18} />
              <span>Volunteer Dashboard</span>
              {notifyCount > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {notifyCount}
                </span>
              )}
            </button>
          )}
          {user ? (
            <>
              <a
                href={`/profile/${user.email}`}
                className="block px-4 py-3 border-b border-gray-700 hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Go to Profile
              </a>
              <button
                className="block w-full text-left px-4 py-3 hover:bg-gray-700"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="block px-4 py-3 border-b border-gray-700 hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
