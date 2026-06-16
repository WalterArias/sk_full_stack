/* const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error(`[ERROR] ${err.message}`); // Log interno para el desarrollador

  res.status(statusCode).json({
    status: "error",
    statusCode: statusCode,
    message: err.message || "Ocurrió un error inesperado en el servidor",
  });
};

export { errorHandler };
