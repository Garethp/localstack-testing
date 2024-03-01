#!/bin/bash

SECRET_NAME=$(awslocal secretsmanager list-secrets --query "SecretList[0].Name" --output text)
SECRET_VALUE=$(awslocal secretsmanager get-secret-value --secret-id=$SECRET_NAME --query "SecretString" --output text)

USERNAME=$(echo $SECRET_VALUE | jq .username -r)
PASSWORD=$(echo $SECRET_VALUE | jq .password -r)
HOST=$(echo $SECRET_VALUE | jq .host -r)
PORT=$(echo $SECRET_VALUE | jq .port -r)
DBNAME=$(echo $SECRET_VALUE | jq .dbname -r)

PGPASSWORD="$PASSWORD" psql --host $HOST --username $USERNAME --port $PORT $DBNAME -c "DO
\$do\$
BEGIN
  CREATE ROLE iam_user WITH LOGIN;
  IF EXISTS(
      SELECT
      FROM pg_catalog.pg_roles
      WHERE rolname = 'rds_iam')
  THEN
      GRANT rds_iam TO iam_user;
  END IF;
END
\$do\$;"

USERNAME="iam_user"
PASSWORD=$(awslocal rds generate-db-auth-token --hostname $HOST --username $USERNAME --port $PORT --region eu-west-2)

PGPASSWORD="$PASSWORD" psql --host $HOST --username $USERNAME --port $PORT $DBNAME -c "SELECT * FROM pg_roles LIMIT 1"
