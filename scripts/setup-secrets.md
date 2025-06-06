# 🔐 Configuration des Secrets GitHub

## Secrets requis pour le déploiement Docker Hub

### 1. Créer un compte Docker Hub
1. Aller sur [hub.docker.com](https://hub.docker.com)
2. Créer un compte ou se connecter
3. Noter votre nom d'utilisateur Docker Hub

### 2. Créer un Access Token Docker Hub
1. Aller dans **Account Settings > Security**
2. Cliquer sur **New Access Token**
3. Nom du token: `github-actions-bobapp`
4. Permissions: **Read, Write, Delete**
5. **Copier le token** (ne sera plus visible après)

### 3. Configurer les secrets GitHub
Aller dans **Settings > Secrets and variables > Actions** de votre repository GitHub

#### Secrets requis :
```
DOCKERHUB_USERNAME = votre-nom-utilisateur-dockerhub
DOCKERHUB_TOKEN = le-token-access-docker-hub
```

#### Secrets optionnels pour SonarQube :
```
SONAR_TOKEN = votre-token-sonarqube
SONAR_HOST_URL = https://sonarcloud.io (ou votre instance)
```

### 4. Structure des images Docker

Une fois configuré, les images seront publiées sous :
```
docker.io/VOTRE-USERNAME/bobapp-frontend:latest
docker.io/VOTRE-USERNAME/bobapp-frontend:20241201-a1b2c3d4

docker.io/VOTRE-USERNAME/bobapp-backend:latest  
docker.io/VOTRE-USERNAME/bobapp-backend:20241201-a1b2c3d4
```

### 5. Utilisation des images

#### Lancement manuel :
```bash
# Frontend (port 3000)
docker run -p 3000:80 VOTRE-USERNAME/bobapp-frontend:latest

# Backend (port 8080)
docker run -p 8080:8080 VOTRE-USERNAME/bobapp-backend:latest
```

#### Avec docker-compose :
Le workflow génère automatiquement un `docker-compose.yml` avec les bonnes versions.

### 6. Déclenchement du déploiement

Le déploiement se déclenche automatiquement :
- **✅ Push vers main** → Déploiement automatique
- **✅ Release GitHub** → Déploiement avec tag de version
- **✅ Merge de PR** → Déploiement automatique

### 7. Monitoring du déploiement

Dans l'onglet **Actions** de GitHub :
1. Vérifier que tous les checks de validation passent
2. Suivre le progress du déploiement
3. Vérifier les logs en cas d'erreur

### 8. Rollback en cas de problème

```bash
# Revenir à une version précédente
docker pull VOTRE-USERNAME/bobapp-frontend:VERSION-PRECEDENTE
docker pull VOTRE-USERNAME/bobapp-backend:VERSION-PRECEDENTE

# Ou utiliser le tag latest précédent depuis Docker Hub
```

## 🚀 Processus complet

1. **Développement** → PR créée
2. **Validation** → Tous les checks passent
3. **Review** → Approbation de la PR
4. **Merge** → Fusion vers main
5. **Déploiement** → Images Docker publiées automatiquement
6. **Production** → Utilisation des nouvelles images

## 🔒 Sécurité

- Les tokens sont stockés de façon sécurisée dans GitHub Secrets
- Les images supportent les architectures **AMD64** et **ARM64**
- Les builds utilisent des **caches** pour accélérer les déploiements
- Les **health checks** sont configurés pour les conteneurs 