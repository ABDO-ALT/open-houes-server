CREATE TABLE rooms
(
    id SERIAL PRIMARY KEY, --PRIMARY KEY is a type of constraint, must be unique
    clients_id INT NOT NULL REFERENCES clients(id),  
    start_date DATE NOT NULL, -- NOT NULL is a constraint
    end_date DATE NOT NULL,
    city VARCHAR NOT NULL
);
INSERT INTO rooms
    (clients_id,start_date,end_date,city)
VALUES
    (1, '1990-09-01', '1990-09-30', 'Barcelona');