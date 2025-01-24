/*
  57 - 获得必需的属性
  -------
  by Zheeeng (@zheeeng) #困难 #utils #infer

  ### 题目

  实现高级工具类型 `GetRequired<T>`，该类型保留所有必需的属性

  例如

  ```ts
  type I = GetRequired<{ foo: number, bar?: string }> // expected to be { foo: number }
  ```

  > 在 Github 上查看：https://tsch.js.org/57/zh-CN
*/

/* _____________ 你的代码 _____________ */
type Sample<T> = {
  [K in keyof T]: T[K]
}
type Required<T> = {
  [K in keyof T]-?: T[K]
}
type test = "b2" extends ("boo" | 'b2') ? "boo" : never;

type a = number | undefined
type test0 = a extends number ? "boo" : never;
type test1<T> = T extends number ? T : never;
type t2 = test1<a>
const a1:a = 1
const a2:a = undefined


type GetRequired<T> = 
{
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
}
// { foo: number; bar: number; }
// { foo: number; bar?: number | undefined; }
type t = { foo: number, bar?: number }
type s1 = Sample<t>['bar']
type t1 = GetRequired<t>
type r1 = Required<t>['bar']
type z1 = s1 extends r1 ? 'yes': never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GetRequired<{ foo: number, bar?: string }>, { foo: number }>>,
  Expect<Equal<GetRequired<{ foo: undefined, bar?: undefined }>, { foo: undefined }>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/57/answer/zh-CN
  > 查看解答：https://tsch.js.org/57/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
