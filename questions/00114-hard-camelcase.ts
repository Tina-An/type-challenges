/*
  114 - CamelCase
  -------
  by Anthony Fu (@antfu) #困难 #template-literal

  ### 题目

  实现 `CamelCase<T>` ，将 `snake_case` 类型的表示的字符串转换为 `camelCase` 的表示方式。

  例如

  ```ts
  type camelCase1 = CamelCase<"hello_world_with_types"> // 预期为 'helloWorldWithTypes'
  type camelCase2 = CamelCase<"HELLO_WORLD_WITH_TYPES"> // 期望与前一个相同
  ```

  > 在 Github 上查看：https://tsch.js.org/114/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Test<S extends string> = S extends `${infer First}${infer Last}`
  ? `${First}+${Last}`
  : `${S}:empty`

type test1 = Test<'foobar'> // 'f+oobar' First: 'f', Last: 'oobar'
type test2 = Test<'a'> // 'a+' Fisrt: 'a', Last: ''
type test3 = Test<''> // ':empty' Fisrt,Last并未被推断出，会走否定分支

type CapitalizeWord<S extends string> = S extends `${infer F}${infer Last}`
  ? `${Uppercase<F>}${Lowercase<Last>}`
  : ''

type CamelCaseItem<S extends string, B extends boolean> = S extends `\$${infer Last}`
  ? `_${Lowercase<S>}`
  : B extends true
    ? Lowercase<S>
    : CapitalizeWord<S>

type CamelCase<S extends string, B extends boolean = true> = S extends `${infer F}_${infer Last}`
  ? F extends ''
    ? Uppercase<Last> extends Lowercase<Last>
      ? `_${Last}`
      : `_${CamelCase<Last, B>}`
    : Uppercase<Last> extends Lowercase<Last>
      ? `${CamelCaseItem<F, B>}_${Last}`
      : `${CamelCaseItem<F, B>}${CamelCase<Last, false>}`
  : CamelCaseItem<S, B>

type t1 = CamelCase<'HELLO_WORLD_WITH_TYPES'>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo__bar'>, 'foo_Bar'>>,
  Expect<Equal<CamelCase<'foo_$bar'>, 'foo_$bar'>>,
  Expect<Equal<CamelCase<'foo_bar_'>, 'fooBar_'>>,
  Expect<Equal<CamelCase<'foo_bar__'>, 'fooBar__'>>,
  Expect<Equal<CamelCase<'foo_bar_$'>, 'fooBar_$'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/114/answer/zh-CN
  > 查看解答：https://tsch.js.org/114/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
