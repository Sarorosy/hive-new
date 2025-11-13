import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Calendar,
    ChevronDown,
    ChevronUp,
    Info,
    Mail,
    MapPin,
    Phone,
    User,
    X as CloseIcon,
} from "lucide-react";

import { API_URL } from "../../../../utils/constants";

const ViewOrderDetails = ({
    isOpen,
    order,
    onClose,
    renderStatusBadge,
    renderPaymentBadge,
    formatCurrency,
    selectedCustomerName,
    selectedCustomerEmail,
    selectedCustomerPhone,
    selectedBookingDetails,
    selectedBookingRange,
    selectedBookingMetaLabel,
    selectedMetadata,
    toggleItemExpansion,
    expandedItems,
    formatBookingRange,
    getTimeRangeLabels,
    getItemTitle,
    formatDate,
    formatTime,
    onUpdateStatus,
    statusUpdateLoading,
}) => {
    if (!order) {
        return null;
    }

    const paidStatus = typeof order.paid_status === "string" ? order.paid_status.toLowerCase() : "";
    const orderStatus = typeof order.status === "string" ? order.status.toLowerCase() : "";
    const canUpdateStatus =
        typeof onUpdateStatus === "function" && paidStatus === "paid" && orderStatus === "processing";

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-black/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="relative ml-auto h-full w-full max-w-3xl bg-white shadow-2xl flex flex-col"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.25 }}
                    >
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Order #{order.order_id || order.id}
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Placed on {order.created_at ? formatTime(order.created_at) : "—"}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {canUpdateStatus && (
                                    <>
                                        <button
                                            onClick={() => onUpdateStatus(order, "completed")}
                                            className="px-3 py-1.5 rounded-md bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                            disabled={Boolean(statusUpdateLoading)}
                                        >
                                            {statusUpdateLoading === "completed" ? "Updating..." : "Mark Completed"}
                                        </button>
                                        <button
                                            onClick={() => onUpdateStatus(order, "cancelled")}
                                            className="px-3 py-1.5 rounded-md bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                            disabled={Boolean(statusUpdateLoading)}
                                        >
                                            {statusUpdateLoading === "cancelled" ? "Updating..." : "Cancel Order"}
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                                    aria-label="Close order details"
                                >
                                    <CloseIcon size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 text-sm text-gray-700">
                            <section className="space-y-2">
                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Order Summary</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Status</p>
                                        {renderStatusBadge(order.status)}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Payment</p>
                                        {renderPaymentBadge(order.paid_status)}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Subtotal</p>
                                        <p className="font-medium text-gray-900">{formatCurrency(order.subtotal)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Total</p>
                                        <p className="font-semibold text-gray-900">
                                            {formatCurrency(order.total || order.amount)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">GST</p>
                                        <p className="font-medium text-gray-900">{formatCurrency(order.gst)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Payment Reference</p>
                                        <p className="font-medium text-gray-900 break-all">
                                            {order.payment_reference || order.reference || "—"}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-3">
                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                                    Customer & Contact
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                        <div className="flex items-start gap-3">
                                            <User size={18} className="text-blue-600 mt-0.5" />
                                            <div className="space-y-1">
                                                <p className="text-xs text-gray-500 uppercase">Customer</p>
                                                <p className="font-medium text-gray-900">{selectedCustomerName}</p>
                                                {selectedCustomerEmail !== "—" && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <Mail size={14} className="text-blue-500" />
                                                        <span>{selectedCustomerEmail}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                        <div className="flex items-start gap-3">
                                            <Phone size={18} className="text-blue-600 mt-0.5" />
                                            <div className="space-y-1">
                                                <p className="text-xs text-gray-500 uppercase">Phone</p>
                                                <p className="font-medium text-gray-900">
                                                    {selectedCustomerPhone !== "—" ? selectedCustomerPhone : "Not provided"}
                                                </p>
                                                {order?.user_id && (
                                                    <p className="text-xs text-gray-500">User ID: {order.user_id}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {selectedBookingDetails && (
                                <section className="space-y-3">
                                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                                        Booking Details
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                            <div className="flex items-start gap-3">
                                                <Calendar size={18} className="text-blue-600 mt-0.5" />
                                                <div className="space-y-1">
                                                    <p className="text-xs text-gray-500 uppercase">Booking Range</p>
                                                    <p className="font-medium text-gray-900">{selectedBookingRange}</p>
                                                    {(() => {
                                                        const tr = getTimeRangeLabels(selectedBookingDetails);
                                                        if (!tr) return null;
                                                        return (
                                                            <>
                                                                <p className="text-xs text-gray-500">Start Time: {tr.startTime}</p>
                                                                <p className="text-xs text-gray-500">End Time: {tr.endTime}</p>
                                                            </>
                                                        );
                                                    })()}
                                                    {selectedBookingMetaLabel && (
                                                        <p className="text-xs text-gray-500">{selectedBookingMetaLabel}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {(selectedBookingDetails.calendar_type ||
                                            selectedBookingDetails.booking_period ||
                                            selectedBookingDetails.multi_day_selection) && (
                                            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                                <div className="flex items-start gap-3">
                                                    <Info size={18} className="text-blue-600 mt-0.5" />
                                                    <div className="space-y-1">
                                                        <p className="text-xs text-gray-500 uppercase">Booking Type</p>
                                                        {selectedBookingDetails.calendar_type && (
                                                            <p className="font-medium text-gray-900">
                                                                {selectedBookingDetails.calendar_type.replace(/_/g, " ")}
                                                            </p>
                                                        )}
                                                        {selectedBookingDetails.booking_period && (
                                                            <p className="text-xs text-gray-500">
                                                                Period: {selectedBookingDetails.booking_period.replace(/_/g, " ")}
                                                            </p>
                                                        )}
                                                        {typeof selectedBookingDetails.multi_day_selection !== "undefined" && (
                                                            <p className="text-xs text-gray-500">
                                                                Multi-day selection:{" "}
                                                                {selectedBookingDetails.multi_day_selection === "1" ? "Enabled" : "Disabled"}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {(selectedMetadata?.booking_source ||
                                        selectedMetadata?.booking_timestamp ||
                                        selectedMetadata?.user_agent) && (
                                        <div className="border border-gray-200 rounded-lg p-4 bg-white">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {selectedMetadata?.booking_source && (
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase">Source</p>
                                                        <p className="font-medium text-gray-900 capitalize">
                                                            {selectedMetadata.booking_source.replace(/_/g, " ")}
                                                        </p>
                                                    </div>
                                                )}
                                                {selectedMetadata?.booking_timestamp && (
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase">Booked At</p>
                                                        <p className="font-medium text-gray-900">
                                                            {formatDate(selectedMetadata.booking_timestamp, { includeTime: true })}
                                                        </p>
                                                    </div>
                                                )}
                                                {selectedMetadata?.user_agent && (
                                                    <div className="md:col-span-3">
                                                        <p className="text-xs text-gray-500 uppercase">User Agent</p>
                                                        <p className="text-xs text-gray-600 break-words">{selectedMetadata.user_agent}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </section>
                            )}

                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                                        Products & Booking Details
                                    </h4>
                                    <span className="text-xs text-gray-500">{order.cart_items?.length || 0} item(s)</span>
                                </div>

                                <div className="space-y-4">
                                    {order.cart_items?.length ? (
                                        order.cart_items.map((item, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                                <button
                                                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 text-left"
                                                    onClick={() => toggleItemExpansion(index)}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900">{getItemTitle(item, index)}</span>
                                                        <span className="text-xs text-gray-500">
                                                            Qty: {item.quantity || 1} • {formatCurrency(item.pricing?.total_cost)}
                                                        </span>
                                                    </div>
                                                    {expandedItems[index] ? (
                                                        <ChevronUp size={18} className="text-gray-400" />
                                                    ) : (
                                                        <ChevronDown size={18} className="text-gray-400" />
                                                    )}
                                                </button>

                                                {expandedItems[index] && (
                                                    <div className="px-4 py-3 space-y-4 text-xs text-gray-600">
                                                        <div className="flex flex-col md:flex-row gap-3">
                                                            <div className="md:w-28 flex-shrink-0">
                                                                {item?.product_thumbnail ? (
                                                                    <img
                                                                        src={`${API_URL}/${item.product_thumbnail}`}
                                                                        alt={item?.product_title || "Product thumbnail"}
                                                                        className="w-28 h-28 object-cover rounded-lg border border-gray-200"
                                                                        onError={(event) => {
                                                                            event.currentTarget.src = "/placeholder-image.jpg";
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <div className="w-28 h-28 flex items-center justify-center rounded-lg border border-dashed border-gray-300 text-[10px] text-gray-400 bg-white">
                                                                        No image
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex-1 space-y-2">
                                                                <div>
                                                                    <p className="text-gray-500 uppercase">Pricing</p>
                                                                    <p className="font-medium text-gray-900">
                                                                        {formatCurrency(item.pricing?.total_cost)}
                                                                        <span className="text-xs text-gray-500 font-normal">
                                                                            ({item.pricing?.cost_suffix})
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-gray-500 uppercase">Booking Dates</p>
                                                                    <p className="font-medium text-gray-900">
                                                                        {formatBookingRange(item.booking_details)}
                                                                    </p>
                                                                    {(() => {
                                                                        const tr = getTimeRangeLabels(item.booking_details);
                                                                        if (!tr) return null;
                                                                        return (
                                                                            <>
                                                                                <p className="text-xs text-gray-500">Start Time: {tr.startTime}</p>
                                                                                <p className="text-xs text-gray-500">End Time: {tr.endTime}</p>
                                                                            </>
                                                                        );
                                                                    })()}
                                                                    {item.booking_details?.booking_length && (
                                                                        <p className="text-xs text-gray-500">
                                                                            Duration: {item.booking_details.booking_length}{" "}
                                                                            {item.pricing?.cost_suffix}
                                                                        </p>
                                                                    )}
                                                                    {item.booking_details?.calendar_type && (
                                                                        <p className="text-xs text-gray-500">
                                                                            Calendar: {item.booking_details.calendar_type.replace(/_/g, " ")}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                {(item.customer?.name || item.customer?.email) && (
                                                                    <div>
                                                                        <p className="text-gray-500 uppercase">Guest</p>
                                                                        {item.customer?.name && (
                                                                            <p className="font-medium text-gray-900">{item.customer.name}</p>
                                                                        )}
                                                                        {item.customer?.email && (
                                                                            <p className="text-xs text-gray-500">{item.customer.email}</p>
                                                                        )}
                                                                    </div>
                                                                )}
                                                                {(item.metadata?.booking_source || item.metadata?.booking_timestamp) && (
                                                                    <div>
                                                                        <p className="text-gray-500 uppercase">Metadata</p>
                                                                        {item.metadata?.booking_source && (
                                                                            <p className="text-xs text-gray-500">
                                                                                Source: {item.metadata.booking_source.replace(/_/g, " ")}
                                                                            </p>
                                                                        )}
                                                                        {item.metadata?.booking_timestamp && (
                                                                            <p className="text-xs text-gray-500">
                                                                                Booked: {formatDate(item.metadata.booking_timestamp, { includeTime: true })}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="border border-dashed border-gray-300 rounded-lg px-4 py-6 text-center text-xs text-gray-500">
                                            No cart items available for this order.
                                        </div>
                                    )}
                                </div>
                            </section>

                            {order.billing_address && (
                                <section className="space-y-2">
                                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                                        Billing Address
                                    </h4>
                                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                        <div className="flex items-start gap-3">
                                            <MapPin size={18} className="text-blue-600 mt-0.5" />
                                            <div className="space-y-1 text-sm text-gray-700">
                                                <p className="font-semibold text-gray-900">
                                                    {order.billing_address.firstName} {order.billing_address.lastName}
                                                    {order.billing_address.company_name
                                                        ? `, ${order.billing_address.company_name}`
                                                        : ""}
                                                </p>
                                                <p>
                                                    {order.billing_address.address_1}
                                                    {order.billing_address.address_2
                                                        ? `, ${order.billing_address.address_2}`
                                                        : ""}
                                                </p>
                                                <p>
                                                    {order.billing_address.city}, {order.billing_address.state}{" "}
                                                    {order.billing_address.postal_code}
                                                </p>
                                                <p>{order.billing_address.country}</p>
                                                {order.billing_address.phone && <p>Phone: {order.billing_address.phone}</p>}
                                                {order.billing_address.email && <p>Email: {order.billing_address.email}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ViewOrderDetails;

