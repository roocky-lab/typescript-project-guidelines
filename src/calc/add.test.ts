/* eslint-env mocha */
import add from './add'
import assert = require('assert')

describe('src/calc/add.ts', function (): void {
  it('1 + 1 = 2', (): void => {
    assert(add(1, 1) === 2)
  })
})
