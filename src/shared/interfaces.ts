export interface Trips {
    bike_departure: string;
    bike_return: string;
    departure_station_id: number; 
    departure_station_name: string; 
    return_station_id: number;
    return_station_name: string; 
    covered_distance_m: number; 
    duration_sec: number;
    duration: string;
    covered_distance_km: string;
}

export interface Stations {
    station_id: number; 
    nimi: string;
    namn: string;
    name: string;
    osoite: string; 
    adress: string; 
    kaupunki: string; 
    stad: string;
    operaattori: string;
    kapasiteetti: string;
    x: number;
    y: number;
}