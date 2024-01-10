// Creating a Promise:
const myPromise = new Promise((resolve, reject) => {
    // Async operation, e.g., fetching data from a database
    const success = true;

    if (success) {
        resolve("Data successfully fetched");
    } else {
        reject(new Error("Failed to fetch data"));
    }
});

// Handling Promises:
myPromise
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error.message);
    });
