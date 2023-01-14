import { PaymentDto } from "./paymentDto";

export interface InitRent {
    sortingTypes: string[],
    paymentTypes: PaymentDto[]
}