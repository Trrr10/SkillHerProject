import React, { createContext, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag 
} from "lucide-react";

/* =========================================================
   CART CONTEXT (Unchanged)
========================================================= */

const CartContext = createContext();

export const CartProvider = ({ userId, children }) => {
  const storageKey = `skillher_cart_${userId}`;

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, storageKey]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return; 
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

/* =========================================================
   ADD TO CART PAGE UI (Updated)
========================================================= */

const AddToCart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    // The background will change automatically based on global dark mode
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-6 font-sans">
      
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center mb-8">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-4">
            <ShoppingCart className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Your Cart
          </h1>
        </div>

        {/* Cart Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-800 rounded-3xl shadow-sm text-center"
                >
                  <ShoppingBag className="w-16 h-16 text-slate-300 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Looks like you haven't added anything yet.
                  </p>
                </motion.div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-transparent dark:border-slate-700/50 hover:shadow-md transition-shadow"
                  >
                    {/* Product Details */}
                    <div className="flex-1 w-full sm:w-auto mb-4 sm:mb-0">
                      <h2 className="font-bold text-lg text-slate-800 dark:text-white">
                        {item.name}
                      </h2>
                      <p className="text-purple-600 dark:text-purple-400 font-medium">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center gap-6">
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-white dark:hover:bg-slate-600 rounded-md transition-colors disabled:opacity-50"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-bold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-white dark:hover:bg-slate-600 rounded-md transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Summary Card */}
          {cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 sticky top-6">
                <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">
                  Order Summary
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Tax (18%)</span>
                    <span>₹{(totalPrice * 0.18).toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-gray-200 dark:bg-slate-700 my-4"></div>
                  <div className="flex justify-between text-xl font-bold text-slate-900 dark:text-white">
                    <span>Total</span>
                    <span>₹{(totalPrice * 1.18).toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-95">
                    Checkout
                    <ArrowRight size={20} />
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="w-full py-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium text-sm transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default AddToCart;