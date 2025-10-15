import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../utils/idb";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../../../../utils/constants";
import { AnimatePresence } from "framer-motion";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

const ManageUsers = () => {
    const { admin, adminlogout } = useAuth();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [role, setRole] = useState("customer");
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [totalBlogAdmin, setTotalBlogAdmin] = useState(0);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);

    const [addUserOpen, setAddUserOpen] = useState(false);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const PER_PAGE = 100;

    useEffect(() => {
        if (!admin?.token) {
            navigate("/webmaster/login");
        } else {
            fetchUsers();
        }
    }, [role, page]);

    const fetchUsers = async (searchKeyword = keyword) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/admin/users`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role,
                    keyword: searchKeyword,
                    page,
                }),
            });

            const data = await res.json();

            if (data.status) {
                setUsers(data.users || []);
                setTotal(data.total || 0);
                setTotalCustomer(data.total_customer || 0);
                setTotalBlogAdmin(data.total_blog_admin || 0);
            } else {
                if (["Token expired", "Invalid token"].includes(data.message)) {
                    toast.error("Session expired. Please login again.");
                    adminlogout();
                    navigate("/webmaster/login");
                } else {
                    toast.error(data.message || "Failed to fetch users");
                }
            }
        } catch (err) {
            console.error(err);
            toast.error("Error fetching users");
        }
        finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchUsers(keyword);
    };

    const totalPages = Math.ceil(total / PER_PAGE);

    // Handle status toggle
    const handleStatusToggle = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        const confirmMessage = `Are you sure you want to ${newStatus === 'active' ? 'activate' : 'deactivate'} this user?`;

        if (window.confirm(confirmMessage)) {
            try {
                setActionLoading(userId);
                const res = await fetch(`${API_URL}/api/admin/users/status`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${admin.token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId,
                        status: newStatus,
                    }),
                });

                const data = await res.json();

                if (data.status) {
                    toast.success(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
                    fetchUsers(); // Refresh the users list
                } else {
                    if (["Token expired", "Invalid token"].includes(data.message)) {
                        toast.error("Session expired. Please login again.");

                        adminlogout();
                        navigate("/webmaster/login");
                    } else {
                        toast.error(data.message || "Failed to update user status");
                    }
                }
            } catch (err) {
                console.error(err);
                toast.error("Error updating user status");
            } finally {
                setActionLoading(null);
            }
        }
    };

    // Handle delete user
    const handleDeleteUser = async (userId, userName) => {
        if (window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
            try {
                setActionLoading(userId);
                const res = await fetch(`${API_URL}/api/admin/users/${userId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${admin.token}`,
                    },
                });

                const data = await res.json();

                if (data.status) {
                    toast.success("User deleted successfully");
                    fetchUsers(); // Refresh the users list
                } else {
                    if (["Token expired", "Invalid token"].includes(data.message)) {
                        toast.error("Session expired. Please login again.");
                        adminlogout();
                        navigate("/webmaster/login");
                    } else {
                        toast.error(data.message || "Failed to delete user");
                    }
                }
            } catch (err) {
                console.error(err);
                toast.error("Error deleting user");
            } finally {
                setActionLoading(null);
            }
        }
    };

    // Handle edit user
    const handleEditUser = (user) => {
        setSelectedUserId(user.id);
        setEditUserOpen(true);
    };

    // Handle add user
    const handleAddUser = () => {
        // For now, we'll show an alert. You can implement a modal or navigate to add user page
        alert("Add user functionality - Implement add user modal or navigate to add user page");
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Manage Users</h2>
                <button
                    onClick={()=>{setAddUserOpen(true);}}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
                >
                    <span>+</span>
                    Add User
                </button>
            </div>


            {/* Role Tabs */}
            <div className="flex gap-4 mb-4">
                {["customer", "blog_admin"].map((r) => (
                    <button
                        key={r}
                        onClick={() => {
                            setRole(r);
                            setPage(1);
                        }}
                        className={`px-2 py-1 f-12 rounded-lg font-medium ${role === r
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {r === "customer" ? "Customers" : "Blog Admins"}
                        <span className="ml-2 text-black bg-white rounded-full px-2 py-0.5">
                            {r === "customer" ? (totalCustomer || 0) : (totalBlogAdmin || 0)}
                        </span>
                    </button>
                ))}
            </div>

            {/* Filter Search */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
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

            {/* Users Table */}
            {users.length > 0 ? (
                <div className="overflow-x-auto bg-white p-2 rounded">
                    <table className="min-w-full border border-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2 text-left">Name</th>
                                <th className="border px-4 py-2 text-left">Email</th>
                                <th className="border px-4 py-2 text-left">Role</th>
                                <th className="border px-4 py-2 text-left">Status</th>
                                <th className="border px-4 py-2 text-left">Created</th>
                                <th className="border px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{u.name}</td>
                                    <td className="border px-4 py-2">{u.email}</td>
                                    <td className="border px-4 py-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${u.role === 'customer' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                                            }`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => handleStatusToggle(u.id, u.status || 'active')}
                                            disabled={actionLoading === u.id}
                                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${(u.status || 'active') === 'active'
                                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                } disabled:opacity-50`}
                                        >
                                            {actionLoading === u.id ? (
                                                <div className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                                            ) : (
                                                (u.status || 'active').charAt(0).toUpperCase() + (u.status || 'active').slice(1)
                                            )}
                                        </button>
                                    </td>
                                    <td className="border px-4 py-2">
                                        {u.registered_at ? u.registered_at.split(" ")[0] : "-"}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditUser(u)}
                                                className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                                                title="Edit User"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(u.id, u.name)}
                                                disabled={actionLoading === u.id}
                                                className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors disabled:opacity-50"
                                                title="Delete User"
                                            >
                                                {actionLoading === u.id ? (
                                                    <div className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                                ) : (
                                                    'Delete'
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                loading ? (
                    <div className="flex items-center justify-center ">
                        <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                    </div>
                ) :

                    <p className="text-gray-500">No users found.</p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="px-3 py-1">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

            <AnimatePresence>
                {addUserOpen && (
                    <AddUser
                        onClose={() => { setAddUserOpen(false); }}
                        onSuccess={fetchUsers}
                    />
                )}
                {editUserOpen && (
                    <EditUser
                        onClose={() => { 
                            setEditUserOpen(false); 
                            setSelectedUserId(null); 
                        }}
                        onSuccess={fetchUsers}
                        userId={selectedUserId}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageUsers;
