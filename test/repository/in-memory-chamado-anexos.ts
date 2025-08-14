import { ChamadoAnexosRepository } from "src/domain/application/repository/chamado-anexos-repository";
import { Chamado } from "src/domain/enteprise/entities/chamado";
import { ChamadoAnexos } from "src/domain/enteprise/entities/chamado-anexos";

export class InMemoryChamadoAnexos implements ChamadoAnexosRepository {
  public items: ChamadoAnexos[] = []

  async createMany(anexos: ChamadoAnexos[]): Promise<void> {
    this.items.push(...anexos)
  }
  
  async deleteMany(anexos: ChamadoAnexos[]): Promise<void> {
    const chamadoAnexos = this.items.filter((item) => {
      return !anexos.some((anexo) => anexo.equals(item))
    })

    this.items = chamadoAnexos
  }
  async findManyChamadoId(chamadoId: string): Promise<Chamado[] | null> {
    throw new Error("Method not implemented.");
  }
  async deleteManyByChamadoId(chamadoId: string): Promise<void> {
    
  }

}