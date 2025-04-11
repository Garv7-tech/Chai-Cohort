type TPromiseReject<T> = (reason: T) => void;
type TPromiseResolve<T> = (value: T) => void;
type TPromiseThenCallback<T, U> = (value: T) => U | MyPromise<U, any>;
type TPromiseCatchCallback<K, L> = (reason: K) => L | MyPromise<any, L>;
type TPromiseFinallyCallback = () => void;

type TPromiseExecutor<T, K> = (
    resolve: TPromiseResolve<T>,
    reject: TPromiseReject<K>
) => void;

enum PromiseState {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'
}

class MyPromise<T, K> {
    private _state: PromiseState = PromiseState.PENDING;
    private _successCallbacksHandlers: Array<(value: T) => void> = [];
    private _failureCallbacksHandlers: Array<(reason: K) => void> = [];
    private _finallyCallbackHandlers: Array<TPromiseFinallyCallback> = [];
    private _value: T | undefined = undefined;
    private _reason: K | undefined = undefined;

    constructor(executor: TPromiseExecutor<T, K>) {
        try {
            executor(
                this._promiseResolver.bind(this),
                this._promiseRejector.bind(this)
            );
        } catch (error) {
            this._promiseRejector(error as K);
        }
    }

    public then<U>(onFulfilled: TPromiseThenCallback<T, U>): MyPromise<U, K> {
        return new MyPromise<U, K>((resolve, reject) => {
            const handlerFn = (value: T) => {
                try {
                    const result = onFulfilled(value);
                    if (result instanceof MyPromise) {
                        result.then(resolve).catch(reject);
                    } else {
                        resolve(result as U);
                    }
                } catch (error) {
                    reject(error as K);
                }
            };
    
            if (this._state === PromiseState.FULFILLED) {
                queueMicrotask(() => handlerFn(this._value as T));
            } else {
                this._successCallbacksHandlers.push(handlerFn);
            }
        });
    }
    
    public catch<L>(onRejected: TPromiseCatchCallback<K, L>): MyPromise<T, L> {
        return new MyPromise<T, L>((resolve, reject) => {
            const handlerFn = (reason: K) => {
                try {
                    const result = onRejected(reason);
                    if (result instanceof MyPromise) {
                        result.then(resolve).catch(reject);
                    } else {
                        reject(result as L);
                    }
                } catch (error) {
                    reject(error as L);
                }
            };
    
            if (this._state === PromiseState.REJECTED) {
                queueMicrotask(() => handlerFn(this._reason as K));
            } else {
                this._failureCallbacksHandlers.push(handlerFn); // FIXED LINE
            }
        });
    }
    
    public finally(onFinally: TPromiseFinallyCallback): MyPromise<T, K> {
        return new MyPromise<T, K>((resolve, reject) => {
            const handler = () => {
                try {
                    onFinally();
                    if (this._state === PromiseState.FULFILLED) {
                        resolve(this._value as T);
                    } else {
                        reject(this._reason as K);
                    }
                } catch (err) {
                    reject(err as K);
                }
            };
    
            if (this._state !== PromiseState.PENDING) {
                queueMicrotask(handler);
            } else {
                this._finallyCallbackHandlers.push(handler);
            }
        });
    }
    
    private _promiseResolver(value: T) {
        if (this._state !== PromiseState.PENDING) return;
        this._state = PromiseState.FULFILLED;
        this._value = value;
        this._successCallbacksHandlers.forEach((cb) => cb(value));
        this._finallyCallbackHandlers.forEach((cb) => cb());
    }

    private _promiseRejector(reason: K) {
        if (this._state !== PromiseState.PENDING) return;
        this._state = PromiseState.REJECTED;
        this._reason = reason;
        this._failureCallbacksHandlers.forEach((cb) => cb(reason));
        this._finallyCallbackHandlers.forEach((cb) => cb());
    }
}

export default MyPromise