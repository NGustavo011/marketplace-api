
export interface ValidateProductPriceParams {
    listPrice: number
    salePrice: number
}
export type ValidateProductPriceReturn = boolean

export interface ValidateProductPriceContract {
  validate: (validateProductPriceParams: ValidateProductPriceParams) => ValidateProductPriceReturn | null
}
