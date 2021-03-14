import express from 'express';

import API from './api/API.js';
import DB from './api/Database.js';

const server = express();
const router = express.Router();
const api = new API();
DB.checkTables();

const PORT = process.env.APP_PORT ? process.env.APP_PORT : 3080;

// Parses urlencoded bodies
server.use(express.urlencoded({ extended: true }));
// Parses json
server.use(express.json());

// CORS
server.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type, Authorization'
	);
	next();
});

// API route
server.use('/api', api.router);
// Default route
server.use('/', router);

// Create HTTP server
server.listen(PORT, () => {
	console.log(`SoloBeer API - v${process.env.npm_package_version}`);
	console.log(`Listening HTTP on port ${PORT}!`);
});

// Default route for GET action
router.get('/', function (req, res) {
	res.send('This page is under construction');
});
