export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "Food Share has been a life-saver. It's such a great way to make sure no food goes to waste, and I feel good knowing my donations are making a real difference.",
      name: "Ritvik Das",
      role: "College Student",
      avatar: "https://th.bing.com/th/id/R.47d1cc4b137f211cb1c3dfa2135bacba?rik=ZyqfGjPxlsy%2fcQ&riu=http%3a%2f%2fgenslerzudansdentistry.com%2fwp-content%2fuploads%2f2015%2f11%2fanonymous-user.png&ehk=dJX%2fxGNqMoZrDjZmTuHpot4p8blz6HCbhb%2bTyBYlXDU%3d&risl=&pid=ImgRaw&r=0",
      emoji: "🌟"
    },
    {
      id: 2,
      quote: "As a non-profit, Food Share has been a key partner in helping us feed those in need. The seamless donation process and incredible support have made a huge difference.",
      name: "Ramesh Kumar",
      role: "Factory Worker",
      avatar: "https://th.bing.com/th/id/R.47d1cc4b137f211cb1c3dfa2135bacba?rik=ZyqfGjPxlsy%2fcQ&riu=http%3a%2f%2fgenslerzudansdentistry.com%2fwp-content%2fuploads%2f2015%2f11%2fanonymous-user.png&ehk=dJX%2fxGNqMoZrDjZmTuHpot4p8blz6HCbhb%2bTyBYlXDU%3d&risl=&pid=ImgRaw&r=0",
      emoji: "🤝"
    },
    {
      id: 3,
      quote: "I've seen how my small contributions have turned into full meals for families in need. The platform is simple to use, and knowing I'm part of something bigger makes it all worth it!",
      name: "Kashmeer Grover",
      role: "Entrepreneur",
      avatar: "https://th.bing.com/th/id/R.47d1cc4b137f211cb1c3dfa2135bacba?rik=ZyqfGjPxlsy%2fcQ&riu=http%3a%2f%2fgenslerzudansdentistry.com%2fwp-content%2fuploads%2f2015%2f11%2fanonymous-user.png&ehk=dJX%2fxGNqMoZrDjZmTuHpot4p8blz6HCbhb%2bTyBYlXDU%3d&risl=&pid=ImgRaw&r=0",
      emoji: "💫"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Voices of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Impact
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how Food Share is transforming lives and communities through the power of 
            shared meals. These stories inspire our mission every day.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Background Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Testimonial Card */}
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full transform group-hover:-translate-y-2 transition-all duration-300 group-hover:border-indigo-500/50">
                {/* Quote Icon */}
                <div className="text-4xl mb-4 text-indigo-400 transform group-hover:scale-110 transition-transform duration-300">
                  {testimonial.emoji}
                </div>
                
                {/* Quote */}
                <p className="text-lg text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="relative w-14 h-14 rounded-full border-2 border-gray-600 group-hover:border-indigo-400 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-lg">{testimonial.name}</p>
                    <p className="text-indigo-300 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 max-w-4xl mx-auto animate-fade-in-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="group">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                95%
              </div>
              <p className="text-gray-400 text-sm">User Satisfaction</p>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                24h
              </div>
              <p className="text-gray-400 text-sm">Avg. Response Time</p>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                10K+
              </div>
              <p className="text-gray-400 text-sm">Active Users</p>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                4.9★
              </div>
              <p className="text-gray-400 text-sm">App Store Rating</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 animate-fade-in">
          <p className="text-gray-400 mb-6">Join thousands of users making a difference</p>
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-8 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl font-semibold text-lg">
            Share Your Story
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute left-10 bottom-20 w-3 h-3 bg-indigo-400 rounded-full opacity-60 animate-float"></div>
      <div className="absolute right-20 top-40 w-4 h-4 bg-purple-500 rounded-full opacity-40 animate-float-delayed"></div>
    </section>
  );
}