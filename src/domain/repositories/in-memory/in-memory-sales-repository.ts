import type { Product } from '@/domain/entities/product';
import type { Sale } from '@/domain/entities/sale';
import type { StatusType } from '@/domain/entities/value-object/status';
import type { SalesRepository } from '../sales-repository';
import dayjs from 'dayjs';

export class InMemorySalesRepository implements SalesRepository {

  constructor( public sales: Sale[],  public products: Product[]){}

  async get(date: string, status: StatusType): Promise<Sale[]> {
     const deliveredSales = this.sales.filter((item) => {
          const isDeliveredStatus = item.status.value === status
          const isSameDate = dayjs(item.createdAt).isSame(dayjs(date), "date")
    
          return isDeliveredStatus && isSameDate
        })
    
        return deliveredSales
  }
  
 async  fetchBestSellingProductsByPeriod(): Promise<{ [x: string]: Product; }> {
    const allPeriods = this.sales.reduce<string[]>((acc, current) => {
      const salesDate = dayjs(current.createdAt).format("YYYY-MM-DD")

      if(!acc.includes(salesDate)){
        acc.push(salesDate)
      }

      return acc
    }, [])


    let bestSellingProductsByPeriod: Record<string, Product> = {}
    allPeriods.forEach((item) => {
      const salesByPeriod = this.sales.filter((sale) => dayjs(sale.updatedAt).isSame(item, 'days'))

      const productsByPeriodSort = salesByPeriod.sort((a, b) => b.amount - a.amount)
      const bestSellingSale = productsByPeriodSort?.[0]
      const product = this.products.find((prod) => prod.id.toString === bestSellingSale.productId)

      if(product){
        bestSellingProductsByPeriod[item] = product
      }
    })

    return bestSellingProductsByPeriod
  }

}