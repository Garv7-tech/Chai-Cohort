import MyPromise from "./MyPromise.ts"

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
