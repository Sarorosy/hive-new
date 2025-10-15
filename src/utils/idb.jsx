import { createContext, useContext, useState, useEffect } from "react";
import { set, get, del } from "idb-keyval"; // Import IndexedDB helper

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);

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

    fetchUser();
    fetchAdmin();
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

  return (
    <AuthContext.Provider
      value={{ user, admin, login, logout, adminlogin, adminlogout, loading, adminLoading, setFavourites, setBillingAddress }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
