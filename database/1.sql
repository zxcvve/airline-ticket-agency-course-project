CREATE TABLE "user" (
  "id" serial PRIMARY KEY,
  "last_name" text,
  "password" text,
  "first_name" text,
  "middle_name" text,
  "birthdate" date,
  "ismale": BOOLEAN,
  "phone_number" text,
  "email" text unique,
  "role" text DEFAULT 'User'
);

CREATE TABLE "airplane" (
  "id" serial PRIMARY KEY,
  "model" text,
  "reg_number" text,
  "seats" int
);

CREATE TABLE "flight" (
  "id" serial PRIMARY KEY,
  "flight_number" int,
  "departure_time" timestamptz,
  "arrival_time" timestamptz,
  "airplane" int,
  "route" int
);

CREATE TABLE "route" (
  "id" serial PRIMARY KEY,
  "departure_airport" int,
  "arrival_airport" int,
  "flight_duration" interval
);

-- CREATE TABLE "ticket_price" (
--   "id" serial PRIMARY KEY,
--   "flight" int,
--   "price_starts" timestamptz,
--   "price_ends" timestamptz,
--   "price" money
-- );

CREATE TABLE "ticket" (
  "id" serial PRIMARY KEY,
  "passenger" int,
  "flight" int,
  "price" bigint,
  "seat" int,
  "purchase_date" TIMESTAMPTZ DEFAULT NOW();
);

CREATE TABLE "airport" (
  "id" serial PRIMARY KEY,
  "title" text,
  "city" text,
  "country" text,
  "address" text,
  "coordinates" point
);

CREATE TABLE "price" (
    "id" serial PRIMARY KEY,
    "flight_id" INT,
    "time_left_threshold" interval,
    base_price bigint,
    FOREIGN KEY (flight_id) REFERENCES flight(id)
);

CREATE TABLE seats (
    seat_id serial PRIMARY KEY,
    flight_id INT,
    seat_number INT NOT NULL,
    is_occupied BOOLEAN NOT NULL,
    passenger_id INT,
);

ALTER TABLE "seats" ADD FOREIGN KEY ("flight_id") REFERENCES "flight" ("id");

ALTER TABLE "seats" ADD FOREIGN KEY ("passenger_id") REFERENCES "user" ("id");


ALTER TABLE "ticket" ADD FOREIGN KEY ("passenger") REFERENCES "user" ("id");

ALTER TABLE "ticket" ADD FOREIGN KEY ("flight") REFERENCES "flight" ("id");

ALTER TABLE "flight" ADD FOREIGN KEY ("route") REFERENCES "route" ("id");

ALTER TABLE "flight" ADD FOREIGN KEY ("airplane") REFERENCES "airplane" ("id");

ALTER TABLE "ticket_price" ADD FOREIGN KEY ("flight") REFERENCES "flight" ("id");

ALTER TABLE "route" ADD FOREIGN KEY ("departure_airport") REFERENCES "airport" ("id");

ALTER TABLE "route" ADD FOREIGN KEY ("arrival_airport") REFERENCES "airport" ("id");

ALTER TABLE "ticket" ADD CONSTRAINT "unique_seat_per_flight" UNIQUE ("flight", "seat");

CREATE VIEW "route_with_airport_names" AS
SELECT 
  r.id AS route_id, 
  origin.title AS origin_airport_name, 
  destination.title AS destination_airport_name, 
  r.flight_duration
FROM 
  "route" r
JOIN 
  "airport" origin ON r.departure_airport = origin.id
JOIN 
  "airport" destination ON r.arrival_airport = destination.id;


CREATE PROCEDURE GenerateSeats(flight_id INT)
LANGUAGE plpgsql AS $$
DECLARE
    airplane_id INT;
    seats_count INT;
BEGIN
    SELECT airplane INTO airplane_id FROM flight WHERE id = flight_id;

    SELECT seats INTO seats_count FROM airplane WHERE id = airplane_id;

    FOR i IN 1..seats_count LOOP
        INSERT INTO seats (flight_id, seat_number, is_occupied) VALUES (flight_id, i, FALSE);
    END LOOP;
END; $$

