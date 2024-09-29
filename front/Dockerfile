# Étape 1 : Build de l'application Angular
FROM node:latest as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/

# Installation des dépendances avec --ignore-scripts
RUN yarn --ignore-scripts
RUN npm run build
 
# Étape 2 : Serveur Nginx pour la production
FROM nginx:latest as production

# Ajouter un utilisateur non root pour exécuter Nginx
RUN adduser --disabled-password --no-create-home nginxuser

USER nginxuser

# Copier la configuration de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers de build Angular
COPY --from=build /usr/local/app/dist/bobapp /usr/share/nginx/html

EXPOSE 80
