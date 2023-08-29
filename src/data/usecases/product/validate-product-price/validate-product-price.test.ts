import { mockProductPriceParams } from '../../../test/mock-product';
import { ValidateProductPrice } from './validate-product-price';


interface SutTypes {
    sut: ValidateProductPrice
  }
  
const makeSut = (): SutTypes => {
	const sut = new ValidateProductPrice();
	return {
		sut
	};
};
mockProductPriceParams();

describe('ValidateProductPrice usecase', ()=>{
	test('Deve retornar false se o salePrice for menor que listPrice', ()=>{
		const { sut } = makeSut();
		const isValidProductPrice = sut.validate({
			listPrice: 200,
			salePrice: 150
		});
		expect(isValidProductPrice).toBeFalsy();
	});

	test('Deve retornar false se o salePrice for negativo', ()=>{
		const { sut } = makeSut();
		const isValidProductPrice = sut.validate({
			listPrice: -2,
			salePrice: -2
		});
		expect(isValidProductPrice).toBeFalsy();
	});

	test('Deve retornar false se o listPrice for negativo', ()=>{
		const { sut } = makeSut();
		const isValidProductPrice = sut.validate({
			listPrice: -2,
			salePrice: 200
		});
		expect(isValidProductPrice).toBeFalsy();
	});

	test('Deve retornar true se a validação for verdadeira', ()=>{
		const { sut } = makeSut();
		const isValidProductPrice = sut.validate({
			listPrice: 150,
			salePrice: 200
		});
		expect(isValidProductPrice).toBeTruthy();
	});
});