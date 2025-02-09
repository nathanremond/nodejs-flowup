# Utiliser l'image officielle Node.js 22 en version Alpine pour un conteneur léger
FROM node:22-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY src/package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'API
COPY src/ .

# Exposer le port sur lequel l'API écoute (par défaut 3000)
EXPOSE 3000