import { CarNameDto } from "./carNameDto";

export interface UserRentDto {
    id : number,
    car: CarNameDto,
    paymentType: string,
    rentStatus: string,
    rentalPlace: string,
    rentalDate: Date,
    returnPlace: string,
    returnDate: Date,
    priceWithoutDeposit: number,
    deposit: number,
    finalPrice: number
}