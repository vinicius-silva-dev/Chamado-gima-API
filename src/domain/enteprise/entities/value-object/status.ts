// Neste value object criamos um enum, onde estamos colocando quais status o chamado pode ter, logo em seguida, criamos a class, na qual o value vai receber o status, o toValue vai permitir acessar o value e, no constructor, recebemos o status, q é do tipo do enum Status, e atribuimos a propriedade value o valor do status, por padrão estando como disponivel, mas podendo ser alterado para outros.

export enum Status {
  aberto = 'aberto',
  atendimento = 'atendimento',
  resolvido = 'resolvido',
  cancelado = 'cancelado',
}

export class StatusValueObject {
  private value: string

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? Status.aberto
  }

  Changevalue(value: string) {
    this.value = value
  }
}
