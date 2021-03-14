import Container from '../schemas/Container.js';
import Beer from '../schemas/Beer.js';
import BeerContainerDAO from '../models/BeerContainerDAO.js';
import DB from '../Database.js';

class ContainerDAO {
	constructor() {
		this.bcDAO = new BeerContainerDAO();
	}

	async get(id) {
		const db = await DB.open();
		const result = await db.query(
			"SELECT C.*, COALESCE(NULLIF(json_agg(B.*)::text, '[null]'), '[]')::json AS beers FROM Container C LEFT JOIN BeerContainer BC ON C.id=BC.id_container LEFT JOIN Beer B ON BC.id_beer=B.id WHERE C.id = $1 GROUP BY (C.id)",
			[id]
		);

		const beers = new Array();
		for (const beer of result.rows[0].beers) {
			beers.push(new Beer(beer.id, beer.name, beer.abv));
		}

		return result.rows[0]
			? new Container(
					result.rows[0].id,
					result.rows[0].name,
					result.rows[0].volume,
					beers
			  )
			: null;
	}

	async getAll() {
		const db = await DB.open();
		const result = await db.query(
			"SELECT C.*, COALESCE(NULLIF(json_agg(B.*)::text, '[null]'), '[]')::json AS beers FROM Container C LEFT JOIN BeerContainer BC ON C.id=BC.id_container LEFT JOIN Beer B ON BC.id_beer=B.id GROUP BY (C.id)"
		);

		return result.rows.map((row) => {
			const beers = new Array();
			for (const beer of row.beers) {
				beers.push(new Beer(beer.id, beer.name, beer.abv));
			}
			return new Container(row.id, row.name, row.volume, beers);
		});
	}

	async create(container) {
		try {
			const db = await DB.open();
			await db.query('BEGIN');
			const result = await db.query(
				'INSERT INTO Container (name, volume) VALUES ($1, $2) RETURNING *',
				[container.getName(), container.getVolume()]
			);
			const resContainer = new Container(
				result.rows[0].id,
				result.rows[0].name,
				result.rows[0].volume
			);
			for (const beer of container.getBeers()) {
				await this.bcDAO.create(beer, resContainer);
			}
			await db.query('COMMIT');
			return await this.get(result.rows[0].id);
		} catch (err) {
			await db.query('ROLLBACK');
			throw err;
		}
	}

	async update(container) {
		const oldContainer = await this.get(container.getId());
		if (!oldContainer) throw new Error('null');
		const oldBeers = oldContainer.getBeers();
		const newBeers = container.getBeers();

		const added = newBeers.filter(
			(x) => !oldBeers.some((y) => y.getId() === x.getId())
		);
		const removed = oldBeers.filter(
			(x) => !newBeers.some((y) => y.getId() === x.getId())
		);

		const db = await DB.open();
		try {
			const result = await db.query(
				'UPDATE Container SET name = $2, volume = $3 WHERE id = $1 RETURNING *',
				[container.getId(), container.getName(), container.getVolume()]
			);

			for (const beer of added) {
				await this.bcDAO.create(beer, container);
			}

			for (const beer of removed) {
				await this.bcDAO.delete(beer, container);
			}

			await db.query('COMMIT');

			return await this.get(container.getId());
		} catch (err) {
			await db.query('ROLLBACK');
			throw err;
		}
	}

	async delete(container) {
		const db = await DB.open();
		const result = await db.query(
			'DELETE FROM Container WHERE id = $1 RETURNING *',
			[container.getId()]
		);

		return result.rows[0]
			? new Container(
					result.rows[0].id,
					result.rows[0].name,
					result.rows[0].volume
			  )
			: null;
	}
}

export { ContainerDAO as default, Container };
