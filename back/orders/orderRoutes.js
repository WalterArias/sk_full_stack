import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from './orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

/**
 * @swagger
 * tags:
 *   name: Órdenes
 *   description: Creación y administración de órdenes de compra
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Órdenes]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderItems, shippingAddress, paymentMethod]
 *             properties:
 *               orderItems:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/OrderItem'
 *               shippingAddress:
 *                 $ref: '#/components/schemas/ShippingAddress'
 *               paymentMethod:
 *                 type: string
 *                 example: PayPal
 *     responses:
 *       201:
 *         description: Orden creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: No hay items en la orden
 *   get:
 *     summary: Listar todas las órdenes (solo admin)
 *     tags: [Órdenes]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

/**
 * @swagger
 * /api/orders/mine:
 *   get:
 *     summary: Listar las órdenes del usuario autenticado
 *     tags: [Órdenes]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Órdenes del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.route('/mine').get(protect, getMyOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener una orden por ID
 *     tags: [Órdenes]
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
 *         description: Orden encontrada (incluye datos básicos del usuario)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orden no encontrada
 */
router.route('/:id').get(protect, getOrderById);

/**
 * @swagger
 * /api/orders/{id}/pay:
 *   put:
 *     summary: Marcar una orden como pagada (verifica el pago con PayPal)
 *     tags: [Órdenes]
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
 *             description: Objeto de resultado de pago devuelto por PayPal
 *             properties:
 *               id:
 *                 type: string
 *               status:
 *                 type: string
 *               update_time:
 *                 type: string
 *               payer:
 *                 type: object
 *                 properties:
 *                   email_address:
 *                     type: string
 *     responses:
 *       200:
 *         description: Orden actualizada a pagada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orden no encontrada
 */
router.route('/:id/pay').put(protect, updateOrderToPaid);

/**
 * @swagger
 * /api/orders/{id}/deliver:
 *   put:
 *     summary: Marcar una orden como entregada (solo admin)
 *     tags: [Órdenes]
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
 *         description: Orden actualizada a entregada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orden no encontrada
 */
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
