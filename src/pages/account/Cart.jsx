import React, { useState, useEffect } from "react";
import { useAuth } from "../../utils/idb";
import { API_URL } from "../../utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = () => {
  const { user, logout, cart, removeFromCart, clearCart } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingItem, setRemovingItem] = useState(null);
  const navigate = useNavigate();

  const [checkingOut, setCheckingOut] = useState(false);

  // Check if a cart item has expired (past date and/or time)
  const isItemExpired = (item) => {
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if booking start date is in the past (only compare dates, not time)
    const startDate = new Date(item.booking_details.start_date);
    startDate.setHours(0, 0, 0, 0);
    
    // If start_date is before today, it's expired
    if (startDate < today) {
      return true;
    }
    
    // Check if booking end date is in the past (only compare dates, not time)
    const endDate = new Date(item.booking_details.end_date);
    endDate.setHours(0, 0, 0, 0);
    
    // If end_date is before today, it's expired
    if (endDate < today) {
      return true;
    }
    
    // If it's the same day as start date and time_range exists, check if the start time has passed
    if (startDate.getTime() === today.getTime() && item.booking_details?.time_range?.start_label) {
      const startTimeLabel = item.booking_details.time_range.start_label;
      
      // Extract the start time from the label (e.g., "09:00 AM - 10:00 AM" -> "09:00 AM")
      const timeMatch = startTimeLabel.match(/(\d{1,2}:\d{2}\s*[AP]M)/g);
      if (timeMatch && timeMatch.length > 0) {
        const actualStartTime = timeMatch[0]; // Get the first time (actual start)
        const [time, period] = actualStartTime.split(' ');
        const [hours, minutes] = time.split(':');
        
        let startHour = parseInt(hours);
        if (period === 'PM' && startHour !== 12) {
          startHour += 12;
        } else if (period === 'AM' && startHour === 12) {
          startHour = 0;
        }
        
        const startDateTime = new Date(now);
        startDateTime.setHours(startHour, parseInt(minutes), 0, 0);
        
        // Return true if current time has passed the booking start time
        if (now > startDateTime) {
          return true;
        }
      }
    }
    
    // If it's the same day as end date and time_range exists, check if the end time has expired
    if (endDate.getTime() === today.getTime() && item.booking_details?.time_range?.end_label) {
      const endTimeLabel = item.booking_details.time_range.end_label;
      
      // Extract the end time from the label (e.g., "09:00 AM - 10:00 AM" -> "10:00 AM")
      const timeMatch = endTimeLabel.match(/(\d{1,2}:\d{2}\s*[AP]M)/g);
      if (timeMatch && timeMatch.length > 1) {
        const actualEndTime = timeMatch[1]; // Get the second time (actual end)
        const [time, period] = actualEndTime.split(' ');
        const [hours, minutes] = time.split(':');
        
        let endHour = parseInt(hours);
        if (period === 'PM' && endHour !== 12) {
          endHour += 12;
        } else if (period === 'AM' && endHour === 12) {
          endHour = 0;
        }
        
        const endDateTime = new Date(now);
        endDateTime.setHours(endHour, parseInt(minutes), 0, 0);
        
        // Return true if current time has passed the booking end time
        return now > endDateTime;
      }
    }
    
    return false;
  };

  // Remove expired items from cart
  const removeExpiredItems = async (items) => {
    const expiredItems = items.filter(isItemExpired);
    const validItems = items.filter(item => !isItemExpired(item));
    
    if (expiredItems.length > 0) {
      console.log(`Removing ${expiredItems.length} expired items from cart`);
      
      // Remove expired items from backend if user is logged in
      if (user) {
        for (const expiredItem of expiredItems) {
          try {
            const response = await fetch(`${API_URL}/user/removefromcart`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token || ''}`
              },
              body: JSON.stringify({ item_id: expiredItem.id })
            });
            const data = await response.json();
            if(data.message == "Token expired" || data.message == "Invalid token"){
              toast.error("Session expired. Please login again.");
              logout();
              navigate("/account/login");
              return;
            }
          } catch (error) {
            console.error(`Error removing expired item ${expiredItem.id}:`, error);
          }
        }
      } else {
        // Remove from local cart
        for (const expiredItem of expiredItems) {
          try {
            await removeFromCart(expiredItem.id);
          } catch (error) {
            console.error(`Error removing expired item ${expiredItem.id}:`, error);
          }
        }
      }
      
      toast(`${expiredItems.length} expired item(s) removed from cart`);
    }
    
    return validItems;
  };

  // Fetch cart items based on user login status
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      let items = [];
      
      if (user) {
        // User is logged in - fetch from API
        const response = await fetch(`${API_URL}/user/getcartitems`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token || ''}` // Add token if available
          }
        });

        const data = await response.json();
        
        if (data.status) {
          items = data.cart_items || [];
        } else {
          if(data.message == "Token expired" || data.message == "Invalid token"){
            toast.error("Session expired. Please login again.");
            logout();
            navigate("/account/login?SESSION_EXPIRED=true");
            return;
          }
          console.error(data.message || "Failed to fetch cart items");
          items = [];
        }
      } else {
        // User is not logged in - use local cart
        items = cart || [];
      }
      
      // Remove expired items and update state
      const validItems = await removeExpiredItems(items);
      setCartItems(validItems);
      
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    

    fetchCartItems();
  }, []);

  setInterval(() => {
    fetchCartItems();
}, 60000);

