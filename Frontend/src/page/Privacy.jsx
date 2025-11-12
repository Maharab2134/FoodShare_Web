import React from "react";
import { Link } from "react-router-dom";
import { Shield, Eye, Lock, Users, Globe, ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Protecting your privacy is our top priority. Learn how FoodShare BD
            collects, uses, and safeguards your information.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            {/* Last Updated */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-blue-700 text-sm font-medium">
                📅 Last updated:{" "}
                {new Date().toLocaleDateString("en-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Information We Collect
                  </h2>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Contact details (name, email, phone number)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Location data (with your explicit consent) for matching
                        donors with volunteers
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Usage data to improve service quality and user
                        experience
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Food donation details and volunteer activity records
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    How We Use Your Data
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <h3 className="font-semibold text-purple-900 mb-2">
                      Service Matching
                    </h3>
                    <p className="text-purple-700 text-sm">
                      Connect food donors with volunteers in your area
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Communication
                    </h3>
                    <p className="text-blue-700 text-sm">
                      Send important updates and transaction notifications
                    </p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h3 className="font-semibold text-green-900 mb-2">
                      Service Improvement
                    </h3>
                    <p className="text-green-700 text-sm">
                      Enhance platform features and user experience
                    </p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <h3 className="font-semibold text-orange-900 mb-2">
                      Safety & Security
                    </h3>
                    <p className="text-orange-700 text-sm">
                      Ensure community guidelines are followed
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Data Protection
                  </h2>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <p className="text-red-800 mb-4">
                    We implement industry-standard security measures to protect
                    your personal information:
                  </p>
                  <ul className="space-y-2 text-red-700">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      Encryption of sensitive data in transit and at rest
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      Regular security audits and monitoring
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      Limited access to personal information
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      Compliance with Bangladesh Data Protection Act
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Rights
                  </h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <p className="text-gray-700 mb-4">
                    Under Bangladeshi law and our commitment to transparency,
                    you have the right to:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 text-xs font-bold">
                          1
                        </span>
                      </div>
                      <span className="text-gray-700">
                        Access your personal data
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 text-xs font-bold">
                          2
                        </span>
                      </div>
                      <span className="text-gray-700">
                        Correct inaccurate information
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 text-xs font-bold">
                          3
                        </span>
                      </div>
                      <span className="text-gray-700">
                        Request data deletion
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 text-xs font-bold">
                          4
                        </span>
                      </div>
                      <span className="text-gray-700">
                        Opt-out of communications
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Note */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> This is a simplified privacy policy for
                demonstration. For production deployment in Bangladesh, consult
                with legal experts to ensure compliance with local data
                protection regulations.
              </p>
            </div>

            {/* Back to Home */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 font-medium shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
