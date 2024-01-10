// Promise.race() resolves or rejects as soon as one of the promises in the iterable resolves or rejects:
const promise1 = new Promise((resolve) => setTimeout(() => resolve("Promise 1"), 5000));
const promise2 = new Promise((resolve) => setTimeout(() => resolve("Promise 2"), 1000));

Promise.race([promise1, promise2])
    .then((result) => {
        console.log("First promise resolved:", result);
    })
    .catch((error) => {
        console.error("First promise rejected:", error.message);
    });
