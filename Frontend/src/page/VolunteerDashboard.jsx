import VolunteerNotifications from "../components/VolunteerNotifications";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function VolunteerDashboard() {
  const user = useSelector((state) => state.auth.user);

  if (!user || user.role !== "volunteer") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Volunteer Access Required
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Please sign in with your volunteer account to access the
                dashboard and start helping your community.
              </p>
              <a
                href="/login"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Sign In to Continue
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Volunteer Dashboard
                </h1>
                <p className="text-gray-600">
                  Welcome back,{" "}
                  <span className="font-semibold text-blue-600">
                    {user.name}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to="/volunteer/tasks"
                className="flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-xl hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-300"
              >
                <svg
                  className="w-5 h-5 mr-2 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                My Tasks
              </Link>
              <Link
                to={`/profile/${user.email}`}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl shadow-xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Make an Impact? 🌟
                </h2>
                <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                  You'll receive real-time alerts for nearby food donations. Be
                  quick to accept tasks and help reduce food waste in your
                  community!
                </p>
                <div className="flex items-center text-blue-100">
                  <div className="flex items-center mr-6">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm font-medium">Live Updates</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">
                      First-come, First-served
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* How It Works */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                How It Works
              </h3>

              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Stay Alert & Ready",
                    description:
                      "Keep this dashboard open to receive instant notifications about nearby donation requests in real-time.",
                    icon: "🔔",
                  },
                  {
                    step: "2",
                    title: "Quick Action Required",
                    description:
                      "Accept donation tasks quickly - they're assigned on a first-come, first-served basis to nearby volunteers.",
                    icon: "⚡",
                  },
                  {
                    step: "3",
                    title: "Manage & Complete",
                    description:
                      "Track all your accepted tasks, update status, and coordinate pickups through the 'My Tasks' section.",
                    icon: "✅",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start group hover:bg-gray-50 p-4 rounded-2xl transition-all duration-200"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{item.icon}</span>
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "My Active Tasks",
                    description: "View and manage your current assignments",
                    icon: "📋",
                    color: "from-blue-500 to-blue-600",
                    link: "/volunteer/tasks",
                  },
                  {
                    title: "Task History",
                    description: "Review your completed donations",
                    icon: "📊",
                    color: "from-green-500 to-green-600",
                    link: "/volunteer/history",
                  },
                  {
                    title: "Availability",
                    description: "Set your available hours",
                    icon: "🕒",
                    color: "from-purple-500 to-purple-600",
                    link: "/volunteer/availability",
                  },
                  {
                    title: "Resources",
                    description: "Guidelines and help materials",
                    icon: "📚",
                    color: "from-orange-500 to-orange-600",
                    link: "/volunteer/resources",
                  },
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="group p-6 bg-gradient-to-br hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rounded-2xl border border-gray-200 hover:border-transparent"
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-white transition-colors duration-200">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-sm group-hover:text-white/90 transition-colors duration-200">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Volunteer Status */}
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Your Status</h3>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
                    <span className="font-semibold">Active & Ready</span>
                  </div>
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-green-100 text-sm leading-relaxed">
                  You're currently receiving real-time donation alerts in your
                  area. Stay on this page for instant notifications.
                </p>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 text-yellow-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Pro Tips
              </h3>

              <div className="space-y-4">
                {[
                  "Keep this tab open and allow notifications for instant alerts",
                  "Be ready to accept tasks quickly - they go fast!",
                  "Check 'My Tasks' regularly for updates and instructions",
                  "Update your availability to receive relevant notifications",
                  "Contact support if you encounter any issues",
                ].map((tip, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Overview */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-lg p-6 text-white">
              <h3 className="font-bold mb-6 text-white">This Week</h3>
              <div className="space-y-4">
                {[
                  { label: "Tasks Completed", value: "12", change: "+2" },
                  { label: "Hours Volunteered", value: "8.5", change: "+1.5" },
                  { label: "People Helped", value: "24", change: "+4" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm"
                  >
                    <span className="text-blue-100 text-sm">{stat.label}</span>
                    <div className="text-right">
                      <div className="font-bold text-lg">{stat.value}</div>
                      <div className="text-green-300 text-xs font-medium">
                        {stat.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Component */}
      <VolunteerNotifications />
    </div>
  );
}
