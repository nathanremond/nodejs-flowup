DROP TABLE IF EXISTS order_product;
DROP TABLE IF EXISTS performances;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS brand;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS request;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS role;

CREATE TABLE role(
    id_role SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL
);


CREATE TABLE users(
    id_user SERIAL PRIMARY KEY,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    id_role int,
    FOREIGN KEY (id_role) REFERENCES role(id_role)
);


CREATE TABLE request(
    id_request SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    phone text NOT NULL,
    email varchar(255) NOT NULL,
    street varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    zipcode varchar(255) NOT NULL,
    country varchar(255) NOT NULL,
    buy_date date NOT NULL,
    use varchar(255) NOT NULL,
    budget decimal(6, 2) NOT NULL,
    message varchar(255) NOT NULL,
    id_user int,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);


CREATE TABLE orders(
    id_order SERIAL PRIMARY KEY,
    order_date date NOT NULL
);


CREATE TABLE game(
    id_game SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    picture_url varchar(255) NOT NULL
);


CREATE TABLE brand(
    id_brand SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL
);


CREATE TABLE category(
    id_category SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL
);


CREATE TABLE product(
    id_product SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    picture_url varchar(255) NOT NULL,
    price decimal(6, 2) NOT NULL,
    description varchar(255) NOT NULL,
    graphic_card varchar(255) NOT NULL,
    processor varchar(255) NOT NULL,
    ram varchar(255) NOT NULL,
    storage int NOT NULL,
    guarantee varchar(255) NOT NULL,
    serial_number varchar(255) NOT NULL,
    model varchar(255) NOT NULL,
    game_types varchar(255) NOT NULL,
    release_date timestamp not null,
    id_brand int,
    FOREIGN KEY (id_brand) REFERENCES brand(id_brand),
    id_category int,
    FOREIGN KEY (id_category) REFERENCES category(id_category)
);


CREATE TABLE photos(
    id_photos SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    id_product int,
    FOREIGN KEY (id_product) REFERENCES product(id_product)
);


CREATE TABLE performances(
    id_performances SERIAL PRIMARY KEY,
    average_resolution_low varchar(255) NOT NULL,
    fps_low varchar(255) NOT NULL,
    average_resolution_high varchar(255) NOT NULL,
    fps_high varchar(255) NOT NULL,
    id_game int,
    FOREIGN KEY (id_game) REFERENCES game(id_game),
    id_product int,
    FOREIGN KEY (id_product) REFERENCES product(id_product)
);


CREATE TABLE order_product(
    id_order_product SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    id_product int,
    FOREIGN KEY (id_product) REFERENCES product(id_product), 
    id_order int,
    FOREIGN KEY (id_order) REFERENCES orders(id_order)
);



INSERT INTO role ( name ) VALUES ( 'Admin' );
INSERT INTO role ( name ) VALUES ( 'User' );


INSERT INTO users ( lastname, firstname, email, password, id_role ) VALUES ( 'REMOND','Nathan', 'nathan.remond@mail.com', '1234', 1 );
INSERT INTO users ( lastname, firstname, email, password, id_role ) VALUES ( 'TORKGHASHGHAIE','Kavé', 'kave.tk@mail.com', '442_offensif', 2 );


INSERT INTO request ( name, phone, email, street, city, zipcode, country, buy_date, use, budget, message, id_user ) VALUES ( 'Kavé TORKGHASHGHAIE','06 80 80 80 80', 'kave.tk@mail.com', 'Avenue de la Republique', 'Paris', '75777', 'France', '2025-01-20', 'Pour le gaming', 2500, 'Blabla', 2 );	

INSERT INTO orders ( order_date ) VALUES ( '2025-01-20' );

INSERT INTO game ( name, picture_url ) VALUES ( 'Valorant',  'https://www.flowup.shop/web/image/244127-488b70ae/AQUA.png?access_token=8c3ca904-153d-4105-83d7-d6692199e931');

INSERT INTO brand ( name, description ) VALUES ( 'ASUS', 'ASUS est une marque reconnue depuis une vingtaine d''années étant la marque la mieux implémenté dans le milieu du gaming' );

INSERT INTO category ( name ) VALUES ( 'PC sur mesure' );

INSERT INTO product ( name, picture_url, price, description, graphic_card, processor, ram, storage, guarantee, serial_number, model, game_types, release_date, id_brand, id_category )
	VALUES ( 'PC Inferno TUF Gaming GEFORCE RTX® 4070 SUPER Powered by ASUS', 'https://www.flowup.shop/web/image/product.product/4027/image_1024/PC%20Inferno%20TUF%20Gaming%20GEFORCE%20RTX%C2%AE%204070%20SUPER%20Powered%20by%20ASUS?unique=9595a39', '1763.58', 'Le PC Inferno TUF Gaming GEFORCE RTX® 4070 SUPER Powered by ASUS est une machine de jeu performante et fiable, conçue pour les gamers exigeants.', 'ASUS RTX 4070 Super', 'AMD Ryzen 7 8700F', 'Kingston 2x16Go DDR5 6000Mhz', 5, 'Garanti 2 ans et +', '1', 'PC gamer', 'Tout','2025-03-10 14:30:00', 1, 1 );

INSERT INTO photos ( name, id_product ) VALUES ( 'PC Inferno TUF Gaming GEFORCE RTX® 4070 SUPER Powered by ASUS', 1 );

INSERT INTO performances ( average_resolution_low, fps_low, average_resolution_high, fps_high, id_game, id_product ) VALUES ( '1440p', '398', '2160p', '443', 1, 1 );

INSERT INTO order_product ( quantity, id_product, id_order ) VALUES ( 1, 1, 1 );
