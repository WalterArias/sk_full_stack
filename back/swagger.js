import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "micompra API",
      version: "1.0.0",
      description:
        "Documentación de la API del backend de ecommerce (usuarios, productos, órdenes y carga de imágenes).",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "jwt",
          description:
            "Token JWT guardado como cookie httpOnly al hacer login (/api/users/auth).",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            name: { type: "string", example: "Cesar Ramirez" },
            email: { type: "string", example: "cesar@example.com" },
            isAdmin: { type: "boolean", example: false },
          },
        },
        Review: {
          type: "object",
          properties: {
            name: { type: "string", example: "Cesar Ramirez" },
            rating: { type: "number", example: 5 },
            comment: { type: "string", example: "Excelente producto" },
            user: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
          },
        },
        Product: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
            user: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            name: { type: "string", example: "Camiseta deportiva" },
            image: { type: "string", example: "/uploads/image-12345.png" },
            brand: { type: "string", example: "Sample brand" },
            category: { type: "string", example: "Ropa" },
            description: {
              type: "string",
              example: "Camiseta de alto rendimiento",
            },
            reviews: {
              type: "array",
              items: { $ref: "#/components/schemas/Review" },
            },
            rating: { type: "number", example: 4.5 },
            numReviews: { type: "number", example: 3 },
            price: { type: "number", example: 59900 },
            countInStock: { type: "number", example: 15 },
          },
        },
        ProductsPage: {
          type: "object",
          properties: {
            products: {
              type: "array",
              items: { $ref: "#/components/schemas/Product" },
            },
            page: { type: "number", example: 1 },
            pages: { type: "number", example: 4 },
          },
        },
        OrderItem: {
          type: "object",
          properties: {
            name: { type: "string", example: "Camiseta deportiva" },
            qty: { type: "number", example: 2 },
            image: { type: "string", example: "/uploads/image-12345.png" },
            price: { type: "number", example: 59900 },
            product: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
          },
        },
        ShippingAddress: {
          type: "object",
          properties: {
            address: { type: "string", example: "Calle 10 # 5-20" },
            city: { type: "string", example: "Cartago" },
            postalCode: { type: "string", example: "763533" },
            country: { type: "string", example: "Colombia" },
          },
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d3" },
            user: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            orderItems: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderItem" },
            },
            shippingAddress: { $ref: "#/components/schemas/ShippingAddress" },
            paymentMethod: { type: "string", example: "PayPal" },
            itemsPrice: { type: "number", example: 119800 },
            taxPrice: { type: "number", example: 22762 },
            shippingPrice: { type: "number", example: 0 },
            totalPrice: { type: "number", example: 142562 },
            isPaid: { type: "boolean", example: false },
            paidAt: { type: "string", format: "date-time" },
            isDelivered: { type: "boolean", example: false },
            deliveredAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./auth/*.js", "./products/*.js", "./orders/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
