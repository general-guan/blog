# extends 的作用

### 继承

##### 接口继承

```ts
interface T1 {
  name: string;
}

interface T2 {
  age: number;
}

// 多重继承，逗号隔开
interface T3 extends T1, T2 {
  gender: string;
}
// T3 => { name: string; age: number, gender: string }

const t3: T3 = {
  name: "111",
  gender: "1",
  age: 1,
};
```

##### 继承父类的方法和属性

```ts
class Animal {
  name = "animal";
  constructor(name: string) {
    this.name = name;
  }

  getName() {
    console.log(this.name);
  }
}

class Dog extends Animal {
  getAction() {
    console.log("run");
  }
}

const dog = new Dog("dog");
dog.getName(); // "dog"
dog.getAction(); // "run"
```

### 条件判断

条件判断就是用来判断一个类型是不是可以分配给另一个类型，这在写高级类型的时候非常有用

```ts
type Animal = {
  name: string;
};
type Dog = {
  name: string;
};
type Bool = Dog extends Animal ? "yes" : "no"; //  'yes'
type Bool = Animal extends Dog ? "yes" : "no"; //  'yes'
```

这是因为 Animal 和 Dog 的类型完全相同，或者说 Animal 类型的一切约束条件，Dog 都具备；换言之，类型为 Animal 的值可以分配给类型为 Dog 的值，反之亦然

需要理解的是，这里 A extends B，是指类型 A 可以分配给类型 B，而不是说类型 A 是类型 B 的子集

```ts
type Animal = {
  name: string;
};
type Dog = {
  name: string;
  action: string;
};
type Bool = Animal extends Dog ? "yes" : "no"; //  'no'
type Bool = Dog extends Animal ? "yes" : "no"; //  'yes'
```

当我们给 Dog 加上一个 action 属性，发现此时 Bool 是 no，这是因为 Animal 没有类型为 string 的 action 属性，类型 Animal 不满足类型 Dog 的类型约束

因此，A extends B，是指类型 A 可以分配给类型 B，而不是说类型 A 是类型 B 的子集，理解 extends 在类型三元表达式里的用法非常重要

再看一个例子

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  action: string;
}

type Bool = Animal extends Dog ? "yes" : "no"; //  'no'
type Bool = Dog extends Animal ? "yes" : "no"; //  'yes'
```

简单来说，如果 extends 前面的类型能够赋值给 extends 后面的类型，那么表达式判断为真，否则为假

上面的示例中，Dog 是 Animal 的子类，父类比子类的限制更少，能满足子类，则一定能满足父类，Dog 类型的值可以赋值给 Animal 类型的值，判断为真

### 泛型条件判断

```ts
type A1 = "x" extends "x" ? string : number; // string
type A2 = "x" | "y" extends "x" ? string : number; // number

type P<T> = T extends "x" ? string : number;
type A3 = P<"x" | "y">; // string | number
```

A1 和 A2 是 extends 条件判断的普通用法，和上面的判断方法一样

P 是带参数 T 的泛型类型，其表达式和 A1，A2 的形式完全相同，A3 是泛型类型 P 传入参数’x’ | 'y’得到的类型，A3 和 A2 的类型相似，但是结果不同，出现这个结果的原因是所谓的**分配条件类型**

> 对于使用 extends 关键字的条件类型（即上面的三元表达式类型），如果 extends 前面的参数是一个泛型类型，当传入该参数的是联合类型，则使用分配律计算最终的结果，分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果

总之，满足两个要点即可适用分配律：

1. 参数是泛型类型，
2. 代入参数的是联合类型

在泛型的条件判断中还有些特殊的情况

#### 特殊的 never

```ts
// never是所有类型的子类型
type A1 = never extends "x" ? string : number; // string

type P<T> = T extends "x" ? string : number;
type A2 = P<never>; // never
```

never 被认为是空的联合类型，也就是说，没有联合项的联合类型，所以还是满足上面的分配律，然而因为没有联合项可以分配，所以 P 的表达式其实根本就没有执行，所以 A2 的定义也就类似于永远没有返回的函数一样，是 never 类型的

#### 防止条件判断中的分配

```ts
type P<T> = [T] extends ["x"] ? string : number;
type A1 = P<"x" | "y">; // number
type A2 = P<never>; // string
```

在条件判断类型的定义中，将泛型参数使用[]括起来，即可阻断条件判断类型的分配，此时，传入参数 T 的类型将被当做一个整体，不再分配

### 泛型约束

在书写泛型的时候，我们往往需要对类型参数作一定的限制

```ts
interface Person {
  name: string;
  age: number;
  gender: string;
}

class Student {
  constructor(private info: Person) {}

  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
}

const student = new Student({
  name: "uuuu",
  age: 20,
  gender: "male",
});
const test = student.getInfo("name");
console.log(test); // "uuuu"
```

这里 extends 对传入的参数作了一个限制，参数必须是 Person 的成员名的联合类型，避免传入其他 key
