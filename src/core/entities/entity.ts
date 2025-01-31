import { UniqueEntityId } from './value-object/unique-entity-id';

export abstract class Entity<Props> {
  private _id: UniqueEntityId
  protected props: Props

  get id(){
    return this._id
  }

  constructor(props: Props, id?: UniqueEntityId){
    this.props = props
    this._id = id ?? new UniqueEntityId()
  }
}