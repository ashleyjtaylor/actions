import { describe, it } from 'node:test';
import assert from 'node:assert';

import app from '../src/index';

describe('client', () => {
  it('should return a total', () => {
    assert.equal(app().total, 15);
  });
});
