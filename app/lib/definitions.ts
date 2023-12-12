type Gender = "Male" | "Female" | "Other";

export interface User {
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

export interface Airplane {
  id: number;
  model: string;
  reg_number: string;
  seats: number;
}

export interface Flight {
  id: number;
  flight_number: number;
  departure_time: Date;
  arrival_time: Date;
  airplane: number;
  route: number;
}

export interface Route {
  id: number;
  departure_airport: number;
  arrival_airport: number;
  flight_duration: string;
}

export interface TicketPrice {
  id: number;
  flight: number;
  price_starts: Date;
  price_ends: Date;
  price: number;
}

export interface Ticket {
  id: number;
  passanger: number;
  flight: number;
  price: number;
  seat: string;
}

export interface Airport {
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
