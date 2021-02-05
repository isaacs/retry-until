# retry-until

Just a way to keep calling a function as long as it's throwing, for some
period of time.

If the function returns a promise, it'll keep retrying the promise as long
as it keeps throwing, for the time specified.

## USAGE

```js
const retryUntil = require('retry-until')
const retryFor1Second = retryUntil(1000) // retry for 1 second
const retryFor10Seconds = retryUntil(10000) // retry for 10 seconds

// this will busy-loop calling the function as fast as it can for
// up to 1s, or until it returns without throwing, whichever comes first
retryFor1Second(syncFunctionThatSometimesThrowsForAWhile, 'some', 'args')

// this will keep re-calling the Promise-returning function as long as it
// keeps rejecting, or for 10s, whichever comes first
const result = await retryFor10Seconds(asyncFunctionThatSometimesRejects, 'some', 'other', 'args')
```

## API

* `retryUntil(duration) -> Function`

Returns a function that will take a function and some arguments, and then
run the function repeatedly for up to `duration` milliseconds.
