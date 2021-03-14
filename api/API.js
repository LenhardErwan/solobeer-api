import express from 'express';

import BeersMW from './routes/beers.js';
import ContainersMW from './routes/containers.js';
import AuthMW from './routes/auth.js';
import TokenHandler from './TokenHandler.js';

export default class API {
	constructor() {
		this.router = express.Router();

		this.router.use('/beers', [TokenHandler, new BeersMW().router]);
		this.router.use('/containers', [TokenHandler, new ContainersMW().router]);
		this.router.use('/auth', new AuthMW('auth').router);
	}
}
