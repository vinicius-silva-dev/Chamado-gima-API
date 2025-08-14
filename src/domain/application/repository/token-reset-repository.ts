import {TokenResetPassword} from '../../enteprise/entities/token-reset-password'

export abstract class TokenResetPasswordRepository {
  abstract findByToken(token: string): Promise<TokenResetPassword | null>
  abstract create(token: TokenResetPassword): Promise<void>
  abstract delete(token: TokenResetPassword): Promise<void>
}