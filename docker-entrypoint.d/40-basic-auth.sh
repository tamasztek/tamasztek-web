#!/bin/sh
# Runtime Basic Auth kapcsolo az nginx kiszolgalashoz.
# A nginx:alpine image a /docker-entrypoint.d/*.sh szkripteket inditaskor lefuttatja.
set -e

CONF=/etc/nginx/conf.d/default.conf

if [ "$BASIC_AUTH_ENABLED" = "true" ]; then
    if [ -z "$BASIC_AUTH_USER" ] || [ -z "$BASIC_AUTH_PASSWORD" ]; then
        echo "[basic-auth] HIBA: BASIC_AUTH_ENABLED=true, de BASIC_AUTH_USER vagy BASIC_AUTH_PASSWORD nincs beallitva" >&2
        exit 1
    fi
    htpasswd -bc /etc/nginx/.htpasswd "$BASIC_AUTH_USER" "$BASIC_AUTH_PASSWORD" >/dev/null 2>&1
    sed -i 's|# AUTH_BASIC_PLACEHOLDER|auth_basic "Tamasztek"; auth_basic_user_file /etc/nginx/.htpasswd;|' "$CONF"
    echo "[basic-auth] Bekapcsolva (user: $BASIC_AUTH_USER)"
else
    echo "[basic-auth] Kikapcsolva"
fi
