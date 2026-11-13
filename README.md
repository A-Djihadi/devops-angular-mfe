# devops-angular-mfe

Micro Frontend Angular avec Module Federation — shell app + remote app connectés au backend Spring Boot.

> **Objectif :** démontrer l'architecture Micro Frontend (MFE) avec Webpack Module Federation dans Angular, la conteneurisation et l'injection de configuration à runtime.

---

## Architecture

```
┌─────────────────────────────────────────────┐
│                 shell-app (:4200)            │
│  - Routing principal                         │
│  - Navigation / Layout                       │
│  - Appels API vers devops-spring-app         │
│                                              │
│   charge dynamiquement                       │
│           │                                  │
│           ▼                                  │
│  ┌──────────────────────┐                   │
│  │  remote-app (:4201)  │                   │
│  │  - Module exposé     │                   │
│  │  - Feature isolée    │                   │
│  └──────────────────────┘                   │
└─────────────────────────────────────────────┘
              │
              ▼
     devops-spring-app (:8080)
```

---

## Stack technique

| Composant | Choix |
|---|---|
| Framework | Angular 17 (Standalone Components) |
| MFE | Webpack Module Federation |
| Serveur | nginx 1.25 Alpine |
| Configuration | Injection runtime via `env-config.js` |
| CI/CD | GitHub Actions |

---

## Démarrage rapide / Quick start

### Prérequis

- Docker 24+
- Node 20+ (pour le développement local)
- Le réseau Docker `devops-network` doit exister

```bash
docker network create devops-network
```

### Lancer avec Docker Compose

```bash
docker compose up --build
```

- Shell : `http://localhost:4200`
- Remote : `http://localhost:4201`

### Développement local (sans Docker)

```bash
# Terminal 1 — remote app
cd remote-app && npm ci && npm start

# Terminal 2 — shell app
cd shell-app && npm ci && npm start
```

### Build de production (sans Docker)

```bash
# Shell app
cd shell-app && npm ci && npm run build

# Remote app
cd remote-app && npm ci && npm run build
```

La sortie est générée dans `shell-app/dist/shell-app` et `remote-app/dist/remote-app`.

Le CI GitHub Actions exécute en plus `npm run lint` et `npm run test` sur chaque app.

---

## Pattern d'injection de configuration à runtime

L'image Docker est construite une seule fois. Les URLs (backend, remote) sont injectées au démarrage du container via `docker-entrypoint.sh`, qui génère un fichier `env-config.js` chargé dans `index.html`.

Cela évite de rebuilder l'image pour changer d'environnement.

```bash
# Exemple : pointer vers un backend de staging
docker run -e API_BASE_URL=https://api.staging.djihadi.dev ghcr.io/a-djihadi/devops-angular-shell:latest
```

---

## Variables d'environnement

| Variable | Défaut | Description |
|---|---|---|
| `API_BASE_URL` | `http://localhost:8080` | URL du backend Spring Boot |
| `REMOTE_APP_URL` | `http://localhost:4201/remoteEntry.js` | Point d'entrée du remote MFE |

---

## Lien avec les autres repos

Ce repo fait partie du portfolio DevOps. Il est orchestré par [devops-infra](https://github.com/A-Djihadi/devops-infra) et peut être déployé via [devops-kubernetes](https://github.com/A-Djihadi/devops-kubernetes).

---

*Auteur : [Djihadi Ahamdy](https://djihadi.dev)*
