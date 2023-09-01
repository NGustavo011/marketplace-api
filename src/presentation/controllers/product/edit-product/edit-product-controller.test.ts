import { mockProductModel } from '../../../../data/test/mock-product';
import { throwError } from '../../../../domain/test/test-helpers';
import { EditProductContract } from '../../../../domain/usecases-contracts/product/edit-product';
import { ValidateProductPriceContract } from '../../../../domain/usecases-contracts/product/validate-product-price';
import { ValidateTokenContract } from '../../../../domain/usecases-contracts/user/validate-token';
import { mockValidation } from '../../../../validation/test/mock-validation';
import { HttpRequest } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { InvalidParamError } from '../../../errors/invalid-param-error';
import { InvalidProductPriceError } from '../../../errors/invalid-product-price-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helper';
import { mockEditProduct, mockValidateProductPrice } from '../../../test/mock-product';
import { mockValidateToken } from '../../../test/mock-user';
import { EditProductController } from './edit-product-controller';


const mockRequest = (): HttpRequest => {
	return {
		body: {
			name: 'any_name',
			description: 'any_description',
			listPrice: 0,
			salePrice: 0,
			categoryId: 'any_category_id',
			urlImage: 'any_url_image'
		},
		headers: {
			authorization: 'any_token'
		},
		query: {
			id: 'any_id'
		}
	};
};

interface SutTypes {
  validationStub: Validation
  validateTokenStub: ValidateTokenContract
  validateProductPriceStub: ValidateProductPriceContract
  editProductStub: EditProductContract
  sut: EditProductController
}

const makeSut = (): SutTypes => {
	const validationStub = mockValidation();
	const validateTokenStub = mockValidateToken();
	const validateProductPriceStub = mockValidateProductPrice();
	const editProductStub = mockEditProduct();
	const sut = new EditProductController(editProductStub, validateProductPriceStub, validateTokenStub, validationStub);
	return {
		validationStub,
		validateTokenStub,
		validateProductPriceStub,
		editProductStub,
		sut
	};
};

describe('EditProduct Controller', () => {
	describe('Validation dependency', () => {
		test('Deve chamar o Validation com valores corretos', async () => {
			const { sut, validationStub } = makeSut();
			const validateSpy = jest.spyOn(validationStub, 'validate');
			const httpRequest = mockRequest();
			await sut.execute(httpRequest);
			expect(validateSpy).toHaveBeenLastCalledWith(Object.assign({}, httpRequest.headers, httpRequest.body, httpRequest.query));
		});
		test('Retorne status 400 se o Validation retornar um erro', async () => {
			const { sut, validationStub } = makeSut();
			jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
		});
	});
	describe('ValidateToken dependency', () => {
		test('Deve chamar o ValidateToken com valores corretos', async () => {
			const { sut, validateTokenStub } = makeSut();
			const validateTokenSpy = jest.spyOn(validateTokenStub, 'validateToken');
			const httpRequest = mockRequest();
			await sut.execute(httpRequest);
			expect(validateTokenSpy).toHaveBeenCalledWith(httpRequest.headers.authorization);
		});
		test('Retorne status 401 se o ValidateToken retornar null', async () => {
			const { sut, validateTokenStub } = makeSut();
			jest.spyOn(validateTokenStub, 'validateToken').mockReturnValueOnce(Promise.resolve(null));
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(unauthorized());
		});
	});
	describe('ValidateProductPrice dependency', () => {
		test('Deve chamar o ValidateProductPrice com valores corretos', async () => {
			const { sut, validateProductPriceStub } = makeSut();
			const validateSpy = jest.spyOn(validateProductPriceStub, 'validate');
			const httpRequest = mockRequest();
			await sut.execute(httpRequest);
			expect(validateSpy).toHaveBeenCalledWith({
				salePrice: httpRequest.body.salePrice, 
				listPrice: httpRequest.body.listPrice
			});
		});
		test('Retorne status 400 se o ValidateProductPrice retornar false', async () => {
			const { sut, validateProductPriceStub } = makeSut();
			jest.spyOn(validateProductPriceStub, 'validate').mockReturnValueOnce(false);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(badRequest(new InvalidProductPriceError()));
		});
	});
	describe('EditProduct dependency', () => {
		test('Deve chamar EditProduct com valores corretos', async () => {
			const { sut, editProductStub } = makeSut();
			const editSpy = jest.spyOn(editProductStub, 'edit');
			await sut.execute(mockRequest());
			const httpRequest = mockRequest();
			expect(editSpy).toHaveBeenCalledWith({
				product: {
					name: httpRequest.body.name,
					description: httpRequest.body.description,
					listPrice: httpRequest.body.listPrice,
					salePrice: httpRequest.body.salePrice,
					categoryId: httpRequest.body.categoryId,
					urlImage: httpRequest.body.urlImage 
				},
				id: httpRequest.query.id,
				userId: 'any_user_id'
			});
		});
		test('Deve retornar 400 se EditProduct retornar null', async () => {
			const { sut, editProductStub } = makeSut();
			jest.spyOn(editProductStub, 'edit').mockReturnValueOnce(Promise.resolve(null));
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(badRequest(new InvalidParamError('Product not found to user specified')));
		});
		test('Deve retornar 500 se EditProduct lançar uma exceção', async () => {
			const { sut, editProductStub } = makeSut();
			jest.spyOn(editProductStub, 'edit').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test('Retorne status 200 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		expect(httpResponse).toEqual(ok(mockProductModel()));
	});
});
