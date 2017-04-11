#!/usr/bin/env bash

jsdoc2md src/**/*.js                        \
    | grep -v 'Kind'                        \
    | sed -e 's/\[new /[/' -e 's/# new/#/'
