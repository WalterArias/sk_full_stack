# PROYECTO DIDACTICO FULL STACK ECOMMERCE

## BACKEND

NODE, EXPRESS, MONGO

## FRONTEND

REACT, REACT-BOOTSTRAP, VANILLA JAVASCRIPT

## DOCUMENTACIÓN DE LA API (SWAGGER)

La API cuenta con documentación interactiva generada con Swagger.

### Cómo levantarla

1. Instalar dependencias del backend:
```bash
   cd back
   npm install
```

2. Levantar el servidor:
```bash
   npm run dev
```

3. Abrir en el navegador:
http://localhost:3000/api-docs

### Qué incluye

- **Usuarios**: registro, login, logout, perfil, administración
- **Productos**: listado paginado, búsqueda, reseñas, top productos, CRUD (admin)
- **Órdenes**: creación, historial, pago, entrega
- **Upload**: carga de imágenes de productos

### Autenticación en Swagger UI

La API usa autenticación por cookie (`jwt`), no por token Bearer. Para probar endpoints protegidos:

1. Ejecuta primero `POST /api/users/auth` con tus credenciales desde Swagger UI (botón "Try it out")
2. El navegador guardará la cookie automáticamente
3. Ya puedes probar los demás endpoints protegidos desde la misma pestaña
