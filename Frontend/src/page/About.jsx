import React from "react";
import { Users, Target, Mail, Phone, University, Heart } from "lucide-react";

export default function About() {
  const teamMembers = [
    { name: "Maharab Hosen", role: "Founder" },
    { name: "Limon", role: "Operations Lead" },
    { name: "Aryan", role: "Tech Lead" },
    { name: "Chandrakant Kumar", role: "Community Manager" },
  ];

  const stats = [
    { number: "50+", label: "Meals Served Daily" },
    { number: "8+", label: "Communities Reached" },
    { number: "100+", label: "Lives Impacted" },
    { number: "10+", label: "Partners" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-6 py-3 bg-indigo-500/20 border border-indigo-500/30 rounded-full mb-8">
            <Heart className="w-5 h-5 text-indigo-400 mr-2" />
            <span className="text-indigo-300 font-medium">About FoodShare</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Building a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Hunger-Free
            </span>{" "}
            World
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to eliminate food waste and hunger by connecting
            surplus food with people in need through technology and compassion.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center transform hover:-translate-y-2 transition-all duration-300 hover:border-indigo-500/50 group"
            >
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Mission & Team */}
          <div className="space-y-8">
            {/* Mission Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 animate-fade-in-up">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-500/20 rounded-xl mr-4">
                  <Target className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                FoodShare was born from a collaboration with{" "}
                <span className="text-indigo-400 font-semibold">
                  Chitkara University
                </span>
                with a clear vision: to create a sustainable and compassionate
                society where no food goes to waste and no one sleeps hungry.
              </p>
              <div className="flex items-center p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                <University className="w-5 h-5 text-indigo-400 mr-3" />
                <span className="text-indigo-300">
                  In partnership with Chitkara University Innovation Incubator
                </span>
              </div>
            </div>

            {/* Team Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 animate-fade-in-up">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-500/20 rounded-xl mr-4">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Team</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-gray-700/30 rounded-xl border border-gray-600 hover:border-indigo-500/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 group-hover:scale-110 transition-transform duration-300">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {member.name}
                      </div>
                      <div className="text-sm text-gray-400">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Values */}
          <div className="space-y-8">
            {/* Contact Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 animate-fade-in-up">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-500/20 rounded-xl mr-4">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Get In Touch</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-700/30 rounded-xl border border-gray-600 hover:border-blue-500/50 transition-all duration-300 group">
                  <Mail className="w-5 h-5 text-blue-400 mr-4" />
                  <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <a
                      href="mailto:contact@foodshare.org"
                      className="text-blue-400 hover:text-blue-300 transition-colors font-semibold"
                    >
                      contact@foodshare.org
                    </a>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-700/30 rounded-xl border border-gray-600 hover:border-green-500/50 transition-all duration-300 group">
                  <Phone className="w-5 h-5 text-green-400 mr-4" />
                  <div>
                    <div className="text-sm text-gray-400">Phone</div>
                    <a
                      href="tel:+919876543210"
                      className="text-green-400 hover:text-green-300 transition-colors font-semibold"
                    >
                      +015862826
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <p className="text-purple-300 text-sm text-center">
                  💫 Together, we can create a world where no food is wasted and
                  no one goes hungry.
                </p>
              </div>
            </div>

            {/* Values Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-white mb-6">Our Values</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: "🤝",
                    title: "Community First",
                    desc: "We prioritize people over profit",
                  },
                  {
                    icon: "🌱",
                    title: "Sustainability",
                    desc: "Reducing waste, building futures",
                  },
                  {
                    icon: "💙",
                    title: "Compassion",
                    desc: "Every meal matters, every person counts",
                  },
                  {
                    icon: "🚀",
                    title: "Innovation",
                    desc: "Using technology for social good",
                  },
                ].map((value, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-3 hover:bg-gray-700/30 rounded-xl transition-all duration-300"
                  >
                    <div className="text-2xl">{value.icon}</div>
                    <div>
                      <div className="font-semibold text-white">
                        {value.title}
                      </div>
                      <div className="text-gray-400 text-sm">{value.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute left-10 bottom-20 w-3 h-3 bg-indigo-400 rounded-full opacity-60 animate-float"></div>
        <div className="absolute right-20 top-40 w-4 h-4 bg-purple-500 rounded-full opacity-40 animate-float-delayed"></div>
      </div>
    </div>
  );
}
