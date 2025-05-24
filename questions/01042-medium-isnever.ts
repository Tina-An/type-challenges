/*
  1042 - IsNever
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium #union #utils

  ### Question

  Implement a type IsNever, which takes input type `T`.
  If the type of resolves to `never`, return `true`, otherwise `false`.

  For example:

  ```ts
  type A = IsNever<never> // expected to be true
  type B = IsNever<undefined> // expected to be false
  type C = IsNever<null> // expected to be false
  type D = IsNever<[]> // expected to be false
  type E = IsNever<number> // expected to be false
  ```

  > View on GitHub: https://tsch.js.org/1042
*/

/* _____________ Your Code Here _____________ */

type t1 = never extends never ? 1 : 0 // 1
type t2 = any extends never ? 1 : 0 // 0 | 1
type t3 = string extends never ? 1 : 0 // 0
type t4 = '' extends never ? 1 : 0 // 0
type t5 = undefined extends never ? 1 : 0 // 0
type t6 = null extends never ? 1 : 0 // 0
type t7 = [] extends never ? 1 : 0 // 0

// 对T做包装
type IsNever<T> = [T] extends [never] ? true : false

// 如下定义时
// type IsNever<T> = T extends never ? true : false
// type t8 = IsNever<never> // never


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1042/answer
  > View solutions: https://tsch.js.org/1042/solutions
  > More Challenges: https://tsch.js.org
*/
