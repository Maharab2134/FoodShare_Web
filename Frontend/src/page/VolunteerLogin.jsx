import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Redux/authSlice";
import { toast } from "react-toastify";

export default function VolunteerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API = import.meta.env.VITE_REACT_APP_API;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("auth"))?.user;
    if (user && user.role === "volunteer") navigate("/volunteer");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.user?.role !== "volunteer") {
          toast.error("This login is for volunteers only.");
          return;
        }
        localStorage.setItem("auth", JSON.stringify(data));
        dispatch(loginSuccess(data));
        toast.success("Welcome, volunteer!");
        navigate("/volunteer");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Login error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-indigo-500 text-center mb-6">
          Volunteer Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700"
            />
          </div>
          <button type="submit" className="w-full bg-indigo-500 py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
