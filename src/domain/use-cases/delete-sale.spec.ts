import { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id'
import { Sale } from '../entities/sale'
import { InMemorySalesRepository } from '../repositories/in-memory/in-memory-sales-repository'
import { DeleteSale } from './delete-sale'
import { Status } from '../entities/value-object/status'
import { Product } from '../entities/product'
import { ResourceNotFound } from '../error/resource-not-found'

let products: Product[] = []

let sales: Sale[] = []

let salesRepository: InMemorySalesRepository

let sut: DeleteSale

describe('Delete sale', () => {
    beforeEach(() => {
        products = [
           Product.create({
             id: new UniqueEntityId("1"),
             name: "T-Shirt",
             size: "M",
             color: "Blue",
             amount: 15,
             prize: 7500,
             min_amount: 10,
           }),
         ]
   
       sales.push(Sale.create({
         id: new UniqueEntityId("1"),
         name: "sale-1",
         amount: 10,
         profit: products[0].prize * 10,
         productId: "1",
         customerId: "customer-1",
         status: new Status("pending"),
       }))
   
       salesRepository = new InMemorySalesRepository(sales, products)
       sut = new DeleteSale(salesRepository)
     })

     it('should be able to delete a sale', async () => {
        const { sale } = await sut.execute({
          saleId: '1'
        })

        expect(sales).toHaveLength(0)
        expect(sale).toEqual(expect.objectContaining(
          {
            props: expect.objectContaining({
              name: 'sale-1',
              productId: "1",
              customerId: "customer-1",
              status: new Status('pending'),
              profit: expect.any(Number),
              amount: 10,
              createdAt: expect.any(Date),
              updatedAt: expect.any(Date),
            })
          },
        ))
     })

     it('should not able to delete a sale with non-existing sale', async ()=> {
        await expect(() => sut.execute({
          saleId: 'non-existing-sale'
        })).rejects.toBeInstanceOf(ResourceNotFound)
     })
})