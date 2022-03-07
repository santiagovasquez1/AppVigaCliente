import { ResponseBase } from "../responseBase";

export interface CalcFaFvResponse extends ResponseBase {
    fa: number;
    fv: number
}