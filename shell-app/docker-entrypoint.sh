#!/bin/sh
# Injection des variables d'environnement dans le bundle Angular au runtime
# Cela évite de reconstruire l'image pour changer une URL backend.

cat <<EOF > /usr/share/nginx/html/env-config.js
window.__env = {
  apiBaseUrl: "${API_BASE_URL:-http://localhost:8080}",
  remoteAppUrl: "${REMOTE_APP_URL:-http://localhost:4201/remoteEntry.js}"
};
EOF

exec "$@"
