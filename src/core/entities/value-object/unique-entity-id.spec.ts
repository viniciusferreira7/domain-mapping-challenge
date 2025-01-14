import { UniqueEntityId } from './unique-entity-id'

describe("Unique entity ID", ()=> {
  it("should be able to get ID", () => {
    const id = new UniqueEntityId().toString

    expect(id).toEqual(expect.any(String))
  })
})