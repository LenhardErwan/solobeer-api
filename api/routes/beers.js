import express from 'express';

import BeerDAO, { Beer } from '../models/BeerDAO.js';
import Container from '../schemas/Container.js';

export default class Beers {
	constructor() {
		this.router = express.Router();
		this.DAO = new BeerDAO();

		this.router.get('/', async (req, res) => {
			try {
				const result = await this.DAO.getAll();
				if (result) {
					res.json(result.map((obj) => obj.toObject()));
				} else {
					throw new Error('null');
				}
			} catch (err) {
				if (err === 'null') res.status(404).json({ error: 'No beer found' });
				else {
					console.error(err);
					res
						.status(500)
						.json({
							error:
								'Something bad has happened! Please contact the administrator',
						});
				}
			}
		});

		this.router.get('/:id', async (req, res) => {
			const id = req.params.id;
			try {
				const result = await this.DAO.get(id);
				if (result) {
					res.json(result.toObject());
				} else {
					throw new Error('null');
				}
			} catch (err) {
				if (err.message === 'null')
					res.status(404).json({ error: 'No beer found with this id', id: id });
				else {
					console.error(err);
					res
						.status(500)
						.json({
							error:
								'Something bad has happened! Please contact the administrator',
						});
				}
			}
		});

		this.router.post('/', async (req, res) => {
			try {
				const containers = new Array();
				for (const container of req.body.containers) {
					containers.push(new Container(container.id, null, null));
				}

				const beer = new Beer(null, req.body.name, req.body.abv, containers);

				const result = await this.DAO.create(beer);

				let url = new URL('http://temp');
				url.protocol = req.protocol;
				url.hostname = req.hostname;
				url.port = req.socket.localPort;
				url.pathname = `${req.baseUrl}/${result.getId()}`;

				res.setHeader('Location', url.toString());

				if (result) {
					res.status(201).json(result.toObject());
				}
			} catch (err) {
				console.error(err);
				res
					.status(500)
					.json({
						error:
							'Something bad has happened! Please contact the administrator',
					});
			}
		});

		this.router.put('/:id', async (req, res) => {
			try {
				const containers = new Array();
				for (const container of req.body.containers) {
					containers.push(new Container(container.id, null, null));
				}

				const beer = new Beer(
					req.params.id,
					req.body.name,
					req.body.abv,
					containers
				);

				const result = await this.DAO.update(beer);
				if (result) {
					res.json(result.toObject());
				} else {
					throw new Error('null');
				}
			} catch (err) {
				if (err.message === 'null')
					res
						.status(404)
						.json({ error: 'No beer found with this id', id: req.params.id });
				else {
					console.error(err);
					res
						.status(500)
						.json({
							error:
								'Something bad has happened! Please contact the administrator',
						});
				}
			}
		});

		this.router.delete('/:id', async (req, res) => {
			const beer = new Beer(req.params.id, null, null);
			try {
				const result = await this.DAO.delete(beer);
				if (result) {
					res.json(result.toObject());
				} else {
					throw new Error('null');
				}
			} catch (err) {
				if (err.message === 'null')
					res
						.status(404)
						.json({ error: 'No beer found with this id', id: req.params.id });
				else {
					console.error(err);
					res
						.status(500)
						.json({
							error:
								'Something bad has happened! Please contact the administrator',
						});
				}
			}
		});
	}
}
