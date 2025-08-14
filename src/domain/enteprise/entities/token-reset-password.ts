import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

export interface TokenResetPasswordProps {
  token: string
  userId: string
}

export class TokenResetPassword extends Entity<TokenResetPasswordProps> {
  get token(){
    return this.props.token
  }
  get userId(){
    return this.props.userId
  }

  static create(tokenresetpassword: TokenResetPasswordProps, id?: UniqueEntityId) {
    const tokenResetPassword = new TokenResetPassword(tokenresetpassword, id)
    return tokenResetPassword
  }
}