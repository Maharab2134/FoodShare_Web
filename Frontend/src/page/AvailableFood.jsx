import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GoogleMap,
  LoadScriptNext,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import {
  MapPin,
  Clock,
  User,
  Scale,
  Heart,
  PawPrint,
  Filter,
  Plus,
  Navigation,
  Sparkles,
  X,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "1.5rem",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
};

const defaultCenter = { lat: 20.5937, lng: 78.9629 };

const darkMapStyles = [
  {
    elementType: "geometry",
    stylers: [{ color: "#242f3e" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#746855" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#242f3e" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

export default function AvailableFood() {
  const user = useSelector((state) => state.auth.user);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showMap, setShowMap] = useState(false);
  const [selected, setSelected] = useState(null);
  const [map, setMap] = useState(null);

  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_API;
  const rawAPI = import.meta.env.VITE_REACT_APP_API || "";
  const API =
    rawAPI.replace(/^\s*"|"\s*$|^\s*'|'\s*$/g, "") ||
    `${window.location.protocol}//${window.location.hostname}:5000`;

  const resolveImageUrl = (img) => {
    // Force all food images to the project's chosen Unsplash premium vector URL
    // per request. This ensures consistent visuals during demos.
    return "https://plus.unsplash.com/premium_vector-1713201017274-e9e97d783e75?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764";
  };

  // Redirect volunteers away from non-volunteer views
  useEffect(() => {
    if (user && user.role === "volunteer") {
      navigate("/volunteer");
    }
  }, [user, navigate]);

  useEffect(() => {
    async function fetchFoodItems() {
      try {
        const response = await axios.get(`${API}/api/food/available`);
        const filtered = response.data.filter(
          (item) => item.emailid !== user.email
        );
        setFoodItems(filtered);
      } catch (error) {
        toast.error("Failed to fetch food items");
      } finally {
        setLoading(false);
      }
    }
    fetchFoodItems();
  }, []);

  const handleClaimFood = async (foodId) => {
    setClaimingId(foodId);
    try {
      let auth = localStorage.getItem("auth");
      auth = JSON.parse(auth);
      const token = auth.token;

      await axios.put(
        `${API}/api/food/claim/${foodId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("🎉 Food claimed successfully!");
      setFoodItems((prev) => prev.filter((item) => item._id !== foodId));
      setSelected(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to claim food");
    } finally {
      setClaimingId(null);
    }
  };

  const filteredItems =
    selectedCategory === "All"
      ? foodItems
      : foodItems.filter(
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const mapCenter =
    filteredItems.length > 0
      ? {
          lat: Number(filteredItems[0].latitude),
          lng: Number(filteredItems[0].longitude),
        }
      : defaultCenter;

  const getCategoryIcon = (category) => {
    return category.toLowerCase() === "human" ? (
      <Heart className="w-4 h-4" />
    ) : (
      <PawPrint className="w-4 h-4" />
    );
  };

  const getCategoryColor = (category) => {
    return category.toLowerCase() === "human"
      ? "from-pink-500 to-rose-500"
      : "from-amber-500 to-orange-500";
  };

  const getCategoryBadgeColor = (category) => {
    return category.toLowerCase() === "human"
      ? "bg-gradient-to-r from-pink-500 to-rose-500"
      : "bg-gradient-to-r from-amber-500 to-orange-500";
  };

  const onMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400 mr-2" />
            <span className="text-indigo-300 text-sm font-medium">
              Available Food Listings
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Available{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Food
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Find surplus food in your area and help reduce waste while
            supporting your community
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300 font-medium">Filter by:</span>
            <div className="flex gap-2">
              {["All", "Human", "Animal"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {cat !== "All" && getCategoryIcon(cat)}
                    {cat}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowMap(!showMap)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                showMap
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              <Navigation className="w-4 h-4" />
              {showMap ? "Show List" : "Show Map"}
            </button>
            <button
              onClick={() => navigate("/donate")}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl font-semibold"
            >
              <Plus className="w-4 h-4" />
              Donate Food
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin h-16 w-16 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading available food...</p>
          </div>
        ) : (
          <>
            {/* Food Items Grid */}
            {!showMap && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <div
                      key={item._id}
                      className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={resolveImageUrl(item.image)}
                          alt={item.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <div
                            className={`px-3 py-1 rounded-full ${getCategoryBadgeColor(
                              item.category
                            )} text-white text-sm font-semibold flex items-center gap-1`}
                          >
                            {getCategoryIcon(item.category)}
                            {item.category}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-white line-clamp-1">
                            {item.name}
                          </h3>
                          <div className="text-green-400 font-bold text-lg">
                            {item.quantity}kg
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <User className="w-4 h-4" />
                            <span className="text-sm">{item.donorName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm line-clamp-1">
                              {item.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleClaimFood(item._id)}
                            disabled={claimingId === item._id}
                            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-center"
                          >
                            {claimingId === item._id ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Claiming...
                              </div>
                            ) : (
                              "Claim Food"
                            )}
                          </button>
                          <a
                            href={`/profile/${item.emailid}`}
                            className="px-4 py-3 bg-gray-700/50 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-600/50 transition-all duration-300 flex items-center justify-center"
                          >
                            <User className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-10 h-10 text-gray-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-300 mb-2">
                      No Food Available
                    </h3>
                    <p className="text-gray-400 mb-6">
                      There are no food items available for this category at the
                      moment.
                    </p>
                    <button
                      onClick={() => navigate("/donate")}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-semibold"
                    >
                      Be the First to Donate
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Map View */}
            {showMap && (
              <div className="mb-8">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                        <Navigation className="w-5 h-5 text-white" />
                      </div>
                      Food Locations Map
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
                        <span className="text-gray-300">Human Food</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                        <span className="text-gray-300">Animal Food</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <LoadScriptNext googleMapsApiKey={API_KEY}>
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={mapCenter}
                        zoom={12}
                        options={{
                          styles: darkMapStyles,
                          disableDefaultUI: false,
                          zoomControl: true,
                          mapTypeControl: true,
                          scaleControl: true,
                          streetViewControl: true,
                          rotateControl: true,
                          fullscreenControl: true,
                        }}
                        onLoad={onMapLoad}
                      >
                        {filteredItems.map((item) =>
                          item.latitude && item.longitude ? (
                            <Marker
                              key={item._id}
                              position={{
                                lat: Number(item.latitude),
                                lng: Number(item.longitude),
                              }}
                              title={`${item.name} - ${item.donorName}`}
                              onClick={() => setSelected(item)}
                              icon={{
                                url: `data:image/svg+xml;base64,${btoa(`
                                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="18" fill="${
                                      item.category.toLowerCase() === "human"
                                        ? "#8b5cf6"
                                        : "#f59e0b"
                                    }" stroke="#1f2937" stroke-width="2"/>
                                    <path d="M20 12L23 17L28 18L25 22L26 28L20 25L14 28L15 22L12 18L17 17L20 12Z" fill="white"/>
                                    <circle cx="20" cy="20" r="18" fill="none" stroke="${
                                      item.category.toLowerCase() === "human"
                                        ? "#a78bfa"
                                        : "#fbbf24"
                                    }" stroke-width="2"/>
                                  </svg>
                                `)}`,
                                // Avoid using `window.google` during render; let the browser size the SVG marker.
                              }}
                            />
                          ) : null
                        )}
                        {selected &&
                          selected.latitude &&
                          selected.longitude && (
                            <InfoWindow
                              position={{
                                lat: Number(selected.latitude),
                                lng: Number(selected.longitude),
                              }}
                              onCloseClick={() => setSelected(null)}
                            >
                              <div className="bg-gray-800 rounded-xl p-4 max-w-xs border border-gray-600 shadow-2xl">
                                <div className="flex justify-between items-start mb-3">
                                  <h4 className="font-bold text-white text-lg">
                                    {selected.name}
                                  </h4>
                                  <button
                                    onClick={() => setSelected(null)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>

                                <div className="space-y-2 mb-4">
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-indigo-400" />
                                    <span className="text-gray-300 text-sm">
                                      {selected.donorName}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-green-400" />
                                    <span className="text-gray-300 text-sm">
                                      {selected.location}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Scale className="w-4 h-4 text-amber-400" />
                                    <span className="text-gray-300 text-sm font-semibold">
                                      {selected.quantity} kg available
                                    </span>
                                  </div>
                                  {selected.donorContactNo && (
                                    <div className="flex items-center gap-2">
                                      <Phone className="w-4 h-4 text-blue-400" />
                                      <span className="text-gray-300 text-sm">
                                        {selected.donorContactNo}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <div className="flex gap-2">
                                  <button
                                    onClick={() =>
                                      handleClaimFood(selected._id)
                                    }
                                    disabled={claimingId === selected._id}
                                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm text-center"
                                  >
                                    {claimingId === selected._id ? (
                                      <div className="flex items-center justify-center gap-1">
                                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Claiming...
                                      </div>
                                    ) : (
                                      "Claim Food"
                                    )}
                                  </button>
                                  <a
                                    href={`/profile/${selected.emailid}`}
                                    className="px-3 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center justify-center"
                                  >
                                    <User className="w-3 h-3" />
                                  </a>
                                </div>
                              </div>
                            </InfoWindow>
                          )}
                      </GoogleMap>
                    </LoadScriptNext>

                    {/* Map Controls Overlay */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                        <div className="text-xs text-gray-300 font-semibold mb-1">
                          Total Locations: {filteredItems.length}
                        </div>
                        <div className="flex gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            <span className="text-gray-400">
                              {
                                filteredItems.filter(
                                  (item) =>
                                    item.category.toLowerCase() === "human"
                                ).length
                              }{" "}
                              Human
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span className="text-gray-400">
                              {
                                filteredItems.filter(
                                  (item) =>
                                    item.category.toLowerCase() === "animal"
                                ).length
                              }{" "}
                              Animal
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Bar */}
            {filteredItems.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-indigo-400">
                      {filteredItems.length}
                    </div>
                    <div className="text-gray-400 text-sm">Total Listings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">
                      {
                        filteredItems.filter(
                          (item) => item.category.toLowerCase() === "human"
                        ).length
                      }
                    </div>
                    <div className="text-gray-400 text-sm">For Humans</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-amber-400">
                      {
                        filteredItems.filter(
                          (item) => item.category.toLowerCase() === "animal"
                        ).length
                      }
                    </div>
                    <div className="text-gray-400 text-sm">For Animals</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">
                      {filteredItems.reduce(
                        (sum, item) => sum + parseFloat(item.quantity),
                        0
                      )}
                      kg
                    </div>
                    <div className="text-gray-400 text-sm">Total Food</div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <ToastContainer
          position="bottom-right"
          theme="dark"
          toastStyle={{
            background: "#1f2937",
            color: "white",
            borderRadius: "0.75rem",
          }}
        />
      </div>
    </div>
  );
}
