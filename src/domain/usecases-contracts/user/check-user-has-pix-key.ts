export type CheckUserHasPixKeyParams = string
export type CheckUserHasPixKeyReturn = boolean

export interface CheckUserHasPixKeyContract {
  check: (id: CheckUserHasPixKeyParams) => Promise<CheckUserHasPixKeyReturn | null>
}
