import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { MapPin, Utensils, Scale, Phone, Navigation, Heart } from "lucide-react";

export default function DonateFood() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  
  // Prevent volunteers from accessing donate page
  useEffect(() => {
    if (user && user.role === "volunteer") {
      navigate("/volunteer");
    }
  }, [user, navigate]);

  const [locationLoading, setLocationLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [foodData, setFoodData] = useState({
    foodName: "",
    category: "Human",
    quantity: "",
    location: "",
    phone: "",
  });

  const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_API;
  const API = import.meta.env.VITE_REACT_APP_API;
  let data = JSON.parse(localStorage.getItem("auth"));

  const validateField = (name, value) => {
    const errors = { ...formErrors };
    
    switch (name) {
      case "foodName":
        if (!value.trim()) {
          errors.foodName = "Food name is required";
        } else if (value.trim().length < 2) {
          errors.foodName = "Food name is too short";
        } else {
          delete errors.foodName;
        }
        break;
      
      case "quantity":
        if (!value) {
          errors.quantity = "Quantity is required";
        } else if (parseFloat(value) <= 0) {
          errors.quantity = "Quantity must be greater than 0";
        } else {
          delete errors.quantity;
        }
        break;
      
      case "phone":
        const rawPhone = value.replace(/\s+/g, "");
        const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
        if (!value) {
          errors.phone = "Phone number is required";
        } else if (!bdPhoneRegex.test(rawPhone)) {
          errors.phone = "Please enter a valid Bangladeshi phone number";
        } else {
          delete errors.phone;
        }
        break;
      
      case "location":
        if (!value.trim()) {
          errors.location = "Location is required";
        } else {
          delete errors.location;
        }
        break;
      
      default:
        break;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value: rawValue } = e.target;
    let value = rawValue;
    
    // For phone field, allow only digits (no letters or symbols)
    if (name === "phone") {
      value = rawValue.replace(/\D/g, "");
      // Auto-format as user types
      if (value.length <= 11 && value.startsWith('01')) {
        value = value.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
      } else if (value.length > 11) {
        value = value.replace(/(\d{2})(\d{4})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
      }
    }
    
    setFoodData({ ...foodData, [name]: value });
    validateField(name, value);
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
            );

            if (response.data.status === "OK" && response.data.results.length > 0) {
              setFoodData((prev) => ({
                ...prev,
                location: response.data.results[0].formatted_address,
                latitude,
                longitude,
              }));
              toast.success(
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="text-gray-900">Location detected successfully!</span>
                </div>
              );
              validateField("location", response.data.results[0].formatted_address);
            } else {
              toast.error("Could not fetch exact location details.");
            }
          } catch (error) {
            toast.error("Failed to fetch location. Please try again.");
          } finally {
            setLocationLoading(false);
          }
        },
        (error) => {
          let errorMessage = "Please allow location access to continue.";
          if (error.code === error.TIMEOUT) {
            errorMessage = "Location request timed out. Please try again.";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = "Location information is unavailable.";
          }
          toast.error(errorMessage);
          setLocationLoading(false);
        },
        { 
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const fieldsToValidate = ["foodName", "quantity", "phone", "location"];
    let isValid = true;
    
    fieldsToValidate.forEach(field => {
      if (!validateField(field, foodData[field])) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setSubmitting(true);

    // Normalize phone number
    const rawPhone = foodData.phone.replace(/\s+/g, "");
    let digits = rawPhone.replace(/\D/g, "");
    if (/^01/.test(digits)) {
      digits = "88" + digits;
    }
    const normalizedPhone = digits;

    try {
      await axios.post(
        `${API}/api/food/add`,
        {
          ...foodData,
          donorContactNo: normalizedPhone,
        },
        {
          headers: { Authorization: `Bearer ${data.token}` },
        }
      );

      toast.success(
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-green-500" />
          <div>
            <p className="font-semibold text-gray-900">Donation Successful!</p>
            <p className="text-sm text-gray-700">Thank you for helping reduce food waste</p>
          </div>
        </div>
      );

      // Clear form fields
      setFoodData({
        foodName: "",
        category: "Human",
        quantity: "",
        location: "",
        phone: "",
      });
      setFormErrors({});

      // Redirect after a short delay
      setTimeout(() => {
        navigate(`/donated/${user.email}`);
      }, 2000);
    } catch (error) {
      console.error("Donation error:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit donation. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Share Food, Spread Hope
          </h1>
          <p className="text-gray-700 text-lg">
            Your donation helps reduce food waste and feed those in need
          </p>
        </div>

        {/* Donation Form */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Food Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-900 mb-2">
                <Utensils className="w-4 h-4 mr-2 text-gray-600" />
                Food Item
              </label>
              <input
                type="text"
                name="foodName"
                placeholder="e.g., Rice, Vegetables, Fruits..."
                value={foodData.foodName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-2xl border-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                  formErrors.foodName 
                    ? "border-red-300 bg-red-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                required
              />
              {formErrors.foodName && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  ⚠️ {formErrors.foodName}
                </p>
              )}
            </div>

            {/* Category & Quantity Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-900 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={foodData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-900"
                >
                  <option value="Human">For People</option>
                  <option value="Animal">For Animals</option>
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-900 mb-2">
                  <Scale className="w-4 h-4 mr-2 text-gray-600" />
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="0.0"
                  min="0.1"
                  step="0.1"
                  value={foodData.quantity}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-2xl border-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                    formErrors.quantity 
                      ? "border-red-300 bg-red-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  required
                />
                <p className="text-xs text-gray-600 mt-1">in kilograms (kg)</p>
                {formErrors.quantity && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    ⚠️ {formErrors.quantity}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-900 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-gray-600" />
                Pickup Location
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="location"
                  placeholder="Click the button to detect your location"
                  value={foodData.location}
                  onChange={handleChange}
                  className={`flex-1 px-4 py-3 rounded-2xl border-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                    formErrors.location 
                      ? "border-red-300 bg-red-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  required
                  readOnly
                />
                <button
                  type="button"
                  onClick={getLocation}
                  disabled={locationLoading}
                  className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 text-white ${
                    locationLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-0.5"
                  }`}
                >
                  {locationLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="hidden sm:inline">Detecting...</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4" />
                      <span className="hidden sm:inline">Locate</span>
                    </>
                  )}
                </button>
              </div>
              {formErrors.location && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  ⚠️ {formErrors.location}
                </p>
              )}
              <p className="text-xs text-gray-600 mt-2">
                We need your location to connect you with nearby volunteers
              </p>
            </div>

            {/* Phone Number */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-900 mb-2">
                <Phone className="w-4 h-4 mr-2 text-gray-600" />
                Contact Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="01XXX XXXXXX"
                value={foodData.phone}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={14}
                className={`w-full px-4 py-3 rounded-2xl border-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                  formErrors.phone 
                    ? "border-red-300 bg-red-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                required
              />
              {formErrors.phone && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  ⚠️ {formErrors.phone}
                </p>
              )}
              <p className="text-xs text-gray-600 mt-1">
                Bangladeshi number (01XXXXXXXXX)
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || Object.keys(formErrors).length > 0}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 text-white ${
                submitting || Object.keys(formErrors).length > 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg hover:from-green-600 hover:to-emerald-700"
              }`}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting Donation...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Donate Food
                </span>
              )}
            </button>
          </form>
         
        </div>
      </div>
      <ToastContainer 
        position="top-center" 
        autoClose={3000}
        toastClassName="bg-white text-gray-900"
        progressClassName="bg-gradient-to-r from-green-500 to-emerald-600"
      />
    </div>
  );
}