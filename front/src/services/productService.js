import { PRODUCTS_URL } from "../constants.js";

const request = async (url, options = {}) => {
  try {
/*     console.log("🚀 Request");
    console.log("URL:", url);
    console.log("Options:", options); */

    const response = await fetch(url, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...options.headers,
      },
      ...options,
    });

   /*  console.log("✅ Status:", response.status);
    console.log("✅ Content-Type:", response.headers.get("content-type")); */

    if (response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const data = await response.json();
    /*   console.log("✅ JSON:", data); */

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      return data;
    }

    const text = await response.text();

  /*   console.log("⚠️ Respuesta NO JSON:");
    console.log(text); */

    throw new Error(`El servidor respondió con ${contentType}`);
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
};

export const productService = {
  getProducts: (keyword = "", pageNumber = 1) => {
    const params = new URLSearchParams({
      keyword,
      pageNumber,
    });

    return request(`${PRODUCTS_URL}?${params}`);
  },

  getProductDetails: (id) => request(`${PRODUCTS_URL}/${id}`),

  createReview: (productId, data) =>
    request(`${PRODUCTS_URL}/${productId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  getTopProducts: () => request(`${PRODUCTS_URL}/top`),

  createProduct: () =>
    request(PRODUCTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }),

  updateProduct: (productId, data) =>
    request(`${PRODUCTS_URL}/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  deleteProduct: (productId) =>
    request(`${PRODUCTS_URL}/${productId}`, {
      method: "DELETE",
    }),

  uploadProductImage: (formData) =>
    request("/api/upload", {
      method: "POST",
      body: formData,
    }),
};
