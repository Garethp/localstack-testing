#!/bin/bash

CHANGE=true yarn cdklocal deploy --all --require-approval never
CHANGE=true yarn cdklocal diff
