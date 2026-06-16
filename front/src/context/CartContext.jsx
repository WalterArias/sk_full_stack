import React, { createContext, useContext, useState, useEffect } from 'react';
import { updateCart } from '../utils/cartUtils';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    cartItems: [],
    shippingAddress: {},
    paymentMethod: 'PayPal',
  });

  // Inicializar desde localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  const addToCart = (item) => {
    const { user, rating, numReviews, reviews, ...cleanItem } = item;

    setCart((prevCart) => {
      const existItem = prevCart.cartItems.find((x) => x._id === cleanItem._id);

      let updatedCartItems;
      if (existItem) {
        updatedCartItems = prevCart.cartItems.map((x) =>
          x._id === existItem._id ? cleanItem : x
        );
      } else {
        updatedCartItems = [...prevCart.cartItems, cleanItem];
      }

      const updatedCart = {
        ...prevCart,
        cartItems: updatedCartItems,
      };

      const cartWithTotals = updateCart(updatedCart, cleanItem);
      localStorage.setItem('cart', JSON.stringify(cartWithTotals));
      return cartWithTotals;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCartItems = prevCart.cartItems.filter((x) => x._id !== id);
      const updatedCart = {
        ...prevCart,
        cartItems: updatedCartItems,
      };

      const cartWithTotals = updateCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(cartWithTotals));
      return cartWithTotals;
    });
  };

  const saveShippingAddress = (address) => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        shippingAddress: address,
      };
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const savePaymentMethod = (paymentMethod) => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        paymentMethod,
      };
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCartItems = () => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        cartItems: [],
      };
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const resetCart = () => {
    setCart({
      cartItems: [],
      shippingAddress: {},
      paymentMethod: 'PayPal',
    });
    localStorage.removeItem('cart');
  };

  const value = {
    ...cart,
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems,
    resetCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
