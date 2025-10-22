import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../utils/idb";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL, formatTime } from "../../../../utils/constants";

const Locations = () => {
  const { admin, adminlogout } = useAuth();
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  // Add/Edit form state
  const [form, setForm] = useState({
    id: null,
    name: "",
    status: "active",
  });

  useEffect(() => {
    if (!admin?.token) {
      navigate("/webmaster/login");
    } else {
      fetchLocations();
    }
  }, []);

  const fetchLocations = async (searchKeyword = keyword) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/admin/locations`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${admin.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: searchKeyword }),
      });

      const data = await res.json();
      if (data.status) {
        setLocations(data.locations || []);
      } else {
        handleAuthError(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching locations");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (data) => {
    if (["Token expired", "Invalid token"].includes(data.message)) {
      toast.error("Session expired. Please login again.");
      adminlogout();
      navigate("/webmaster/login");
    } else {
      toast.error(data.message || "Action failed");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLocations(keyword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Please enter location name");
      return;
    }

    try {
      setActionLoading("save");
      const method = form.id ? "PUT" : "POST";
      const url = form.id
        ? `${API_URL}/api/admin/locations/${form.id}`
        : `${API_URL}/api/admin/locations/create`;

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${admin.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.status) {
        toast.success(form.id ? "Location updated" : "Location added");
        setForm({ id: null, name: "", status: "active" });
        fetchLocations();
      } else {
        handleAuthError(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving location");
    } finally {
      setActionLoading(null);
    }
  };

  const handleEdit = (loc) => {
    setForm({
      id: loc.id,
      name: loc.name,
      status: loc.status || "active",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete location "${title}"?`)) {
      try {
        setActionLoading(id);
        const res = await fetch(`${API_URL}/api/admin/locations/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${admin.token}` },
        });

        const data = await res.json();
        if (data.status) {
          toast.success("Location deleted");
          fetchLocations();
        } else {
          handleAuthError(data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error deleting location");
      } finally {
        setActionLoading(null);
      }
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      setActionLoading(id);
      const res = await fetch(`${API_URL}/api/admin/locations/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${admin.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.status) {
        toast.success("Status updated");
        fetchLocations();
      } else {
        handleAuthError(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating status");
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelEdit = () => {
    setForm({ id: null, name: "", status: "active" });
  };

  return (
    <div className="p-6 max-w-5xl">
      <h2 className="text-xl font-semibold mb-4">Manage Locations</h2>

      {/* Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 max-w-md"
      >
        <h3 className="font-medium mb-3">
          {form.id ? "Edit Location" : "Add Location"}
        </h3>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Location name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border px-3 py-2 rounded"
          />

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={actionLoading === "save"}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {actionLoading === "save" ? "Saving..." : form.id ? "Update" : "Add"}
            </button>

            {form.id && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search location"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border px-3 py-2 rounded w-1/3"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center p-10">
          <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : locations.length > 0 ? (
        <div className="overflow-x-auto bg-white p-2 rounded">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">name</th>
                <th className="border px-4 py-2 text-left">Created</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc) => (
                <tr key={loc.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{loc.name}</td>
                  
                  <td className="border px-4 py-2">
                    {loc.created_at ? formatTime(loc.created_at) : "-"}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(loc)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(loc.id, loc.name)}
                        disabled={actionLoading === loc.id}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 disabled:opacity-50"
                      >
                        {actionLoading === loc.id ? "..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No locations found.</p>
      )}
    </div>
  );
};

export default Locations;
