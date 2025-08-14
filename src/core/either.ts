/* eslint-disable prettier/prettier */

// Aqui criamos duas classes onde fazemos as tratativas de erro, o Left siginifica q houve algum erro e Right sucesso. Essas classe recebem um valor genérico, esse valor será o conteúdo do erro ou acerto.
// Error
export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  // Aqui, a partir do momento que esse método é chamado, estamos assumindo que o retorno é sucesso. Dessa forma, estamos ajudando o Typescrip entender qual é o tipo do value dessa class.

  // Vale ressaltar que os métodos isRight e isLeft, tanto da classe Left quanto da classe Right, são métodos axiliares, eles dizem se realmente teve sucesso ou erro quando a classe é chamada.
  isRight(): this is Right<L, R> {
    return false
  }

  isLeft(): this is Left<L, R> {
    return true
  }
}


// Success
export class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return true
  }

  isLeft(): this is Left<L, R> {
    return false
  }
}

// No retorno dos casos de uso, vamos utilizar essa tipagem, ela faz com que o caso de uso retorne left para erro ou right para sucesso. Dessa forma, criaremos um padrão para nossos erros e não precisamos de usar o throw.
export type Either<L, R> = Left<L, R> | Right<L, R>

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}
