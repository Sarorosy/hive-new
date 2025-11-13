import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { Country, State, City } from 'country-state-city';
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { useAuth } from "../../utils/idb";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Checkout({ onClose , cartItems }) {
  const { user, logout, cart, clearCart,  } = useAuth();
  const navigate = useNavigate();

  // const [cartItems, setCartItems] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Get existing billing address from user
  const existingBillingAddress = useMemo(() => {
    return user?.billing_address || user?.billling_address || null;
  }, [user]);

  // console.log(existingBillingAddress);

  // Form state for billing details
  const [formValues, setFormValues] = useState({
    firstName: existingBillingAddress?.first_name || "",
    lastName: existingBillingAddress?.last_name || "",
    company_name: existingBillingAddress?.company_name || "",
    country: existingBillingAddress?.country || "India",
    address_1: existingBillingAddress?.address_1 || "",
    address_2: existingBillingAddress?.address_2 || "",
    city: existingBillingAddress?.city || "",
    state: existingBillingAddress?.state || "",
    postal_code: existingBillingAddress?.postal_code || "",
    phone: existingBillingAddress?.phone || "",
  });

  // Location data states
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);


  // Load countries on mount
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (formValues.country) {
      const selectedCountry = countries.find(c => c.name === formValues.country);
      if (selectedCountry) {
        const countryStates = State.getStatesOfCountry(selectedCountry.isoCode);
        setStates(countryStates);
        
        // If we have an existing state value, don't clear it
        if (!existingBillingAddress?.state) {
          setFormValues(prev => ({ ...prev, state: "", city: "" }));
          setCities([]);
        }
      } else {
        setStates([]);
        setCities([]);
      }
    }
  }, [formValues.country, countries, existingBillingAddress?.state]);

  // Load cities when state changes
  useEffect(() => {
    if (formValues.state) {
      const selectedCountry = countries.find(c => c.name === formValues.country);
      const selectedState = states.find(s => s.name === formValues.state);
      if (selectedCountry && selectedState) {
        const stateCities = City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode);
        setCities(stateCities);
        
        // If we have an existing city value, don't clear it
        if (!existingBillingAddress?.city) {
          setFormValues(prev => ({ ...prev, city: "" }));
        }
      } else {
        setCities([]);
      }
    }
  }, [formValues.state, states, formValues.country, countries, existingBillingAddress?.city]);

  // Update form values when existing billing address changes
  useEffect(() => {
    if (existingBillingAddress) {
      setFormValues({
        firstName: existingBillingAddress.first_name || "",
        lastName: existingBillingAddress.last_name || "",
        company_name: existingBillingAddress.company_name || "",
        country: existingBillingAddress.country || "India",
        address_1: existingBillingAddress.address_1 || "",
        address_2: existingBillingAddress.address_2 || "",
        city: existingBillingAddress.city || "",
        state: existingBillingAddress.state || "",
        postal_code: existingBillingAddress.postal_code || "",
        phone: existingBillingAddress.phone || "",
      });
    }
  }, [existingBillingAddress]);

  // Load states and cities when existing billing address is available
  useEffect(() => {
    if (existingBillingAddress && existingBillingAddress.country && countries.length > 0) {
      const selectedCountry = countries.find(c => c.name === existingBillingAddress.country);
      if (selectedCountry) {
        const countryStates = State.getStatesOfCountry(selectedCountry.isoCode);
        setStates(countryStates);
        
        if (existingBillingAddress.state) {
          const selectedState = countryStates.find(s => s.name === existingBillingAddress.state);
          if (selectedState) {
            const stateCities = City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode);
            setCities(stateCities);
          }
        }
      }
    }
  }, [existingBillingAddress, countries]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.pricing?.total_cost || 0);
    }, 0);
  };

  const calculateGST = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setSubmitting(true);
      const token = user?.token;

      const orderData = {
        billing_address: {
          firstName: formValues.firstName.trim(),
          lastName: formValues.lastName.trim(),
          company_name: formValues.company_name.trim() || undefined,
          country: formValues.country,
          address_1: formValues.address_1.trim(),
          address_2: formValues.address_2.trim() || undefined,
          city: formValues.city.trim(),
          state: formValues.state.trim(),
          postal_code: formValues.postal_code.trim(),
          phone: formValues.phone.trim(),
        },
        cart_items: cartItems,
        subtotal: calculateSubtotal(),
        gst: calculateGST(),
        total: calculateTotal()
      };

      const response = await axios.post(
        `${API_URL}/api/orders/create`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const data = response.data;
      
      if (data?.status) {

        if(data?.payment_response?.responseCode === 200 && data?.payment_response?.url){
            await clearCart();
            // Redirect to PhonePe simulator
            window.location.href = data.payment_response.url;
        } else {
            toast.error(data.message || "Payment initi  ation failed");
        }
        
      } else {
        if (data?.message === "Token expired" || data?.message === "Invalid token") {
          toast.error("Please login to place order");
          logout();
          navigate("/account/login?SESSION_EXPIRED=true");
        } else {
          toast.error(data?.message || "Failed to place order");
        }
      }
    } catch (error) {
      toast.error("Failed to place order");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Helper to color the required asterisk red
  const Label = ({ text }) => (
    <label className="text-sm font-medium mb-1">
      {text.split("*")[0]} <span className="text-red-500">*</span>
    </label>
  );

 
  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6 mt-12">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart before checkout.</p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8">
      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
        <button onClick={onClose} className="flex itemms-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
          <ArrowLeft className="mr-2" /> Back to cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Billing Details Form */}
        <div className="space-y-6">
          <div className="border border-gray-300 rounded-md p-6">
            <h2 className="text-xl font-semibold mb-4">Billing Details</h2>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Label text="First name *" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formValues.firstName}
                    onChange={onChange}
                    required
                    className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex flex-col">
                  <Label text="Last name *" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formValues.lastName}
                    onChange={onChange}
                    required
                    className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Company name (optional)</label>
                <input
                  id="company_name"
                  name="company_name"
                  type="text"
                  value={formValues.company_name}
                  onChange={onChange}
                  className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex flex-col">
                <Label text="Country *" />
                <select
                  id="country"
                  name="country"
                  value={formValues.country}
                  onChange={onChange}
                  required
                  className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  <option value="">Select country</option>
                  {countries.map(c => (
                    <option key={c.isoCode} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <Label text="Street address *" />
                <input
                  id="address_1"
                  name="address_1"
                  type="text"
                  placeholder="House number and street name"
                  value={formValues.address_1}
                  onChange={onChange}
                  required
                  className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  id="address_2"
                  name="address_2"
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={formValues.address_2}
                  onChange={onChange}
                  className="mt-2 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <Label text="State *" />
                  <select
                    id="state"
                    name="state"
                    value={formValues.state}
                    onChange={onChange}
                    required
                    className="border rounded-md px-3 py-3 outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="">Select state</option>
                    {states.map(s => (
                      <option key={s.isoCode} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <Label text="City *" />
                  <select
                    id="city"
                    name="city"
                    value={formValues.city}
                    onChange={onChange}
                    required
                    className="border rounded-md px-3 py-3 outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="">Select city</option>
                    {cities.map(c => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <Label text="Postal code / ZIP *" />
                  <input
                    id="postal_code"
                    name="postal_code"
                    type="text"
                    value={formValues.postal_code}
                    onChange={onChange}
                    required
                    className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
              </div>
              

              <div className="flex flex-col">
                <Label text="Phone *" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formValues.phone}
                  onChange={onChange}
                  required
                  className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 rounded-md bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-60 font-medium transition-colors duration-200"
              >
                {submitting ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="space-y-6">
          <div className="border border-gray-300 rounded-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                    {item.product_title}
                  </h3>

                  {/* Booking Details */}
                  <div className="mb-2">
                    {item.booking_details.time_range ? (
                      <div className="text-sm text-gray-600">
                        <div className="mb-1">
                          <span className="font-medium">Date:</span> {formatDate(item.booking_details.start_date)}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {item.booking_details.time_range.start_label} to {item.booking_details.time_range.end_label}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Period:</span> {formatDate(item.booking_details.start_date)} to {formatDate(item.booking_details.end_date)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {item.pricing.cost_suffix && (
                        <span>({item.pricing.base_cost} {item.pricing.cost_suffix})</span>
                      )}
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      ₹{item.pricing.total_cost.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                    </div>
                  </div>

                  {/* Discount information */}
                  {item.pricing.discount_applied && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-green-800">
                          🎉 {item.pricing.discount_applied.discount_name}
                        </span>
                        <span className="text-xs font-bold text-green-600">
                          Save ₹{item.pricing.discount_applied.savings.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">₹{calculateSubtotal().toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">GST (18%):</span>
                <span className="font-medium">₹{calculateGST().toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                  <span className="text-2xl font-bold text-orange-600">
                    ₹{calculateTotal().toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
