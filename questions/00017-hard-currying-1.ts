/*
  17 - 柯里化 1
  -------
  by Anthony Fu (@antfu) #困难 #array

  ### 题目

  > 在此挑战中建议使用TypeScript 4.0

  [柯里化](https://en.wikipedia.org/wiki/Currying) 是一种将带有多个参数的函数转换为每个带有一个参数的函数序列的技术。

  例如：

  ```ts
  const add = (a: number, b: number) => a + b
  const three = add(1, 2)

  const curriedAdd = Currying(add)
  const five = curriedAdd(2)(3)
  ```

  传递给 `Currying` 的函数可能有多个参数，您需要正确输入它的类型。

  在此挑战中，柯里化后的函数每次仅接受一个参数。接受完所有参数后，它应返回其结果。

  > 在 Github 上查看：https://tsch.js.org/17/zh-CN
*/

/* _____________ 你的代码 _____________ */
// 函数入参的类型推断
declare function getValue<T>(x: T): T
const v1 = getValue('123'); // '123'
// same as
const v11 = getValue('123' as const);
type cases1 = [
  Expect<Equal<typeof v1, typeof v11>>,
]
const v2 = getValue(123); // 123
type cases2 = [
  Expect<Equal<typeof v1, '123'>>,
  Expect<Equal<typeof v2, 123>>,
]

// 关于const常量的类型推断
const v12 = 'test';
let v13 = 'test';
const v14 = { a: 123 };
type t11 = typeof v11; // '123'
type t12 = typeof v12; // 'test'
type t13 = typeof v13; // string
type t14 = typeof v14; // { a: number }

// answer1
// type CurryingReturn<T extends Function> = T extends (a: infer A) => infer R ? T : 
//   T extends (...args: [infer F, ...infer L]) => infer R ? (arg: F) => CurryingReturn<(...args: L) => R> : T

// answer2
type FirstAsTuple<T> = T extends [any, ...infer R]
  ? T extends [...infer F, ...R]
    ? F
    : never
  : never
type CurryingReturn<F> = F extends (...args: infer Args) => infer Return 
  ? Args['length'] extends 0 | 1
    ? F
    : Args extends [any, ...infer Rest] ? (...arg: FirstAsTuple<Args>) => CurryingReturn<(...args: Rest) => Return> : never
  : never

declare function Currying<T extends Function>(fn: T): CurryingReturn<T>
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<
    typeof curried1,
(a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2,
(a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
  Expect<Equal<typeof curried3, () => true>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/17/answer/zh-CN
  > 查看解答：https://tsch.js.org/17/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
