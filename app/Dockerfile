# Utiliser l'image PHP avec Apache
FROM php:8.2-apache

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libzip-dev \
    unzip \
    git \
    curl \
    && docker-php-ext-install intl pdo pdo_mysql zip opcache

# Activer le module Apache pour la réécriture d'URL
RUN a2enmod rewrite

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Installer Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

# Ajouter Symfony CLI au PATH
ENV PATH="/usr/local/bin:${PATH}"

# Copier la configuration apache
COPY vhost.conf /etc/apache2/sites-available/000-default.conf

# Donner les permissions correctes
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html

# Définir le répertoire de travail
WORKDIR /var/www/html

# Exposer le port 80
EXPOSE 80