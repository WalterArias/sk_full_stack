import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "./product.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Consulta y administración del catálogo de productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Listar productos (paginado, con búsqueda opcional)
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Texto para buscar por nombre de producto
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *         description: Número de página (por defecto 1)
 *     responses:
 *       200:
 *         description: Lista paginada de productos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsPage'
 *   post:
 *     summary: Crear un producto (solo admin)
 *     tags: [Productos]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, description, image, category, countInStock]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Camiseta deportiva
 *               price:
 *                 type: number
 *                 example: 59900
 *               description:
 *                 type: string
 *                 example: Camiseta de alto rendimiento
 *               image:
 *                 type: string
 *                 example: /uploads/image-12345.png
 *               category:
 *                 type: string
 *                 example: Ropa
 *               countInStock:
 *                 type: number
 *                 example: 15
 *     responses:
 *       201:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: No autenticado / no autorizado
 */
router.route("/").get(getProducts).post(protect, admin, createProduct);

/**
 * @swagger
 * /api/products/{id}/reviews:
 *   post:
 *     summary: Agregar una reseña a un producto
 *     tags: [Productos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rating, comment]
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Excelente producto
 *     responses:
 *       201:
 *         description: Reseña agregada
 *       400:
 *         description: El producto ya fue reseñado por este usuario
 *       404:
 *         description: Producto no encontrado
 */
router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);

/**
 * @swagger
 * /api/products/top:
 *   get:
 *     summary: Obtener los 3 productos mejor calificados
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Top 3 de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/top", getTopProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *   put:
 *     summary: Actualizar un producto (solo admin)
 *     tags: [Productos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               brand:
 *                 type: string
 *               category:
 *                 type: string
 *               countInStock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *   delete:
 *     summary: Eliminar un producto (solo admin)
 *     tags: [Productos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);
/* 
router.route("/").get(getProducts).post(createProduct);
router.route("/:id/reviews").post(createProductReview);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct); */

export default router;
