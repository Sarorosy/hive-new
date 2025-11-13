import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DateRange } from "react-date-range";
import { addDays, startOfDay, endOfMonth, differenceInCalendarDays } from "date-fns";
import { API_URL } from "../../utils/constants";
import ProductLoader from "./ProductLoader";
import toast from "react-hot-toast";
import { useAuth } from "../../utils/idb";

const ProductPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { user, addToCart, logout } = useAuth();
  const [fetched, setFetched] = useState(true);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [range, setRange] = useState([
    {
      startDate: startOfDay(new Date()),
      endDate: startOfDay(new Date()),
      key: "selection",
    },
  ]);

  // Hourly booking state
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [hourRange, setHourRange] = useState({ start: null, end: null });

  const today = startOfDay(new Date());

  const monthsToShow = useMemo(() => {
    const blockLength = Number(product?.booking_length) || 1;
    if (blockLength >= 20) return 2;
    const remainingDaysThisMonthExclToday = differenceInCalendarDays(endOfMonth(today), today);
    return blockLength > remainingDaysThisMonthExclToday ? 2 : 1;
  }, [product, today]);

  // Allowed weekdays for booking from API (supports array of strings or object map)
  const allowedWeekdays = useMemo(() => {
    const map = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
    const set = new Set();
    const abd = product?.available_booking_days;
    if (Array.isArray(abd)) {
      abd.forEach((d) => {
        const idx = map[(d || "").toString().toLowerCase()];
        if (typeof idx === "number") set.add(idx);
      });
    } else if (abd && typeof abd === "object") {
      Object.keys(abd).forEach((k) => {
        if (abd[k]) {
          const idx = map[k.toLowerCase()];
          if (typeof idx === "number") set.add(idx);
        }
      });
    }
    return set; // empty set means no restriction
  }, [product]);

  const isDayDisabled = (date) => {
    if (!allowedWeekdays || allowedWeekdays.size === 0) return false;
    const dayIdx = date.getDay();
    return !allowedWeekdays.has(dayIdx);
  };

  // Helper function to find the next available date
  const getNextAvailableDate = (startDate) => {
    let currentDate = new Date(startDate);
    const maxDaysToCheck = 14; // Prevent infinite loop, check up to 2 weeks ahead
    let daysChecked = 0;

    while (daysChecked < maxDaysToCheck) {
      if (!isDayDisabled(currentDate)) {
        return currentDate;
      }
      currentDate = addDays(currentDate, 1);
      daysChecked++;
    }

    // If no available date found in 2 weeks, return the original date
    return startDate;
  };

  // Generate hour-based slots when applicable
  useEffect(() => {
    if (!product) return;
    if (product?.calendar_type !== "hour") {
      setTimeSlots([]);
      setSelectedSlot(null);
      return;
    }

    const blockLengthHours = Math.max(1, Number(product?.booking_length) || 1);
    const selectedDate = range?.[0]?.startDate ? new Date(range[0].startDate) : new Date();

    // Business hours assumptions
    const START_HOUR = 9;  // 9 AM for future dates
    const END_HOUR = 22;   // 10 PM hard stop

    // Build slots for the selected day
    const slots = [];

    const now = new Date();
    const isToday = selectedDate.toDateString() === now.toDateString();

    // Determine first slot start hour
    let firstHour;
    if (isToday) {
      const nextHour = now.getMinutes() > 0 ? now.getHours() + 1 : now.getHours();
      firstHour = Math.max(nextHour, START_HOUR);
    } else {
      firstHour = START_HOUR;
    }

    for (let h = firstHour; h + blockLengthHours <= END_HOUR; h += blockLengthHours) {
      const start = new Date(selectedDate);
      start.setHours(h, 0, 0, 0);
      const end = new Date(start);
      end.setHours(start.getHours() + blockLengthHours);

      slots.push({
        start,
        end,
        label: `${formatAMPM(start)} - ${formatAMPM(end)}`,
        key: `${start.toISOString()}_${end.toISOString()}`,
      });
    }

    setTimeSlots(slots);
    setSelectedSlot(null);
  }, [product, range]);

  function formatAMPM(date) { // function for  formatting AM /Pm
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const hh = hours % 12 || 12;
    const mm = minutes.toString().padStart(2, "0");
    return `${hh}:${mm} ${ampm}`;
  }

  const getImageUrl = (path) => {
    if (!path) return "";
    if (typeof path === "string" && (path.startsWith("http://") || path.startsWith("https://"))) {
      return path;
    }
    return `${API_URL}/${path}`;
  };

  // Helper function to format date in local timezone (YYYY-MM-DD)
  const formatDateForAPI = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchProduct = async () => { // api function to fetch product details
    try {
      setLoading(true);
      setFetched(false);
      const res = await fetch(`${API_URL}/api/products/get/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.status) {
        setProduct(data.data || null);
        setDiscounts(data.data?.discounts || []);
        console.log("Fetched product:", data.data);
        console.log("Fetched discounts:", data.data?.discounts);
      } else {
        console.error(data.message || "Failed to fetch product");
        setProduct(null);
        setDiscounts([]);
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setProduct(null);
    } finally {
      setLoading(false);
      setFetched(true);
    }
  };

  useEffect(() => {
    if (slug) fetchProduct();
  }, [slug]);

  // Initialize or update date range based on booking rules when product loads
  useEffect(() => {
    if (!product) return;
    const blockLength = Number(product.booking_length) || 1;
    const multiDaySelection = product?.multi_day_selection === "1";

    // Get the next available date (today if available, otherwise next available day)
    const start = getNextAvailableDate(today);

    // Fixed blocks: always auto-select the full block length window
    let end = start;
    if (product?.booking_period === "fixed_blocks") {
      end = addDays(start, Math.max(1, blockLength) - 1);
    } else if (multiDaySelection) {
      const proposedEnd = addDays(start, Math.max(1, blockLength) - 1);
      // Ensure the end date is also available (not disabled)
      end = getNextAvailableDate(proposedEnd);
    }

    setRange([
      {
        startDate: start,
        endDate: end,
        key: "selection",
      },
    ]);
  }, [product]);

  const handleSelect = (ranges) => { // onclikc of date , the function triggered
    const selection = ranges.selection;
    const blockLength = Number(product?.booking_length) || 1;
    const multiDaySelection = product?.multi_day_selection === "1";

    // For day calendar with fixed blocks: auto-select block range from chosen start
    if (product?.calendar_type === "day" && product?.booking_period === "fixed_blocks") {
      const forcedEnd = addDays(selection.startDate, Math.max(1, blockLength) - 1);
      setRange([
        {
          startDate: startOfDay(selection.startDate),
          endDate: startOfDay(forcedEnd),
          key: "selection",
        },
      ]);
      return;
    }

    // Hour calendar: always keep single-day selection; time slots decide range/single
    if (product?.calendar_type === "hour") {
      setRange([
        {
          startDate: startOfDay(selection.startDate),
          endDate: startOfDay(selection.startDate),
          key: "selection",
        },
      ]);
      setSelectedSlot(null);
      setHourRange({ start: null, end: null });
      return;
    }

    // If multi_day_selection is disabled, force single date selection
    if (!multiDaySelection) {
      setRange([
        {
          startDate: startOfDay(selection.startDate),
          endDate: startOfDay(selection.startDate),
          key: "selection",
        },
      ]);
      return;
    }

    // Day calendar + fixed_blocks: force fixed number of days
    if (product?.booking_period === "fixed_blocks") {
      const forcedEnd = addDays(selection.startDate, Math.max(1, blockLength) - 1);
      setRange([
        {
          startDate: startOfDay(selection.startDate),
          endDate: startOfDay(forcedEnd),
          key: "selection",
        },
      ]);
      return;
    }

    // Day calendar + calendar_range: range selection but must not cross disabled days
    const desiredStart = startOfDay(selection.startDate);
    const desiredEndRaw = startOfDay(selection.endDate || selection.startDate);
    const forward = desiredEndRaw >= desiredStart;
    let current = new Date(desiredStart);
    let lastValid = new Date(desiredStart);

    // If user drags backwards, normalize to forward iteration
    const targetEnd = forward ? desiredEndRaw : desiredStart;
    const iterateLimit = forward ? desiredEndRaw : desiredStart;

    while (current <= iterateLimit) {
      if (isDayDisabled(current)) break; // stop at first disabled
      lastValid = new Date(current);
      current = addDays(current, 1);
    }

    const finalStart = desiredStart;
    const finalEnd = lastValid;

    setRange([
      {
        startDate: finalStart,
        endDate: finalEnd,
        key: "selection",
      },
    ]);
  };

  // Helper function to get all applicable discounts
  const getAllApplicableDiscounts = () => {
    if (!discounts || discounts.length === 0) return [];

    const today = new Date();
    const applicableDiscounts = [];

    for (const discount of discounts) {
      if (discount.status !== 'active') continue;

      let isApplicable = false;
      let reason = '';

      if (discount.type === 'count') {
        // For count type, we need to check the number of slots/days selected
        let count = 0;

        if (product.calendar_type === "hour") {
          if (product.booking_period === "fixed_blocks") {
            count = selectedSlot ? 1 : 0;
          } else {
            // calendar_range + hour
            const startSlot = hourRange.start || selectedSlot;
            const endSlot = hourRange.end || hourRange.start || selectedSlot;
            if (startSlot && endSlot) {
              const blockLengthHours = Math.max(1, Number(product?.booking_length) || 1);
              const durationHours = Math.max(0, (endSlot.end - startSlot.start) / (60 * 60 * 1000));
              count = Math.max(1, Math.round(durationHours / blockLengthHours));
            }
          }
        } else {
          // Day-based pricing
          if (product.booking_period === "fixed_blocks") {
            count = 1;
          } else {
            const start = range[0]?.startDate;
            const end = range[0]?.endDate;
            const msPerDay = 24 * 60 * 60 * 1000;
            count = Math.max(1, Math.round((end - start) / msPerDay) + 1);
          }
        }

        if (count >= Number(discount.from_value) && count <= Number(discount.to_value)) {
          isApplicable = true;
          reason = `Valid for ${discount.from_value}-${discount.to_value} bookings`;
        } else {
          reason = `Book ${discount.from_value}-${discount.to_value} to get this discount`;
        }
      } else if (discount.type === 'date_range') {
        // Check if today is within the date range
        const fromDate = new Date(discount.from_value);
        const toDate = new Date(discount.to_value);

        if (today >= fromDate && today <= toDate) {
          isApplicable = true;
          reason = `Valid from ${new Date(discount.from_value).toLocaleDateString()} to ${new Date(discount.to_value).toLocaleDateString()}`;
        } else {
          reason = `Valid from ${new Date(discount.from_value).toLocaleDateString()} to ${new Date(discount.to_value).toLocaleDateString()}`;
        }
      } else if (discount.type === 'exact_day') {
        // Check if today falls within the day range
        const dayMap = {
          'sunday': 0, 'monday': 1, 'tuesday': 2, 'wednesday': 3,
          'thursday': 4, 'friday': 5, 'saturday': 6
        };

        const fromDay = dayMap[discount.from_value.toLowerCase()];
        const toDay = dayMap[discount.to_value.toLowerCase()];
        const todayDayIndex = today.getDay();

        if (fromDay !== undefined && toDay !== undefined) {
          if (fromDay <= toDay) {
            // Same week range (e.g., Monday to Friday)
            if (todayDayIndex >= fromDay && todayDayIndex <= toDay) {
              isApplicable = true;
              reason = `Valid on ${discount.from_value}${discount.from_value !== discount.to_value ? ` to ${discount.to_value}` : ''}`;
            } else {
              reason = `Valid on ${discount.from_value}${discount.from_value !== discount.to_value ? ` to ${discount.to_value}` : ''}`;
            }
          } else {
            // Cross week range (e.g., Friday to Monday)
            if (todayDayIndex >= fromDay || todayDayIndex <= toDay) {
              isApplicable = true;
              reason = `Valid on ${discount.from_value}${discount.from_value !== discount.to_value ? ` to ${discount.to_value}` : ''}`;
            } else {
              reason = `Valid on ${discount.from_value}${discount.from_value !== discount.to_value ? ` to ${discount.to_value}` : ''}`;
            }
          }
        }
      }

      applicableDiscounts.push({
        ...discount,
        isApplicable,
        reason
      });
    }

    return applicableDiscounts;
  };

  // Helper function to get the best applicable discount for pricing calculation
  const getApplicableDiscount = () => {
    const allDiscounts = getAllApplicableDiscounts();
    return allDiscounts.find(d => d.isApplicable) || null;
  };

  const calcCost = () => { // calculate cost of that product
    if (!product) return 0;
    const base = Number(product.cost) || 0;

    // Check for applicable discount
    const discount = getApplicableDiscount();
    const costPerUnit = discount ? Number(discount.discount_cost) : base;

    // Hour-based pricing
    if (product.calendar_type === "hour") {
      const blockLengthHours = Math.max(1, Number(product?.booking_length) || 1);
      if (product.booking_period === "fixed_blocks") {
        // Single slot selection → 1 block
        const blocks = 1;
        const total = costPerUnit * blocks;
        return total.toLocaleString("en-IN", { maximumFractionDigits: 2 });
      }
      // calendar_range + hour → multiply by number of contiguous blocks selected
      // If only start picked, treat as 1 block
      const startSlot = hourRange.start || selectedSlot;
      const endSlot = hourRange.end || hourRange.start || selectedSlot;
      if (!startSlot || !endSlot) {
        return costPerUnit.toLocaleString("en-IN", { maximumFractionDigits: 2 });
      }
      const durationHours = Math.max(0, (endSlot.end - startSlot.start) / (60 * 60 * 1000));
      const blocks = Math.max(1, Math.round(durationHours / blockLengthHours));
      const total = costPerUnit * blocks;
      return total.toLocaleString("en-IN", { maximumFractionDigits: 2 });
    }

    // Day-based pricing
    if (product.booking_period === "fixed_blocks") {
      return costPerUnit.toLocaleString("en-IN", { maximumFractionDigits: 2 });
    }
    const start = range[0]?.startDate;
    const end = range[0]?.endDate;
    const msPerDay = 24 * 60 * 60 * 1000;
    const numDays = Math.max(1, Math.round((end - start) / msPerDay) + 1);
    const total = costPerUnit * numDays;
    return total.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };

  const handleSubmit = async () => { //submit function Api
    // Validation: Check if date is selected
    if (!range || !range[0] || !range[0].startDate) {
      toast.error("Please select a date for your booking.");
      return;
    }

    // Validation: For hour-based calendar, check if time slot is selected
    if (product?.calendar_type === "hour") {
      if (product?.booking_period === "fixed_blocks") {
        if (!selectedSlot) {
          toast.error("Please select a time slot for your booking.");
          return;
        }
      } else {
        // calendar_range + hour
        if (!hourRange.start) {
          toast.error("Please select a time slot for your booking.");
          return;
        }
      }
    }

    // Build the payload
    const payload = {
      product_id: product.id,
      product_slug: product.slug,
      product_title: product.title,
      booking_details: {
        start_date: formatDateForAPI(range[0].startDate),
        end_date: formatDateForAPI(range[0].endDate),
        calendar_type: product.calendar_type,
        booking_period: product.booking_period,
        booking_length: product.booking_length,
        multi_day_selection: product.multi_day_selection
      },
      pricing: {
        base_cost: Number(product.cost),
        total_cost: Number(calcCost().replace(/,/g, '')),
        cost_suffix: product.cost_suffix,
        discount_applied: null
      }
    };

    // Add time slot details for hour-based bookings
    if (product?.calendar_type === "hour") {
      if (product?.booking_period === "fixed_blocks") {
        payload.booking_details.time_slot = {
          start: formatDateForAPI(selectedSlot.start),
          end: formatDateForAPI(selectedSlot.end),
          label: selectedSlot.label
        };
      } else {
        // calendar_range + hour
        payload.booking_details.time_range = {
          start: formatDateForAPI(hourRange.start.start),
          end: formatDateForAPI(hourRange.end ? hourRange.end.end : hourRange.start.end),
          start_label: hourRange.start.label,
          end_label: hourRange.end ? hourRange.end.label : hourRange.start.label
        };
      }
    }

    // Add discount information if applicable
    const discount = getApplicableDiscount();
    if (discount) {
      payload.pricing.discount_applied = {
        discount_id: discount.id,
        discount_name: discount.name,
        discount_type: discount.type,
        original_cost: Number(product.cost),
        discount_cost: Number(discount.discount_cost),
        savings: Number(product.cost) - Number(discount.discount_cost)
      };
    }

    // Add customer information (you might want to get this from a form or user context)
    payload.customer = user ? {
      name: user.name,
      email: user.email,
    } : {
    };

    // Add booking metadata
    payload.metadata = {
      booking_timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      booking_source: "web"
    };

    // console.log("Booking Payload:", payload);

    try {
      if (user) {
        // User is logged in - send to API
        const response = await fetch(`${API_URL}/user/addtocart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token || ''}` // Add token if available
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        if (data.status) {
          toast.success("Item added to cart successfully!");
          navigate('/cart');  
        } else {
          if(data.message == "Token expired" || data.message == "Invalid token"){
            toast.error("Session expired. Please login again.");
            logout();
            navigate("/account/login");
          }
          toast.error(data.message || "Failed to add item to cart");
        }
      } else {
        // User is not logged in - add to local cart
        const cartItem = {
          id: `${product.id}_${Date.now()}`, // Unique ID for cart item
          ...payload
        };
        
        await addToCart(cartItem);
        toast.success("Item added to cart! Please login to sync your cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  // 🧭 Redirect logic (after fetch)
  if (fetched && !loading && !product) {
    return (
      <p>Product not found</p>
    );
  }

  // 💬 Loading state
  if (loading || !fetched) {
    return <ProductLoader />;
  }





  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-6xl mx-auto mt-12">
        {/* Left */}
        <div>
          <img
            src={getImageUrl(product.thumbnail)}
            alt={product.title}
            className="w-full h-80 object-cover rounded-2xl shadow"
          />
          {product.category_name && (
            <span className="mt-2 inline-flex items-center rounded cursor-pointer border border-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
              {product.category_name}
            </span>
          )}
          <h1 className="text-3xl font-bold mt-4">{product.title}</h1>

          <div className="mt-4">
            <p className="text-2xl font-bold text-green-600 shimmer">
              ₹{Number(product.cost).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              {product.cost_suffix && (
                <span className="text-sm text-gray-600 ml-2">{product.cost_suffix}</span>
              )}
            </p>
            <div className="prose prose-sm max-w-none text-gray-600 mt-3" dangerouslySetInnerHTML={{ __html: product.description || "" }} />

            {/* Show all available discounts */}
            {(() => {
              const allDiscounts = getAllApplicableDiscounts();
              const currentDiscount = getApplicableDiscount();

              if (allDiscounts.length === 0) return null;

              return (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">🎉</span>
                    Available Offers
                  </h3>

                  <div className="space-y-3">
                    {allDiscounts.map((discount, index) => {
                      const isCurrentlyApplicable = discount.isApplicable;
                      const savings = Number(product.cost) - Number(discount.discount_cost);
                      const savingsPercentage = Math.round((savings / Number(product.cost)) * 100);

                      return (
                        <div
                          key={discount.id}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 ${isCurrentlyApplicable
                              ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-300 shadow-md'
                              : 'bg-gray-50 border-gray-200 hover:border-orange-200'
                            }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {isCurrentlyApplicable ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                    ✓ Currently Applied
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                    Available
                                  </span>
                                )}
                                <span className="text-sm font-medium text-gray-600">
                                  Save {savingsPercentage}%
                                </span>
                              </div>

                              <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-2xl font-bold text-green-600">
                                  ₹{Number(discount.discount_cost).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                                </span>
                                <span className="text-lg text-gray-500 line-through">
                                  ₹{Number(product.cost).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                                </span>
                                {product.cost_suffix && (
                                  <span className="text-sm text-gray-600">{product.cost_suffix}</span>
                                )}
                              </div>

                              <p className="text-sm text-gray-600 mb-1">
                                {discount.reason}
                              </p>

                              {discount.description && (
                                <p className="text-xs text-gray-500 italic">
                                  {discount.description}
                                </p>
                              )}
                            </div>

                            <div className="ml-4 text-right">
                              <div className="text-lg font-bold text-green-600">
                                -₹{savings.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                              </div>
                              <div className="text-xs text-gray-500">savings</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {currentDiscount && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 font-medium">
                        🎯 You're currently getting the best available discount!
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Tags */}
          {Array.isArray(product.tag_list) && product.tag_list.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tag_list.map((tag) => (
                <span key={tag.id} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div className="border rounded-2xl shadow p-4 w-full">
          <DateRange
            ranges={range}
            onChange={handleSelect}
            moveRangeOnFirstSelection={product?.booking_period === "fixed_blocks" ? true : (product?.multi_day_selection === "1")}
            minDate={today}
            showDateDisplay={false}
            months={monthsToShow}
            direction="vertical"
            rangeColors={["#ff7413"]}
            editableDateInputs={true}
            disabledDay={isDayDisabled}
          />

          {product?.calendar_type === "hour" && (
            <div className="mt-4">
              <div className="text-sm text-gray-700 mb-2 font-medium">Available Time Slots</div>
              {timeSlots.length === 0 ? (
                <div className="text-sm text-gray-500">No slots available for the selected date.</div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => {
                    const isFixedBlocks = product?.booking_period === "fixed_blocks";
                    const isSelectedSingle = selectedSlot?.key === slot.key;
                    const isInRange =
                      hourRange.start && hourRange.end &&
                      slot.start >= hourRange.start.start && slot.end <= hourRange.end.end;
                    const isRangeEdge =
                      (hourRange.start && hourRange.start.key === slot.key) ||
                      (hourRange.end && hourRange.end.key === slot.key);

                    const handleClick = () => {
                      if (isFixedBlocks) {
                        setSelectedSlot(slot);
                        return;
                      }
                      // calendar_range + hour: pick a contiguous range
                      if (!hourRange.start || (hourRange.start && hourRange.end)) {
                        setHourRange({ start: slot, end: null });
                        return;
                      }
                      if (slot.start <= hourRange.start.start) {
                        setHourRange({ start: slot, end: null });
                        return;
                      }
                      setHourRange({ start: hourRange.start, end: slot });
                    };

                    const active = isFixedBlocks ? isSelectedSingle : (isRangeEdge || isInRange);

                    return (
                      <button
                        key={slot.key}
                        type="button"
                        onClick={handleClick}
                        className={`w-full text-center px-3 py-2 rounded border text-sm ${active
                            ? "bg-orange-500 text-white border-orange-500"
                            : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"
                          }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              )}
              {product?.booking_period === "fixed_blocks" && selectedSlot && (
                <div className="mt-2 text-sm text-gray-700">Selected: {selectedSlot.label}</div>
              )}
              {product?.booking_period === "calendar_range" && (hourRange.start || hourRange.end) && (
                <div className="mt-2 text-sm text-gray-700">
                  {(() => {
                    if (!hourRange.start && !hourRange.end) return null;
                    const startText = hourRange.start ? formatAMPM(hourRange.start.start) : "-";
                    const endText = hourRange.end
                      ? formatAMPM(hourRange.end.end)
                      : hourRange.start
                        ? formatAMPM(hourRange.start.end)
                        : "";
                    return (
                      <span>
                        Selected: {startText} to {endText}
                      </span>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          <div className="mt-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-orange-600">📅</span>
              <span className="font-semibold text-gray-800">Booking Summary</span>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Selected Dates:</span>{" "}
                {(() => {
                  const start = range[0]?.startDate;
                  const end = range[0]?.endDate;
                  if (!start) return "-";
                  const isRange = end && end.getTime() !== start.getTime();
                  return isRange
                    ? `${start.toLocaleDateString()} to ${end.toLocaleDateString()}`
                    : start.toLocaleDateString();
                })()}
              </p>

              {product?.calendar_type === "hour" && (
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Selected Time:</span>{" "}
                  {(() => {
                    if (product?.booking_period === "fixed_blocks") {
                      return selectedSlot ? selectedSlot.label : "-";
                    }
                    // calendar_range for hours
                    if (!hourRange.start && !hourRange.end) return "-";
                    const startText = hourRange.start ? formatAMPM(hourRange.start.start) : "-";
                    const endText = hourRange.end
                      ? formatAMPM(hourRange.end.end)
                      : hourRange.start
                        ? formatAMPM(hourRange.start.end)
                        : "";
                    return `${startText}${endText ? ` to ${endText}` : ""}`;
                  })()}
                </p>
              )}

              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800">Total Cost:</span>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">
                    ₹{calcCost()}
                  </div>
                  {product.booking_period === "fixed_blocks" && product.cost_suffix && (
                    <div className="text-xs text-gray-600">{product.cost_suffix}</div>
                  )}
                </div>
              </div>

              {(() => {
                const discount = getApplicableDiscount();
                if (discount) {
                  const originalCost = (() => {
                    if (!product) return 0;
                    const base = Number(product.cost) || 0;

                    if (product.calendar_type === "hour") {
                      const blockLengthHours = Math.max(1, Number(product?.booking_length) || 1);
                      if (product.booking_period === "fixed_blocks") {
                        return base;
                      }
                      const startSlot = hourRange.start || selectedSlot;
                      const endSlot = hourRange.end || hourRange.start || selectedSlot;
                      if (!startSlot || !endSlot) {
                        return base;
                      }
                      const durationHours = Math.max(0, (endSlot.end - startSlot.start) / (60 * 60 * 1000));
                      const blocks = Math.max(1, Math.round(durationHours / blockLengthHours));
                      return base * blocks;
                    }

                    if (product.booking_period === "fixed_blocks") {
                      return base;
                    }
                    const start = range[0]?.startDate;
                    const end = range[0]?.endDate;
                    const msPerDay = 24 * 60 * 60 * 1000;
                    const numDays = Math.max(1, Math.round((end - start) / msPerDay) + 1);
                    return base * numDays;
                  })();

                  const savings = originalCost - Number(calcCost().replace(/,/g, ''));
                  if (savings > 0) {
                    return (
                      <div className="mt-2 p-2 bg-green-100 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-800">🎉 Discount Applied!</span>
                          <span className="text-sm font-bold text-green-600">
                            You save ₹{savings.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    );
                  }
                }
                return null;
              })()}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
      {Array.isArray(product.related_products) && product.related_products.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 my-8">
          <h2 className="text-xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {product.related_products.map((rp) => (
              <button key={rp.id} 
              onClick={()=>{navigate(`/product/${rp.slug}`)}}
              className="border rounded-xl overflow-hidden shadow hover:shadow-md transition block">
                <img src={getImageUrl(rp.thumbnail)} alt={rp.title} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <div className="font-medium">{rp.title}</div>
                  <div className="text-sm text-green-700 mt-1">
                    ₹{Number(rp.cost).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                    {rp.cost_suffix && <span className="text-xs text-gray-600 ml-1">{rp.cost_suffix}</span>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
