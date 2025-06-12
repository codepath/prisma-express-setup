# Prisma Express Setup

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Requirements

1. Postgres
2. NodeJS

## Development

1. Create a `shelterdb` Postgres database.

    ```bash
    createdb shelterdb
    ```

2. Create an `.env` file at the root of the project.

    ```text
    POSTGRES_USER="user"
    POSTGRES_PASSWORD="1234"
    POSTGRES_DB="shelterdb"
    POSTGRES_URL="postgresql://user:1234@postgres:5432/shelterdb?schema=public"
    ```

3. Run the project.

    ```bash
    npm install
    npm run db:setup
    npm run dev
    ```

## Deployment to Render.com

- Provision a Postgres database, deploy the web service to Render by linking your GitHub repo, set `POSTGRES_URL` env variable.

- The build command in Render should be `npm install && npm run build`
