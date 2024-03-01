#!/bin/bash

yarn cdklocal deploy --require-approval never vpc-stack
yarn cdklocal deploy --require-approval never gateway-stack
