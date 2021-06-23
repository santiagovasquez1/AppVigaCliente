import { EGrupoUso } from './EGrupoUso';
import { ECapacidad } from './ECapacidad';
import { ETipoEstructura } from './ETipoEstructura';

export class EstructuraInfo {
  constructor(
    public Sistema: ETipoEstructura,
    public H: number,
    public Capacidad: ECapacidad,
    public GrupoUso: EGrupoUso
  ) {

  }
}
