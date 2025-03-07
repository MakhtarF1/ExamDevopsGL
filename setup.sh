#!/bin/bash

# Afficher un message de bienvenue
echo "=== Installation du système de gestion scolaire ==="
echo "Ce script va installer et configurer tous les microservices."

# Installer les dépendances pour chaque service individuellement
echo "Installation des dépendances pour l'API Gateway..."
cd api-gateway && npm install
cd ..

echo "Installation des dépendances pour le service de classes..."
cd class-service && npm install
cd ..

echo "Installation des dépendances pour le service de cours..."
cd course-service && npm install
cd ..

echo "Installation des dépendances pour le service d'étudiants..."
cd student-service && npm install
cd ..

echo "Installation des dépendances pour le service d'enseignants..."
cd teacher-service && npm install
cd ..

echo "Installation des dépendances pour le service d'emploi du temps..."
cd schedule-service && npm install
cd ..

# Construire tous les services
echo "Construction de tous les services..."
cd api-gateway && npm run build
cd ..
cd class-service && npm run build
cd ..
cd course-service && npm run build
cd ..
cd student-service && npm run build
cd ..
cd teacher-service && npm run build
cd ..
cd schedule-service && npm run build
cd ..

echo "=== Installation terminée avec succès ==="
echo "Pour démarrer les services, exécutez: docker-compose up -d"
echo "L'API Gateway sera accessible à: http://localhost:3000"
echo "La documentation Swagger sera disponible à: http://localhost:3000/api"

