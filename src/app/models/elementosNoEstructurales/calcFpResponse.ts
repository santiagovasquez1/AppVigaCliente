import { ResponseBase } from './../responseBase';
export interface CalcFpResponse extends ResponseBase {
    fuerzaSismica: number;
    losa: string;
}