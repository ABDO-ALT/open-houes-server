-- To create now database  opject
createdb open-house  - -u postgres
--To entey your database opject 
qspl open-house - -u postgres
--Whatch out delete space between tow dash at the letter (u) 

-- For create a table  
CREATE TABLE clients (
    id        SERIAL PRIMARY KEY,
    first_name      VARCHAR NOT NULL,
    last_name      VARCHAR NOT NULL,
    email     VARCHAR UNIQUE,
    city      VARCHAR,
    phone_number   VARCHAR UNIQUE,
    user_type      VARCHAR NOT NULL,
    gender    VARCHAR
);
-- To create informations use (INSERT) Whatch out use big letter
INSERT INTO clients (first_name,last_name, email, city,phone_number,user_type,gender) VALUES ('said','belal','j.smith@johnsmith.org','barcelona','+34 671295766','guest','male')