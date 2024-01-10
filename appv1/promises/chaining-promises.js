// Promises can be chained to perform sequential asynchronous operations:


const fetchUserData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ username: "john_doe", email: "john@example.com" });
        }, 1000);
    });
};

const fetchUserPosts = (username) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["Post 1", "Post 2"]);
        }, 500);
    });
};

fetchUserData()
    .then((userData) => {
        console.log(`User Data:`, userData);
        return fetchUserPosts(userData.username);
    })
    .then((posts) => {
        console.log(`User Posts:`, posts);
    })
    .catch((error) => {
        console.error(error.message);
    });
