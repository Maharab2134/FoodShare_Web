import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MapPin, Phone, Clock, CheckCircle } from "lucide-react";

export default function VolunteerTasks() {
  const user = useSelector((state) => state.auth.user);
  const [tasks, setTasks] = useState([]);
  // Sanitize Vite env (may include quotes if .env written with them)
  const rawAPI = import.meta.env.VITE_REACT_APP_API || "";
  const API =
    rawAPI.replace(/^\s*"|"\s*$|^\s*'|'\s*$/g, "") ||
    `${window.location.protocol}//${window.location.hostname}:5000`;

  const [myLocation, setMyLocation] = useState(null);

  useEffect(() => {
    if (!user) return;
    // Try to get volunteer's browser location to show distance to donor
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMyLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn("Geolocation denied or unavailable:", err.message);
        }
      );
    }
    const token = JSON.parse(localStorage.getItem("auth"))?.token;
    const url = `${API.replace(
      /\/$/,
      ""
    )}/api/food/claimed/${encodeURIComponent(user.email)}`;
    console.log("Fetching volunteer tasks from:", url);
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => {
        console.error("Failed to load tasks", err?.response || err);
        const status = err?.response?.status;
        if (status === 404) {
          toast.info("No tasks found for your account.");
          setTasks([]);
        } else if (status === 401 || status === 403) {
          toast.error("Authentication required. Please login again.");
        } else {
          toast.error("Failed to load tasks");
        }
      });
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      const res = await axios.put(
        `${API}/api/food/claimed/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Status updated");
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status } : t))
      );
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to update status");
    }
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  if (!user) return null;

  const statusColor = (s) => {
    switch (s) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "InTransit":
        return "bg-yellow-100 text-yellow-800";
      case "PickedUp":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (d) => {
    if (!d) return "—";
    try {
      const date = new Date(d);
      return date.toLocaleString();
    } catch (e) {
      return d;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Volunteer Tasks</h1>
            <p className="text-gray-600">Manage pickups and delivery status</p>
          </div>
        </header>

        <div className="grid gap-6">
          {tasks.length === 0 && (
            <div className="p-6 bg-white rounded-lg shadow text-center">
              <p className="text-gray-600">
                No tasks assigned yet — keep an eye on alerts.
              </p>
            </div>
          )}

          {tasks.map((t) => (
            <article
              key={t._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{t.name}</h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                        t.status
                      )}`}
                    >
                      {t.status}
                    </span>
                  </div>

                  <div className="mt-3 text-sm text-gray-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="opacity-80" size={16} />
                      <span>{t.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="opacity-80" size={16} />
                      <span>{t.donorContactNo || "No contact"}</span>
                    </div>
                    {myLocation && t.latitude && t.longitude && (
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z" />
                        </svg>
                        <span className="text-sm text-gray-600">
                          Distance:{" "}
                          {haversineDistance(
                            myLocation.latitude,
                            myLocation.longitude,
                            Number(t.latitude),
                            Number(t.longitude)
                          ).toFixed(2)}{" "}
                          km
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="opacity-80" size={16} />
                      <span>Claimed: {formatDate(t.claimedAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Picked Up:</span>
                      <span className="text-sm">
                        {formatDate(t.pickedUpAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">In Transit:</span>
                      <span className="text-sm">
                        {formatDate(t.inTransitAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Delivered:</span>
                      <span className="text-sm">
                        {formatDate(t.deliveredAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <aside className="w-full md:w-56 flex-shrink-0 flex flex-col items-stretch gap-3">
                  <div className="text-sm text-gray-700">
                    Qty:{" "}
                    <span className="font-medium">{t.quantity || "—"}</span>
                  </div>
                  {/* Map / Directions button */}
                  <a
                    href={
                      myLocation && t.latitude && t.longitude
                        ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
                            myLocation.latitude + "," + myLocation.longitude
                          )}&destination=${encodeURIComponent(
                            t.latitude + "," + t.longitude
                          )}&travelmode=driving`
                        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            t.latitude + "," + t.longitude
                          )}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-block text-center mt-2 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    View on Map
                  </a>
                  <button
                    onClick={() => updateStatus(t._id, "PickedUp")}
                    className="w-full py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    disabled={
                      t.status === "PickedUp" || t.status === "Delivered"
                    }
                  >
                    Mark Picked Up
                  </button>
                  <button
                    onClick={() => updateStatus(t._id, "InTransit")}
                    className="w-full py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition"
                    disabled={
                      t.status === "InTransit" || t.status === "Delivered"
                    }
                  >
                    Mark In Transit
                  </button>
                  <button
                    onClick={() => updateStatus(t._id, "Delivered")}
                    className="w-full py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition flex items-center justify-center gap-2"
                    disabled={t.status === "Delivered"}
                  >
                    <CheckCircle size={16} />
                    Mark Delivered
                  </button>
                </aside>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
