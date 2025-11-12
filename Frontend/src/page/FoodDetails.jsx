import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);
  const rawAPI = import.meta.env.VITE_REACT_APP_API || "";
  const API =
    rawAPI.replace(/^["']|["']$/g, "") ||
    `${window.location.protocol}//${window.location.hostname}:5000`;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // backend does not expose GET /api/food/:id in this project, so fetch available and find
        const res = await axios.get(
          `${API.replace(/\/$/, "")}/api/food/available`
        );
        const found = (res.data || []).find((f) => f._id === id);
        if (!found) {
          setItem(null);
        } else {
          setItem(found);
        }
      } catch (e) {
        console.error("Failed to load food details", e?.response || e);
      } finally {
        setLoading(false);
      }
    };

    if (!id) return navigate("/");
    load();
  }, [id]);

  const claim = async () => {
    if (!user || user.role !== "volunteer")
      return toast.error("Login as volunteer to claim");
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      const res = await axios.post(
        `${API.replace(/\/$/, "")}/api/food/claim/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message || "Claimed successfully");
      navigate("/volunteer");
    } catch (err) {
      console.error(err?.response || err);
      toast.error(err?.response?.data?.message || "Failed to claim");
    }
  };

  if (loading)
    return <div className="p-8 text-center text-white">Loading...</div>;
  if (!item)
    return (
      <div className="p-8 text-center text-white">
        Item not found or already claimed.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
        <p className="text-sm text-gray-300 mb-4">
          {item.description || "No description provided."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-400">Location</div>
            <div className="font-medium">{item.location || "Unknown"}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Quantity</div>
            <div className="font-medium">{item.quantity || "—"}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={claim}
            className="bg-indigo-600 py-2 px-4 rounded-md"
          >
            Claim
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-700 py-2 px-4 rounded-md"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
