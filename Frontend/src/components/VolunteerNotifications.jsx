import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  MapPin,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Bell,
  Package,
  Navigation,
} from "lucide-react";

export default function VolunteerNotifications() {
  const user = useSelector((s) => s.auth.user);
  const [items, setItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const socketRef = useRef(null);

  // Sanitize Vite env (may include quotes)
  const rawAPI = import.meta.env.VITE_REACT_APP_API || "";
  const API =
    rawAPI.replace(/^\s*"|"\s*$|^\s*'|'\s*$/g, "") ||
    `${window.location.protocol}//${window.location.hostname}:5000`;

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${API.replace(/\/$/, "")}/api/food/available`
        );
        setItems(res.data || []);
        sessionStorage.setItem(
          "fs_notifications_count",
          String((res.data || []).length)
        );
        window.dispatchEvent(new Event("fs_notifications_updated"));
      } catch (err) {
        console.error(
          "Failed to load available donations",
          err?.response || err
        );
        toast.error("Failed to load donations");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!user || user.role !== "volunteer") return;
    const token = JSON.parse(localStorage.getItem("auth"))?.token;
    try {
      socketRef.current = io(API, {
        auth: { token },
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5,
      });

      socketRef.current.on("connect", () => {
        console.log("Connected to notifications");
      });

      socketRef.current.on("new_donation", (payload) => {
        setItems((prev) => {
          if (!payload || !payload._id) return prev;
          if (prev.some((p) => p._id === payload._id)) return prev;
          const next = [payload, ...prev];
          sessionStorage.setItem("fs_notifications_count", String(next.length));
          window.dispatchEvent(new Event("fs_notifications_updated"));
          return next;
        });

        // Show a more descriptive toast
        toast.info(
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Package className="text-green-600" size={16} />
            </div>
            <div>
              <p className="font-medium text-sm">New Donation Available!</p>
              <p className="text-xs text-gray-600 mt-1">
                {payload.name} in {payload.location}
              </p>
            </div>
          </div>,
          { autoClose: 5000 }
        );
      });

      socketRef.current.on("donation_claimed", (payload) => {
        setItems((prev) => {
          const next = prev.filter(
            (p) => p._id !== payload.foodId && p._id !== payload._id
          );
          sessionStorage.setItem("fs_notifications_count", String(next.length));
          window.dispatchEvent(new Event("fs_notifications_updated"));
          return next;
        });
      });

      return () => {
        socketRef.current?.disconnect();
      };
    } catch (e) {
      console.error("Socket init failed", e);
    }
  }, [user]);

  const claim = async (id) => {
    if (!user) return toast.error("Please login as a volunteer");
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      const res = await axios.post(
        `${API.replace(/\/$/, "")}/api/food/claim/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(
        <div className="flex items-center gap-2">
          <Navigation className="text-green-600" size={16} />
          <span>Donation accepted successfully!</span>
        </div>
      );

      setItems((prev) => {
        const next = prev.filter((p) => p._id !== id);
        sessionStorage.setItem("fs_notifications_count", String(next.length));
        window.dispatchEvent(new Event("fs_notifications_updated"));
        return next;
      });
    } catch (err) {
      console.error("Claim failed", err?.response || err);
      const status = err?.response?.status;
      if (status === 409) {
        toast.error(
          <div className="flex items-center gap-2">
            <Clock className="text-orange-600" size={16} />
            <span>This donation was already claimed by someone else.</span>
          </div>
        );
        setItems((prev) => prev.filter((p) => p._id !== id));
      } else if (status === 401 || status === 403) {
        toast.error("Authentication required. Please login again.");
      } else {
        toast.error(err?.response?.data?.message || "Failed to claim donation");
      }
    }
  };

  if (!user || user.role !== "volunteer") return null;

  return (
    <div className="fixed right-6 bottom-6 z-50 w-96 max-w-[90vw]">
      {/* Collapsed State */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-xl p-4 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bell className="text-white" size={20} />
                </div>
                {items.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                    {items.length}
                  </div>
                )}
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Food Donations</h3>
                <p className="text-indigo-100 text-sm">
                  {items.length === 0
                    ? "No current donations"
                    : `${items.length} available donation${
                        items.length !== 1 ? "s" : ""
                      }`}
                </p>
              </div>
            </div>
            <ChevronUp className="text-white/80" size={20} />
          </div>
        </button>
      )}

      {/* Expanded State */}
      {isExpanded && (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Users className="text-white" size={18} />
                </div>
                <div>
                  <h3 className="font-semibold">Available Donations</h3>
                  <p className="text-indigo-100 text-sm">
                    Accept donations quickly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ChevronDown className="text-white" size={16} />
              </button>
            </div>

            {/* Summary Stats */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/20">
              <div className="text-center">
                <div className="text-lg font-bold">{items.length}</div>
                <div className="text-xs text-indigo-100">Available</div>
              </div>
              <div className="w-px h-6 bg-white/30"></div>
              <div className="text-center">
                <div className="text-lg font-bold">
                  {items.filter((item) => item.urgent).length}
                </div>
                <div className="text-xs text-indigo-100">Urgent</div>
              </div>
              <div className="w-px h-6 bg-white/30"></div>
              <div className="text-center">
                <div className="text-lg font-bold">
                  {items.filter((item) => item.quantity > 10).length}
                </div>
                <div className="text-xs text-indigo-100">Large</div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-2 text-gray-500">
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Loading donations...</span>
              </div>
            </div>
          )}

          {/* Donations List */}
          <div className="max-h-96 overflow-y-auto">
            {!isLoading && items.length === 0 && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="text-gray-400" size={24} />
                </div>
                <h4 className="font-medium text-gray-600">
                  No donations available
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  New donations will appear here automatically
                </p>
              </div>
            )}

            {items.map((it, index) => (
              <div
                key={it._id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index === 0 ? "animate-pulse-gentle" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Food Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-green-200">
                    <Package className="text-green-600" size={18} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {it.name}
                      </h4>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {it.urgent && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                            Urgent
                          </span>
                        )}
                        <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                          {it.quantity || "—"} items
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin
                          size={14}
                          className="text-gray-400 flex-shrink-0"
                        />
                        <span className="truncate">{it.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock
                          size={12}
                          className="text-gray-400 flex-shrink-0"
                        />
                        <span>
                          Posted{" "}
                          {new Date(
                            it.createdAt || it.postedAt || Date.now()
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => claim(it._id)}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Navigation size={14} />
                        Accept Donation
                      </button>
                      <a
                        href={`/food/${it._id}`}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Donations update in real-time • Be quick to accept!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
