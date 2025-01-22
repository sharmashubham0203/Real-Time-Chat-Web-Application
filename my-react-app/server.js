import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';

// Create an instance of Express
const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: 'https://real-time-chat-web-application-2.onrender.com', // Replace with your frontend's origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Basic Express route
app.get('/', (req, res) => {
  res.send('HTTP server is running.');
});

// Authentication routes (as an example)
app.post('/api/auth/local', (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ error: { message: 'Missing email or password.' } });
  }

  if (identifier === 'test@example.com' && password === 'password') {
    return res.status(200).json({
      jwt: 'mock-jwt-token',
      user: { id: 1, username: 'Test User', email: 'test@example.com' },
    });
  } else {
    return res.status(401).json({ error: { message: 'Invalid credentials.' } });
  }
});

app.post('/api/auth/local/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: { message: 'All fields are required.' } });
  }

  return res.status(201).json({
    jwt: 'mock-jwt-token',
    user: { id: 2, username, email },
  });
});

// Start HTTP server
const HTTP_PORT = process.env.PORT || 5000;
const httpServer = app.listen(HTTP_PORT, () => {
  console.log(`HTTP server is running on port ${HTTP_PORT}`);
});

// WebSocket server setup
const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    console.log(`Received from WebSocket client: ${message}`);
    // Echo the message back to the client
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

console.log(`WebSocket server is running on ws://localhost:${HTTP_PORT}`);
