// Promise.all() is used for parallel execution of multiple promises:
const promise1 = Promise.resolve("Promise 1");
const promise2 = new Promise((resolve) => setTimeout(() => resolve("Promise 2"), 1000));
const promise3 = fetchUserData();
const fetchUserData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ username: "john_doe", email: "john@example.com" });
        }, 1000);
    });
};

Promise.all([promise1, promise2, promise3])
    .then((results) => {
        console.log("All promises resolved:", results);
    })
    .catch((error) => {
        console.error("At least one promise rejected:", error.message);
    });
