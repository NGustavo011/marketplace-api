import { mockCategoryModel } from '../../../../data/test/mock-category';
import { GetCategoryContract } from '../../../../domain/usecases-contracts/category/get-category';
import { HttpRequest } from '../../../contracts/http';
import { ok, serverError } from '../../../helpers/http/http-helper';
import { mockGetCategory } from '../../../test/mock-category';
import { GetCategoryController } from './get-category-controller';


const mockRequest = (): HttpRequest => {
	return {
		query: {
			id: 'any_id',
		}
	};
};

interface SutTypes {
  sut: GetCategoryController
  getCategoryStub: GetCategoryContract
}

const makeSut = (): SutTypes => {
	const getCategoryStub = mockGetCategory();
	const sut = new GetCategoryController(getCategoryStub);
	return {
		sut,
		getCategoryStub
	};
};

describe('GetCategory Controller', () => {
	describe('GetCategory dependency', () => {
		test('Deve chamar o GetCategory com valores corretos', async () => {
			const { sut, getCategoryStub } = makeSut();
			const getSpy = jest.spyOn(getCategoryStub, 'get');
			await sut.execute(mockRequest());
			expect(getSpy).toHaveBeenCalledWith({
				id: mockRequest().query.id,
			});
		});
		test('Deve retornar 500 se o GetCategory lançar uma exceção', async () => {
			const { sut, getCategoryStub } = makeSut();
			jest.spyOn(getCategoryStub, 'get').mockImplementationOnce(() => {
				throw new Error();
			});
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test('Retorne status 200 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		console.log(httpResponse);
		expect(httpResponse).toEqual(ok([mockCategoryModel()]));
	});
});
