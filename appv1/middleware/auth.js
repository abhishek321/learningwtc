const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authMiddleware = async (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.header('Authorization');
    const bearerToken = token.split(" ");
    // return res.status(401).json({ message: bearerToken[1]});
    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token not provided.' });
    }

    try {
        // Verify the token using the JWT_SECRET
        const decoded = jwt.verify(bearerToken[1], process.env.JWT_SECRET);

        // Find the user based on the decoded user ID
        const user = await User.findById(decoded.userId);

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid token. User not found.' });
        }

        // Attach the user object to the request for further use in the route handler
        req.user = user;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' ,error:error.message});
    }
};

module.exports = authMiddleware;
