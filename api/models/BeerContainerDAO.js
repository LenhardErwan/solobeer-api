import BeerContainer from '../schemas/BeerContainer.js';
import DB from '../Database.js';

class BeerContainerDAO {
	constructor() {}

	async get(idBeer, idContainer) {
		const db = await DB.open();
		const result = await db.query(
			'SELECT * FROM BeerContainer WHERE id_beer = $1 AND id_container = $2',
			[idBeer, idContainer]
		);

		return result.rows[0]
			? new BeerContainer(result.rows[0].id_beer, result.rows[0].id_container)
			: null;
	}

	async getAll() {
		const db = await DB.open();
		const result = await db.query('SELECT * FROM BeerContainer');

		return result.rows.map((row) => {
			return new BeerContainer(row.id_beer, row.id_container);
		});
	}

	async create(beer, container) {
		const db = await DB.open();
		const result = await db.query(
			'INSERT INTO BeerContainer (id_beer, id_container) VALUES ($1, $2) RETURNING *',
			[beer.getId(), container.getId()]
		);

		return result.rows[0]
			? new BeerContainer(result.rows[0].id_beer, result.rows[0].id_container)
			: null;
	}

	async update() {
		throw new Error('This method makes no sense');
	}

	async delete(beer, container) {
		const db = await DB.open();
		const result = await db.query(
			'DELETE FROM BeerContainer WHERE id_beer = $1 AND id_container = $2 RETURNING *',
			[beer.getId(), container.getId()]
		);

		return result.rows[0]
			? new BeerContainer(result.rows[0].id_beer, result.rows[0].id_container)
			: null;
	}
}

export { BeerContainerDAO as default, BeerContainer };
