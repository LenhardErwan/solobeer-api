CREATE TABLE Beer (
	id SERIAL NOT NULL,
	name VARCHAR(32) NOT NULL,
	abv NUMERIC(4,2) NOT NULL,

	CONSTRAINT pk_beer PRIMARY KEY (id)
);

CREATE TABLE Container (
	id SERIAL NOT NULL,
	name VARCHAR(16) NOT NULL,
	volume REAL NOT NULL,

	CONSTRAINT pk_container PRIMARY KEY (id)
);

CREATE TABLE BeerContainer (
	id_beer INTEGER NOT NULL,
	id_container INTEGER NOT NULL,

	CONSTRAINT pk_beer_container PRIMARY KEY (id_beer,id_container),
	CONSTRAINT fk_beer FOREIGN KEY (id_beer) REFERENCES Beer(id) ON DELETE CASCADE,
	CONSTRAINT fk_container FOREIGN KEY (id_container) REFERENCES Container(id) ON DELETE CASCADE
);

CREATE TABLE Client (
	id SERIAL NOT NULL,
	pseudo VARCHAR(32) NOT NULL UNIQUE,
	hash VARCHAR NOT NULL,
	salt VARCHAR NOT NULL,

	CONSTRAINT pk_client PRIMARY KEY (id)
);

INSERT INTO Beer (name,abv) VALUES ('Buzz', 4.5);
INSERT INTO Beer (name,abv) VALUES ('Trashy Blonde', 4.1);
INSERT INTO Beer (name,abv) VALUES ('Berliner Weisse With Yuzu', 4.2);
INSERT INTO Beer (name,abv) VALUES ('Pilsen Lager', 6.3);
INSERT INTO Beer (name,abv) VALUES ('Avery Brown Dredge', 7.2);
INSERT INTO Beer (name,abv) VALUES ('Electric India', 5.2);
INSERT INTO Beer (name,abv) VALUES ('AB:12', 11.2);
INSERT INTO Beer (name,abv) VALUES ('Fake Lager', 4.7);
INSERT INTO Beer (name,abv) VALUES ('AB:07', 12.5);
INSERT INTO Beer (name,abv) VALUES ('Bramling X', 7.5);

INSERT INTO Container (name,volume) VALUES ('Bottle', 0.25);
INSERT INTO Container (name,volume) VALUES ('Bottle', 0.33);
INSERT INTO Container (name,volume) VALUES ('Bottle', 1);
INSERT INTO Container (name,volume) VALUES ('Can', 0.25);
INSERT INTO Container (name,volume) VALUES ('Can', 0.33);
INSERT INTO Container (name,volume) VALUES ('Barrel', 10);
INSERT INTO Container (name,volume) VALUES ('Barrel', 15);
INSERT INTO Container (name,volume) VALUES ('Barrel', 25);
INSERT INTO Container (name,volume) VALUES ('Barrel', 50);
INSERT INTO Container (name,volume) VALUES ('Barrel', 75);

INSERT INTO Beercontainer VALUES (1, 1);
INSERT INTO Beercontainer VALUES (2, 2);
INSERT INTO Beercontainer VALUES (3, 3);
INSERT INTO Beercontainer VALUES (4, 4);
INSERT INTO Beercontainer VALUES (5, 5);
INSERT INTO Beercontainer VALUES (6, 6);
INSERT INTO Beercontainer VALUES (7, 7);
INSERT INTO Beercontainer VALUES (8, 8);
INSERT INTO Beercontainer VALUES (9, 9);
INSERT INTO Beercontainer VALUES (1, 2);
INSERT INTO Beercontainer VALUES (1, 3);
INSERT INTO Beercontainer VALUES (1, 4);
INSERT INTO Beercontainer VALUES (2, 1);
INSERT INTO Beercontainer VALUES (2, 3);