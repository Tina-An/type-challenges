/*
  216 - Slice
  -------
  by Anthony Fu (@antfu) #地狱 #array

  ### 题目

  Implement the JavaScript `Array.slice` function in the type system. `Slice<Arr, Start, End>` takes the three argument. The output should be a subarray of `Arr` from index `Start` to `End`. Indexes with negative numbers should be counted from reversely.

  For example

  ```ts
  type Arr = [1, 2, 3, 4, 5]
  type Result = Slice<Arr, 2, 4> // expected to be [3, 4]
  ```

  > 在 Github 上查看：https://tsch.js.org/216/zh-CN
*/

/* _____________ 你的代码 _____________ */
// 利用[...infer R]推断和extends进行取值
// 当Start和End为合法时，Result = [0,1,...end) - [0,1,...start)
// 由此可以使用[0,end) extends [...[0,start), ...Rest]时,结果就是Rest
// 用GetN<A,N,_A=[]>表示[0,N),当_A.length=N时，返回_A，不取A[N]
// 也就是当N表示为数量时，Get<A,N>，为[0，1，...,N-1],满足[0,N)左闭右开区间
type GetFisrtNElement<A extends any[], N extends number, _A extends any[] = []> =
  _A['length'] extends N | A['length']
    ? _A
    : GetFisrtNElement<A, N, [..._A, A[_A['length']]]>

// 当N为负数时找到对应的正数位置，例如A[1,2,3,4,5]，找-2位置为，3(从0下标开始),即A[-2],代表A[3],
// 借用Slice<A,2>.length = 3
type ToPositive<A extends any[], N extends number> =
  `${N}` extends `-${infer P extends number}`
    ? Slice<A,P>['length']
    : N

type Slice<A extends any[], S extends number = 0, E extends number = A['length']> =
  GetFisrtNElement<A,ToPositive<A,E>> extends [...GetFisrtNElement<A,ToPositive<A,S>>, ...infer Rest]
    ? Rest
    : []

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Arr = [1, 2, 3, 4, 5]
type t1 = Slice<Arr, 2,4>

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/216/answer/zh-CN
  > 查看解答：https://tsch.js.org/216/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

