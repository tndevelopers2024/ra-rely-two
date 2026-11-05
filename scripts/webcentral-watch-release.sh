#!/usr/bin/env bash
# The live worker follows successful GitHub deployments via deploys/current.
set -eu
release_link="$(pwd)/deploys/current"
child_pid=''
stop_child() {
  if [ -n "$child_pid" ]; then
    kill "$child_pid" 2>/dev/null || true
    wait "$child_pid" 2>/dev/null || true
    child_pid=''
  fi
}
trap 'stop_child; exit 0' TERM INT
while :; do
  release_dir=$(readlink -f "$release_link")
  test -f "$release_dir/.next/BUILD_ID"
  echo "Starting live release: $(basename "$release_dir")"
  (cd "$release_dir" && exec node node_modules/next/dist/bin/next start --hostname 0.0.0.0 --port 3000) &
  child_pid=$!
  while kill -0 "$child_pid" 2>/dev/null; do
    sleep 3 & wait $! || true
    current_dir=$(readlink -f "$release_link")
    if [ "$current_dir" != "$release_dir" ]; then
      echo 'New release detected; restarting live server.'
      break
    fi
  done
  stop_child
  sleep 2 & wait $! || true
done
