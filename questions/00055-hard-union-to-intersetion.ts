/*
  55 - 联合类型转化为交叉类型
  -------
  by Zheeeng (@zheeeng) #困难 #utils #infer

  ### 题目

  实现高级工具类型 `UnionToIntersection<U>`

  例如

  ```ts
  type I = UnionToIntersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
  ```

  > 在 Github 上查看：https://tsch.js.org/55/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type UnionToIntersection<U> = any
type UnionToIntersection<U> = (U extends any ? (arg: U) => void : never) extends ((arg: infer I) => void) ? I : never

type A = any
type X = any
type Y = any

type T1<U> = U extends A ? X : Y // U = T1 | T2
// T1 extends A ? X : Y | T2 extends A ? X : Y

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type t1 = 'foo' & 42 & true;
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"]; // number

// 索引类型本身是一种类型，可以使用联合类型、keyof表达式或其他类型
type I1 = Person["age" | "name"]; // string

type I2 = Person[keyof Person];

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/55/answer/zh-CN
  > 查看解答：https://tsch.js.org/55/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
