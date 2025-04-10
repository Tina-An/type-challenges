/*
  89 - 必需的键
  -------
  by yituan (@yi-tuan) #困难 #utils

  ### 题目

  实现高级工具类型 `RequiredKeys<T>`，该类型返回 T 中所有必需属性的键组成的一个联合类型。

  例如

  ```ts
  type Result = RequiredKeys<{ foo: number; bar?: string }>
  // expected to be “foo”
  ```

  > 在 Github 上查看：https://tsch.js.org/89/zh-CN
*/

/* _____________ 你的代码 _____________ */
type Keys<T> = {
  [K in keyof T]: K
}
type t1 = Keys<{ a: number, b?: string }>

type AllKeys<T> = { [K in keyof T]-?: K }
type t2 = AllKeys<{ a: number, b?: string }>
// type RequiredKeys<T> = keyof {
//   [K in keyof T as Keys<T>[K] extends AllKeys<T>[K] ? K : never]: K
// }
type t3 = RequiredKeys<{ a: number, b?: string }>

type RequiredKeys<T> = keyof {
  [K in keyof T as { [P in keyof T]: P }[K] extends { [P in keyof T]-?: P }[K] ? K : never]: K
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<RequiredKeys<{ a: number, b?: string }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined, b?: undefined }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined, b?: undefined, c: string, d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<RequiredKeys<{}>, never>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/89/answer/zh-CN
  > 查看解答：https://tsch.js.org/89/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
