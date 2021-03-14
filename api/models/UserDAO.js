import crypto from 'crypto';

import User from '../schemas/User.js';
import DB from '../Database.js';

class UserDAO {
	constructor() {}

	async get(id) {
		const db = await DB.open();
		const result = await db.query('SELECT * FROM Client WHERE id = $1', [id]);

		return result.rows[0]
			? new User(
					result.rows[0].id,
					result.rows[0].pseudo,
					null,
					Buffer.from(result.rows[0].hash, 'hex'),
					Buffer.from(result.rows[0].salt, 'hex')
			  )
			: null;
	}

	async getByPseudo(pseudo) {
		const db = await DB.open();
		const result = await db.query('SELECT * FROM Client WHERE pseudo = $1', [
			pseudo,
		]);

		return result.rows[0]
			? new User(
					result.rows[0].id,
					result.rows[0].pseudo,
					null,
					Buffer.from(result.rows[0].hash, 'hex'),
					Buffer.from(result.rows[0].salt, 'hex')
			  )
			: null;
	}

	async getAll() {
		const db = await DB.open();
		const result = await db.query('SELECT * FROM Client');

		return result.rows.map((row) => {
			return new User(
				row.id,
				row.pseudo,
				null,
				Buffer.from(row.hash, 'hex'),
				Buffer.from(row.salt, 'hex')
			);
		});
	}

	async create(user) {
		const db = await DB.open();

		user.generate();

		const result = await db.query(
			'INSERT INTO Client (pseudo, hash, salt) VALUES ($1, $2, $3) RETURNING *',
			[
				user.getPseudo(),
				user.getHash().toString('hex'),
				user.getSalt().toString('hex'),
			]
		);

		return result.rows[0]
			? new User(
					result.rows[0].id,
					result.rows[0].pseudo,
					null,
					Buffer.from(result.rows[0].hash, 'hex'),
					Buffer.from(result.rows[0].salt, 'hex')
			  )
			: null;
	}

	async update(user) {
		const db = await DB.open();

		user.generate();

		const result = await db.query(
			'UPDATE Client SET pseudo = $2, hash = $3, salt = $4 WHERE id = $1 RETURNING *',
			[
				user.getId(),
				user.getPseudo(),
				user.getHash().toString('hex'),
				user.getSalt().toString('hex'),
			]
		);

		return result.rows[0]
			? new User(
					result.rows[0].id,
					result.rows[0].pseudo,
					null,
					Buffer.from(result.rows[0].hash, 'hex'),
					Buffer.from(result.rows[0].salt, 'hex')
			  )
			: null;
	}

	async delete(user) {
		const db = await DB.open();
		const result = await db.query(
			'DELETE FROM Client WHERE id = $1 RETURNING *',
			[user.getId()]
		);

		return result.rows[0]
			? new User(
					result.rows[0].id,
					result.rows[0].pseudo,
					null,
					Buffer.from(result.rows[0].hash, 'hex'),
					Buffer.from(result.rows[0].salt, 'hex')
			  )
			: null;
	}
}

export { UserDAO as default, User };
