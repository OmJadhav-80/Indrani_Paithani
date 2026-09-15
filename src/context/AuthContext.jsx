import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  id: 'usr-99881',
  firstName: 'Indrani',
  lastName: 'Kulkarni',
  email: 'indrani.kulkarni@example.com',
  phone: '+91 9823456789',
  altPhone: '+91 9422012345',
  gender: 'Female',
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
    },
    {
      id: 'addr-2',
      label: 'Work',
      fullName: 'Indrani Kulkarni',
      phone: '+91 9823456789',
      flat: 'Plot No 88, Sunrise Tech Park',
      street: 'Baner-Pashan Link Road',
      landmark: 'Opposite Dominoes',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411045',
      country: 'India',
      isDefault: false
    }
  ]
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('indrani_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
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

  const login = async (email, password) => {
    setLoading(true);
    try {
      // API call attempt
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        return { success: true };
      }
    } catch (err) {
      console.warn('API unavailable, falling back to local state authentication:', err);
    } finally {
      setLoading(false);
    }

    // Mock fallback success
    const mockUser = {
      ...DEFAULT_USER,
      email,
      firstName: email.split('@')[0],
    };
    setUser(mockUser);
    setToken('mock-jwt-token-' + Date.now());
    return { success: true };
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

    // Fallback registration handler
    const newUser = {
      id: 'usr-' + Date.now(),
      firstName: registrationData.firstName,
      lastName: registrationData.lastName,
      email: registrationData.email,
      phone: registrationData.phone,
      altPhone: registrationData.altPhone || '',
      gender: registrationData.gender || 'Prefer not to say',
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

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
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
