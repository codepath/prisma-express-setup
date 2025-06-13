# Prisma Express Setup

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Requirements

1. Postgres
2. NodeJS

Make sure you have [set up Postgres](https://github.com/codepath/postgres-env-setup-apple) in your dev machine.

## Setup

During setup we will create the following:

1. A `app_user` Postgres **role**, with password `1234`.
2. A `shelterdb` **database** owned by `app_user`.
3. A **connection URL** that assumes the above, and also that your Postgres server is running on `localhost` on port `5432`.

**If you wish to use different names, password or port number, you will need to adapt the following instructions,** as well as the `psql` script inside your `package.json` file.

### Instructions

1. We will create a Postgres `app_user` role with password `1234`, and a `shelterdb` Postgres database.

    Connect to the `postgres` database:

    ```bash
    psql postgres
    ```

    Paste and run the following SQL commands:

    ```sql
    DROP DATABASE IF EXISTS shelterdb;
    DROP ROLE IF EXISTS app_user;
    CREATE ROLE app_user WITH LOGIN PASSWORD '1234';
    ALTER ROLE app_user CREATEDB;
    CREATE DATABASE shelterdb OWNER app_user;
    ```

    Quit the connection to the `postgres` database:

    ```sql
    \q
    ```

2. Create a `.env` file at the root of the project:

    ```text
    DATABASE_URL="postgresql://app_user:1234@localhost:5432/shelterdb?schema=public"
    ```

3. Launch the project:

    ```bash
    npm install
    npm run db:init
    npm run dev
    ```

## Deployment to Render.com

- Provision a Postgres database, deploy the web service to Render by linking your GitHub repo, set `DATABASE_URL` env variable.

- The build command in Render should be `npm run build`
