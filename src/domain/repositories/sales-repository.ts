import type { Product } from '../entities/product';
import type { Sale } from '../entities/sale';
import type { StatusType } from '../entities/value-object/status';

interface FetchAndProductsParams {
  startDate: string
  endDate: string
}

type FetchAndProductsResponse = Record<string, Product>
export interface SalesRepository {
  get(date: string, status: StatusType): Promise<Sale[]> 
  fetchBestSellingProductsByPeriod(): Promise<FetchAndProductsResponse>
}