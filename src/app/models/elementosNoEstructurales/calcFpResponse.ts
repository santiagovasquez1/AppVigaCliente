import { ResponseBase } from './../responseBase';
export interface CalcFpResponse extends ResponseBase {
    fuerzaSismica: number;
    presionSismica: number;
    losa: string;
}