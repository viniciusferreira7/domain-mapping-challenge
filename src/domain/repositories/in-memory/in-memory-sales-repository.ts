import type { Product } from '@/domain/entities/product';
import { Sale } from '@/domain/entities/sale';
import { Status, type StatusType } from '@/domain/entities/value-object/status';
import type { SalesRepository } from '../sales-repository';
import dayjs from 'dayjs';
import type { Optional } from '@/core/types/optional';
import type { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id';

interface UpdateSaleParams {
  saleId: string
  fields: {
    name?: string
    size?: string
    productId?: string
    customerId?: string
    amount?: number
    profit?: number
    status?: StatusType
  }
}

export class InMemorySalesRepository implements SalesRepository {

constructor(public sales: Sale[],  public products: Product[]){}

  async deleteById(saleId: UniqueEntityId): Promise<Sale | null> {
   const saleIndex =  this.sales.findIndex((sale) => sale.id.toString === saleId.toString)

   if(saleIndex >= 0){
    const deletedSale = this.sales[saleIndex]

    this.sales.splice(saleIndex, 1)

    return deletedSale || null
   }

   return null
  }

 async update(params: UpdateSaleParams): Promise<Sale | null> {
  let updatedSaleIndex = this.sales.findIndex((sale) => sale.id.toString === params.saleId)

  if(updatedSaleIndex >= 0){
    const updatedSale = this.sales[updatedSaleIndex]

    this.sales[updatedSaleIndex] = new Sale({
      id: updatedSale.id,
      name: params.fields.name ?? updatedSale.name,
      amount: params.fields.amount ?? updatedSale.amount,
      profit: params.fields.profit ?? updatedSale.profit,
      productId: params.fields.productId ?? updatedSale.productId,
      customerId: params.fields.customerId ?? updatedSale.customerId,
      createdAt: updatedSale.createdAt,
      status: new Status(params.fields.status ?? updatedSale.status.value),
      updatedAt: new Date(),
    })

    return this.sales[updatedSaleIndex]
  }

  return null
  }

  async getById(id: UniqueEntityId): Promise<Sale | null> {
    const sale = this.sales.find((item) => item.id.toString === id.toString)

    return sale ?? null
  }

 async create(params: Optional<Sale, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Sale> {
    const sale =  Sale.create({
      name: params.name,
      productId: params.productId,
      customerId: params.customerId,
      amount: params.amount,
      profit: params.profit,
      status: new Status('pending')
    })

    this.sales.push(sale)

    return sale
  }

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