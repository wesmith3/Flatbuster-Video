// const jwt = require('jsonwebtoken');

// // Run environmental variables
// require('dotenv').config();/* Create token for authentication */
// function createJWT(id) {
//     // Get JWT secret from env file
//     const { JWT_SECRET } = process.env;
//     // Sign and create token
//     const token = jwt.sign({id: id}, JWT_SECRET, {
//         expiresIn: 86400 // Expires in 24 hours
//     });
//     return token;
// }

// module.exports = createJWT;