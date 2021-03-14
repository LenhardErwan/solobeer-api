export default class BeerContainer {
	constructor(idBeer, idContainer) {
		this._idBeer = idBeer;
		this._idContainer = idContainer;
	}

	setBeer(idBeer) {
		this._idBeer = idBeer;
	}

	getBeer() {
		return this._idBeer;
	}

	setContainer(container) {
		this._idContainer = container;
	}

	getContainer() {
		return this._idContainer;
	}
}
