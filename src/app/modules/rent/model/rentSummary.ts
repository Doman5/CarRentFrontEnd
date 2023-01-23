export interface RentSummary {
    id: number,
    carName: string,
    priceWithoutDeposit: number,
    deposit: number,
    finalPrice: number,
    rentalPlace: string,
    rentalDate: Date,
    returnPlace: string,
    returnDate: Date,
    paymentName: string
}