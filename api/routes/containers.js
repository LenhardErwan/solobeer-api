import express from 'express';
import { URL } from 'url';

import ContainerDAO, { Container } from '../models/ContainerDAO.js';
import Beer from '../schemas/Beer.js';

export default class Containers {
	constructor() {
		this.router = express.Router();
		this.DAO = new ContainerDAO();

		this.router.get('/', async (req, res) => {
			try {
				const result = await this.DAO.getAll();
				if (result) {
					res.json(result.map((obj) => obj.toObject()));
				} else {
					throw new Error('null');
				}
			} catch (err) {
				if (err.message === 'null')
					res.status(404).json({ error: 'No container found' });
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
					res
						.status(404)
						.json({ error: 'No container found with this id', id: id });
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
				const beers = new Array();
				for (const beer of req.body.beers) {
					beers.push(new Beer(beer.id, null, null));
				}

				const container = new Container(
					null,
					req.body.name,
					req.body.volume,
					beers
				);

				const result = await this.DAO.create(container);

				let url = new URL('http://temp');
				url.protocol = req.protocol;
				url.hostname = req.hostname;
				url.port = req.socket.localPort;
				url.pathname = `${req.baseUrl}/${result.getId()}`;

				res.setHeader('Location', url.toString());

				if (result) {
					res.status(201).json({ ...result.toObject() });
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
				const beers = new Array();
				for (const beer of req.body.beers) {
					beers.push(new Beer(beer.id, null, null));
				}

				const container = new Container(
					req.params.id,
					req.body.name,
					req.body.volume,
					beers
				);

				const result = await this.DAO.update(container);
				if (result) {
					res.json(result.toObject());
				} else {
					throw new Error('null');
				}
			} catch (err) {
				if (err.message === 'null')
					res
						.status(404)
						.json({
							error: 'No container found with this id',
							id: req.params.id,
						});
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
			const container = new Container(req.params.id, null, null);
			try {
				const result = await this.DAO.delete(container);
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
