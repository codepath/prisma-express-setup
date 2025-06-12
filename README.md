# Prisma Express Setup

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Requirements

1. Postgres
2. NodeJS

## Development

1. Create an `.env` file at the root of the project.

    ```text
    DATABASE_URL="postgresql://user:1234@localhost:5432/shelterdb?schema=public"
    ```

2. Create a Postgres `user` role with password `1234`, and a `shelterdb` Postgres database.

    ```bash
    psql postgres
    ```

    ```sql
    CREATE ROLE "user" WITH LOGIN PASSWORD '1234';
    ALTER ROLE "user" CREATEDB;
    CREATE DATABASE "shelterdb" OWNER "user";
    GRANT ALL PRIVILEGES ON DATABASE "shelterdb" TO "user";
    ```

3. Run the project.

    ```bash
    npm install
    npm run db:setup
    npm run dev
    ```

## Deployment to Render.com

- Provision a Postgres database, deploy the web service to Render by linking your GitHub repo, set `DATABASE_URL` env variable.

- The build command in Render should be `npm install && npm run build`
