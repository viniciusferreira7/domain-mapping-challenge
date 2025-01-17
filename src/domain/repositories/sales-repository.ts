import type { Sale } from '../entities/sale';
import type { StatusType } from '../entities/value-object/status';

export interface SalesRepository {
  get(date: string, status: StatusType): Promise<Sale[]> 
}