useEffect(()=>{
  if(cartItems.length == 0){
    setCheckingOut(false);
  }
},[cartItems])  

  // Handle removing item from cart
  const handleRemoveItem = async (itemId) => {
    setRemovingItem(itemId);
    try {
      if (user) {
        // User is logged in - remove from API
        const response = await fetch(`${API_URL}/user/removefromcart`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token || ''}`
          },
          body: JSON.stringify({ item_id: itemId })
        });

        const data = await response.json();
        
        if (data.status) {
          // Update local state
          setCartItems(prev => prev.filter(item => item.id !== itemId));
          toast.success("Item removed from cart");
        } else {
          if(data.message == "Token expired" || data.message == "Invalid token"){
            toast.error("Session expired. Please login again.");
            logout();
            navigate("/account/login");
            return;
          }
          toast.error(data.message || "Failed to remove item");
        }
      } else {
        // User is not logged in - remove from local cart
        await removeFromCart(itemId);
        setCartItems(prev => prev.filter(item => item.id !== itemId));
        toast.success("Item removed from cart");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    } finally {
      setRemovingItem(null);
    }
  };

  // Handle clearing entire cart
  const handleClearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) {
      return;
    }

    try {
      if (user) {
        // User is logged in - clear from API
        const response = await fetch(`${API_URL}/user/clearcart`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token || ''}`
          }
        });

        const data = await response.json();
        
        if (data.status) {
          setCartItems([]);
          toast.success("Cart cleared successfully");
        } else {
          if(data.message == "Token expired" || data.message == "Invalid token"){
            toast.error("Session expired. Please login again.");
            logout();
            navigate("/account/login");
            return;
          }
          toast.error(data.message || "Failed to clear cart");
        }
      } else {
        // User is not logged in - clear local cart
        await clearCart();
        setCartItems([]);
        toast.success("Cart cleared successfully");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  // Calculate total cost
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.pricing?.total_cost || 0);
    }, 0);
  };

  // Calculate GST (18%)
  const calculateGST = () => {
    return calculateTotal() * 0.18;
  };

  // Calculate final total (including GST)
  const calculateFinalTotal = () => {
    return calculateTotal() + calculateGST();
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

  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-12">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-12">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          
        </div>
      </div>
    );
  }

  return (
    checkingOut ? (<Checkout cartItems={cartItems} onClose={()=>{setCheckingOut(false);}} />) :
    (<div className="max-w-4xl mx-auto p-4 mt-8">
      
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-3">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.product_title}
                </h3>
                
                {/* Booking Details */}
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-600 mb-1">Booking Details:</h4>
                  {item.booking_details.time_range ? (
                    <div className="text-sm text-gray-700">
                      <div className="mb-1">
                        <span className="font-medium">Date:</span> {formatDate(item.booking_details.start_date)}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span> {item.booking_details.time_range.start_label} to {item.booking_details.time_range.end_label}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-700">
                      <div>
                        <span className="font-medium">Period:</span> {formatDate(item.booking_details.start_date)} to {formatDate(item.booking_details.end_date)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-600 mb-1">Pricing:</h4>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{item.pricing.total_cost.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                    </div>
                    {item.pricing.cost_suffix && (
                      <span className="text-sm text-gray-600">({item.pricing.base_cost} {item.pricing.cost_suffix})</span>
                    )}
                  </div>

                  {/* Discount information */}
                  {item.pricing.discount_applied && (
                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-800">
                          🎉 Discount Applied: {item.pricing.discount_applied.discount_name}
                        </span>
                        <span className="text-sm font-bold text-green-600">
                          Save ₹{item.pricing.discount_applied.savings.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Customer info */}
                {item.customer && item.customer.name && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Booked by:</span> {item.customer.name}
                    {item.customer.email && <span> ({item.customer.email})</span>}
                  </div>
                )}
              </div>

              <div className="ml-4">
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={removingItem === item.id}
                  className="px-3 py-1 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 disabled:opacity-50"
                >
                  {removingItem === item.id ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-6 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Cart Summary</h3>
          <p className="text-sm text-gray-600">{cartItems.length} item(s) in cart</p>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">₹{calculateTotal().toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">GST (18%):</span>
            <span className="font-medium">₹{calculateGST().toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
          </div>
          <div className="border-t border-orange-200 pt-2">
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
              <span className="text-2xl font-bold text-green-600">
                ₹{calculateFinalTotal().toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button 
            onClick={()=>{setCheckingOut(true);}}
            className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {checkingOut ? "Checking out..." : "Proceed to Checkout"}
            
          </button>
          
        </div>
      </div>
    </div>)
  );
};

export default Cart;
