-- INSERT INTO airplane (model, reg_number, seats) VALUES ('Boeing 747', 'B747', 366);
-- INSERT INTO airplane (model, reg_number, seats) VALUES ('Airbus A380', 'A380', 853);
-- INSERT INTO airplane (model, reg_number, seats) VALUES ('Boeing 777', 'B777', 396);

SELECT * FROM airplane;

SELECT * FROM airport;

SELECT * FROM route;

-- INSERT INTO airport (title, city, country, address, coordinates) VALUES ('Шереметьево', 'Москва', 'Россия', 'Шереметьевское ш., вл39с1, Химки', '(55.981037, 37.409058)');
-- INSERT INTO "airport" ("title", "city", "country", "address", "coordinates") VALUES ('Пулково', 'Санкт-Петербург', 'Россия', 'Пулковское шоссе, д. 41', '(59.800651, 30.262504)');

-- INSERT INTO "airport" ("title", "city", "country", "address", "coordinates")
-- VALUES ('Толмачево', 'Новосибирск', 'Россия', 'Дубровинская, д. 1', '(55.011494, 82.651936)');


-- INSERT INTO "route" ("departure_airport","arrival_airport","flight_duration") VALUES (2,1, INTERVAL '90 minutes')

SELECT * FROM "route_with_airport_names"

INSERT INTO "flight" ("flight_number","departure_time","arrival_time","airplane","route") VALUES (228,'2024-02-24 13:30:00 GMT+3','2024-02-24 15:00:00 GMT+3',1,1)

SELECT * FROM flight

-- INSERT INTO airplane (model, reg_number, seats) VALUES ('Boeing 747', 'B747', 366);
-- INSERT INTO airplane (model, reg_number, seats) VALUES ('Airbus A380', 'A380', 853);
-- INSERT INTO airplane (model, reg_number, seats) VALUES ('Boeing 777', 'B777', 396);

SELECT * FROM airplane;

SELECT * FROM airport;

SELECT * FROM route;

-- INSERT INTO airport (title, city, country, address, coordinates) VALUES ('Шереметьево', 'Москва', 'Россия', 'Шереметьевское ш., вл39с1, Химки', '(55.981037, 37.409058)');
-- INSERT INTO "airport" ("title", "city", "country", "address", "coordinates") VALUES ('Пулково', 'Санкт-Петербург', 'Россия', 'Пулковское шоссе, д. 41', '(59.800651, 30.262504)');

-- INSERT INTO "airport" ("title", "city", "country", "address", "coordinates")
-- VALUES ('Толмачево', 'Новосибирск', 'Россия', 'Дубровинская, д. 1', '(55.011494, 82.651936)');


-- INSERT INTO "route" ("departure_airport","arrival_airport","flight_duration") VALUES (2,1, INTERVAL '90 minutes')

SELECT * FROM "route_with_airport_names"

INSERT INTO "flight" ("flight_number","departure_time","arrival_time","airplane","route") VALUES (228,'2024-02-24 13:30:00 GMT+3','2024-02-24 15:00:00 GMT+3',1,1)

SELECT * FROM flight

DROP PROCEDURE GenerateSeats;

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


SELECT * FROM seats


CALL GenerateSeats(1)