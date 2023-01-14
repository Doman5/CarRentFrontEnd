import { CarTechnicalSpecifiaction } from "../../car/model/carTechnicalSpecification";

export interface RentCar {
    carId: number,
    brand: string,
    model: string,
    year: number,
    photo: string,
    carTechnicalSpecification: CarTechnicalSpecifiaction,
    deposit: number,
    distanceLimit: number,
    distanceLimitPenalty: number,
    grossValue: number,
    finalPrice: number,
    rentalPrice: number,
    rentalDate: Date,
    rentalPlace: string,
    returnPrice: number,
    returnDate: Date,
    returnPlace: number,
    days: number,
    available: boolean
}