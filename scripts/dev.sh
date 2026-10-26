#!/bin/sh
# Runs vite and respawns it in a fresh process when it exits with code 75
# (the restart-on-tokens plugin's signal), so Tailwind reloads tokens/*.js.
while :; do
  npx vite --port 5190 --strictPort
  [ $? -eq 75 ] || exit $?
done
