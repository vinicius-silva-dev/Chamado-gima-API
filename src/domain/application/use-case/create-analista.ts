import { Analista } from "src/domain/enteprise/entities/analistas";
import { AnalistaRepository } from "../repository/analista-repository";
import { hash } from "bcrypt";
import { Injectable } from "@nestjs/common";

export interface CreateAnalistaRequest {
  name: string;
  email: string;
  password: string;
}

type CreateAnalistaResponse = {
  analista: Analista
}

@Injectable()
export class CreateanalistaUseCase {
  constructor(
    private analistaRepository: AnalistaRepository
  ){}
  async execute({
    name,
    email,
    password,
  }: CreateAnalistaRequest): Promise<CreateAnalistaResponse> {
    const analista = await Analista.create({
      name,
      email,
      password: await hash(password, 6),
      categoria: 'Analista',
      createdAt: new Date()
    })
    await this.analistaRepository.create(analista)


    return {analista}
  }
}