echo "Check that we have NEXT_PUBLIC_API_URL vars"
test -n "$NEXT_PUBLIC_API_URL"

echo "Check that we have NEXT_PUBLIC_AUTH_GOOGLE_KEY vars"
test -n "$NEXT_PUBLIC_AUTH_GOOGLE_KEY"


find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_API_URL#$NEXT_PUBLIC_API_URL#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_AUTH_GOOGLE_KEY#$NEXT_PUBLIC_AUTH_GOOGLE_KEY#g"

echo "Starting Nextjs"
exec "$@"