CREATE TYPE gender AS ENUM ('Male', 'Female', 'Other');

CREATE TABLE "user" (
  "id" serial PRIMARY KEY,
  "last_name" text,
  "password" text,
  "first_name" text,
  "middle_name" text,
  "birthdate" date,
  "gender" gender,
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
  "price" money,
  "seat" text
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
    base_price MONEY,
    FOREIGN KEY (flight_id) REFERENCES flight(id)
);

CREATE TABLE seats (
    seat_id serial PRIMARY KEY,
    flight_id INT,
    seat_number VARCHAR(5) NOT NULL,
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



