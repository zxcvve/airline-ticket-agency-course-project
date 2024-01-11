export interface User {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  birthdate: Date;
  isMale: boolean;
  phone_number: string;
  email: string;
  role: string;
  password: string;
}

export interface UserWithoutPassword {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  birthdate: Date;
  ismale: boolean;
  phone_number: string;
  email: string;
  role: string;
}

export interface Airplane {
  id: number;
  model: string;
  reg_number: string;
  seats: number;
  isenabled: boolean;
}

export interface Flight {
  id: number;
  flight_number: string;
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

export interface RouteInfo {
  id: number;
  departure_airport_name: string;
  arrival_airport_name: string;
  flight_duration: string;
}

// export interface TicketPrice {
//   id: number;
//   flight: number;
//   price_starts: Date;
//   price_ends: Date;
//   price: number;
// }
export interface TicketPrice{
  id: number,
  flight_id: number
  time_left_threshold: string;
  base_price: number;
}

export interface TicketPriceToAdd extends Omit<TicketPrice, 'id' | 'flight_id'> {}

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
  coordinates: string;
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
  current_price: number;
  isEnabled: boolean
}

export interface TicketInfo {
  user_id: number;
  first_name: string;
  last_name: string;
  ticket_id: number;
  ticket_price: number;
  seat_number: string;
  flight_number: string;
  airplane_model: string;
  departure_airport: string;
  arrival_airport: string;
  departure_time: Date;
  arrival_time: Date;
}

export interface Seat {
  seat_id: number;
  flight_id: number;
  seat_number: number;
  is_occupied: boolean;
  passenger_id: number;
}
