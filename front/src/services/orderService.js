import { ORDERS_URL, PAYPAL_URL } from "../constants.js";

// Función genérica para peticiones HTTP
const request = async (url, options = {}) => {
  const config = {
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    // Manejo de sesión expirada
    if (response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    const contentType = response.headers.get("content-type");

    let data;

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(data?.message || `HTTP Error ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const orderService = {
  createOrder: (order) =>
    request(ORDERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }),

  getOrderDetails: (id) => request(`${ORDERS_URL}/${id}`),

  payOrder: (orderId, details) =>
    request(`${ORDERS_URL}/${orderId}/pay`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    }),

  getPaypalClientId: () => request(PAYPAL_URL),

  getMyOrders: () => request(`${ORDERS_URL}/mine`),

  getOrders: () => request(ORDERS_URL),

  deliverOrder: (orderId) =>
    request(`${ORDERS_URL}/${orderId}/deliver`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }),
};

export default request;
