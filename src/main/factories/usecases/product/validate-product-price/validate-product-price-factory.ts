import { ValidateProductPrice } from '../../../../../data/usecases/product/validate-product-price/validate-product-price';
import { ValidateProductPriceContract } from '../../../../../domain/usecases-contracts/product/validate-product-price';

export const makeValidateProductPrice = (): ValidateProductPriceContract => {
	return new ValidateProductPrice();
};
