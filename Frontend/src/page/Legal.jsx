import React from "react";
import { Link } from "react-router-dom";
import {
  Scale,
  Mail,
  Phone,
  MapPin,
  Clock,
  FileSearch,
  ArrowLeft,
  Shield,
} from "lucide-react";

export default function Legal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <Scale className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Legal Information
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive legal documentation and contact information for
            FoodShare BD. Find everything you need for legal inquiries.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            {/* Quick Links */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Link
                to="/privacy"
                className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center hover:bg-blue-100 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-900">Privacy Policy</h3>
                <p className="text-blue-700 text-xs mt-1">
                  Data protection details
                </p>
              </Link>
              <Link
                to="/terms"
                className="bg-green-50 border border-green-200 rounded-xl p-4 text-center hover:bg-green-100 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-green-200">
                  <FileSearch className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-900">
                  Terms of Service
                </h3>
                <p className="text-green-700 text-xs mt-1">
                  Platform usage rules
                </p>
              </Link>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Scale className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-purple-900">
                  Legal Documents
                </h3>
                <p className="text-purple-700 text-xs mt-1">Current page</p>
              </div>
            </div>

            {/* Legal Sections */}
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileSearch className="w-4 h-4 text-red-600" />
                  </div>
                  Legal Notices & Disclaimers
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <p className="text-red-800 mb-4 font-medium">
                    Important legal information regarding the use of FoodShare
                    BD:
                  </p>
                  <ul className="space-y-3 text-red-700">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        FoodShare BD operates as a connecting platform and
                        assumes no liability for food quality, safety, or user
                        interactions.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        All users are responsible for complying with local food
                        safety regulations and transportation laws in
                        Bangladesh.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Intellectual property rights for the platform and its
                        content are reserved by FoodShare BD.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  Contact for Legal Requests
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Legal Inquiries
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="text-gray-900 font-medium">
                            legal@foodshare-bd.org
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-green-500" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="text-gray-900 font-medium">
                            +880 XXXX-XXXXXX
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-purple-500" />
                        <div>
                          <p className="text-sm text-gray-600">Response Time</p>
                          <p className="text-gray-900 font-medium">
                            3-5 business days
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Physical Address
                    </h3>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
                      <div>
                        <p className="text-gray-900 font-medium mb-2">
                          FoodShare BD Headquarters
                        </p>
                        <p className="text-gray-600 text-sm">
                          Level 5, ABC Tower
                          <br />
                          Gulshan Avenue
                          <br />
                          Dhaka 1212, Bangladesh
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileSearch className="w-4 h-4 text-green-600" />
                  </div>
                  Types of Legal Requests
                </h2>
                <div className="grid gap-4">
                  <div className="bg-white border border-orange-200 rounded-xl p-4">
                    <h3 className="font-semibold text-orange-900 mb-2">
                      📋 DMCA & Copyright
                    </h3>
                    <p className="text-orange-700 text-sm">
                      For copyright infringement claims or DMCA takedown
                      notices, include specific details about the copyrighted
                      work and its location on our platform.
                    </p>
                  </div>
                  <div className="bg-white border border-blue-200 rounded-xl p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      ⚖️ Legal Complaints
                    </h3>
                    <p className="text-blue-700 text-sm">
                      Formal legal complaints should be submitted in writing
                      with supporting documentation and contact information.
                    </p>
                  </div>
                  <div className="bg-white border border-purple-200 rounded-xl p-4">
                    <h3 className="font-semibold text-purple-900 mb-2">
                      🔍 Information Requests
                    </h3>
                    <p className="text-purple-700 text-sm">
                      For legal information requests from authorized entities,
                      please provide proper identification and jurisdiction
                      details.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Important Note */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> This legal page contains general
                information. For specific legal concerns or formal legal
                processes, please contact us through the official channels
                provided above. FoodShare BD is committed to operating in
                compliance with Bangladeshi laws and regulations.
              </p>
            </div>

            {/* Back to Home */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-md"
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
