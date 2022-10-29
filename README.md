# Magic the Gathering Collection - Backend

## Description
This application works in parallel with [Magic the Gathering Collection - Frontend](https://github.com/slandath/mtgCollectionFE) to provide users a place to create, maintain, and otherwise view their magic card collections as well as the current market value for cards in their collection in USD.

We've leveraged technologies such as express, node, postgres, docker to accomplish our goal of creating an API and database combination to support the needs fo the Frontend application.

## How to run the project

1. Clone the repository
2. Use NPM to install dependancies
    -  `npm i`
3. Create `db.js` at the root level of the project with connection to your database
    - Example
        ```javascript
        const Pool = require("pg").Pool;

        const pool = new Pool({
            user: "{{dbuser}}",
            password: "{{dbpassword}}",
            database: "{{dbname}}",
            host: "{{dbhost}}",
            port: 5432,
            ssl:require
        });

        module.exports = pool;
        ```
4. Create `.env` file at the root level of the project
    - Example
        ```
        PORT = 3000
        JWT_SECRET_KEY = your_secret_key
        ```
5. Two options:
    - Use command `npm start` to run the application 
    - OR use Docker related files to create a container for the project to run in isolation 
        - requires Docker to be installed on the local machine
            1. `docker compose build`
            2. `docker compose up`

---
## Credits
Application code written by [Tom Slanda](https://github.com/slandath) and [Rob Kazirut](https://github.com/rakazirut) with help from the following:

- [Scryfall](https://scryfall.com/) - Providing up to date card prices

- [Geeks for Geeks](https://www.geeksforgeeks.org/jwt-authentication-with-node-js/) - JWT Authentication guide