import { WatchedList } from "src/core/entities/watched-list";
import { ChamadoAnexos } from "./chamado-anexos";

export class ChamadosAnexosList extends WatchedList<ChamadoAnexos> {
  compareItems(a: ChamadoAnexos, b: ChamadoAnexos): boolean {
    return a.anexosId === b.anexosId
  }

}