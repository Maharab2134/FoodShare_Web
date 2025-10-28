import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "How do I donate food?",
    a: "Go to the Donate page, fill the form with details (food name, quantity, location) and submit. Volunteers or recipients will be notified.",
    icon: "🎁",
  },
  {
    q: "Is there a charge to use FoodShare?",
    a: "No — FoodShare is completely free for both donors and recipients. We're committed to connecting surplus food with people in need without any costs.",
    icon: "💳",
  },
  {
    q: "How do I claim food?",
    a: "Browse available food listings, click 'Claim' on an item and follow the instructions. Make sure your profile has a valid contact number for coordination.",
    icon: "📱",
  },
  {
    q: "Is my contact information shared?",
    a: "Only the donor's contact info is shared with the claimer to coordinate pickup. We recommend using verified accounts and following safety guidelines for secure transactions.",
    icon: "🔒",
  },
  {
    q: "What types of food can I donate?",
    a: "You can donate any non-perishable items, freshly cooked meals, and perishable items with clear expiry dates. All food must be safe for consumption.",
    icon: "🍽️",
  },
  {
    q: "How quickly is food distributed?",
    a: "Most food items are claimed within 2-4 hours. We prioritize quick distribution to ensure food remains fresh and reaches those in need promptly.",
    icon: "⚡",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-500/20 rounded-2xl">
              <HelpCircle className="w-8 h-8 text-indigo-400" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get quick answers to common questions about how FoodShare works and
            how you can participate.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* FAQ Card */}
                <div
                  className={`bg-gray-800/50 backdrop-blur-sm border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                    isOpen
                      ? "border-indigo-500 shadow-2xl shadow-indigo-500/10"
                      : "border-gray-700 hover:border-indigo-500/50 hover:shadow-xl"
                  }`}
                  onClick={() => toggleFAQ(idx)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Icon */}
                      <div
                        className={`text-2xl transform transition-transform duration-300 ${
                          isOpen ? "scale-110" : "group-hover:scale-105"
                        }`}
                      >
                        {item.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white pr-2 leading-relaxed">
                          {item.q}
                        </h3>

                        {/* Answer with smooth animation */}
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            isOpen
                              ? "max-h-96 opacity-100 mt-4"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <p className="text-gray-300 leading-relaxed pl-2 border-l-2 border-indigo-500 pl-4">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Chevron Icon */}
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp
                          size={24}
                          className="text-indigo-400 transform transition-transform duration-300"
                        />
                      ) : (
                        <ChevronDown
                          size={24}
                          className="text-gray-400 group-hover:text-indigo-400 transform group-hover:translate-y-1 transition-all duration-300"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 animate-fade-in">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Our support team is here to help you with any additional questions
              about using FoodShare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-8 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl font-semibold">
                Contact Support
              </button>
              <button className="border-2 border-indigo-400 text-indigo-400 py-3 px-8 rounded-xl hover:bg-indigo-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1 font-semibold">
                Join Community
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute left-10 bottom-20 w-3 h-3 bg-indigo-400 rounded-full opacity-60 animate-float"></div>
        <div className="absolute right-20 top-40 w-4 h-4 bg-purple-500 rounded-full opacity-40 animate-float-delayed"></div>
      </div>
    </section>
  );
}
