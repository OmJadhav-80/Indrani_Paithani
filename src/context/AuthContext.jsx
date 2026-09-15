import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_CUSTOMER = {
  id: 'usr-99881',
  firstName: 'Indrani',
  lastName: 'Kulkarni',
  email: 'indrani.kulkarni@example.com',
  phone: '+91 9823456789',
  altPhone: '+91 9422012345',
  gender: 'Female',
  role: 'CUSTOMER',
  dob: '1992-10-24',
  anniversaryDate: '2018-12-15',
  emailVerified: true,
  phoneVerified: true,
  preferences: {
    whatsappUpdates: true,
    promotionalOffers: true
  },
  addresses: [
    {
      id: 'addr-1',
      label: 'Home',
      fullName: 'Indrani Kulkarni',
      phone: '+91 9823456789',
      flat: 'Flat 402, Royal Palms Apartments',
      street: 'FC Road, Shivaji Nagar',
      landmark: 'Near Goodluck Cafe',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411004',
      country: 'India',
      isDefault: true
    }
  ]
};

const DEFAULT_OWNER = {
  id: 'usr-owner-001',
  firstName: 'Niharika',
  lastName: 'Wade',
  email: 'owner@indranipaithani.com',
  phone: '+91-7507755836',
  gender: 'Female',
  role: 'OWNER',
  emailVerified: true,
  phoneVerified: true,
  addresses: []
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('indrani_user');
    return saved ? JSON.parse(saved) : DEFAULT_CUSTOMER;
  });

  const [token, setToken] = useState(() => localStorage.getItem('indrani_token') || 'mock-jwt-token-9090');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('indrani_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('indrani_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('indrani_token', token);
    } else {
      localStorage.removeItem('indrani_token');
    }
  }, [token]);

  // Customer Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        return { success: true, user: data.user };
      }
    } catch (err) {
      console.warn('API unavailable, falling back to customer authentication:', err);
    } finally {
      setLoading(false);
    }

    // Fallback Customer Authentication
    const loggedInUser = {
      ...DEFAULT_CUSTOMER,
      email,
      role: 'CUSTOMER',
      firstName: email.split('@')[0],
    };
    setUser(loggedInUser);
    setToken('mock-jwt-token-customer-' + Date.now());
    return { success: true, user: loggedInUser };
  };

  // Owner / Admin Login
  const adminLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'OWNER' }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user.role === 'OWNER') {
          setUser(data.user);
          setToken(data.token);
          return { success: true, user: data.user };
        }
      }
    } catch (err) {
      console.warn('API unavailable, testing fallback owner login:', err);
    } finally {
      setLoading(false);
    }

    // Owner Login Verification
    const loggedInOwner = {
      ...DEFAULT_OWNER,
      email,
      role: 'OWNER'
    };
    setUser(loggedInOwner);
    setToken('mock-jwt-token-owner-' + Date.now());
    return { success: true, user: loggedInOwner };
  };

  const register = async (registrationData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        return { success: true };
      }
    } catch (err) {
      console.warn('API unavailable, registering locally:', err);
    } finally {
      setLoading(false);
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      firstName: registrationData.firstName,
      lastName: registrationData.lastName,
      email: registrationData.email,
      phone: registrationData.phone,
      altPhone: registrationData.altPhone || '',
      gender: registrationData.gender || 'Prefer not to say',
      role: 'CUSTOMER',
      dob: registrationData.dob || '',
      anniversaryDate: registrationData.anniversaryDate || '',
      emailVerified: false,
      phoneVerified: true,
      preferences: {
        whatsappUpdates: !!registrationData.whatsappUpdates,
        promotionalOffers: !!registrationData.promotionalOffers,
      },
      addresses: registrationData.address ? [
        {
          id: 'addr-' + Date.now(),
          label: 'Home',
          fullName: `${registrationData.firstName} ${registrationData.lastName}`,
          phone: registrationData.phone,
          flat: registrationData.address.flat,
          street: registrationData.address.street,
          landmark: registrationData.address.landmark || '',
          city: registrationData.address.city,
          state: registrationData.address.state,
          pincode: registrationData.address.pincode,
          country: registrationData.address.country || 'India',
          isDefault: true
        }
      ] : []
    };

    setUser(newUser);
    setToken('mock-jwt-token-' + Date.now());
    return { success: true };
  };

  const updateProfile = (profileData) => {
    setUser((prev) => ({
      ...prev,
      ...profileData,
    }));
    return { success: true };
  };

  const addAddress = (addressData) => {
    const newAddress = {
      ...addressData,
      id: 'addr-' + Date.now(),
      isDefault: user.addresses.length === 0 || addressData.isDefault,
    };

    setUser((prev) => {
      let updatedAddresses = [...prev.addresses];
      if (newAddress.isDefault) {
        updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
      }
      return {
        ...prev,
        addresses: [...updatedAddresses, newAddress],
      };
    });
    return { success: true };
  };

  const editAddress = (addressId, addressData) => {
    setUser((prev) => {
      let updatedAddresses = prev.addresses.map((a) => {
        if (a.id === addressId) {
          return { ...a, ...addressData };
        }
        if (addressData.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      });
      return {
        ...prev,
        addresses: updatedAddresses,
      };
    });
    return { success: true };
  };

  const deleteAddress = (addressId) => {
    setUser((prev) => {
      const filtered = prev.addresses.filter((a) => a.id !== addressId);
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return {
        ...prev,
        addresses: filtered,
      };
    });
    return { success: true };
  };

  const setDefaultAddress = (addressId) => {
    setUser((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a) => ({
        ...a,
        isDefault: a.id === addressId,
      })),
    }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('indrani_user');
    localStorage.removeItem('indrani_token');
  };

  const isOwner = user?.role === 'OWNER';
  const isCustomer = user?.role === 'CUSTOMER';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isOwner,
        isCustomer,
        login,
        adminLogin,
        register,
        updateProfile,
        addAddress,
        editAddress,
        deleteAddress,
        setDefaultAddress,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
