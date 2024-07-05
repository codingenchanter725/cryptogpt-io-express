const express = require('express');
const logger = require('./middlewares/logger');
const authMiddleware = require('./middlewares/auth');
const app = express();
const port = 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(logger);
// Define a route for the root URL (/)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Protected route (authentication required)
app.get('/protected', authMiddleware, (req, res) => {
  res.send(`Hello, ${req.user.name}. This is a protected route.`);
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
