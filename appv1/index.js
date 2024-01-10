const cluster = require('cluster');
const os = require('os');
const { fork } = require('child_process');
const dotenv = require('dotenv');

dotenv.config();
require('./config/db');

if (cluster.isMaster) {
    // Fork workers based on the number of CPU cores
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Handle worker events
    cluster.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
        // Fork a new worker to replace the dead one
        cluster.fork();
    });
} else {
    // Worker process - your application logic goes here
    const express = require('express');
    const bodyParser = require('body-parser');
    const usersRouter = require('./routes/users');
    const errorHandler = require('./middleware/errorHandler');
    const rateLimit = require('express-rate-limit');
    const app = express();
// Apply rate limiting middleware
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    });

   

    app.use(bodyParser.json());
     //Apply to all requests
    app.use(limiter);
    app.use('/users', usersRouter);
    app.use(errorHandler);
    app.listen(process.env.PORT, () => {
        console.log(`Worker ${process.pid} listening on port ${process.env.PORT}`);
    });
    // Parallel execution example using fork    
    // Fork a child process
    // const parallelTask = fork('./parallelTask.js');

    // // Send data to the parallel task
    // parallelTask.send({ numbers: [1, 2, 3, 4, 5] });

    // // Listen for messages from the parallel task
    // parallelTask.on('message', (result) => {
    //     console.log(`Worker ${process.pid} received message from parallel task:`, result);
    // });

    // // Handle the exit of the parallel task
    // parallelTask.on('exit', (code) => {
    //     console.log(`Parallel task exited with code ${code}`);
    // });
}
