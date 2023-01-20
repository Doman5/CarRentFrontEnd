import { AdminCarPriceDto } from "../../admin/admin-car/model/admin-car-price-dto";
import { CarPhoto } from "./carPhoto";
import { CarDescription } from "./carDescription";
import { CarEquipment } from "./carEquipment";
import { CarPrice } from "./carPrice";
import { CarTechnicalSpecifiaction } from "./carTechnicalSpecification";

export interface Car {
    id: number,
    brand: string,
    model: string,
    year: number,
    bodyType: string,
    slug: string,
    carTechnicalSpecification: CarTechnicalSpecifiaction,
    equipments: Array<CarEquipment>,
    descriptions: Array<CarDescription>,
    carPrice: CarPrice,
    photos: Array<CarPhoto>,
    categoryId: number

}