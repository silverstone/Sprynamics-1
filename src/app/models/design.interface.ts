import { BrandColors } from "#app/shared/colors/brand-colors.interface";

export interface Design {
  id: string
  brandColors: BrandColors
  fonts: string[]
  name: string
  productType: {
    type: string,
    size: string,
    width: number,
    height: number
  }
  thumbnail: string
  url: string
  createdAt: Date
  updatedAt: Date
}