export default class Container {
	constructor(id, name, volume, beers = new Array()) {
		this._id = id;
		this._name = name;
		this._volume = volume;
		this._beers = beers;
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

	setVolume(volume) {
		this._volume = volume;
	}

	getVolume() {
		return this._volume;
	}

	setBeers(beers) {
		this._beers = beers;
	}

	getBeers() {
		return this._beers;
	}

	toObject() {
		return {
			id: this._id,
			name: this._name,
			volume: this._volume,
			beers: this._beers.map((obj) => obj.toObject()),
		};
	}
}
