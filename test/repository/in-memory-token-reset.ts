import { TokenResetPasswordRepository } from "src/domain/application/repository/token-reset-repository";
import { TokenResetPassword } from "src/domain/enteprise/entities/token-reset-password";

export class InMemoryTokenReset implements TokenResetPasswordRepository {
  public items: TokenResetPassword[] = []

  async findByToken(token: string): Promise<TokenResetPassword | null> {
    const findToken = await this.items.find(item => item.token === token)

    if(!findToken) {
      throw new Error('Token not found')
    }

    return findToken
  }

  async create(token: TokenResetPassword): Promise<void> {
    await this.items.push(token)
  }

  async delete(token: TokenResetPassword): Promise<void> {
    const findToken = await this.items.findIndex(item => item.token === token.token)

    if(!findToken ){
      throw new Error('Token not found')
    }

    this.items.splice(findToken,1)
  }
  
}