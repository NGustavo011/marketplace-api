import { ValidateProductPriceContract, ValidateProductPriceParams } from '../../../../domain/usecases-contracts/product/validate-product-price';

export class ValidateProductPrice implements ValidateProductPriceContract {
	validate(validateProductPriceParams: ValidateProductPriceParams): boolean | null{
		const { listPrice, salePrice } = validateProductPriceParams;
		return salePrice >= listPrice && salePrice >= 0 && listPrice >= 0;
	}
}