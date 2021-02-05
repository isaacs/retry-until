const isFunction = f => typeof f === 'function'

const retryUntil = duration => (fn, ...args) => {
  let threw = true
  const start = Date.now()
  const catcher = er => {
    const left = duration + start - Date.now()
    if (left > 0)
      return retryUntil(left)(fn, ...args)
    else
      throw er
  }

  while (true) {
    try {
      const ret = fn(...args)
      threw = false
      return (ret && isFunction(ret.then) && isFunction(ret.catch))
        ? ret.catch(catcher)
        : ret
    } finally {
      if (threw && Date.now() - start < duration)
        continue
    }
  }
}
module.exports = retryUntil
