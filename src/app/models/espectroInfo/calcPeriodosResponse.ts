import { ResponseBase } from './../responseBase';
export interface CalcPeriodosResponse extends ResponseBase {
    ta: number;
    t0: number;
    tc: number;
    tl: number;
}