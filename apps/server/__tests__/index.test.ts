import { describe, it } from 'node:test';
import assert from 'node:assert';

import app from '../src/index';

describe('server', () => {
  it('should return a string', () => {
    assert.equal(app(), 'is-server');
  });
});
