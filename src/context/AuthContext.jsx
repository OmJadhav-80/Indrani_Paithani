import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('indrani_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('indrani_token') || null);
  const [loading, setLoading] = useState(true);

  // Sync token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('indrani_token', token);
    } else {
      localStorage.removeItem('indrani_token');
    }
  }, [token]);

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('indrani_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('indrani_user');
    }
  }, [user]);

  // Verify session on mount if token exists
  useEffect(() => {
    const verifySession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setUser(data.user);
          } else {
            setUser(null);
            setToken(null);
          }
        } else {
          setUser(null);
          setToken(null);
        }
      } catch (err) {
        console.warn('Session verification error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  // Email + Password Customer Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        setToken(data.token);
        return { success: true, user: data.user };
      } else {
        return {
          success: false,
          message: data.message || 'Account not found. Please create an account first.',
        };
      }
    } catch (err) {
      return {
        success: false,
        message: 'Unable to connect to authentication server. Please check your network connection.',
      };
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Login
  const googleLogin = async (googlePayload) => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(googlePayload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        setToken(data.token);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Google authentication failed.' };
      }
    } catch (err) {
      return {
        success: false,
        message: 'Unable to complete Google authentication. Please try again.',
      };
    } finally {
      setLoading(false);
    }
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

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.user.role === 'OWNER' || data.user.role === 'ADMIN') {
          setUser(data.user);
          setToken(data.token);
          return { success: true, user: data.user };
        } else {
          return { success: false, message: 'Access denied. You do not have owner/administrative privileges.' };
        }
      } else {
        return { success: false, message: data.message || 'Owner authentication failed.' };
      }
    } catch (err) {
      return { success: false, message: 'Server connection error during owner authentication.' };
    } finally {
      setLoading(false);
    }
  };

  // Register New Customer
  const register = async (registrationData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        setToken(data.token);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Registration failed.' };
      }
    } catch (err) {
      return { success: false, message: 'Unable to connect to registration service.' };
    } finally {
      setLoading(false);
    }
  };

  // Edit Profile
  const updateProfile = async (profileData) => {
    try {
      if (token) {
        const res = await fetch('/api/users/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profileData),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setUser(data.user);
          return { success: true, message: data.message };
        } else {
          return { success: false, message: data.message || 'Failed to update profile.' };
        }
      }
      return { success: false, message: 'Session expired. Please log in again.' };
    } catch (err) {
      return { success: false, message: 'Error updating profile.' };
    }
  };

  // Address CRUD Handlers
  const addAddress = async (addressData) => {
    try {
      if (token) {
        const res = await fetch('/api/users/addresses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addressData),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setUser((prev) => ({ ...prev, addresses: data.addresses }));
          return { success: true };
        }
      }
      return { success: false, message: 'Session expired.' };
    } catch (err) {
      return { success: false, message: 'Error adding address.' };
    }
  };

  const editAddress = async (addressId, addressData) => {
    try {
      if (token) {
        const res = await fetch(`/api/users/addresses/${addressId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addressData),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setUser((prev) => ({ ...prev, addresses: data.addresses }));
          return { success: true };
        }
      }
      return { success: false, message: 'Session expired.' };
    } catch (err) {
      return { success: false, message: 'Error updating address.' };
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      if (token) {
        const res = await fetch(`/api/users/addresses/${addressId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setUser((prev) => ({ ...prev, addresses: data.addresses }));
          return { success: true };
        }
      }
      return { success: false, message: 'Session expired.' };
    } catch (err) {
      return { success: false, message: 'Error deleting address.' };
    }
  };

  const setDefaultAddress = async (addressId) => {
    try {
      if (token) {
        const res = await fetch(`/api/users/addresses/${addressId}/default`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setUser((prev) => ({ ...prev, addresses: data.addresses }));
          return { success: true };
        }
      }
      return { success: false, message: 'Session expired.' };
    } catch (err) {
      return { success: false, message: 'Error setting default address.' };
    }
  };

  // Forgot Password
  const forgotPassword = async (email) => {
    try {
      const res = await fetch('/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      return {
        success: true,
        message: data.message || 'If an account exists for this email, a password reset link has been sent.',
      };
    } catch (err) {
      return {
        success: true,
        message: 'If an account exists for this email, a password reset link has been sent.',
      };
    }
  };

  // Reset Password
  const resetPassword = async (resetToken, newPassword) => {
    try {
      const res = await fetch('/api/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetToken, newPassword }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, message: 'Error connecting to password reset service.' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/users/logout', { method: 'POST' });
    } catch (err) {
      // Ignore network logout error
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('indrani_user');
    localStorage.removeItem('indrani_token');
  };

  const isLoggedIn = !!user;
  const isOwner = user?.role === 'OWNER' || user?.role === 'ADMIN';
  const isCustomer = user?.role === 'CUSTOMER';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isLoggedIn,
        isOwner,
        isCustomer,
        login,
        googleLogin,
        adminLogin,
        register,
        updateProfile,
        addAddress,
        editAddress,
        deleteAddress,
        setDefaultAddress,
        forgotPassword,
        resetPassword,
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

export default AuthContext;
