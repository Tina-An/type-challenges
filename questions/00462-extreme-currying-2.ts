/*
  462 - 柯里化 2
  -------
  by Kim (@hubvue) #地狱

  ### 题目

  [Currying](https://en.wikipedia.org/wiki/Currying) 是一种将带有多个参数的函数转换为每个带有一个参数的函数序列的技术。

  但是在前端的日常开发中，柯里化函数参数个数动态化却是非常常见的，例如 `Function.bind(this, [...params])`

  ```ts
  const func = (a: number, b: number, c: number) => {
    return a + b + c
  }

  const bindFunc = func(null, 1, 2)

  const result = bindFunc(3) // result: 6
  ```

  因此，在 `柯里化` 的基础上，我们更需要的是 `动态参数化的柯里化函数`

  ```ts
  const add = (a: number, b: number, c: number) => a + b + c
  const three = add(1, 1, 1)

  const curriedAdd = DynamicParamsCurrying(add)
  const six = curriedAdd(1, 2, 3)
  const seven = curriedAdd(1, 2)(4)
  const eight = curriedAdd(2)(3)(4)
  ```

  传递给 `DynamicParamsCurrying` 的函数可能有多个参数，您需要实现它的类型。

  在此挑战中，curriedAdd函数每次可接受最少一个参数，但是所有参数个数总和及类型与原函数相同。分配完所有参数后，它应返回其结果。

  > 在 Github 上查看：https://tsch.js.org/462/zh-CN
*/

/* _____________ 你的代码 _____________ */
// 这里关键需要理解的地方是：
// Prefix是某个函数参数列表中前缀参数类型
// 动态规划的思想是，第i个参数，是否作为某个函数参数列表中的最后一个参数的类型
// 当i是最后一个参数时，后面继续柯里化的函数中，就没有该类型以及之前的类型。
// 当i不做为最后一个参数时，后面继续柯里化的函数中，必定将该类型，作为前缀类型。
// 例如Args = [string, number, boolean]时，
// 第一步：((arg: string) => Curry<[number, boolean], R>) & Curry<[number, boolean], R, [string]>
type Curry<Args, Return, Prefix extends any[] = []> = 
  Args extends [infer First, ...infer Rest]
  ? Rest extends []
    ? (...args: [...Prefix, First]) => Return
    : ((...args: [...Prefix, First]) => Curry<Rest, Return>) & Curry<Rest, Return, [...Prefix, First]>
  : never

type t1 = Curry<[string, number], true>

declare function DynamicParamsCurrying<Args extends any[], Return>(fn: (...args: Args) => Return): Curry<Args, Return>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const curried0 = DynamicParamsCurrying((a: string) => true)
const curried1 = DynamicParamsCurrying((a: string, b: number, c: boolean) => true)
const curried2 = DynamicParamsCurrying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)

const curried1Return1 = curried1('123')(123)(true)
const curried1Return2 = curried1('123', 123)(false)
const curried1Return3 = curried1('123', 123, true)

const curried2Return1 = curried2('123')(123)(true)(false)(true)('123')(false)
const curried2Return2 = curried2('123', 123)(true, false)(true, '123')(false)
const curried2Return3 = curried2('123', 123)(true)(false)(true, '123', false)
const curried2Return4 = curried2('123', 123, true)(false, true, '123')(false)
const curried2Return5 = curried2('123', 123, true)(false)(true)('123')(false)
const curried2Return6 = curried2('123', 123, true, false)(true, '123', false)
const curried2Return7 = curried2('123', 123, true, false, true)('123', false)
const curried2Return8 = curried2('123', 123, true, false, true)('123')(false)
const curried2Return9 = curried2('123', 123, true, false, true, '123')(false)
const curried2Return10 = curried2('123', 123, true, false, true, '123', false)

// @ts-expect-error
const curried1ReturnWrong = curried1('123')(123)('wrong arg type')
// @ts-expect-error
const curried1ReturnWrong2 = curried1('123')()(123)(true)

type cases = [
  Expect<Equal< typeof curried1Return1, boolean>>,
  Expect<Equal< typeof curried1Return2, boolean>>,
  Expect<Equal< typeof curried1Return3, boolean>>,

  Expect<Equal< typeof curried2Return1, boolean>>,
  Expect<Equal< typeof curried2Return2, boolean>>,
  Expect<Equal< typeof curried2Return3, boolean>>,
  Expect<Equal< typeof curried2Return4, boolean>>,
  Expect<Equal< typeof curried2Return5, boolean>>,
  Expect<Equal< typeof curried2Return6, boolean>>,
  Expect<Equal< typeof curried2Return7, boolean>>,
  Expect<Equal< typeof curried2Return8, boolean>>,
  Expect<Equal< typeof curried2Return9, boolean>>,
  Expect<Equal< typeof curried2Return10, boolean>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/462/answer/zh-CN
  > 查看解答：https://tsch.js.org/462/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
