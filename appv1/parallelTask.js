// Listen for messages from the main script
process.on('message', (message) => {
    // Perform a simple computation on the received numbers
    const result = message.numbers.map((num) => num * num);

    // Send the result back to the main script
    process.send({ result });
});

// Simulate some time-consuming operation
setTimeout(() => {
    // Exit the parallel task after the operation is done
    process.exit();
}, 2000);
