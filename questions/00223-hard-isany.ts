/*
  223 - IsAny
  -------
  by Pavel Glushkov (@pashutk) #hard #utils

  ### Question

  Sometimes it's useful to detect if you have a value with `any` type. This is especially helpful while working with third-party Typescript modules, which can export `any` values in the module API. It's also good to know about `any` when you're suppressing implicitAny checks.

  So, let's write a utility type `IsAny<T>`, which takes input type `T`. If `T` is `any`, return `true`, otherwise, return `false`.

  > View on GitHub: https://tsch.js.org/223
*/

/* _____________ Your Code Here _____________ */

type IsAny<T> = 0 extends (1 & T) ? true : false

// any类型变量可以赋值给任何类型，unknown类型变量只能赋值给any或unknown类型
type t1 = any extends string ? '1' : '0'       // '1' | '0'
type t2 = string extends string ? '1' : '0'    // '1'
type t3 = undefined extends string ? '1' : '0' // '0'
type t4 = unknown extends string ? '1' : '0'   // '0'
type t5 = never extends string ? '1' : '0'     // '1'
type t6 = {} extends string ? '1' : '0'        // '0'
type t7 = String extends string ? '1' : '0'    // '0'

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsAny<any>, true>>,

  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/223/answer
  > View solutions: https://tsch.js.org/223/solutions
  > More Challenges: https://tsch.js.org
*/
