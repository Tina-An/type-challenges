/*
  274 - Integers Comparator
  -------
  by Pig Fang (@g-plane) #地狱 #template-literal #math

  ### 题目

  Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:

  - If `a` is greater than `b`, type should be `Comparison.Greater`.
  - If `a` and `b` are equal, type should be `Comparison.Equal`.
  - If `a` is lower than `b`, type should be `Comparison.Lower`.

  **Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**

  > 在 Github 上查看：https://tsch.js.org/274/zh-CN
*/

/* _____________ 你的代码 _____________ */

enum Comparison {
  Greater,
  Equal,
  Lower,
}

/*
// 思路一，通过构造数组，通过ArrayA extends [...ArrayB, ...infer R]，区分数组长度，从而区分数字大小
// -----仅能比较正数类型数字大小，且数字不能超过999-----
type IsPositive<T extends number> = `${T}` extends `-${infer P extends number}`
  ? false
  : true

type GetPositive<T extends number> = `${T}` extends `-${infer P extends number}`
  ? P
  : T

type GetList<T extends number, _A extends any[] = []> = 
  _A['length'] extends T
    ? _A
    : GetList<T,[..._A, 1]>

type ComparePositive<A extends number, B extends number> = 
  A extends B
    ? Comparison.Equal
    : GetList<A> extends [...GetList<B>, ...infer Rest]
        ? Comparison.Greater
        : Comparison.Lower

type Comparator<A extends number, B extends number> = IsPositive<A> extends true
  ? IsPositive<B> extends true
      ? ComparePositive<A, B>
      : Comparison.Greater
  : IsPositive<B> extends true
      ? Comparison.Lower
      : ComparePositive<GetPositive<B>, GetPositive<A>>

// Type instantiation is excessively deep and possibly infinite.
// 递归次数最大1000，T超过999，TS就无法正确递归判断出结果了，此时t1为any
// type t1 = GetList<1000>['length'] // any
// type t1 = GetList<999>['length'] // 999
*/

// 思路二，利用模版字符串，逐个比较数字大小
type IsPositive<T extends number> = `${T}` extends `-${infer P extends number}`
  ? false
  : true

type GetPositive<T extends number> = `${T}` extends `-${infer P extends number}`
  ? P
  : T

type GetIntegerPart<T extends number> = `${T}` extends `${infer I extends number}.${infer F extends number}`
  ? I
  : T

type GetFractionalPart<T extends number> = `${T}` extends `${infer I extends number}.${infer F extends number}`
  ? F
  : 0

type GetDigitLen<T extends string, _A extends any[] = [1]> = T extends `${infer F extends number}${infer L}`
  ? L extends ''
      ? _A['length']
      : GetDigitLen<L,[..._A, 1]>
  : _A['length']

type GetList<T extends number, _A extends any[] = []> = 
  _A['length'] extends T
    ? _A
    : GetList<T,[..._A, 1]>

type CompareInteger<A extends number, B extends number> = 
  A extends B
    ? Comparison.Equal
    : GetList<A> extends [...GetList<B>, ...infer Rest]
        ? Comparison.Greater
        : Comparison.Lower

type CompareByDigital<A extends string, B extends string> = 
  A extends `${infer FA extends number}${infer RA}`
    ? B extends `${infer FB extends number}${infer RB}`
        ? CompareInteger<FA,FB> extends Comparison.Equal
            ? CompareByDigital<RA, RB>
            : CompareInteger<FA,FB>
        : never
    : never

type ComparePositive<A extends number, B extends number,
  X1 extends number = GetIntegerPart<A>, Y1 extends number = GetFractionalPart<A>,
  X2 extends number = GetIntegerPart<B>, Y2 extends number = GetFractionalPart<B>,
  CI = CompareInteger<GetDigitLen<`${X1}`>,GetDigitLen<`${X2}`>>,
  CF = CompareInteger<GetDigitLen<`${Y1}`>,GetDigitLen<`${Y2}`>>> = 
  A extends B
    ? Comparison.Equal
    : CI extends Comparison.Equal
        ? X1 extends X2
            ? CF extends Comparison.Equal
                ? Y1 extends Y2
                    ? Comparison.Equal
                    : CompareByDigital<`${Y1}`, `${Y2}`>
                : CF
            : CompareByDigital<`${X1}`, `${X2}`>
        : CI

type Comparator<A extends number, B extends number> = IsPositive<A> extends true
  ? IsPositive<B> extends true
      ? ComparePositive<A, B>
      : Comparison.Greater
  : IsPositive<B> extends true
      ? Comparison.Lower
      : ComparePositive<GetPositive<B>, GetPositive<A>>


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>>,
  Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>>,
  Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>,
  Expect<Equal<Comparator<3.1415, 3.1415>, Comparison.Equal>>,
  Expect<Equal<Comparator<3.1415, 3.1414>, Comparison.Greater>>,
  Expect<Equal<Comparator<0, 3.1414>, Comparison.Lower>>,
  Expect<Equal<Comparator<31.415, 3.1415>, Comparison.Greater>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/274/answer/zh-CN
  > 查看解答：https://tsch.js.org/274/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

