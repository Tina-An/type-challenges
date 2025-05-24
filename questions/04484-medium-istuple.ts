/*
  4484 - IsTuple
  -------
  by jiangshan (@jiangshanmeta) #medium #tuple

  ### Question

  Implement a type ```IsTuple```, which takes an input type ```T``` and returns whether ```T``` is tuple type.

  For example:

  ```typescript
  type case1 = IsTuple<[number]> // true
  type case2 = IsTuple<readonly [number]> // true
  type case3 = IsTuple<number[]> // false
  ```

  > View on GitHub: https://tsch.js.org/4484
*/

/* _____________ Your Code Here _____________ */

type t1 = [number] extends number[] ? 1 : 0 // 1
type t2 = number[] extends [number] ? 1 : 0 // 0
type t3 = number[] extends number[] ? 1 : 0 // 1
type t4 = [number] extends [number] ? 1 : 0 // 1

type RemoveReadonly<T> = T extends (readonly [...infer A])
  ? [...A]
  : T
type t5 = RemoveReadonly<readonly [1]> // [1]
type t6 = RemoveReadonly<readonly number[]> // number[]
type t7 = RemoveReadonly<readonly [string,number]> // [string,number]
type t8 = RemoveReadonly<never> // never

type t9 = number[] extends [infer F, ...infer A] ? 1 : 0 // 0
type t10 = never extends [infer F, ...infer A] ? [F, ...A] : 0 // [unknown, ...unknown[]]
// readonly 修饰符的兼容性
// TypeScript 允许可变类型赋值给只读类型（即 T[] 可以赋值给 readonly T[]），因为只读类型是一个更严格的约束，不会破坏类型安全。
// 反过来则不允许（readonly T[] 不能赋值给 T[]），因为这会绕过只读限制
type t11 = [1] extends (readonly [1]) ? 1 :0 // 1
type t12 = (readonly [1]) extends [1] ? 1 :0 // 0
type t13 = [] extends never ? 1 : 0 // 0

type IsTuple<T> = RemoveReadonly<T> extends [infer F, ...infer R]
  ? [F, ...R] extends RemoveReadonly<T> ? true : false
  : RemoveReadonly<T> extends [] ? true : false

// 当想简化IsTuple时
// type IsTuple<T, P = RemoveReadonly<T>> = P extends [infer F, ...infer R] ... 
// 替换其中的所有RemoveReadonly<T>
// 会发现IsTuple<never> = never,这是因为，当T为never，参与extends时，返回值都为never
// 如果参与extends时左侧条件T被包装了，就可以正常参与类型条件判断
type Test1<T> = [T] // T为never时，结果为[never]
type Test2<T> = T | string // T为never时，结果为string
type Test3<T> = T extends any ? 1 : 0 // T为never时，结果为never
type Test4<T> = T extends never ? 1 : 0 // T为never时，结果为never
type Test5<T> = [T] extends [never] ? 1 : 0 // T为never时，结果为1
type t21 = Test5<never>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsTuple<readonly []>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4484/answer
  > View solutions: https://tsch.js.org/4484/solutions
  > More Challenges: https://tsch.js.org
*/
