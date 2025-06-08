/*
  476 - Sum
  -------
  by null (@uid11) #extreme #math #template-literal

  ### Question

  Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.

  For example,

  ```ts
  type T0 = Sum<2, 3> // '5'
  type T1 = Sum<'13', '21'> // '34'
  type T2 = Sum<'328', 7> // '335'
  type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
  ```

  > View on GitHub: https://tsch.js.org/476
*/

/* _____________ Your Code Here _____________ */
// 328
//   7
type DA = {
  0: [],
  1: [1],
  2: [1,1],
  3: [1,1,1],
  4: [1,1,1,1],
  5: [1,1,1,1,1],
  6: [1,1,1,1,1,1],
  7: [1,1,1,1,1,1,1],
  8: [1,1,1,1,1,1,1,1],
  9: [1,1,1,1,1,1,1,1,1],
  [K: number]: number[]
}

type GetSingle<T extends number[]> = T extends [...DA[9], 1, ...infer Rest extends number[]]
  ? Rest['length']
  : T['length'] extends number ? T['length'] : 0

type GetTen<T extends number[]> = T extends [...DA[9], 1, ...infer Rest extends number[]]
  ? 1
  : 0

type Reverse<S extends string> = `${S}` extends `${infer F}${infer R}`
  ? `${Reverse<R>}${F}`
  : ''

type SumStr<M extends string, N extends string, C extends number = 0> = 
  `${M}` extends `${infer D1 extends number}${infer P1}`
  ? `${N}` extends `${infer D2 extends number}${infer P2}`
    ? `${SumStr<P1,P2,GetTen<[...DA[D1], ...DA[D2], ...DA[C]]>>}${GetSingle<[...DA[D1], ...DA[D2], ...DA[C]]>}`
    : `${SumStr<P1,'',GetTen<[...DA[D1], ...DA[C]]>>}${GetSingle<[...DA[D1], ...DA[C]]>}`
  : `${N}` extends `${infer D2 extends number}${infer P2}`
    ? `${SumStr<'',P2,GetTen<[...DA[D2], ...DA[C]]>>}${GetSingle<[...DA[D2], ...DA[C]]>}`
    : C extends 0 ? '' :`${C}`

type Sum<A extends string | number | bigint, B extends string | number | bigint> = `${A}` extends `${infer M extends number}`
  ? `${B}` extends `${infer N extends number}`
    ? SumStr<Reverse<`${M}`>, Reverse<`${N}`>>
    : never
  : never

type t1 = Sum<12, 3>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/476/answer
  > View solutions: https://tsch.js.org/476/solutions
  > More Challenges: https://tsch.js.org
*/

