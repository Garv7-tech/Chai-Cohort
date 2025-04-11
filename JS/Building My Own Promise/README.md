# 🔧 MyPromise – Custom Promise Implementation in TypeScript

This project is a handcrafted implementation of the native JavaScript `Promise` API, built using TypeScript. It mimics core behaviors such as `then`, `catch`, and `finally`, and supports promise chaining and asynchronous callback execution.

---

## ✨ Features

- ✅ `then` chaining support
- ✅ `catch` for error handling
- ✅ `finally` callback support
- ✅ Asynchronous execution using `queueMicrotask`
- ✅ Type-safe with generics for resolved and rejected types
- ✅ Minimal and clean logic

---

## 📦 Usage

### 1. Import or copy the class

Include the `MyPromise<T, K>` class in your project.

### 2. Use it like a native Promise

```ts
const waitFor = (s: number) => {
    return new MyPromise<number, string>((resolve, reject) => {
        setTimeout(() => {
            if (s < 5) resolve(s);
            else reject("Too long to wait!");
        }, s * 1000);
    });
};

waitFor(3)
    .then((value) => {
        console.log("Resolved with:", value);
        return value * 2;
    })
    .then((newVal) => {
        console.log("Chained result:", newVal);
        return newVal + 1;
    })
    .catch((err) => {
        console.log("Caught error:", err);
        return "Handled error";
    })
    .finally(() => {
        console.log("Done!");
    });
```

---

## 🧠 Types Explained

```ts
type TPromiseResolve<T> = (value: T) => void;
type TPromiseReject<K> = (reason: K) => void;
type TPromiseExecutor<T, K> = (resolve: TPromiseResolve<T>, reject: TPromiseReject<K>) => void;
type TPromiseThenCallback<T, U> = (value: T) => U | MyPromise<U, any>;
type TPromiseCatchCallback<K, L> = (reason: K) => L | MyPromise<any, L>;
type TPromiseFinallyCallback = () => void;
```

---

## 🛠 Internal State Management

The class maintains the following:

- `PENDING`, `FULFILLED`, or `REJECTED` state
- Queues of success, failure, and finally callbacks
- Stored result value or rejection reason

---

## 📁 File Structure Suggestion

```
my-promise/
├── MyPromise.ts
├── test.ts        # example usage and testing
└── README.md
```
