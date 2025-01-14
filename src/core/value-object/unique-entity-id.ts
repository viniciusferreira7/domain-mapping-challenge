import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  private value: string

  get toString(){
    return this.value.toString()
  }

  get toValue(){
    return this.value
  }

  constructor(value?: string){
    this.value = value ?? randomUUID()
  }
}