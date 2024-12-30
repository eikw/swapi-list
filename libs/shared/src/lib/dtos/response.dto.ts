import { IPeople } from "../models/IPeople";
import { IQueryDto } from "./query.dto";

export interface IResponseDto {
  query: IQueryDto;
  total: number;
  pageCount: number;
  next: boolean;
  previous: boolean;
  results: IPeople[];
}
