import { describe, it } from 'node:test'
import assert from 'node:assert'

import * as math from '../src/index'

describe(() => {
  it('should add', () => {
    assert.equal(math.add([2, 2]), 4)
  })

  it('should subtract', () => {
    assert.equal(math.subtract([2, 2]), 0)
  })

  it('should multiply', () => {
    assert.equal(math.multiply([2, 2]), 4)
  })

  it('should divide', () => {
    assert.equal(math.divide([2, 2]), 1)
  })
})
