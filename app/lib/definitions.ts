// TODO: Rename interfaces to PascalCase

type Gender = "Male" | "Female" | "Other";

export interface user {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  birthdate: Date;
  gender: Gender;
  phone_number: string;
  email: string;
  role: string;
  password: string;
}

export interface airplane {
  id: number;
  model: string;
  reg_number: string;
  seats: number;
}

export interface flight {
  id: number;
  flight_number: number;
  departure_time: Date;
  arrival_time: Date;
  airplane: number;
  route: number;
}

export interface route {
  id: number;
  departure_airport: number;
  arrival_airport: number;
  flight_duration: string;
}

export interface ticketPrice {
  id: number;
  flight: number;
  price_starts: Date;
  price_ends: Date;
  price: number;
}

export interface ticket {
  id: number;
  passanger: number;
  flight: number;
  price: number;
  seat: string;
}

export interface airport {
  id: number;
  title: string;
  city: string;
  country: string;
  address: string;
  coordinates: {
    x: number;
    y: number;
  };
}

export interface FlightInfo {
  flight_id: number;
  flight_number: string;
  departure_time: Date;
  arrival_time: Date;
  airplane_model: string;
  airplane_reg_number: string;
  departure_airport: string;
  arrival_airport: string;
  flight_duration: number;
  current_price: string;
}

export interface Seat {
  seat_id: number,
  flight_id: number,
  seat_number: number,
  is_occupied: boolean,
  passenger_id: number
}