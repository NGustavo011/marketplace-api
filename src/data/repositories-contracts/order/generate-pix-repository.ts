export type CreateChargePixParams = {
    value: number
    duration: number
}

export type CreateChargePixReturn = {
    txId: string
    qrCode: string
    qrCodeImage: string
}

export interface GeneratePixRepository {
  createChargePix: (createChargePixParams: CreateChargePixParams) => Promise<string>
  generateQrCode: (locId: string) => Promise<CreateChargePixReturn>
}
