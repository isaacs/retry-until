const retryUntil = require('../')
const t = require('tap')

const poop = new Error('poopie')
const thrower = () => { throw poop }

const throwUntil = duration => {
  const start = Date.now()
  return (...args) => Date.now() - start < duration ? thrower() : args
}

const rejectUntil = duration => {
  const start = Date.now()
  return async (...args) => Date.now() - start < duration ? thrower() : args
}

t.test('retry for a while', async t => {
  t.strictSame(retryUntil(1000)(throwUntil(100), 1, 2, 3), [1, 2, 3])
  t.strictSame(await retryUntil(1000)(rejectUntil(100), 1, 2, 3), [1, 2, 3])
})

t.test('retry but not long enough', async t => {
  t.throws(() => retryUntil(100)(throwUntil(1000), 1, 2, 3), poop)
  await t.rejects(retryUntil(100)(rejectUntil(1000), 1, 2, 3), poop)
})
