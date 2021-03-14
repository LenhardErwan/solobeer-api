import express from 'express';
import jwt from 'jsonwebtoken';

import UserDAO, { User } from '../models/UserDAO.js';
import tokenHandler from '../TokenHandler.js';

export default class Beers {
	constructor() {
		this.router = express.Router();
		this.DAO = new UserDAO();

		this.router.post('/login', async (req, res) => {
			try {
				const pseudo = req.body.pseudo;
				const password = req.body.password;

				const user = await this.DAO.getByPseudo(pseudo);
				user.setPassword(password);

				if (user && user.checkPassword()) {
					const token = jwt.sign({}, 'appsecret', {
						expiresIn: '1h',
					});

					res.json({ token: token });
				} else {
					throw new Error('wrong');
				}
			} catch (err) {
				if (err.message === 'wrong')
					res.status(401).json({ error: 'Wrong parameters' });
				else res.status(400).json({ error: 'Missing parameters' });
			}
		});

		this.router.post('/', [
			tokenHandler,
			async (req, res, next) => {
				try {
					const user = new User(
						null,
						req.body.pseudo,
						req.body.password,
						null,
						null
					);

					const result = await this.DAO.create(user);

					if (result) {
						res.status(200).json({ success: true });
					}
				} catch (err) {
					if (err.code && err.code == '23505') {
						res
							.status(409)
							.json({
								error: 'User with this pseudo already exist',
								pseudo: req.body.pseudo,
							});
					} else {
						console.error(err);
						res
							.status(500)
							.json({
								error:
									'Something bad has happened! Please contact the administrator',
							});
					}
				}
			},
		]);
	}
}
