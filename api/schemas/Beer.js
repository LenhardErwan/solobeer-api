export default class Beer {
	constructor(id, name, abv, containers = new Array()) {
		this._id = id;
		this._name = name;
		this._abv = abv;
		this._containers = containers;
	}

	setId(id) {
		this._id = id;
	}

	getId() {
		return this._id;
	}

	setName(name) {
		this._name = name;
	}

	getName() {
		return this._name;
	}

	setAbv(abv) {
		this._abv = abv;
	}

	getAbv() {
		return this._abv;
	}

	setContainers(containers) {
		this._containers = containers;
	}

	getContainers() {
		return this._containers;
	}

	toObject() {
		return {
			id: this._id,
			name: this._name,
			abv: this._abv,
			container: this._containers.map((obj) => obj.toObject()),
		};
	}
}
