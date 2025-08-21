import { WatchedList } from "src/core/entities/watched-list";
import { AtualizacaoChamadoAnexos } from "./atualizacao-chamado-anexos";


export class AtualizacaoAnexosList extends WatchedList<AtualizacaoChamadoAnexos> {
  compareItems(a: AtualizacaoChamadoAnexos, b: AtualizacaoChamadoAnexos): boolean {
    return a.anexosId === b.anexosId
  }

}