export interface AdminRentDto {
    id: number,
    car: string,
    paymentType: string,
    rentStatus: string,
    rentalDate: Date,
    returnDate: Date,
    grossValue: number
}