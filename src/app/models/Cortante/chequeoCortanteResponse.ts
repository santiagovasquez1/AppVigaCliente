import { ResponseBase } from './../responseBase';

export interface ChequeoCortanteResponse extends ResponseBase {
    phiVn: number;
    phiVc: number;
    phiVs: number;
}