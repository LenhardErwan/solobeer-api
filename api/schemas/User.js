import crypto from 'crypto';

export default class User {
	constructor(id, pseudo, password, hash, salt) {
		this._id = id;
		this._pseudo = pseudo;
		this._password = password;
		this._hash = hash;
		this._salt = salt;
	}

	generate() {
		this._salt = crypto.randomBytes(32);
		this._hash = crypto.pbkdf2Sync(
			this._password,
			this._salt,
			100000,
			128,
			'sha512'
		);
	}

	checkPassword() {
		const test = crypto.pbkdf2Sync(
			this._password,
			this._salt,
			100000,
			128,
			'sha512'
		);
		return Buffer.compare(this._hash, test) === 0;
	}

	setId(id) {
		this._id = id;
	}

	getPseudo() {
		return this._pseudo;
	}

	setPseudo(pseudo) {
		this._pseudo = pseudo;
	}

	getPassword() {
		return this._password;
	}

	setPassword(password) {
		this._password = password;
	}

	getHash() {
		return this._hash;
	}

	setHash(hash) {
		this._hash = hash;
	}

	setSalt(salt) {
		this._salt = salt;
	}

	getSalt() {
		return this._salt;
	}
}
