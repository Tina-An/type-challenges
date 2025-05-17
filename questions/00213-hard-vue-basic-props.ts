/*
  213 - Vue Basic Props
  -------
  by Anthony Fu (@antfu) #hard #vue #application

  ### Question

  **This challenge continues from [6 - Simple Vue](//tsch.js.org/6), you should finish that one first, and modify your code based on it to start this challenge**.

  In addition to the Simple Vue, we are now having a new `props` field in the options. This is a simplified version of Vue's `props` option. Here are some of the rules.

  `props` is an object containing each field as the key of the real props injected into `this`. The injected props will be accessible in all the context including `data`, `computed`, and `methods`.

  A prop will be defined either by a constructor or an object with a `type` field containing constructor(s).

  For example

  ```js
  props: {
    foo: Boolean
  }
  // or
  props: {
    foo: { type: Boolean }
  }
  ```

  should be inferred to `type Props = { foo: boolean }`.

  When passing multiple constructors, the type should be inferred to a union.

  ```ts
  props: {
    foo: { type: [Boolean, Number, String] }
  }
  // -->
  type Props = { foo: boolean | number | string }
  ```

  When an empty object is passed, the key should be inferred to `any`.

  For more specified cases, check out the Test Cases section.

  > `required`, `default`, and array props in Vue are not considered in this challenge.

  > View on GitHub: https://tsch.js.org/213
*/

/* _____________ Your Code Here _____________ */

type t1 = StringConstructor;
type t2 = NumberConstructor
type t3 = BooleanConstructor;
// {}表示任何非null非undefined值
// 因为所有基本类型都可以被自动装箱为对应的对象类型
// 所以 TypeScript 认为基本类型与 {} 兼容
type t4 = number extends {} ? '1' : '0'

// 函数声明，String、Number、Boolean都有函数声明
type F = {
  (): any;
}
// 可以new,也可以函数调用，函数调用时均返回对应的基本类型：string、number、boolean
const s1 = new String();
const s2 = String();

// T可能为StringConstructor、NumberConstructor、BooleanConstructor、typeof classA、RegExpConstructor、{}
type GetBasicType<T> = T extends { (): infer B; }
  ? B 
  : T extends { new (...value: any[]): infer C; }
    ? C
    : any

type GetPropType<T> = T extends { type: infer P}
      ? P extends Array<infer E>
        ? GetBasicType<E>
        : GetBasicType<P>
      : GetBasicType<T>

type GetProps<T> = {
  [K in keyof T]: GetPropType<T[K]>
}

type GetComputed<T> = {
  [K in keyof T]: T[K] extends () => infer R
    ? R
    : never
}

declare function VueBasicProps<P, D, C, M>(options: {
  props: P,
  data: (this: GetProps<P>) => D,
  computed: C & ThisType<D>,
  methods: M & ThisType<GetProps<P> & D & GetComputed<C> & M>,
}): any

/* _____________ Test Cases _____________ */
import type { Debug, Equal, Expect, IsAny } from '@type-challenges/utils'

type c = {
  (): string;
}

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
    propG: 1
  },
  data(this) {
    type PropsType = Debug<typeof this>
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>,
    ]

    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>,
      ]
    },
  },
})

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/213/answer
  > View solutions: https://tsch.js.org/213/solutions
  > More Challenges: https://tsch.js.org
*/

