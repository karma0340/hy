import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// Get the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.SERVER_PORT || process.env.PORT || 3000);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(
  express.static(path.join(__dirname, 'dist'), {
    etag: true,
    maxAge: '1y',
    setHeaders: (res, servedPath) => {
      if (servedPath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  })
);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Handle SPA routing - must be the last route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
const server = app.listen(port, '0.0.0.0', () => {
  const hostUrls = [`http://localhost:${port}`, `http://127.0.0.1:${port}`];
  console.log('Server is running:');
  hostUrls.forEach((url) => console.log(`  → ${url}`));
  console.log(`Binding address: 0.0.0.0 (all interfaces)`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Serving from: ${__dirname}/dist`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Error: Port ${port} is already in use`);
    console.log('Please choose a different port or terminate the process using the port');
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});

// Handle process termination
const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
signals.forEach(signal => {
  process.on(signal, () => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});