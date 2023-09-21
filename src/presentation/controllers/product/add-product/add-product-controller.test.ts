import { mockProductModel } from '../../../../data/test/mock-product';
import { throwError } from '../../../../domain/test/test-helpers';
import { AddProductContract } from '../../../../domain/usecases-contracts/product/add-product';
import { ValidateProductPriceContract } from '../../../../domain/usecases-contracts/product/validate-product-price';
import { CheckUserHasPixKeyContract } from '../../../../domain/usecases-contracts/user/check-user-has-pix-key';
import { ValidateTokenContract } from '../../../../domain/usecases-contracts/user/validate-token';
import { mockValidation } from '../../../../validation/test/mock-validation';
import { HttpRequest } from '../../../contracts/http';
import { Validation } from '../../../contracts/validation';
import { InvalidProductPriceError } from '../../../errors/invalid-product-price-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { UserDoesNotHavePixKeyError } from '../../../errors/user-does-not-have-pix-key-error';
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helper';
import { mockAddProduct, mockValidateProductPrice } from '../../../test/mock-product';
import { mockCheckUserHasPixKey, mockValidateToken } from '../../../test/mock-user';
import { AddProductController } from './add-product-controller';



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
		}
	};
};

interface SutTypes {
  sut: AddProductController
  addProductStub: AddProductContract,
  checkUserHasPixKeyStub: CheckUserHasPixKeyContract,
  validateProductPriceStub: ValidateProductPriceContract,
  validateTokenStub: ValidateTokenContract,
  validationStub: Validation
}

const makeSut = (): SutTypes => {
	const addProductStub = mockAddProduct();
	const checkUserHasPixKeyStub = mockCheckUserHasPixKey();
	const validateProductPriceStub = mockValidateProductPrice();
	const validateTokenStub = mockValidateToken();
	const validationStub = mockValidation(); 
	const sut = new AddProductController(addProductStub, checkUserHasPixKeyStub, validateProductPriceStub, validateTokenStub, validationStub);
	return {
		sut,
		addProductStub,
		checkUserHasPixKeyStub,
		validateProductPriceStub,
		validateTokenStub,
		validationStub
	};
};

describe('AddProduct Controller', () => {
	describe('AddProduct dependency', () => {
		test('Deve chamar AddProduct com valores corretos', async () => {
			const { sut, addProductStub } = makeSut();
			const addSpy = jest.spyOn(addProductStub, 'add');
			await sut.execute(mockRequest());
			expect(addSpy).toHaveBeenCalledWith({
				name: mockRequest().body.name,
				description: mockRequest().body.description,
				listPrice: mockRequest().body.listPrice,
				salePrice: mockRequest().body.salePrice,
				categoryId: mockRequest().body.categoryId,
				urlImage: mockRequest().body.urlImage,
				userId: 'any_user_id'
			});
		});
		test('Deve retornar 500 se AddProduct lançar uma exceção', async () => {
			const { sut, addProductStub } = makeSut();
			jest.spyOn(addProductStub, 'add').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	describe('CheckUserHasPixKey dependency', () => {
		test('Deve chamar o CheckUserHasPixKey com valores corretos', async () => {
			const { sut, checkUserHasPixKeyStub } = makeSut();
			const checkSpy = jest.spyOn(checkUserHasPixKeyStub, 'check');
			const httpRequest = mockRequest();
			await sut.execute(httpRequest);
			expect(checkSpy).toHaveBeenCalledWith('any_user_id');
		});
		test('Retorne status 400 se o CheckUserHasPixKey retornar false', async () => {
			const { sut, checkUserHasPixKeyStub } = makeSut();
			jest.spyOn(checkUserHasPixKeyStub, 'check').mockReturnValueOnce(Promise.resolve(false));
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(badRequest(new UserDoesNotHavePixKeyError()));
		});
	});
	describe('ValidateProductPrice dependency', () => {
		test('Deve chamar o ValidateProductPrice com valores corretos', async () => {
			const { sut, validateProductPriceStub } = makeSut();
			const validateProductPriceSpy = jest.spyOn(validateProductPriceStub, 'validate');
			const httpRequest = mockRequest();
			await sut.execute(httpRequest);
			expect(validateProductPriceSpy).toHaveBeenCalledWith({
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
	describe('Validation dependency', () => {
		test('Deve chamar o Validation com valores corretos', async () => {
			const { sut, validationStub } = makeSut();
			const validateSpy = jest.spyOn(validationStub, 'validate');
			const httpRequest = mockRequest();
			await sut.execute(httpRequest);
			expect(validateSpy).toHaveBeenLastCalledWith(Object.assign({}, httpRequest.headers, httpRequest.body));
		});
		test('Retorne status 400 se o Validation retornar um erro', async () => {
			const { sut, validationStub } = makeSut();
			jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
		});
	});
	test('Retorne status 200 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		expect(httpResponse).toEqual(ok(mockProductModel()));
	});
});