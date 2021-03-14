import Beer from '../schemas/Beer.js';
import Container from '../schemas/Container.js';
import BeerContainerDAO from '../models/BeerContainerDAO.js';
import DB from '../Database.js';

class BeerDAO {
	constructor() {
		this.bcDAO = new BeerContainerDAO();
	}

	async get(id) {
		const db = await DB.open();
		const result = await db.query(
			"SELECT B.*, COALESCE(NULLIF(json_agg(C.*)::text, '[null]'), '[]')::json AS containers FROM Beer B LEFT JOIN BeerContainer BC ON B.id=BC.id_beer LEFT JOIN Container C ON BC.id_container=C.id WHERE B.id = $1 GROUP BY (B.id)",
			[id]
		);

		const containers = new Array();
		for (const container of result.rows[0].containers) {
			containers.push(
				new Container(container.id, container.name, container.volume)
			);
		}

		return result.rows[0]
			? new Beer(
					result.rows[0].id,
					result.rows[0].name,
					result.rows[0].abv,
					containers
			  )
			: null;
	}

	async getAll() {
		const db = await DB.open();
		const result = await db.query(
			"SELECT B.*, COALESCE(NULLIF(json_agg(C.*)::text, '[null]'), '[]')::json AS containers FROM Beer B LEFT JOIN BeerContainer BC ON B.id=BC.id_beer LEFT JOIN Container C ON BC.id_container=C.id GROUP BY (B.id)"
		);

		return result.rows.map((row) => {
			const containers = new Array();
			for (const container of result.rows[0].containers) {
				containers.push(
					new Container(container.id, container.name, container.volume)
				);
			}
			return new Beer(row.id, row.name, row.abv, containers);
		});
	}

	async create(beer) {
		const db = await DB.open();
		try {
			await db.query('BEGIN');
			const result = await db.query(
				'INSERT INTO Beer (name, abv) VALUES ($1, $2) RETURNING *',
				[beer.getName(), beer.getAbv()]
			);
			const resBeer = new Beer(
				result.rows[0].id,
				result.rows[0].name,
				result.rows[0].abv
			);
			for (const container of beer.getContainers()) {
				await this.bcDAO.create(resBeer, container);
			}
			await db.query('COMMIT');
			return await this.get(resBeer.getId());
		} catch (err) {
			await db.query('ROLLBACK');
			throw err;
		}
	}

	async update(beer) {
		const oldBeer = await this.get(beer.getId());
		if (!oldBeer) throw new Error('null');
		const oldContainers = oldBeer.getContainers();
		const newContainers = beer.getContainers();

		const added = newContainers.filter(
			(x) => !oldContainers.some((y) => y.getId() === x.getId())
		);
		const removed = oldContainers.filter(
			(x) => !newContainers.some((y) => y.getId() === x.getId())
		);

		const db = await DB.open();
		try {
			await db.query('BEGIN');
			const result = await db.query(
				'UPDATE Beer SET name = $2, abv = $3 WHERE id = $1 RETURNING *',
				[beer.getId(), beer.getName(), beer.getAbv()]
			);

			for (const container of added) {
				await this.bcDAO.create(beer, container);
			}

			for (const container of removed) {
				await this.bcDAO.delete(beer, container);
			}

			await db.query('COMMIT');

			return await this.get(beer.getId());
		} catch (err) {
			await db.query('ROLLBACK');
			throw err;
		}
	}

	async delete(beer) {
		const db = await DB.open();
		const result = await db.query(
			'DELETE FROM Beer WHERE id = $1 RETURNING *',
			[beer.getId()]
		);

		return result.rows[0]
			? new Beer(result.rows[0].id, result.rows[0].name, result.rows[0].abv)
			: null;
	}
}

export { BeerDAO as default, Beer };
