import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Scale,
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to FoodShare BD. By using our platform, you agree to these
            terms designed to create a safe and effective community.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            {/* Agreement Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-700 text-sm">
                  By accessing or using FoodShare BD, you acknowledge that you
                  have read, understood, and agree to be bound by these Terms of
                  Service.
                </p>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Scale className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Acceptance of Terms
                  </h2>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-700 mb-4">
                    These Terms of Service govern your use of the FoodShare BD
                    platform. By creating an account or using our services, you
                    agree to comply with these terms and all applicable laws in
                    Bangladesh.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Eligibility
                      </h3>
                      <p className="text-gray-600">
                        You must be at least 18 years old to use our platform
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Account Responsibility
                      </h3>
                      <p className="text-gray-600">
                        You are responsible for maintaining your account
                        security
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    User Responsibilities
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-white border border-purple-200 rounded-xl p-4">
                    <h3 className="font-semibold text-purple-900 mb-2">
                      Compliance with Laws
                    </h3>
                    <p className="text-purple-700 text-sm">
                      Users must comply with all applicable Bangladeshi laws and
                      regulations, including food safety standards and
                      transportation regulations.
                    </p>
                  </div>
                  <div className="bg-white border border-blue-200 rounded-xl p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Accurate Information
                    </h3>
                    <p className="text-blue-700 text-sm">
                      Provide accurate and truthful information about food
                      donations, including quantity, type, and expiration
                      details.
                    </p>
                  </div>
                  <div className="bg-white border border-green-200 rounded-xl p-4">
                    <h3 className="font-semibold text-green-900 mb-2">
                      Community Guidelines
                    </h3>
                    <p className="text-green-700 text-sm">
                      Treat all community members with respect and follow our
                      community standards for interactions.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Service Limitations & Disclaimers
                  </h2>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <p className="text-orange-800 mb-4 font-medium">
                    Important: Please read these limitations carefully
                  </p>
                  <ul className="space-y-3 text-orange-700">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        <strong>Matching Service Only:</strong> FoodShare BD
                        acts as a platform to connect donors with volunteers. We
                        are not responsible for the quality, safety, or
                        condition of donated food items.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        <strong>User Verification:</strong> While we encourage
                        safe interactions, users are responsible for verifying
                        the credibility of other parties.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        <strong>Liability:</strong> FoodShare BD is not liable
                        for any damages, losses, or disputes arising from food
                        donations or volunteer activities.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Prohibited Activities
                  </h3>
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">
                        Selling or commercializing donated food
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">
                        Providing false or misleading information
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">
                        Harassing or threatening other users
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">
                        Donating unsafe or expired food items
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Note */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Legal Notice:</strong> These terms may be updated
                periodically. Continued use of the platform after changes
                constitutes acceptance of the modified terms.
              </p>
            </div>

            {/* Back to Home */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium shadow-md"
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
