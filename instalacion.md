

## Backend (carpeta `backend`)

1) Instalar dependencias

cd backend
npm install


2) Variables de entorno

Crear `backend/.env` con al menos:

```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=tu_password
DB_NAME=classicmodels
PORT=3000
```

3) Modo desarrollo (reconstruye y reinicia automáticamente según `package.json`)

npm run dev



## Frontend (carpeta `frontend`)

1) Instalar dependencias


cd frontend
npm install


2) Desarrollo (Vite)

npm run dev


3) Build para producción


npm run build


Por defecto la build se genera en `frontend/dist`.


