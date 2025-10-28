import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/authSlice";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Heart,
  Gift,
  LogOut,
  Settings,
  Award,
  Calendar,
  Shield,
} from "lucide-react";

export default function Profile() {
  const { email } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const API = import.meta.env.VITE_REACT_APP_API;

  useEffect(() => {
    if (!email) {
      navigate("/login");
      return;
    }
    fetchProfile(email);
  }, [email, navigate]);

  const fetchProfile = async (email) => {
    try {
      const response = await fetch(`${API}/api/profile/${email}`);

      if (response.status === 404) {
        setNotFound(true);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const stats = [
    {
      icon: <Gift className="w-5 h-5" />,
      label: "Meals Donated",
      value: "25+",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      label: "Meals Claimed",
      value: "15+",
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: "Community Rank",
      value: "Helper",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Member Since",
      value: "2024",
    },
  ];

  const isOwnProfile = user && user.email === email;

  // ... loading, error, and notFound states remain the same ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full mb-6">
            <User className="w-4 h-4 text-indigo-400 mr-2" />
            <span className="text-indigo-300 text-sm font-medium">
              User Profile
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              {profile?.name || "Friend"}
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            {isOwnProfile
              ? "Manage your profile and track your impact"
              : "Viewing community member profile"}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 animate-fade-in-up">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Image */}
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-20 blur-lg"></div>
                  <img
                    src={`${API}${
                      profile?.image ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
                    }`}
                    alt="Profile"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face";
                    }}
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                  />
                </div>

                {/* Profile Details */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {profile?.name || "User Name"}
                  </h2>
                  <p className="text-gray-400 mb-6">
                    FoodShare Community Member
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-xl">
                      <Mail className="w-5 h-5 text-indigo-400" />
                      <div>
                        <div className="text-sm text-gray-400">Email</div>
                        <div className="text-white font-medium">
                          {profile?.email || "user@example.com"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-xl">
                      <Phone className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="text-sm text-gray-400">Phone</div>
                        <div className="text-white font-medium">
                          {profile?.phone || "Not provided"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-xl md:col-span-2">
                      <MapPin className="w-5 h-5 text-amber-400" />
                      <div>
                        <div className="text-sm text-gray-400">Address</div>
                        <div className="text-white font-medium">
                          {profile?.address || "Not provided"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center transform hover:-translate-y-1 transition-all duration-300 hover:border-indigo-500/50 group"
                >
                  <div className="text-indigo-400 mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Actions */}
          {isOwnProfile && (
            <div className="space-y-6">
              {/* Action Buttons */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 animate-fade-in-up">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-indigo-400" />
                  Profile Actions
                </h3>
                <div className="space-y-3">
                  {/* FIXED: Edit Profile Button */}
                  <button
                    onClick={() =>
                      navigate(`/profile/${user.email}/edit-profile`)
                    }
                    className="w-full flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 font-semibold"
                  >
                    <Edit3 className="w-5 h-5" />
                    Edit Profile
                  </button>

                  {/* FIXED: Claimed Food Button */}
                  <button
                    onClick={() => navigate(`/claimed/${user.email}`)}
                    className="w-full flex items-center gap-3 bg-gray-700/50 border border-gray-600 text-white py-3 px-4 rounded-xl hover:bg-gray-600/50 transition-all duration-300 transform hover:-translate-y-1 font-semibold"
                  >
                    <Heart className="w-5 h-5 text-green-400" />
                    Claimed Food
                  </button>

                  {/* FIXED: Donated Food Button */}
                  <button
                    onClick={() => navigate(`/donated/${user.email}`)}
                    className="w-full flex items-center gap-3 bg-gray-700/50 border border-gray-600 text-white py-3 px-4 rounded-xl hover:bg-gray-600/50 transition-all duration-300 transform hover:-translate-y-1 font-semibold"
                  >
                    <Gift className="w-5 h-5 text-amber-400" />
                    Donated Food
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 bg-red-500/20 border border-red-500/30 text-red-400 py-3 px-4 rounded-xl hover:bg-red-500/30 transition-all duration-300 transform hover:-translate-y-1 font-semibold"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </div>

              {/* Impact Card */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">🌱</div>
                <h4 className="text-white font-bold mb-2">Your Impact</h4>
                <p className="text-indigo-300 text-sm">
                  You've helped reduce food waste and feed families in need.
                  Thank you for being part of our community!
                </p>
              </div>
            </div>
          )}

          {/* Viewing Other Profile */}
          {!isOwnProfile && (
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Community Member
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  This user is part of our FoodShare community, helping reduce
                  food waste and support those in need.
                </p>
                <button
                  onClick={() => navigate("/available-food")}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-semibold"
                >
                  Browse Available Food
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
