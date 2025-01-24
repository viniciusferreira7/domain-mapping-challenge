import { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id';
import type { Sale } from '../entities/sale';
import { InvalidSale } from '../error/invalid-sale';
import { ResourceNotFound } from '../error/resource-not-found';
import type { ProductRepository } from '../repositories/product-repository';
import type { SalesRepository } from '../repositories/sales-repository';
import { Status, type StatusType } from '../entities/value-object/status';

interface UpdateSaleUseCaseRequest {
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

interface UpdateSaleUseCaseResponse {
  sale: Sale | null
}

export class UpdateSale {
  constructor(
    private salesRepository: SalesRepository,
    private productsRepository: ProductRepository){}

  async execute({ 
    saleId,
    fields
   }: UpdateSaleUseCaseRequest): Promise<UpdateSaleUseCaseResponse>{
    const oldSale = await this.salesRepository.getById(new UniqueEntityId(saleId))

    if(!oldSale){
      throw new ResourceNotFound()
    }
    
    const product = await this.productsRepository.get(new UniqueEntityId(fields.productId ?? oldSale.productId))

    if(!product){
      throw new ResourceNotFound()
    }

    let status: StatusType = oldSale.status.value

    if(fields.status){
      switch (fields.status){
        case 'pending':
          status = 'pending'
        case 'processing':
          status = Status.approve(oldSale.status.value).value
        case 'canceled':
          status = Status.cancel(oldSale.status.value).value
        case 'delivering':
          status = Status.dispatch(oldSale.status.value).value
        case 'delivered':
          status = Status.deliver(oldSale.status.value).value
      }
    }

    const updatedSale = await this.salesRepository.update({
      saleId: oldSale.id.toString,
      fields: {
        name: fields.name,
        size: fields.size,
        productId: fields.productId,
        customerId: fields.customerId,
        amount: fields.amount,
        profit: fields.profit,
        status: status,
      }
    })

    return { sale: updatedSale }

  }

}