export type User = {
  id: string
  email: string
  username: string
  createdAt: Date
  updatedAt: Date
}

export type UserProfile = Omit<User, 'createdAt' | 'updatedAt'>

export type SessionUser = Pick<User, 'id' | 'email' | 'username'>
