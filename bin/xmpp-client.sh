#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )"/.. && pwd )"
BUILD_DIR="${DIR}/build"
LOG_DIR="${DIR}/var/log"
NPM_DIR="${DIR}/node_modules"
PID_DIR="${DIR}/var/run"
SRC_DIR="${DIR}/src"

get_pid() {
    cat "${PID_DIR}/$1.pid"
}

is_running() {
    [ -f "${PID_DIR}/$1.pid" ] && ps `get_pid $1` > /dev/null 2>&1
}

stop() {
    PID=`get_pid $1`
    PID_FILE="${PID_DIR}/$1.pid"

    echo -n "Stopping $1..."
    kill ${PID}
    for i in {1..10}
        do
            if ! is_running $1; then
                break
            fi
            echo -n "."
            sleep 1
        done
    echo

    if is_running $1; then
        echo "$1 not stopped. It may still be shutting down or shutdown may have failed."
    else
        echo "$1 stopped."
        if [ -f "${PID_FILE}" ]; then
            rm "${PID_FILE}"
        fi
    fi
}

case "$1" in
    install)
        # npm install still necessary?  recursive at this point...
        grunt download-atom-shell
        gem update --system
        gem install sass compass
    ;;

    publish)
        # how to compile atom shell for various platforms
        echo "TODO"
    ;;

    start)
        # start jsx compilation
        if ! is_running jsx; then
            echo "Starting jsx compilation..."
            "${NPM_DIR}/react-tools/bin/jsx" \
                --extension jsx --watch "${SRC_DIR}" "${BUILD_DIR}" \
                >>"${LOG_DIR}/jsx.out" 2>>"${LOG_DIR}/jsx.err" &
            echo $! > "${PID_DIR}/jsx.pid"
        fi

        # start sass/compass compilation
        if ! is_running compass; then
            echo "Starting compass compilation..."
            compass watch \
                --sass-dir "${SRC_DIR}/styles" --css-dir "${BUILD_DIR}/styles" --javascripts-dir "${BUILD_DIR}/scripts" --images-dir "${SRC_DIR}/images" \
                >>"${LOG_DIR}/compass.out" 2>>"${LOG_DIR}/compass.err" &
            echo $! > "${PID_DIR}/compass.pid"
        fi

        # start atom shell
        if ! is_running atom; then
            echo "Starting atom shell..."
            "${DIR}/build/atom_shell/Atom.app/Contents/MacOS/Atom" \
                "${APP_DIR}" \
                >>"${LOG_DIR}/atom.out" 2>>"${LOG_DIR}/atom.err" &
            echo $! > "${PID_DIR}/atom.pid"
        fi
    ;;

    stop)
        # stop jsx compilation
        if is_running jsx; then
            stop jsx
        fi

        # stop sass/compass compilation
        if is_running compass; then
            stop compass
        fi

        # stop atom shell
        if is_running atom; then
            stop atom
        fi
    ;;

    restart)
        $0 stop
        $0 start
    ;;

    status)
        if is_running atom; then
            echo "Running"
        else
            echo "Stopped"
        fi
    ;;

    *)
        echo "Usage: $0 {install|publish|start|stop|restart|status}"
        exit 1
    ;;
esac
