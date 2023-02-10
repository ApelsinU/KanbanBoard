export interface IUserStore {
  userData: IUserAuthData
  refreshUserData: ({ userId, token }: IUserAuthData) => void
}

export interface IUserAuthData {
  userId: string
  token: string
}
