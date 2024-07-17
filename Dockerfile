# Usa la imagen base de Node.js
FROM node:14

# Crea el directorio de la aplicación en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa la imagen base de nginx
FROM nginx:alpine

# Copia los archivos de construcción de la aplicación a nginx
COPY --from=0 /app/dist /usr/share/nginx/html

# Exponer el puerto que el contenedor va a escuchar
EXPOSE 80

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
