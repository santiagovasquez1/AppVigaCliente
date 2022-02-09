import { ResponseBase } from "../responseBase";

export interface ResistenciaUltimaResponse extends ResponseBase {
    momentoUltimo: number;
    cortanteUltimo: number;
}