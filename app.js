const express = require('express');
const logger = require('./middlewares/logger');
const authMiddleware = require('./middlewares/auth');
const dotenv = require('dotenv');
const supabase = require('./lib/supabase');
const app = express();
const usersRouter = require('./routers/usersRouter');
const errorHandler = require('./middlewares/errors');

dotenv.config()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(logger);

// Define a route for the root URL (/)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Example route to login a user
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    res.send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Protected route (authentication required)
app.get('/protected', authMiddleware, (req, res) => {
  res.send(`Hello, ${req.user.name}. This is a protected route.`);
});

app.use('/users', usersRouter);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
