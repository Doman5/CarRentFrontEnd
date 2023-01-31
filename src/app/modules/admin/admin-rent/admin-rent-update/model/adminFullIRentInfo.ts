import { AdminRentLogDto } from "./adminRentLogDto";

export interface AdminFullRentInfo {
    id: number,
    car: string,
    paymentType: string,
    username: string,
    rentStatus: string,
    rentalDate: Date,
    rentalPlace: string,
    returnDate: Date,
    returnPlace: string,
    finalPrice: number,
    rentLogs: AdminRentLogDto[]
}