/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium #object-keys

  ### Question

  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

  For example:

  ```ts
  type Foo = {
    [key: string]: any
    foo(): void
  }

  type A = RemoveIndexSignature<Foo> // expected { foo(): void }
  ```

  > View on GitHub: https://tsch.js.org/1367
*/

/* _____________ Your Code Here _____________ */
type t1 = string extends string ? true : false // true
type t2 = string extends 'boo' ? true : false // false
type t3 = 'boo' extends string ? true : false // true
// 不适用分配条件类型，因为(string | number)不是类型参数(即范型)
type t4 = (string | number) extends string ? true : false // false
type t5 = string extends (string | boolean) ? true : false // true
type t6 = 'boo' extends (string | boolean) ? true : false // true

type RemoveIndexSignature<T, P = PropertyKey> = {
  [K in keyof T as (P extends K ? true : false) extends false ? K : never]: T[K]
  // 其他答案
  // [K in keyof T as true extends (P extends K ? true : false) ? never : K]: T[K]
  // [K in keyof T as true extends (P extends K ? true : never) ? never : K]: T[K]
}

type T1 = RemoveIndexSignature<Foo>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void, 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void, baz: string }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1367/answer
  > View solutions: https://tsch.js.org/1367/solutions
  > More Challenges: https://tsch.js.org
*/
