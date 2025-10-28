import React from "react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-4 overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Left Column */}
        <div className="lg:w-1/2 text-center lg:text-left mb-16 lg:mb-0">
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-indigo-300 text-sm font-medium">
                Fighting Hunger, Reducing Waste
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              No One Sleeps{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 animate-pulse-slow">
                Hungry
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Every day, perfect food goes to waste while people go hungry.
              <span className="text-indigo-300 font-semibold">
                {" "}
                Food Share
              </span>{" "}
              bridges this gap by rescuing surplus food and delivering it to
              communities in need. Join our mission to create a world without
              food waste or hunger.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-8 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl font-semibold text-lg shadow-lg">
                <span className="flex items-center justify-center">
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Download App
                </span>
              </button>
              <button className="group border-2 border-indigo-400 text-indigo-400 py-4 px-8 rounded-xl hover:bg-indigo-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl font-semibold text-lg">
                <a
                  href="https://github.com/"
                  className="flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              </button>
            </div>

            {/* App Store Badges */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8">
              <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all duration-300 cursor-pointer">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all duration-300 cursor-pointer">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 10.937-2.302-2.302 10.937-10.937zm3.199 3.198l2.807 2.828a1.333 1.333 0 010 1.885l-1.211 1.21a1.333 1.333 0 01-1.885 0l-2.828-2.807 2.302-2.302 1.815-1.814z" />
                  </svg>
                  <div>
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Image) */}
        <div className="lg:w-1/2 flex justify-center relative">
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-2xl opacity-20 animate-pulse-slow"></div>

            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-2xl p-4 backdrop-blur-sm border border-indigo-500/20">
              <img
                src="https://th.bing.com/th/id/OIP.7IH_JI6csNY7rg7s3WAbGgHaFi?w=212&h=180&c=7&r=0&o=7&dpr=1.2&pid=1.7&rm=3"
                alt="Food Sharing Community"
                className="w-full max-w-md h-auto rounded-2xl transform hover:scale-105 transition-transform duration-500 shadow-2xl"
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg animate-float">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                <span className="text-sm font-semibold">Live Impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="mt-24 text-center">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Impact Powered by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              You
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Together, we're creating meaningful change in communities and
            building a sustainable future
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                number: "50+",
                text: "Meals donated to those in need",
                icon: "🍽️",
                color: "from-green-400 to-emerald-500",
              },
              {
                number: "10+",
                text: "Kgs of food saved from landfills",
                icon: "🌱",
                color: "from-blue-400 to-cyan-500",
              },
              {
                number: "100+",
                text: "Lives impacted through contributions",
                icon: "❤️",
                color: "from-purple-400 to-pink-500",
              },
              {
                number: "8+",
                text: "Communities served with hope",
                icon: "🏘️",
                color: "from-orange-400 to-red-500",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <h3
                  className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-3`}
                >
                  {stat.number}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-indigo-400 rounded-full opacity-60 animate-float"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-purple-500 rounded-full opacity-40 animate-float-delayed"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-indigo-300 rounded-full opacity-50 animate-float-slow"></div>
    </section>
  );
}
