#!/usr/bin/env bash

jsdoc2md --template scripts/jsdoc_template.md src/**/*.js   \
    | grep -v 'Kind'                                \
    | sed -e 's/\[new /[/' -e 's/# new/#/' > API.md
