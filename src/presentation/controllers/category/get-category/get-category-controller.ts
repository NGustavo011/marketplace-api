import { GetCategoryContract } from '../../../../domain/usecases-contracts/category/get-category';
import { Controller } from '../../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../../contracts/http';
import { ok } from '../../../helpers/http/http-helper';

export class GetCategoryController extends Controller {
	constructor(
        private readonly getCategory: GetCategoryContract
	){
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const { id } = httpRequest.query;
		const categories = await this.getCategory.get({ id });
		return ok(categories);
	}
}