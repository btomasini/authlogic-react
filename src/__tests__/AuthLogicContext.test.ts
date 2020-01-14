import { getAuthLogicContext, IAuthLogicContextValue } from '../AuthLogicContext'

describe('AuthLogicContext', () => {

  let result: React.Context<IAuthLogicContextValue>

  beforeEach(() => {
    result = getAuthLogicContext()
    // We set this to determine that the subsequent call returns the same object
    result.displayName = 'test2'
  })

  it('returns valid context', () => {
    expect(result).toBeTruthy()
  })

  it('returns the same context', () => {
    const result2 = getAuthLogicContext()
    expect(result2.displayName).toEqual(result.displayName)
  })

})
