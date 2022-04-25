# 高级类型

## 联合类型

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

## 类型别名

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
```

## 字符串字面量类型

```ts
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'

// index.ts(7,47): error TS2345: Argument of type '"dblclick"' is not assignable to parameter of type 'EventNames'.
```

> 注：
>
> 类型别名与字符串字面量类型都是使用 `type` 进行定义

## 映射类型

### Partial<T>（部分的）

属性全部变为可选属性

```ts
type Foo = {
    a: string;
    b: number;
    c: boolean;
}
const a: Partial<Foo> = {};
const b: Partial<Foo> = { b: 12 };

/**
 * Make all properties in T optional
 */
type Patial<T> = {
    [K in keyof T]?: T[K];
}
```

### Required<T>（必须的）

属性全部变为必须属性

```ts
type Foo = {
    a?: string;
    b?: number;
    c: boolean;
}
const a: Required<Foo> = {a: 'qwe'} // Error

const b: Required<Foo> = {a: '23', b: 1, c: false}; // Ok

/**
 * Make all properties in T required
 */
type Required<T> = {
    [K in keyof T]-?: T[K];
}
```

### Readonly<T>（只读的）

属性全部变为只读属性

```ts
export interface Student {
  name: string;
  age: number;
}

const student1: Student = {
  name: '张三',
  age: 20
}
student1.age = 21 // ok

const student2: Readonly<Student> = {
  name: '李四',
  age: 20
}
student2.age = 21 // error

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

### Pick<T,K>（选择）

选择传入类型中的部分属性组成新类型

```ts
export interface Student {
  name: string;
  age: number;
}

const student1: Student = {
  name: '张三',
  age: 20
}

const student2: Pick<Student, 'name'> = {
  name: '李四'
} // ok

const student3: Pick<Student, 'name'> = {
  name: '王五',
  age: 20
} // error

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

### Omit<T,K>（省略）

传入一个类型，和这个类型的几个属性，把传入的属性省略掉，组成一个新类型

```ts
export interface Student {
  name: string;
  age: number;
  class: string;
  school: string;
}

export type PersonAttr = 'name' | 'age'

export type StudentAttr = 'name' | 'age' | 'class' | 'school'

const student1: Omit<Student, PersonAttr> = {} // 'class' | 'school'

/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### Record<K,T>（记录）

构建一个类型，这个类型用来描述一个对象

```ts
export const student1: Record<string, any> = {
  name: '张三',
  age: 20
}

/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

### Exclude<T,U>（排除）

排除相同的，留下不同的

```ts
export type PersonAttr = 'name' | 'age'

export type StudentAttr = 'name' | 'age' | 'class' | 'school'

const student1: Exclude<StudentAttr, PersonAttr> // 'class' | 'school'
      
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```

### Extract<T,U>（取出）

排除不同的的，取出相同的

```ts
export type PersonAttr = 'name' | 'age'

export type StudentAttr = 'name' | 'age' | 'class' | 'school'

const student1: Extract<StudentAttr, PersonAttr> // 'name' | 'age'
      
/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;
```

### NonNullable<T>（不能为null）

剔除 `null`、`undefined`

```ts
type Foo = 'a' | 'b' | null | undefined;
type A = NonNullable<Foo>; // 'a' | 'b'

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;
```

### Parameters<T>（参数）

获取传入函数的参数组成的类型

```ts
export interface Student {
  name: string;
  age: number;
}

export interface StudentFunc {
  (name: string, age: number): Student
}

const student1: Parameters<StudentFunc> // [name: string, age: number]

/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

### ConstructorParameters<T>（构造参数）

获取传入构造函数的参数组成的类型

```ts
export interface Student {
  name: string;
  age: number;
}

export interface StudentConstructor {
  new (name: string, age: number): Student
}

const student1: ConstructorParameters<StudentConstructor> // [name: string, age: number]

/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
```

### ReturnType<T>（返回类型）

获取传入函数的返回类型

```ts
export interface Student {
  name: string;
  age: number;
}

export interface StudentFunc {
  (name: string, age: number): Student
}

const student1: ReturnType<StudentFunc> = {} // Student

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

### InstanceType<T>（构造返回类型、实例类型）

获取传入构造函数的返回类型

```ts
const Student = class {
  name: string;
  age: number;
  constructor (name: string, age: number) {
    this.name = name
    this.age = age
  }
  showInfo () {
    console.log('name: ', this.name, 'age: ', this.age);
  }
}

const student1: InstanceType<typeof Student> = new Student('张三', 20)

/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
```

### Uppercase<T>（大写）

变大写

```ts
export type StudentSexType = 'male' | 'female'

const studentSex: Uppercase<StudentSexType> = 'MALE'

/**
 * Convert string literal type to uppercase
 */
type Uppercase<S extends string> = intrinsic;
```

### Lowercase<T>（小写）

变小写

```ts
export type StudentSexType = 'MALE' | 'FEMALE'

const studentSex: Lowercase<StudentSexType> = 'male'

/**
 * Convert string literal type to lowercase
 */
type Lowercase<S extends string> = intrinsic;
```

### Capitalize<T>（首字母大写）

首字母变大写

```ts
export type StudentSexType = 'male' | 'female'

const studentSex: Capitalize<StudentSexType> = 'Male'

/**
 * Convert first character of string literal type to uppercase
 */
type Capitalize<S extends string> = intrinsic;
```

### Uncapitalize<T>（首字母小写）

首字母变小写

```ts
export type StudentSexType = 'MALE' | 'FEMALE'

const studentSex: Uncapitalize<StudentSexType> = 'mALE'

/**
 * Convert first character of string literal type to lowercase
 */
type Uncapitalize<S extends string> = intrinsic;
```











































