const { DB_USER, DB_PASS, DB_PORT, DB_HOST, DB_NAME } = process.env;

if (!DB_HOST || !DB_NAME || !DB_USER || !DB_PASS || !DB_PORT) {
	throw new Error('Missing ENV variables: check your .env file');
}

export default {
	database: DB_NAME,
	user: DB_USER,
	password: DB_PASS,
	host: DB_HOST,
	port: DB_PORT,
};
