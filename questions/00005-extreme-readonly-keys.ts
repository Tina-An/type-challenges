/*
  5 - 获取只读属性
  -------
  by Anthony Fu (@antfu) #地狱 #utils #object-keys

  ### 题目

  实现泛型`GetReadonlyKeys<T>`，`GetReadonlyKeys<T>`返回由对象 T 所有只读属性的键组成的联合类型。

  例如

  ```ts
  interface Todo {
    readonly title: string
    readonly description: string
    completed: boolean
  }

  type Keys = GetReadonlyKeys<Todo> // expected to be "title" | "description"
  ```

  > 在 Github 上查看：https://tsch.js.org/5/zh-CN
*/

/* _____________ 你的代码 _____________ */

type GetReadonlyKeys<T> = {
  [K in keyof T]-? : Equal<{[r in K]: T[r]}, {-readonly[r in K]: T[r]}> extends true ? never : K
}[keyof T]

type C = GetReadonlyKeys<B>;

type B = {
  a?: boolean;
}

type GetKeys1<T> = [keyof T];
type K1 = GetKeys1<B>; // ["a"]

type GetKeys2<T> = {
  [K in keyof T]-? : K
};
type K2 = GetKeys2<B>; // { a?: "a" | undefined; }

type GetKeys3<T> = {
  [K in keyof T] : K
}[keyof T];
type K3 = GetKeys3<B>; // "a" | undefined

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>,
]

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  readonly description: string
  completed?: boolean
}

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/5/answer/zh-CN
  > 查看解答：https://tsch.js.org/5/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
