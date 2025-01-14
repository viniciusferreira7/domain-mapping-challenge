import { InvalidStatus } from '@/domain/error/invalid-status'
import { Status } from './status'

describe("Status", () => {

  it('should be able to change status to processing', () => {
    const status = Status.approve("pending")

    expect(status.value).toBe("processing")
  })

  it('should be able to change status to canceled', () => {
    expect(Status.cancel("pending").value).toBe("canceled")
    expect(Status.cancel("processing").value).toBe("canceled")
  })

  it('should be able to change status to delivering', () => {
    const status = Status.dispatch("processing")

    expect(status.value).toBe("delivering")
  })

  it('should be able to change status to delivered', () => {
    const status = Status.deliver("delivering")

    expect(status.value).toBe("delivered")
  })

  it('should not able to change status to processing with status is not pending', ()=> {
    expect(() => Status.approve("canceled")).toThrow(InvalidStatus)
  })

  it('should not able to change status to canceled with status is not pending or processing', ()=> {
    expect(() => Status.cancel("delivering")).toThrow(InvalidStatus)
  })

  it('should not able to change status to delivering with status is not processing', ()=> {
    expect(() => Status.dispatch("delivering")).toThrow(InvalidStatus)
  })

  it('should not able to change status to delivered with status is not delivering', ()=> {
    expect(() => Status.deliver("pending")).toThrow(InvalidStatus)
  })
})