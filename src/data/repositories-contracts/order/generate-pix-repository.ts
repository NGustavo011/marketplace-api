export type CreateChargePixParams = {
    cpf: string
    name: string
    value: number
    duration: number
}

export type CreateChargePixReturn = {
    txId: string
    qrCode: string
    qrCodeImage: string
}

export interface GeneratePixRepository {
  createChargePix: (createChargePixParams: CreateChargePixParams) => Promise<string | null>
  generateQrCode: (locId: string) => Promise<CreateChargePixReturn | null>
}
