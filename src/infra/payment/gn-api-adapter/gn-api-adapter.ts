import { CreateChargePixParams, CreateChargePixReturn, GeneratePixRepository } from '../../../data/repositories-contracts/order/generate-pix-repository';
import env from '../../../main/config/env';
import Gerencianet from 'gn-api-sdk-typescript';
import { GerencianetFactory } from '../../../main/factories/shared/gerencianet-factory';

export class GnApiAdapter implements GeneratePixRepository {
	private gerencianet: Gerencianet;
	constructor(){
		this.gerencianet = GerencianetFactory.create();
	}
	async createChargePix(createChargePixParams: CreateChargePixParams): Promise<string | null>{
		const { name, cpf, value, duration } = createChargePixParams;
		const body = {
			'calendario': {
				'expiracao': duration
			},
			'devedor': {
				'cpf': cpf.replace(/\D/g, ''),
				'nome': name
			},
			'valor': {
				original: value.toFixed(2)
			},
			'chave': env.gnPixKey,
		};
		const response = await this.gerencianet.pixCreateImmediateCharge([], body);
		return response.loc.id;
	}
	async generateQrCode(locId: string): Promise<CreateChargePixReturn | null>{
		const params = {
			id: locId
		};
		const response = await this.gerencianet.pixGenerateQRCode(params);
		return response;
	}
}