CREATE OR REPLACE FUNCTION call_generate_seats() RETURNS TRIGGER AS $$
BEGIN
  CALL GenerateSeats(NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_seats_after_insert
AFTER INSERT ON flight
FOR EACH ROW
EXECUTE FUNCTION call_generate_seats();

CREATE VIEW "flight_info" AS
SELECT 
  f.id AS flight_id, 
  f.flight_number,
  f.departure_time,
  f.arrival_time,
  a.model AS airplane_model, 
  a.reg_number AS airplane_reg_number, 
  dep.title AS departure_airport, 
  arr.title AS arrival_airport,
  r.flight_duration,
  (
    SELECT p.base_price 
    FROM price p 
    WHERE p.flight_id = f.id AND p.time_left_threshold > f.departure_time - NOW() 
    ORDER BY p.time_left_threshold ASC 
    LIMIT 1
  ) AS current_price
FROM 
  "flight" f
JOIN 
  "airplane" a ON f.airplane = a.id
JOIN 
  "route" r ON f.route = r.id
JOIN
  "airport" dep ON r.departure_airport = dep.id
JOIN
  "airport" arr ON r.arrival_airport = arr.id;

CREATE OR REPLACE FUNCTION mark_seat_as_taken() RETURNS TRIGGER AS $$
BEGIN
  UPDATE seats SET is_occupied = TRUE, passenger_id = NEW.passenger WHERE seat_id = NEW.seat;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER mark_seat_as_taken_after_insert
AFTER INSERT ON ticket
FOR EACH ROW
EXECUTE FUNCTION mark_seat_as_taken();

CREATE VIEW "user_tickets" AS
SELECT 
  u.id AS user_id, 
  u.first_name, 
  u.last_name, 
  t.id AS ticket_id, 
  t.price AS ticket_price, 
  t.seat AS seat_number, 
  f.flight_number, 
  a.model AS airplane_model, 
  dep.title AS departure_airport, 
  arr.title AS arrival_airport, 
  f.departure_time, 
  f.arrival_time
FROM 
  "user" u
JOIN 
  "ticket" t ON u.id = t.passenger
JOIN 
  "flight" f ON t.flight = f.id
JOIN 
  "airplane" a ON f.airplane = a.id
JOIN 
  "route" r ON f.route = r.id
JOIN
  "airport" dep ON r.departure_airport = dep.id
JOIN
  "airport" arr ON r.arrival_airport = arr.id;


CREATE TYPE user_info AS (
    id int,
    role text
);

CREATE OR REPLACE FUNCTION insert_user(email text, password text)
RETURNS user_info AS $$
DECLARE
    user_record user_info;
BEGIN
    INSERT INTO "user" (email, password) VALUES (email, password)
    RETURNING id, role INTO user_record;
    
    RETURN user_record;
END;
$$ LANGUAGE plpgsql;

CREATE VIEW "user_info_without_password" AS
SELECT 
  "id",
  "last_name",
  "first_name",
  "middle_name",
  "birthdate",
  "ismale",
  "phone_number",
  "email",
  "role"
FROM 
  "user";

CREATE VIEW "route_info" AS
SELECT 
  r."id",
  dep."title" AS "departure_airport_name",
  arr."title" AS "arrival_airport_name",
  r."flight_duration"
FROM 
  "route" r
JOIN 
  "airport" dep ON r."departure_airport" = dep."id"
JOIN 
  "airport" arr ON r."arrival_airport" = arr."id";

CREATE PROCEDURE insert_flight(
  p_flight_number INT, 
  p_departure_time TIMESTAMPTZ, 
  p_airplane INT, 
  p_route INT
) LANGUAGE plpgsql AS $$
DECLARE
  v_flight_duration INTERVAL;
  v_arrival_time TIMESTAMPTZ;
BEGIN
  SELECT flight_duration INTO v_flight_duration FROM route WHERE id = p_route;

  v_arrival_time := p_departure_time + v_flight_duration;

  INSERT INTO flight (flight_number, departure_time, arrival_time, airplane, route)
  VALUES (p_flight_number, p_departure_time, v_arrival_time, p_airplane, p_route);
END $$;