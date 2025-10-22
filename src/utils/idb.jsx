import { createContext, useContext, useState, useEffect } from "react";
import { set, get, del } from "idb-keyval"; // Import IndexedDB helper

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await get("HiveLoggedInUser");
      if (storedUser) {
        setUser(storedUser);
      }
      setLoading(false);
    };

    const fetchAdmin = async () => {
      const storedAdmin = await get("HiveLoggedInAdmin");
      if (storedAdmin) {
        setAdmin(storedAdmin);
      }
      setAdminLoading(false);
    };

    const fetchCart = async () => {
      const storedCart = await get("HiveCart");
      if (storedCart) {
        setCart(storedCart);
      }
    };

    fetchUser();
    fetchAdmin();
    fetchCart();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    await set("HiveLoggedInUser", userData);
  };

  const logout = async () => {
    setUser(null);
    await del("HiveLoggedInUser");
  };


  const adminlogin = async (userData) => {
    setAdmin(userData);
    await set("HiveLoggedInAdmin", userData);
  };

  const adminlogout = async () => {
    setAdmin(null);
    await del("HiveLoggedInAdmin");
  };

  const setFavourites = async (favourites) => {
    setUser((prev) => {
      const updatedUser = {
        ...prev,
        favMenus: favourites,
      };
      set("HiveLoggedInUser", updatedUser);
      return updatedUser;
    });
  };

  const setBillingAddress = async (billing_address) => {
    setUser((prev) => {
      const updatedUser = {
        ...prev,
        billing_address: billing_address,
      };
      set("HiveLoggedInUser", updatedUser);
      return updatedUser;
    });
  };

  const addToCart = async (cartItem) => {
    setCart((prev) => {
      const updatedCart = [...prev, cartItem];
      set("HiveCart", updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = async (cartItemId) => {
    setCart((prev) => {
      const updatedCart = prev.filter(item => item.id !== cartItemId);
      set("HiveCart", updatedCart);
      return updatedCart;
    });
  };

  const clearCart = async () => {
    setCart([]);
    await del("HiveCart");
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        admin, 
        cart,
        login, 
        logout, 
        adminlogin, 
        adminlogout, 
        loading, 
        adminLoading, 
        setFavourites, 
        setBillingAddress,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
