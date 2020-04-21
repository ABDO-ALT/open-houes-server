-- To create now database  opject
createdb open_house  - -u postgres
--To enter your database opject 
pspl open_house - -u postgres
--Whatch out delete space between tow dash at the letter (u) 

-- For create a table  
CREATE TABLE clients
(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    city VARCHAR,
    phone_number VARCHAR UNIQUE,
    age   DATE,
    user_type VARCHAR NOT NULL,
    gender VARCHAR,
    password VARCHAR NOT NULL
);
-- To create informations use (INSERT) Whatch out use big letter
INSERT INTO clients
    (first_name,last_name, email, city,age,phone_number,user_type,gender,password)
VALUES
    ('said', 'belal', 'j.smith@johnsmith.org','barcelona', '1990-09-01', '+34 671295766', 'guest', 'male','200020020');