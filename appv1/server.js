const cluster = require('cluster');
const os = require('os');
const http = require('http');

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

    const server = http.createServer((req, res) => {
        // Simulating a login endpoint
        if (req.url === '/login' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                // Parse and process the login data
                const loginData = JSON.parse(body);
                // Perform authentication logic here
                // ...

                // Respond to the client
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Login successful' }));
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    });

    const PORT = 3000;
    server.listen(PORT, () => {
        console.log(`Worker ${process.pid} listening on port ${PORT}`);
    });
}
