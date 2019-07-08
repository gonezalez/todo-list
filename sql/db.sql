CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name text NOT NULL CHECK (name <> ''),
    email varchar(100) UNIQUE CHECK (name <> ''),
    password text NOT NULL,
    register_date date NOT NULL
);

CREATE TABLE IF NOT EXISTS todos(
    id SERIAL PRIMARY KEY,
    name text NOT NULL CHECK (name <> ''),
    date date NOT NULL
);

INSERT INTO users(name, email, password, register_date)
    VALUES('Felix Gonzalez', 'felixmigue52@gmail.com', '123', '1996-09-13');


INSERT INTO users(name, email, password, register_date)
    VALUES('Diego Gonzalez', 'diego52@gmail.com', '123', '1996-09-13');


INSERT INTO todos(name, date, userId)
    VALUES('Hacer la tarea', '1996-09-13', 1);

INSERT INTO todos(name, date, userId)
    VALUES('Hacer la tarea 2', '1996-09-13', 1);