import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/value-object/unique-entity-id'
import type { Optional } from '@/core/types/optional'

interface ProductProps {
  id?: UniqueEntityId
  name: string
  size: string
  color: string
  amount: number
  prize: number
  min_amount: number
  createdAt: Date
  updatedAt?: Date
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name;
  }

  get size() {
    return this.props.size;
  }

  get color() {
    return this.props.color;
  }

  get amount() {
    return this.props.amount;
  }

  get prize(){
    return this.props.prize
  }

  get min_amount() {
    return this.props.min_amount;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: Optional<ProductProps, "id" | "createdAt" | "updatedAt">){
    const product = new Product({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    props.id
  )

    return product
  }
}