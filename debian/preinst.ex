#!/bin/sh

set -e

case "$1" in
  install|upgrade)
    HASNODE=$(which node 2>/dev/null || echo FALSE)
    if [ $HASNODE = 'FALSE' ]; then
      echo "node must be installed for this to work"
      exit 1
    fi
  ;;

  abort-update)
  ;;

  *)
     echo "preinst called with unknown argument '$1'" >&2

  ;;


esac


exit 0
