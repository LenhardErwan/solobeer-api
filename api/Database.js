import pg from 'pg';

import params from '../connection.js';

export default class DB {
	static client = null;

	constructor() {}

	static async checkTables() {
		const db = await DB.open();

		let res = await db.query(
			`SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'beer');`
		);
		if (!res.rows[0].exists) {
			console.log('The beer table does not exist. Creation in progress...');
			await db.query(`
			CREATE TABLE Beer (
				id SERIAL NOT NULL, 
				name VARCHAR(32) NOT NULL, 
				abv NUMERIC(4,2) NOT NULL, 
				CONSTRAINT pk_beer PRIMARY KEY (id));
			`);
		}

		res = await db.query(
			`SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'container');`
		);
		if (!res.rows[0].exists) {
			console.log(
				'The container table does not exist. Creation in progress...'
			);
			await db.query(`
				CREATE TABLE Container (
					id SERIAL NOT NULL,
					name VARCHAR(16) NOT NULL,
					volume REAL NOT NULL,
					CONSTRAINT pk_container PRIMARY KEY (id)
				);
			`);
		}

		res = await db.query(
			`SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'beercontainer');`
		);
		if (!res.rows[0].exists) {
			console.log(
				'The beercontainer table does not exist. Creation in progress...'
			);
			await db.query(`
				CREATE TABLE BeerContainer (
					id_beer INTEGER NOT NULL,
					id_container INTEGER NOT NULL,
					CONSTRAINT pk_beer_container PRIMARY KEY (id_beer,id_container),
					CONSTRAINT fk_beer FOREIGN KEY (id_beer) REFERENCES Beer(id) ON DELETE CASCADE,
					CONSTRAINT fk_container FOREIGN KEY (id_container) REFERENCES Container(id) ON DELETE CASCADE
				);
			`);
		}

		res = await db.query(
			`SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'client');`
		);
		if (!res.rows[0].exists) {
			console.log('The client table does not exist. Creation in progress...');
			await db.query(`
				CREATE TABLE Client (
					id SERIAL NOT NULL,
					pseudo VARCHAR(32) NOT NULL UNIQUE,
					hash VARCHAR NOT NULL,
					salt VARCHAR NOT NULL,
				
					CONSTRAINT pk_client PRIMARY KEY (id)
				);
			`);
			await db.query(`
				INSERT INTO Client (pseudo,hash,salt) VALUES('admin', '9cc8f7528f277650591054829a53cf653d12b924d9eaf80e8c3ebbcf23c84eb3eff16b4f115947e8ff3b42b640234f3915667df1f1c44e89ffff22812995c53642b8bc12bf075eed176e21582b34818e1d9de8e997e04957f9d93e599d9ed9055f1d3574884fa511fdb579a2ce95995c3477552e37e28c1f98c0544499a96c3e', '83d05d5f26444db8169cb58d88c14e7be07a0e71253eed063a93096728cb5922')
			`)
		}
	}

	static async open() {
		if (DB.client == null) {
			try {
				const pool = new pg.Pool(params);
				DB.client = await pool.connect();
			} catch (err) {
				console.error(err);
				console.error('Exit application...');
				process.exit(-1);
			}
		}

		return DB.client;
	}

	static async close() {
		if (DB.client != null) {
			DB.client.end();

			DB.client = null;
		}
	}
}
