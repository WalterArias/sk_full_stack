import { USERS_URL } from "../constants.js";

// Función genérica para todas las peticiones
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
  /*   console.log("Request");
    console.log("URL:", url);
    console.log("Method:", config.method || "GET"); */

    const response = await fetch(url, config);

    console.log("Status:", response.status);

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

   /*  console.log(" Response:", data); */

    if (!response.ok) {
      throw new Error(
        data?.message || `HTTP Error ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
};

export const authService = {
  login: (email, password) =>
    request(`${USERS_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }),

  register: (name, email, password) =>
    request(USERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }),

  logout: () =>
    request(`${USERS_URL}/logout`, {
      method: "POST",
    }),

  updateProfile: (data) =>
    request(`${USERS_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  getProfile: () =>
    request(`${USERS_URL}/profile`),
};

export const userService = {
  getUsers: () =>
    request(USERS_URL),

  getUserDetails: (id) =>
    request(`${USERS_URL}/${id}`),

  updateUser: (userId, data) =>
    request(`${USERS_URL}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  deleteUser: (userId) =>
    request(`${USERS_URL}/${userId}`, {
      method: "DELETE",
    }),
};

export const adminService = {
  createProduct: () =>
    request("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }),

  updateProduct: (productId, data) =>
    request(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  deleteProduct: (productId) =>
    request(`/api/products/${productId}`, {
      method: "DELETE",
    }),

  uploadProductImage: (formData) =>
    request("/api/upload", {
      method: "POST",
      body: formData,
    }),
};

export default request;
