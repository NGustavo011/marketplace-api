export interface CheckUserHasPixKeyRepository {
  checkUserHasPixKey: (id: string) => Promise<boolean | null>
}
