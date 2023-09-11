import Gerencianet from 'gn-api-sdk-typescript';
import { efiPayOptions } from '../../config/efi-pay';

export abstract class GerencianetFactory {
	static gerencianet: Gerencianet;
	static create(): Gerencianet{
		if(!this.gerencianet){
			this.gerencianet = new Gerencianet(efiPayOptions);
		}
		return this.gerencianet;
	}
} 