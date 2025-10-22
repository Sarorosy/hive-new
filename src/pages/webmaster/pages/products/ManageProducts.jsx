import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../utils/idb";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL, formatTime } from "../../../../utils/constants";
import { AnimatePresence } from "framer-motion";
import AddProduct from "./AddProduct";
import { Eye, Star } from "lucide-react";
import EditProduct from "./EditProduct";

const ManageProducts = () => {
    const { admin, adminlogout } = useAuth();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);

    const [addProductOpen, setAddProductOpen] = useState(false);
    const [editProductOpen, setEditProductOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const PER_PAGE = 10;

    useEffect(() => {
        if (!admin?.token) {
            navigate("/webmaster/login");
        } else {
            fetchProducts();
            fetchTags();
            fetchCategories();
        }
    }, [page]);

    const fetchProducts = async (searchKeyword = keyword) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/admin/products`, {
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
                setProducts(data.products || []);
                setTotal(data.total || 0);
                setTotalProducts(data.total_products || 0);
            } else {
                if (["Token expired", "Invalid token"].includes(data.message)) {
                    toast.error("Session expired. Please login again.");
                    adminlogout();
                    navigate("/webmaster/login");
                } else {
                    toast.error(data.message || "Failed to fetch products");
                }
            }
        } catch (err) {
            console.error(err);
            toast.error("Error fetching products");
        }
        finally {
            setLoading(false);
        }
    };

    const fetchTags = async () => {
        try {
            const res = await fetch(`${API_URL}/api/admin/allproducttags`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ keyword: "" })
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
                    toast.error(data.message || "Failed to fetch product tags");
                }
            }
        } catch (err) {
            console.error(err);
        }
    };
    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_URL}/api/admin/allproductcategories`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ keyword: "" })
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
                    toast.error(data.message || "Failed to fetch product categories");
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchProducts(keyword);
    };

    const totalPages = Math.ceil(total / PER_PAGE);

    // Handle status toggle
    const handleStatusToggle = async (productId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        const confirmMessage = `Are you sure you want to ${newStatus === 'active' ? 'activate' : 'deactivate'} this product?`;

        if (window.confirm(confirmMessage)) {
            try {
                setActionLoading(productId);
                const res = await fetch(`${API_URL}/api/admin/products/status`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${admin.token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        productId,
                        status: newStatus,
                    }),
                });

                const data = await res.json();

                if (data.status) {
                    toast.success(`Product ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
                    fetchProducts();
                } else {
                    if (["Token expired", "Invalid token"].includes(data.message)) {
                        toast.error("Session expired. Please login again.");

                        adminlogout();
                        navigate("/webmaster/login");
                    } else {
                        toast.error(data.message || "Failed to update product status");
                    }
                }
            } catch (err) {
                console.error(err);
                toast.error("Error updating product status");
            } finally {
                setActionLoading(null);
            }
        }
    };

    // Handle delete product
    const handleDeleteProduct = async (productId, productName) => {
        if (window.confirm(`Are you sure you want to delete product "${productName}"? This action cannot be undone.`)) {
            try {
                setActionLoading(productId);
                const res = await fetch(`${API_URL}/api/admin/products/${productId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${admin.token}`,
                    },
                });

                const data = await res.json();

                if (data.status) {
                    toast.success("Product deleted successfully");
                    fetchProducts();
                } else {
                    if (["Token expired", "Invalid token"].includes(data.message)) {
                        toast.error("Session expired. Please login again.");
                        adminlogout();
                        navigate("/webmaster/login");
                    } else {
                        toast.error(data.message || "Failed to delete product");
                    }
                }
            } catch (err) {
                console.error(err);
                toast.error("Error deleting product");
            } finally {
                setActionLoading(null);
            }
        }
    };

    // Handle edit product
    const handleEditProduct = (product) => {
        setSelectedProductId(product.id);
        setEditProductOpen(true);
    };



    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Manage Products</h2>
                <button
                    onClick={() => { setAddProductOpen(true); }}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
                >
                    <span>+</span>
                    Add product
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

            {/* Products Table */}
            {products.length > 0 ? (
                <div className="overflow-x-auto bg-white p-2 rounded">
                    <table className="min-w-full border border-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2 text-left">Thumbnail</th>
                                <th className="border px-4 py-2 text-left">Title</th>
                                <th className="border px-4 py-2 text-left">Status</th>
                                <th className="border px-4 py-2 text-left">Created</th>
                                <th className="border px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">
                                        <div className="flex items-center justify-start space-x-1">
                                            <img src={`${API_URL}/${p.thumbnail}`} alt="img" className="h-10" />
                                            
                                            <a href={`http://localhost:5175/product/${p.slug}`} target="blank"
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content="View Post"
                                                className="f-11 flex items-center rounded border px-2 py-1"
                                            >
                                                View <Eye size={15} className="ml-1" />
                                            </a>

                                            {p.is_featured == 1 && <Star
                                                size={18}
                                                fill="orange"
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content="Featured Product"
                                            />}
                                        </div>
                                    </td>
                                    <td className="border px-4 py-2">{p.name || p.title}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => handleStatusToggle(p.id, p.status || 'active')}
                                            disabled={actionLoading === p.id}
                                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${(p.status || 'active') === 'active'
                                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                } disabled:opacity-50`}
                                        >
                                            {actionLoading === p.id ? (
                                                <div className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                                            ) : (
                                                (p.status || 'active').charAt(0).toUpperCase() + (p.status || 'active').slice(1)
                                            )}
                                        </button>
                                    </td>

                                    <td className="border px-4 py-2">
                                        {p.created_at ? formatTime(p.created_at) : "-"}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditProduct(p)}
                                                className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                                                title="Edit Product"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(p.id, p.name || p.title)}
                                                disabled={actionLoading === p.id}
                                                className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors disabled:opacity-50"
                                                title="Delete Product"
                                            >
                                                {actionLoading === p.id ? (
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

                    <p className="text-gray-500">No products found.</p>
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
                {addProductOpen && (
                    <AddProduct
                        onClose={() => { setAddProductOpen(false); }}
                        onSuccess={fetchProducts}
                        tags={tags}
                        categories={categories}
                    />
                )}
                {editProductOpen && (
                    <EditProduct
                        onClose={() => {
                            setEditProductOpen(false);
                            setSelectedProductId(null);
                        }}
                        onSuccess={fetchProducts}
                        productId={selectedProductId}
                        tags={tags}
                        categories={categories}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageProducts;
