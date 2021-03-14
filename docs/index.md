# SoloBeer API

SoloBeer API is a Rest API built with [NodeJS](https://nodejs.org), [Express.js](http://expressjs.com), [node-postgres](https://node-postgres.com/) and [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken). It allows you to manage a set of beers and containers through a set of routes secured with a Bearer token to execute CRUD methods.

## Requirements

Before installing the API make sure

- A Postgresql database is setup.
- NodeJS configuration supports ECMAScript 6 features (version > 14).

## Installation

**Run npm install**  
`npm install`

## Configuration

the `.env` file allows you to configure the application, in particular to set up the connection to the database.
For the `APP_PORT` variable the default value is 3080 so you can omit this parameter.

```conf
DB_NAME = db_beer
DB_USER = user
DB_PASS = azertyuiop
DB_HOST = example.net OR 0.0.0.0
DB_PORT = 5432
APP_PORT = 3080
```

## Running

Run the following command:

```shell
npm run start
```

## Documentation

A documentation made with [MkDocs](https://www.mkdocs.org/) is available in this repository.

- `mkdocs build`  
Build the documentation and output the result in **/project_directory/site/**.

- `mkdocs serve`  
Serve the documentation on [http://localhost:8000](http://localhost:8000)

## Author

[LENHARD Erwan](https://github.com/LenhardErwan)
