import React, { useEffect, useState } from "react";
import { API_URL, formatTime } from "../../../utils/constants";
import { useAuth } from "../../../utils/idb";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
} from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/user/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token || ""}`,
        },
      });
      const data = await response.json();
      if (data.status) {
        setOrders(data.orders);
      } else {
        if (
          data.message == "Token expired" ||
          data.message == "Invalid token"
        ) {
          toast.error("Session expired. Please log in again.");
          logout();
          navigate("/account/login");
        } else {
          toast.error(data.message || "Failed to fetch orders.");
        }
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const toggleSection = (orderId, section) => {
    const key = `${orderId}_${section}`;
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      processing: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: Clock,
        label: "Processing",
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: Clock,
        label: "Pending",
      },
      completed: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: CheckCircle,
        label: "Completed",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: XCircle,
        label: "Cancelled",
      },
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        <Icon size={14} />
        {config.label}
      </span>
    );
  };

  const getPaymentBadge = (paidStatus) => {
    if (paidStatus === "paid") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle size={14} />
          Paid
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <XCircle size={14} />
        Unpaid
      </span>
    );
  };

  if (loading) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Package className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-lg font-medium text-gray-900 mb-2">
            No orders yet
          </p>
          <p className="text-sm text-gray-600">
            You haven't placed any orders. Start shopping to see your orders
            here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedOrders[order.id];
            const detailsExpanded = expandedSections[`${order.id}_details`];
            const addressExpanded = expandedSections[`${order.id}_address`];

            return (
              <div
                key={order.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              >
                {/* Collapsed Order Header - Always Visible */}
                <button
                  onClick={() => toggleOrder(order.id)}
                  className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left gap-4"
                >
                  <div className="flex flex-col">
                    {/* Order ID */}
                    <div className="md:col-span-2">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        Order #{order.order_id}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar size={12} />
                        {formatTime(order.created_at)}
                      </p>
                    </div>

                    <div className="flex space-x-3 mt-2">
                      {/* Status */}
                      <div className="flex justify-start md:justify-center">
                        {getStatusBadge(order.status)}
                      </div>

                      {/* Paid Status */}
                      <div className="flex justify-start md:justify-center">
                        {getPaymentBadge(order.paid_status)}
                      </div>

                      {/* Total Price */}
                      <div className="flex items-center justify-between md:justify-end">
                        <span className="text-lg font-bold text-gray-900">
                          ₹
                          {parseFloat(order.total).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      {/* Chevron Icon - Always visible on the right */}
                      <div className="flex justify-end">
                        {isExpanded ? (
                          <ChevronUp size={20} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-5 space-y-3">
                    {/* Details & Products Accordion */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleSection(order.id, "details")}
                        className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-2">
                          <ShoppingBag size={18} className="text-gray-600" />
                          <span className="font-medium text-gray-900">
                            Order Details & Products
                          </span>
                        </div>
                        {detailsExpanded ? (
                          <ChevronUp size={20} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-400" />
                        )}
                      </button>

                      {detailsExpanded && (
                        <div className="p-5 bg-white">
                          {/* Product Items */}
                          <div className="space-y-4 mb-6">
                            {order.cart_items.map((item, index) => (
                              <div
                                key={index}
                                className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                              >
                                {/* Product Image */}
                                <div className="flex-shrink-0">
                                  <img
                                    src={`${API_URL}/${item.product_info.thumbnail}`}
                                    alt={item.product_info.title}
                                    className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                    onError={(e) => {
                                      e.target.src = "/placeholder-image.jpg";
                                    }}
                                  />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 mb-2">
                                    {item.product_info.title}
                                  </h4>

                                  {/* Booking Details */}
                                  <div className="space-y-1 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                      <Calendar
                                        size={14}
                                        className="text-gray-400"
                                      />
                                      <span>
                                        {formatDate(
                                          item.booking_details.start_date
                                        )}
                                        {item.booking_details.start_date !==
                                          item.booking_details.end_date &&
                                          ` - ${formatDate(
                                            item.booking_details.end_date
                                          )}`}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-gray-400">
                                        Duration:
                                      </span>
                                      <span>
                                        {item.booking_details.booking_length}{" "}
                                        {item.pricing.cost_suffix}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-gray-400">
                                        Price:
                                      </span>
                                      <span className="font-medium text-gray-900">
                                        ₹
                                        {parseFloat(
                                          item.pricing.total_cost
                                        ).toLocaleString("en-IN")}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Order Summary */}
                          <div className="pt-4 border-t border-gray-200">
                            <div className="flex justify-end">
                              <div className="w-full max-w-xs space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                  <span>Subtotal:</span>
                                  <span>
                                    ₹
                                    {parseFloat(order.subtotal).toLocaleString(
                                      "en-IN",
                                      { minimumFractionDigits: 2 }
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                  <span>GST:</span>
                                  <span>
                                    ₹
                                    {parseFloat(order.gst).toLocaleString(
                                      "en-IN",
                                      { minimumFractionDigits: 2 }
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                                  <span>Total:</span>
                                  <span className="flex items-center gap-1">
                                    <CreditCard size={18} />₹
                                    {parseFloat(order.total).toLocaleString(
                                      "en-IN",
                                      { minimumFractionDigits: 2 }
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Shipping Address Accordion */}
                    {order.billing_address && (
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleSection(order.id, "address")}
                          className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
                        >
                          <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-gray-600" />
                            <span className="font-medium text-gray-900">
                              Shipping Address
                            </span>
                          </div>
                          {addressExpanded ? (
                            <ChevronUp size={20} className="text-gray-400" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-400" />
                          )}
                        </button>

                        {addressExpanded && (
                          <div className="p-5 bg-white">
                            <div className="text-sm text-gray-600 space-y-1">
                              <p className="font-medium text-gray-900">
                                {order.billing_address.firstName}{" "}
                                {order.billing_address.lastName}
                                {order.billing_address.company_name &&
                                  `, ${order.billing_address.company_name}`}
                              </p>
                              <p>
                                {order.billing_address.address_1}
                                {order.billing_address.address_2 &&
                                  `, ${order.billing_address.address_2}`}
                              </p>
                              <p>
                                {order.billing_address.city},{" "}
                                {order.billing_address.state} -{" "}
                                {order.billing_address.postal_code}
                              </p>
                              <p>{order.billing_address.country}</p>
                              <p className="pt-2">
                                Phone: {order.billing_address.phone}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
