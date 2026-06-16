/*
@desc Middleware que proteje las rutas (debe estar autenticado y restringe las rutas solo para el admin)
*/

import jwt from "jsonwebtoken";
import User from "../auth/user.model.js";

/*
@desc funcion que verifica la autenticacion en el sistema y restringe la ruta
@access private, solo con autenticacion
*/
const protect = async (req, res, next) => {
  let token;

  // Lee eL jwt la cookie 'jwt'
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("No autorizado, token fallido !");
    }
  } else {
    res.status(401);
    throw new Error("No autorizado, no hay token !");
  }
};

/*
@desc funcion que verifica rutas SOLO para el admin
@access private, solo con autenticacion
*/
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("No autorizado, debe ser ADMIN");
  }
};

export { protect, admin };
