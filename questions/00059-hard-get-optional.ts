/*
  59 - 获得可选属性
  -------
  by Zheeeng (@zheeeng) #困难 #utils #infer

  ### 题目

  实现高级工具类型 `GetOptional<T>`，该类型保留所有可选属性

  例如

  ```ts
  type I = GetOptional<{ foo: number, bar?: string }> // expected to be { bar?: string }
  ```

  > 在 Github 上查看：https://tsch.js.org/59/zh-CN
*/

/* _____________ 你的代码 _____________ */
type G1<T> = { [K in keyof T]: K };
type T1 = G1<{ foo: number, bar?: string }> // { foo: "foo"; bar?: "bar" | undefined; }

type G2<T> = { [K in keyof T]-?: K };
type T2 = G2<{ foo: number, bar?: string }> // { foo: "foo"; bar: "bar"; }
type T22 = T2["bar"]

type G3<T> = { [K in keyof T]: T[K] };
type T3 = G3<{ foo: number, bar?: string }> // { foo: number; bar?: string | undefined; }

type G4<T> = { [K in keyof T]-?: T[K] };
type T4 = G4<{ foo: number, bar?: string }> // { foo: number; bar: string; }
type T44 = T4["bar"]

type G5<T> = { [K in keyof T as T[K] extends Required<T>[K] ? never: K]: T[K] }
type T5 = G5<{ foo: number, bar?: string }> // { bar?: string | undefined; }

type G6<T> = { [K in keyof T as K extends G2<T>[K] ? never: K]: T[K] }
type T6 = G6<{ foo: number, bar?: string }> // {}










type Required<T> = {
  [P in keyof T]-?: T[P];
};

type GetOptional<T> = {[P in keyof T as T[P] extends Required<T>[P] ? never: P]: T[P]}
type t = GetOptional<{ foo: number, bar?: string }>

type t1 = Required<{ foo: number, bar?: string }>

type t2 = "foo" | undefined extends "foo" ? true : false

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GetOptional<{ foo: number, bar?: string }>, { bar?: string }>>,
  Expect<Equal<GetOptional<{ foo: undefined, bar?: undefined }>, { bar?: undefined }>>,
  Expect<Equal<{ bar?: string }, { bar?: string }>>,
  Expect<Equal<{ bar?: string }, { bar?: string | undefined }>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/59/answer/zh-CN
  > 查看解答：https://tsch.js.org/59/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
