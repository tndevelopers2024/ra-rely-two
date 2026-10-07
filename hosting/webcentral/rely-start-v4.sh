#!/usr/bin/env bash
set -eu
umask 077
node rely-update-recipients.cjs
exec bash rely-start-v3.sh
