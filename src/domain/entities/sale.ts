import { Entity } from '@/core/entities/entity'
import type { Status } from './value-object/status'
import type { Optional } from '@/core/types/optional'
import type { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id'

interface SaleProps {
  id?: UniqueEntityId
  name: string
  productId: string
  customerId: string
  amount: number
  status: Status
  created_at: Date
  updated_at: Date
}

export class Sale extends Entity<SaleProps> {
  get name(): string {
    return this.props.name;
  }

  get productId(): string {
    return this.props.productId;
  }

  get customerId(): string {
    return this.props.customerId;
  }

  get amount(): number {
    return this.props.amount;
  }

  get status(): Status {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.created_at;
  }

  get updatedAt(): Date {
    return this.props.updated_at;
  }

  static create(props: Optional<SaleProps, "id" | "created_at" | "updated_at">){
     const sale = new Sale({
       ...props,
       created_at: new Date(),
       updated_at: new Date(),
     },
     props.id
   )
 
     return sale
   }
}