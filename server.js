// server.js
const express = require('express');
const server = express();

// This is the endpoint the external service will ping
server.all('/', (req, res) => {
    res.send("Bot is alive and running!");
});

module.exports = () => {
    // Replit uses the PORT environment variable
    server.listen(process.env.PORT, () => { 
        console.log('Keep-alive Web Server is Ready!');
    });
}