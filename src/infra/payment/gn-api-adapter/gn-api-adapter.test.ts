import { GnApiAdapter } from './gn-api-adapter';
import env from '../../../main/config/env';
import { GerencianetFactory } from '../../../main/factories/shared/gerencianet-factory';
import { CreateChargePixParams } from '../../../data/repositories-contracts/order/generate-pix-repository';

const makeSut = (): GnApiAdapter => {
	return new GnApiAdapter();
};

const mockCreateChargePixParams = (): CreateChargePixParams => ({
	name: 'any_name',
	cpf: '540.418.240-79',
	value: 1,
	duration: 3600
});
    
const gerencianet = GerencianetFactory.create();

describe('GnApi Adapter', () => {
	describe('createChargePix()', () => {
		test('Deve chamar o método createChargePix com os valores corretos', async () => {
			
			const sut = makeSut();
			const createChargePixSpy = jest.spyOn(gerencianet, 'pixCreateImmediateCharge');
			const createChargePixParams = mockCreateChargePixParams();
			jest.spyOn(gerencianet, 'pixCreateImmediateCharge').mockReturnValueOnce({
				loc: {
					id: 'locId'
				}
			});
			await sut.createChargePix(createChargePixParams);
			const body = {
				'calendario': {
					'expiracao': createChargePixParams.duration
				},
				'devedor': {
					'cpf': createChargePixParams.cpf.replace(/\D/g, ''),
					'nome': createChargePixParams.name
				},
				'valor': {
					original: createChargePixParams.value.toFixed(2)
				},
				'chave': env.gnPixKey,
			};
			expect(createChargePixSpy).toHaveBeenCalledWith([], body);
		});
		test('Deve retornar no método createChargePix, a locId em caso de sucesso', async () => {
			const sut = makeSut();
			jest.spyOn(gerencianet, 'pixCreateImmediateCharge').mockReturnValueOnce({
				loc: {
					id: 'locId'
				}
			});
			const locId = await sut.createChargePix(mockCreateChargePixParams());
			expect(locId).toBe('locId');
		});
		test('Deve repassar o error caso o método createChargePix lance um erro', async () => {
			const sut = makeSut();
			jest.spyOn(gerencianet, 'pixCreateImmediateCharge').mockImplementationOnce(() => { throw new Error(); });
			const promise = sut.createChargePix(mockCreateChargePixParams());
			await expect(promise).rejects.toThrow();
		});
	});
	describe('generateQrCode()', () => {
		test('Deve chamar o método generateQrCode com os valores corretos', async () => {
			const locId = 'locId';
			const sut = makeSut();
			const generateQrCodeSpy = jest.spyOn(gerencianet, 'pixGenerateQRCode');
			jest.spyOn(gerencianet, 'pixGenerateQRCode').mockReturnValueOnce({
				qrCode: 'any_qr_code',
				qrCodeImage: 'any_qr_code_image',
				txId: 'any_tx_id'
			});
			const params = {
				id: locId
			};
			await sut.generateQrCode(locId);
			expect(generateQrCodeSpy).toHaveBeenCalledWith(params);
		});
		test('Deve retornar no método generateQrCode, dados de pix em caso de sucesso', async () => {
			const sut = makeSut();
			jest.spyOn(gerencianet, 'pixGenerateQRCode').mockReturnValueOnce(await Promise.resolve({
				qrCode: 'any_qr_code',
				qrCodeImage: 'any_qr_code_image',
				txId: 'any_tx_id'
			}));
			const pixData = await sut.generateQrCode('locId');
			expect(pixData).toEqual({
				qrCode: 'any_qr_code',
				qrCodeImage: 'any_qr_code_image',
				txId: 'any_tx_id'
			});
		});
		test('Deve repassar o error caso o método generateQrCode lance um erro', async () => {
			const sut = makeSut();
			jest.spyOn(gerencianet, 'pixGenerateQRCode').mockImplementationOnce(() => { throw new Error(); });
			const promise = sut.generateQrCode('locId');
			await expect(promise).rejects.toThrow();
		});
	});
});
