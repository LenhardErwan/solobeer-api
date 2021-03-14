# Application

## Structure

```bash
SoloBeer
│   .env
│   app.js                        # Main
│   connection.js                 # Database connection configuration
│   mkdocs.yml                    # Mkdocs config file
│   package-lock.json
│   package.json
│
├───api                           # All files for API
│   │   API.js                    # Default route for API
│   │   Database.js               # Database Singleton connection 
│   │   TokenHandler.js           # jsonwebtoken handler
│   │
│   ├───models                    # All Data Access Object files
│   │       BeerContainerDAO.js   
│   │       BeerDAO.js
│   │       ContainerDAO.js
│   │       UserDAO.js
│   │
│   ├───routes                    # All routes
│   │       auth.js
│   │       beers.js
│   │       containers.js
│   │
│   └───schemas                   # Activity object
│           Beer.js
│           BeerContainer.js
│           Container.js
│           User.js
│
├───docs                          # Documentation files
│       app.md
│       auth.md
│       index.md
│       routes.md
│
└───node_modules                  # Modules files
    └─...
```

## Modules

Only 5 direct dependencies for this project:

- dotenv: Configuration file ([link](https://github.com/motdotla/dotenv))
- express: Creation of a web server ([link](http://expressjs.com/))
- jsonwebtoken: Decode, verify and generate JWT ([link](https://jwt.io/))
- pg: Interfacing with PostgreSQL database ([link](https://node-postgres.com/))

## Express configuration

```js
// Parses urlencoded bodies
server.use(express.urlencoded({ extended: true }));
// Parses json
server.use(express.json());

// Enable CORS 
server.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// API route
server.use('/api', api.router);
// Default route
server.use('/', router);

// Create HTTP server
server.listen(PORT, () => {
  console.log(`Listening HTTP on port ${PORT}!`);
});

// Default route for GET action
router.get('/', function (req, res) {
  res.send('This page is under construction');
});
```
