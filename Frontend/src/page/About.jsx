import React, { useEffect } from "react";
import {
  Users,
  Target,
  Mail,
  Phone,
  University,
  Heart,
  Globe,
  Shield,
  Zap,
  Clock,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function About() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // Redirect volunteers away from About page
  useEffect(() => {
    if (user && user.role === "volunteer") {
      navigate("/volunteer");
    }
  }, [user, navigate]);

  const teamMembers = [
    {
      name: "Maharab Hosen",
      role: "Founder & CEO",
      avatar: "MH",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Limon",
      role: "Operations Lead",
      avatar: "LI",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Aryan",
      role: "Tech Lead",
      avatar: "AR",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Chandrakant Kumar",
      role: "Community Manager",
      avatar: "CK",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { number: "50+", label: "Meals Served Daily", icon: "🍽️" },
    { number: "8+", label: "Communities Reached", icon: "🏘️" },
    { number: "100+", label: "Lives Impacted", icon: "❤️" },
    { number: "10+", label: "Partners", icon: "🤝" },
  ];

  const values = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community First",
      desc: "We prioritize people over profit in everything we do",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Sustainability",
      desc: "Reducing food waste while building sustainable futures",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Compassion",
      desc: "Every meal matters, every person counts equally",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Innovation",
      desc: "Leveraging technology for meaningful social impact",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trust & Safety",
      desc: "Ensuring safe and reliable food distribution",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Efficiency",
      desc: "Quick response times for maximum food rescue",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center px-6 py-3 bg-indigo-500/20 border border-indigo-500/30 rounded-full mb-8 backdrop-blur-sm">
            <Heart className="w-5 h-5 text-indigo-400 mr-2" />
            <span className="text-indigo-300 font-medium">About FoodShare</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Building a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 animate-pulse">
              Hunger-Free
            </span>{" "}
            World
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            We're on a mission to eliminate food waste and hunger by connecting
            surplus food with people in need through cutting-edge technology and
            heartfelt compassion.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-6 text-center transform hover:-translate-y-3 transition-all duration-500 hover:border-indigo-500/50 group hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div className="text-3xl mb-3 opacity-80 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Mission & Team */}
          <div className="space-y-8">
            {/* Mission Card */}
            <div className="bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 animate-fade-in-up hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg mb-6 font-light">
                FoodShare was born from a strategic collaboration with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 font-semibold">
                  Chitkara University Innovation Incubator
                </span>
                . Our vision is clear: to create a sustainable and compassionate
                society where no food goes to waste and no one sleeps hungry.
              </p>
              <div className="flex items-center p-4 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl">
                <University className="w-6 h-6 text-indigo-400 mr-3" />
                <span className="text-indigo-300 font-medium">
                  Powered by Chitkara University Innovation Ecosystem
                </span>
              </div>
            </div>

            {/* Team Card */}
            <div className="bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 animate-fade-in-up hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Meet Our Team</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center p-5 bg-gray-700/30 rounded-2xl border border-gray-600 hover:border-indigo-500/50 transition-all duration-500 group hover:bg-gray-700/50 hover:scale-105"
                  >
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${member.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      {member.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-500 transition-all duration-300">
                        {member.name}
                      </div>
                      <div className="text-sm text-gray-400 font-medium">
                        {member.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Values */}
          <div className="space-y-8">
            {/* Contact Card */}
            <div className="bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 animate-fade-in-up hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Get In Touch</h2>
              </div>

              <div className="space-y-5 mb-6">
                <div className="flex items-center p-5 bg-gray-700/30 rounded-2xl border border-gray-600 hover:border-blue-500/50 transition-all duration-500 group hover:bg-gray-700/50 hover:scale-105">
                  <div className="p-3 bg-blue-500/20 rounded-xl mr-4">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-medium">
                      Email
                    </div>
                    <a
                      href="mailto:contact@foodshare.org"
                      className="text-blue-400 hover:text-blue-300 transition-colors font-semibold text-lg"
                    >
                      contact@foodshare.org
                    </a>
                  </div>
                </div>

                <div className="flex items-center p-5 bg-gray-700/30 rounded-2xl border border-gray-600 hover:border-green-500/50 transition-all duration-500 group hover:bg-gray-700/50 hover:scale-105">
                  <div className="p-3 bg-green-500/20 rounded-xl mr-4">
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-medium">
                      Phone
                    </div>
                    <a
                      href="tel:+015862826"
                      className="text-green-400 hover:text-green-300 transition-colors font-semibold text-lg"
                    >
                      +015862826
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
                <p className="text-purple-300 text-center font-medium text-lg">
                  💫 Together, we can create a world where no food is wasted and
                  no one goes hungry.
                </p>
              </div>
            </div>

            {/* Values Card */}
            <div className="bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 animate-fade-in-up hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500">
              <h2 className="text-3xl font-bold text-white mb-8">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-gray-700/30 rounded-2xl border border-gray-600 hover:border-indigo-500/50 transition-all duration-500 group hover:bg-gray-700/50 hover:scale-105"
                  >
                    <div
                      className={`p-2 bg-gradient-to-r ${value.color} rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}
                    >
                      {value.icon}
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-500">
                        {value.title}
                      </div>
                      <div className="text-gray-400 text-sm font-medium">
                        {value.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 rounded-3xl p-12 backdrop-blur-lg">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">
            Join our movement today and be part of the solution to end food
            waste and hunger in our communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/25"
            >
              Donate Food
            </a>
            <a
              href="/volunteer"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/25"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute left-10 top-40 w-3 h-3 bg-indigo-400 rounded-full opacity-60 animate-float"></div>
      <div className="absolute right-20 top-60 w-4 h-4 bg-purple-500 rounded-full opacity-40 animate-float-delayed"></div>
      <div className="absolute left-1/4 bottom-40 w-2 h-2 bg-cyan-400 rounded-full opacity-50 animate-float-slow"></div>
    </div>
  );
}
