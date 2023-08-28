import { DecrypterPayload } from '../../../domain/usecases-contracts/user/validate-token';

export interface DecrypterRepository {
  validateToken: (token: string) => Promise<DecrypterPayload | null>
}
