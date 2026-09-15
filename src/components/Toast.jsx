import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, ShoppingBag, Heart, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', iconType = 'check') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, iconType }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Render Portal Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="pointer-events-auto bg-brand-maroon text-brand-gold border border-brand-gold/60 p-4 rounded-xl shadow-2xl flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5">
                {toast.iconType === 'cart' && <ShoppingBag className="w-5 h-5 text-brand-gold shrink-0" />}
                {toast.iconType === 'heart' && <Heart className="w-5 h-5 text-red-400 fill-current shrink-0" />}
                {toast.iconType === 'check' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                {toast.iconType === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
                <span className="font-medium text-white">{toast.message}</span>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-amber-200 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
