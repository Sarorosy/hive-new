import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Calendar, Eye, Package, XCircle, CheckCircle } from "lucide-react";

import { API_URL, formatTime } from "../../../../utils/constants";
import { useAuth } from "../../../../utils/idb";
import ViewOrderDetails from "./ViewOrderDetails";

const STATUS_OPTIONS = [
    { label: "All Statuses", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Processing", value: "processing" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
];

const PAYMENT_BADGE_CONFIG = {
    paid: {
        className: "bg-green-100 text-green-800",
        icon: CheckCircle,
        label: "Paid",
    },
    unpaid: {
        className: "bg-red-100 text-red-800",
        icon: XCircle,
        label: "Unpaid",
    },
};

const ORDER_STATUS_BADGE_CONFIG = {
    pending: {
        className: "bg-yellow-100 text-yellow-800",
        label: "Pending",
    },
    processing: {
        className: "bg-blue-100 text-blue-800",
        label: "Processing",
    },
    completed: {
        className: "bg-green-100 text-green-800",
        label: "Completed",
    },
    cancelled: {
        className: "bg-red-100 text-red-800",
        label: "Cancelled",
    },
};

const ManageOrders = () => {
    const navigate = useNavigate();
    const { admin, adminlogout } = useAuth();

    const [orders, setOrders] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState({});
    const [statusUpdateLoading, setStatusUpdateLoading] = useState(null);

    useEffect(() => {
        if (!admin?.token) {
            navigate("/webmaster/login");
            return;
        }

        fetchOrders(keyword, page, statusFilter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, statusFilter, admin?.token]);

    const fetchOrders = async (searchKeyword = keyword, pageNumber = page, statusValue = statusFilter) => {
        try {
            setLoading(true);
            const payload = {
                keyword: searchKeyword,
                page: pageNumber,
            };

            if (statusValue && statusValue !== "all") {
                payload.status = statusValue;
            }

            const res = await fetch(`${API_URL}/api/admin/orders`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.status) {
                setOrders(data.orders || []);
                setTotal(data.total_orders || data.total || (data.orders?.length ?? 0));
                setPerPage(data.per_page || data.perPage || 10);
            } else {
                if (["Token expired", "Invalid token"].includes(data.message)) {
                    toast.error("Session expired. Please login again.");
                    adminlogout();
                    navigate("/webmaster/login");
                } else {
                    toast.error(data.message || "Failed to fetch orders");
                }
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Error fetching orders");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setPage(1);
        fetchOrders(keyword, 1, statusFilter);
    };

    const resetExpandedItems = () => setExpandedItems({});

    const formatCurrency = (value) => {
        const amount = Number(value ?? 0);
        if (Number.isNaN(amount)) {
            return "₹0.00";
        }

        return `₹${amount.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    const parseToDate = (value) => {
        if (!value) return null;
        const initial = new Date(value);
        if (!Number.isNaN(initial.getTime())) {
            return initial;
        }

        const normalized = `${value}`.replace(" ", "T");
        const fallback = new Date(normalized);
        return Number.isNaN(fallback.getTime()) ? null : fallback;
    };

    const formatDate = (value, { includeTime = false } = {}) => {
        const date = parseToDate(value);
        if (!date) return "—";

        const baseOptions = {
            year: "numeric",
            month: "short",
            day: "2-digit",
        };

        const options = includeTime
            ? { ...baseOptions, hour: "2-digit", minute: "2-digit", hour12: true }
            : baseOptions;

        return date.toLocaleString("en-IN", options);
    };

    const getPrimaryBookingDetails = (order) => {
        if (!order) return null;
        if (order.booking_details) return order.booking_details;
        return order.cart_items?.find((item) => item.booking_details)?.booking_details || null;
    };

    const formatBookingRange = (bookingDetails) => {
        if (!bookingDetails) return "—";

        const start = formatDate(bookingDetails.start_date);
        const end = formatDate(bookingDetails.end_date);

        if (!end || start === end || end === "—") {
            return start;
        }

        return `${start} - ${end}`;
    };

    const getTimeRangeLabels = (bookingDetails) => {
        const timeRange = bookingDetails?.time_range;
        if (!timeRange) return null;
        const startLabel = timeRange.start_label || "";
        const endLabel = timeRange.end_label || "";
        if (startLabel.includes(" - ")) {
            const [startTime, endTime] = startLabel.split(" - ").map((part) => part.trim());
            return { startTime, endTime };
        }
        if (startLabel || endLabel) {
            return {
                startTime: startLabel || "—",
                endTime: endLabel || "—",
            };
        }
        return null;
    };

    const getPrimaryPricing = (order) => {
        if (!order?.cart_items?.length) return null;
        return order.cart_items.find((item) => item.pricing)?.pricing || order.cart_items[0].pricing || null;
    };

    const getCustomerName = (order) =>
        order?.customer_name ||
        order?.user_name ||
        order?.customer?.name ||
        order?.billing_address?.firstName ||
        "N/A";

    const getCustomerEmail = (order) =>
        order?.customer_email ||
        order?.user_email ||
        order?.email ||
        order?.customer?.email ||
        order?.billing_address?.email ||
        "—";

    const getCustomerPhone = (order) =>
        order?.billing_address?.phone ||
        order?.customer?.phone ||
        order?.phone ||
        "—";

    const toggleItemExpansion = (index) => {
        setExpandedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleOrderStatusUpdate = async (order, nextStatus) => {
        if (!order || !nextStatus) return;

        const orderId = order.id
        if (!orderId) {
            toast.error("Unable to determine order ID");
            return;
        }

        const confirmationMessage =
            nextStatus === "completed"
                ? `Mark order #${orderId} as completed?`
                : `Are you sure you want to cancel order #${orderId}?`;

        if (!window.confirm(confirmationMessage)) {
            return;
        }

        try {
            setStatusUpdateLoading(nextStatus);

            const res = await fetch(`${API_URL}/api/admin/orders/status`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    order_id: orderId,
                    status: nextStatus,
                }),
            });

            const data = await res.json();

            if (data.status) {
                toast.success(`Order #${orderId} marked as ${nextStatus}.`);
                setOrders((prev) =>
                    prev.map((existing) => {
                        const existingId = existing.id || existing.order_id;
                        if (existingId === orderId) {
                            return {
                                ...existing,
                                status: nextStatus,
                            };
                        }
                        return existing;
                    }),
                );
                setSelectedOrder((prev) => {
                    if (!prev) return prev;
                    const prevId = prev.id || prev.order_id;
                    if (prevId !== orderId) return prev;
                    return {
                        ...prev,
                        status: nextStatus,
                    };
                });
            } else {
                if (["Token expired", "Invalid token"].includes(data.message)) {
                    toast.error("Session expired. Please login again.");
                    adminlogout();
                    navigate("/webmaster/login");
                } else {
                    toast.error(data.message || "Failed to update order status");
                }
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Error updating order status");
        } finally {
            setStatusUpdateLoading(null);
        }
    };

    const getItemTitle = (item, index) =>
        item?.product_info?.title ||
        item?.metadata?.product_title ||
        item?.product_title ||
        (item?.product_id ? `Product #${item.product_id}` : `Item ${index + 1}`);

    const totalPages = useMemo(() => {
        if (!total || !perPage) {
            return 0;
        }

        return Math.ceil(total / perPage);
    }, [total, perPage]);

    const selectedCustomerName = selectedOrder ? getCustomerName(selectedOrder) : "N/A";
    const selectedCustomerEmail = selectedOrder ? getCustomerEmail(selectedOrder) : "—";
    const selectedCustomerPhone = selectedOrder ? getCustomerPhone(selectedOrder) : "—";
    const selectedBookingDetails = selectedOrder ? getPrimaryBookingDetails(selectedOrder) : null;
    const selectedBookingRange = selectedBookingDetails ? formatBookingRange(selectedBookingDetails) : "—";
    const selectedPrimaryPricing = selectedOrder ? getPrimaryPricing(selectedOrder) : null;
    const selectedBookingMetaParts = [];
    if (selectedBookingDetails?.booking_length) {
        selectedBookingMetaParts.push(selectedBookingDetails.booking_length);
    }
    if (selectedPrimaryPricing?.cost_suffix) {
        selectedBookingMetaParts.push(selectedPrimaryPricing.cost_suffix);
    } else if (selectedBookingDetails?.calendar_type) {
        selectedBookingMetaParts.push(selectedBookingDetails.calendar_type.replace(/_/g, " "));
    }
    const selectedBookingMetaLabel = selectedBookingMetaParts.length ? `Duration: ${selectedBookingMetaParts.join(" ")}` : null;
    const selectedMetadata = selectedOrder?.metadata;

    const openOrderDetails = (order) => {
        setSelectedOrder(order);
        resetExpandedItems();
        setIsDetailsOpen(true);
    };

    const closeOrderDetails = () => {
        setIsDetailsOpen(false);
        setSelectedOrder(null);
        resetExpandedItems();
    };

    const renderStatusBadge = (status) => {
        const normalized = (status || "pending").toLowerCase();
        const config = ORDER_STATUS_BADGE_CONFIG[normalized] || ORDER_STATUS_BADGE_CONFIG.pending;
        return (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}>
                {config.label}
            </span>
        );
    };

    const renderPaymentBadge = (paidStatus) => {
        const normalizedStatus = typeof paidStatus === "string" ? paidStatus.toLowerCase() : "";
        const normalized = normalizedStatus === "paid" ? "paid" : "unpaid";
        const config = PAYMENT_BADGE_CONFIG[normalized] || PAYMENT_BADGE_CONFIG.unpaid;
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}>
                <Icon size={14} />
                {config.label}
            </span>
        );
    };

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Orders</h2>
                    <p className="text-sm text-gray-500">
                        Monitor customer orders, their payment status, and booking details.
                    </p>
                </div>
                {total ? (
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                        <Package size={18} className="text-blue-600" />
                        <div className="text-sm">
                            <p className="text-gray-500 leading-tight">Total Orders</p>
                            <p className="text-base font-semibold text-gray-900">{total}</p>
                        </div>
                    </div>
                ) : null}
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <input
                    type="text"
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder="Search by order id, customer, email"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* <select
                    value={statusFilter}
                    onChange={(event) => {
                        setPage(1);
                        setStatusFilter(event.target.value);
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select> */}
                <button
                    type="submit"
                    className="inline-flex w-48 items-center justify-center bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                    Search
                </button>
            </form>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                </div>
            ) : orders.length ? (
                <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Order</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Customer</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Booking</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Total</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Payment</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Created</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order, index) => {
                                const customerName = getCustomerName(order);
                                const customerEmail = getCustomerEmail(order);
                                const bookingDetails = getPrimaryBookingDetails(order);
                                const bookingRange = formatBookingRange(bookingDetails);
                                const bookingTimeRange = getTimeRangeLabels(bookingDetails);
                                const primaryPricing = getPrimaryPricing(order);

                                const bookingMetaParts = [];
                                if (bookingDetails?.booking_length) {
                                    bookingMetaParts.push(bookingDetails.booking_length);
                                }
                                if (primaryPricing?.cost_suffix) {
                                    bookingMetaParts.push(primaryPricing.cost_suffix);
                                } else if (bookingDetails?.calendar_type) {
                                    bookingMetaParts.push(bookingDetails.calendar_type.replace(/_/g, " "));
                                }
                                const bookingMetaLabel = bookingMetaParts.length ? `Duration: ${bookingMetaParts.join(" ")}` : null;

                                return (
                                    <tr key={order.id || order.order_id || index}>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-900">
                                                    #{order.order_id || order.id}
                                                </span>
                                                {order.reference && (
                                                    <span className="text-xs text-gray-500">
                                                        Ref: {order.reference}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">
                                                    {customerName}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {customerEmail}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {bookingDetails ? (
                                                <div className="flex items-start gap-2">
                                                    <Calendar size={16} className="mt-0.5 text-blue-500" />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900">{bookingRange}</span>
                                                        {bookingDetails && (
                                                            <span className="text-xs text-gray-500">
                                                                Start: {formatDate(bookingDetails.start_date)}{bookingTimeRange ? `, ${bookingTimeRange.startTime}` : ""}
                                                            </span>
                                                        )}
                                                        {bookingDetails && (
                                                            <span className="text-xs text-gray-500">
                                                                End: {formatDate(bookingDetails.end_date)}{bookingTimeRange ? `, ${bookingTimeRange.endTime}` : ""}
                                                            </span>
                                                        )}
                                                        {bookingMetaLabel && (
                                                            <span className="text-xs text-gray-500">{bookingMetaLabel}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-gray-900">
                                            {formatCurrency(order.total || order.amount)}
                                        </td>
                                        <td className="px-4 py-3">
                                            {renderPaymentBadge(order.paid_status)}
                                        </td>
                                        <td className="px-4 py-3">
                                            {renderStatusBadge(order.status)}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {order.created_at ? formatTime(order.created_at) : "—"}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => openOrderDetails(order)}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors"
                                            >
                                                <Eye size={14} />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-white border border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
                        <Package size={28} className="text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                    <p className="text-sm text-gray-500">
                        Try adjusting your search or status filters to find specific orders.
                    </p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                    >
                        Prev
                    </button>
                    <span className="text-sm text-gray-600">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}

            <ViewOrderDetails
                isOpen={isDetailsOpen}
                order={selectedOrder}
                onClose={closeOrderDetails}
                renderStatusBadge={renderStatusBadge}
                renderPaymentBadge={renderPaymentBadge}
                formatCurrency={formatCurrency}
                selectedCustomerName={selectedCustomerName}
                selectedCustomerEmail={selectedCustomerEmail}
                selectedCustomerPhone={selectedCustomerPhone}
                selectedBookingDetails={selectedBookingDetails}
                selectedBookingRange={selectedBookingRange}
                selectedBookingMetaLabel={selectedBookingMetaLabel}
                selectedMetadata={selectedMetadata}
                toggleItemExpansion={toggleItemExpansion}
                expandedItems={expandedItems}
                formatBookingRange={formatBookingRange}
                getTimeRangeLabels={getTimeRangeLabels}
                getItemTitle={getItemTitle}
                formatDate={formatDate}
                formatTime={formatTime}
                onUpdateStatus={handleOrderStatusUpdate}
                statusUpdateLoading={statusUpdateLoading}
            />
        </div>
    );
};

export default ManageOrders;

