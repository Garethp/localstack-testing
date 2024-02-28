#!/bin/bash

DEPLOY_POST=true yarn cdklocal deploy --all --require-approval never
DEPLOY_POST=true yarn cdklocal diff
