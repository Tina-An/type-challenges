/*
  1097 - IsUnion
  -------
  by null (@bencor) #medium #union

  ### Question

  Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.

  For example:

  ```ts
  type case1 = IsUnion<string> // false
  type case2 = IsUnion<string | number> // true
  type case3 = IsUnion<[string | number]> // false
  ```

  > View on GitHub: https://tsch.js.org/1097
*/

/* _____________ Your Code Here _____________ */

// T extends any时，进行了分配条件类型，T = string | number
// T extends any ? A[T] : B
// (string extends any ? A[string] : B) | (number extends any ? A[number] : B)
// A[string] | A[number]
// ([string|number] extends [string] ? false : true) | ([string|number] extends [number] ? false : true)
// true | true => true
type IsUnion<T, U = T> = [T] extends [never] 
  ? false 
  : T extends any
      ? [U] extends [T]
        ? false
        : true
      : never

// 当T = string | 'a'时
// TS在进行分配条件类型时，进行了优化，首先将T推断为了string，也就没有进行分配再联合，
// 仅有string extends any ? A[string] : b
// [string] extends [string] ? false : true => false
// number | 0同理

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<number | 'a'>, true>>,
  Expect<Equal<IsUnion<number | 0>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1097/answer
  > View solutions: https://tsch.js.org/1097/solutions
  > More Challenges: https://tsch.js.org
*/

