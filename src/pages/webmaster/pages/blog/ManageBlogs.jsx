import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../utils/idb";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL, FRONTEND_URL, formatTime } from "../../../../utils/constants";
import { AnimatePresence } from "framer-motion";
import AddBlog from "./AddBlog";
import EditBlog from "./EditBlog";
import { Eye, Star } from "lucide-react";

const ManageBlogs = () => {
    const { admin, adminlogout } = useAuth();
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);

    const [addBlogOpen, setAddBlogOpen] = useState(false);
    const [editBlogOpen, setEditBlogOpen] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);

    const PER_PAGE = 10;

    useEffect(() => {
        if (!admin?.token) {
            navigate("/webmaster/login");
        } else {
            fetchBlogs();
            fetchTags();
            fetchCategories();
        }
    }, [page]);

    const fetchBlogs = async (searchKeyword = keyword) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/admin/blogs`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    keyword: searchKeyword,
                    page,
                }),
            });

            const data = await res.json();

            if (data.status) {
                setBlogs(data.blogs || []);
                setTotal(data.total || 0);
                setTotalBlogs(data.total_blogs || 0);
            } else {
                if (["Token expired", "Invalid token"].includes(data.message)) {
                    toast.error("Session expired. Please login again.");
                    adminlogout();
                    navigate("/webmaster/login");
                } else {
                    toast.error(data.message || "Failed to fetch blogs");
                }
            }
        } catch (err) {
            console.error(err);
            toast.error("Error fetching blogs");
        }
        finally {
            setLoading(false);
        }
    };

    const fetchTags = async () => {
        try {
            const res = await fetch(`${API_URL}/api/admin/tags`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();

            if (data.status) {
                setTags(data.tags || []);
            } else {
                if (["Token expired", "Invalid token"].includes(data.message)) {
                    toast.error("Session expired. Please login again.");
                    adminlogout();
                    navigate("/webmaster/login");
                } else {
                    toast.error(data.message || "Failed to fetch tags");
                }
            }
        } catch (err) {
            console.error(err);
        }
    };
    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_URL}/api/admin/categories`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();

            if (data.status) {
                setCategories(data.categories || []);
            } else {
                if (["Token expired", "Invalid token"].includes(data.message)) {
                    toast.error("Session expired. Please login again.");
                    adminlogout();
                    navigate("/webmaster/login");
                } else {
                    toast.error(data.message || "Failed to fetch categories");
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchBlogs(keyword);
    };

    const totalPages = Math.ceil(total / PER_PAGE);

    // Handle status toggle
    const handleStatusToggle = async (blogId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        const confirmMessage = `Are you sure you want to ${newStatus === 'active' ? 'activate' : 'deactivate'} this blog?`;

        if (window.confirm(confirmMessage)) {
            try {
                setActionLoading(blogId);
                const res = await fetch(`${API_URL}/api/admin/blogs/status`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${admin.token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        blogId,
                        status: newStatus,
                    }),
                });

                const data = await res.json();

                if (data.status) {
                    toast.success(`Blog ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
                    fetchBlogs(); // Refresh the blogs list
                } else {
                    if (["Token expired", "Invalid token"].includes(data.message)) {
                        toast.error("Session expired. Please login again.");

                        adminlogout();
                        navigate("/webmaster/login");
                    } else {
                        toast.error(data.message || "Failed to update blog status");
                    }
                }
            } catch (err) {
                console.error(err);
                toast.error("Error updating blog status");
            } finally {
                setActionLoading(null);
            }
        }
    };

    // Handle delete user
    const handleDeleteBlog = async (blogId, blogName) => {
        if (window.confirm(`Are you sure you want to delete blog "${blogName}"? This action cannot be undone.`)) {
            try {
                setActionLoading(blogId);
                const res = await fetch(`${API_URL}/api/admin/blogs/${blogId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${admin.token}`,
                    },
                });

                const data = await res.json();

                if (data.status) {
                    toast.success("blog deleted successfully");
                    fetchBlogs(); // Refresh the blogs list
                } else {
                    if (["Token expired", "Invalid token"].includes(data.message)) {
                        toast.error("Session expired. Please login again.");
                        adminlogout();
                        navigate("/webmaster/login");
                    } else {
                        toast.error(data.message || "Failed to delete blog");
                    }
                }
            } catch (err) {
                console.error(err);
                toast.error("Error deleting blog");
            } finally {
                setActionLoading(null);
            }
        }
    };

    // Handle edit user
    const handleEditBlog = (user) => {
        setSelectedBlogId(user.id);
        setEditBlogOpen(true);
    };



    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Manage Blogs</h2>
                <button
                    onClick={() => { setAddBlogOpen(true); }}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
                >
                    <span>+</span>
                    Add blog
                </button>
            </div>




            {/* Filter Search */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search by title"
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

            {/* Blogs Table */}
            {blogs.length > 0 ? (
                <div className="overflow-x-auto bg-white p-2 rounded">
                    <table className="min-w-full border border-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2 text-left">Thumbnail</th>
                                <th className="border px-4 py-2 text-left">Title</th>
                                <th className="border px-4 py-2 text-left">status</th>
                                <th className="border px-4 py-2 text-left">Created</th>
                                <th className="border px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((b) => (
                                <tr key={b.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">
                                        <div className="flex items-center justify-start space-x-1">
                                            <img src={`${API_URL}/${b.thumbnail}`} alt="img" className="h-10" />
                                            
                                            <a href={`${FRONTEND_URL}/blog/${b.slug}`} target="blank"
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content="View Post"
                                                className="f-11 flex items-center rounded border px-2 py-1"
                                            >
                                                View <Eye size={15} className="ml-1" />
                                            </a>

                                            {b.is_featured == 1 && <Star
                                                size={18}
                                                fill="orange"
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content="Featured Post"
                                            />}
                                        </div>
                                    </td>
                                    <td className="border px-4 py-2">{b.title}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => handleStatusToggle(b.id, b.status || 'active')}
                                            disabled={actionLoading === b.id}
                                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${(b.status || 'active') === 'active'
                                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                } disabled:opacity-50`}
                                        >
                                            {actionLoading === b.id ? (
                                                <div className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                                            ) : (
                                                (b.status || 'active').charAt(0).toUpperCase() + (b.status || 'active').slice(1)
                                            )}
                                        </button>
                                    </td>

                                    <td className="border px-4 py-2">
                                        {b.created_at ? formatTime(b.created_at) : "-"}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditBlog(b)}
                                                className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                                                title="Edit Blog"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBlog(b.id, b.title)}
                                                disabled={actionLoading === b.id}
                                                className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors disabled:opacity-50"
                                                title="Delete Blog"
                                            >
                                                {actionLoading === b.id ? (
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

                    <p className="text-gray-500">No blogs found.</p>
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
                {addBlogOpen && (
                    <AddBlog
                        onClose={() => { setAddBlogOpen(false); }}
                        onSuccess={fetchBlogs}
                        tags={tags}
                        categories={categories}
                    />
                )}
                {editBlogOpen && (
                    <EditBlog
                        onClose={() => {
                            setEditBlogOpen(false);
                            setSelectedBlogId(null);
                        }}
                        onSuccess={fetchBlogs}
                        blogId={selectedBlogId}
                        tags={tags}
                        categories={categories}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageBlogs;
