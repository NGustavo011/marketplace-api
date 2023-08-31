import { mockProductModel } from '../../../../data/test/mock-product';
import { throwError } from '../../../../domain/test/test-helpers';
import { GetProductContract } from '../../../../domain/usecases-contracts/product/get-product';
import { HttpRequest } from '../../../contracts/http';
import { ok, serverError } from '../../../helpers/http/http-helper';
import { mockGetProduct } from '../../../test/mock-product';
import { GetProductController } from './get-product-controller';


const mockRequest = (): HttpRequest => {
	return {
		query: {
			id: 'any_id',
			sellerId: 'any_seller_id'
		}
	};
};

interface SutTypes {
  getProductStub: GetProductContract
  sut: GetProductController
}

const makeSut = (): SutTypes => {
	const getProductStub = mockGetProduct();
	const sut = new GetProductController(getProductStub);
	return {
		getProductStub,
		sut
	};
};

describe('GetProduct Controller', () => {
	describe('GetProduct dependency', () => {
		test('Deve chamar GetProduct com valores corretos', async () => {
			const { sut, getProductStub } = makeSut();
			const getSpy = jest.spyOn(getProductStub, 'get');
			const httpRequest = mockRequest();
			await sut.execute(mockRequest());
			expect(getSpy).toHaveBeenCalledWith({
				id: httpRequest.query.id,
				sellerId: httpRequest.query.sellerId
			});
		});
		test('Deve retornar 500 se GetProduct lançar uma exceção', async () => {
			const { sut, getProductStub } = makeSut();
			jest.spyOn(getProductStub, 'get').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test('Retorne status 200 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		expect(httpResponse).toEqual(ok([mockProductModel()]));
	});
});
