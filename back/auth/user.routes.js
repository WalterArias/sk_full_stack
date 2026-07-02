import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "./user.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Registro, autenticación y administración de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Cesar Ramirez
 *               email:
 *                 type: string
 *                 example: cesar@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuario creado y sesión iniciada (cookie jwt)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: El usuario ya existe o los datos son inválidos
 *   get:
 *     summary: Listar todos los usuarios (solo admin)
 *     tags: [Usuarios]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: No autenticado
 */
router.route("/").post(registerUser).get(protect, admin, getUsers);

/**
 * @swagger
 * /api/users/auth:
 *   post:
 *     summary: Autenticar usuario y obtener token (cookie jwt)
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: cesar@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Email o password inválido
 */
router.post("/auth", authUser);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Cerrar sesión (limpia la cookie jwt)
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Logout exitoso
 */
router.post("/logout", logoutUser);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Obtener el perfil del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *   put:
 *     summary: Actualizar el perfil del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: Opcional, solo si se quiere cambiar
 *     responses:
 *       200:
 *         description: Perfil actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID (solo admin)
 *     tags: [Usuarios]
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
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *   put:
 *     summary: Actualizar un usuario (solo admin)
 *     tags: [Usuarios]
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
 *               email:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *   delete:
 *     summary: Eliminar un usuario (solo admin)
 *     tags: [Usuarios]
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
 *         description: Usuario borrado
 *       400:
 *         description: No se puede borrar un admin
 *       404:
 *         description: Usuario no encontrado
 */
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
