import {AdminCarTechnicalSpecificationDto} from "./admin-car-technical-specification-dto";
import {AdminEquipmentDto} from "./admin-equipment-dto";
import {AdminDescriptionDto} from "./admin-description-dto";
import {AdminCarPriceDto} from "./admin-car-price-dto";
import {AdminCarPhotoDto} from "./admin-car-photo-dto";
import {AdminCategoryDto} from "./admin-category-dto";

export interface AdminCarDto {
  id: number,
  brand: string,
  model: string,
  year: number,
  bodyType: string,
  carTechnicalSpecification: AdminCarTechnicalSpecificationDto,
  equipments: AdminEquipmentDto[],
  descriptions: AdminDescriptionDto[],
  carPrice: AdminCarPriceDto,
  photos: AdminCarPhotoDto[],
  category: AdminCategoryDto
}
