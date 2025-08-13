import express from 'express';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase/firebaseConfig';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Firebase
initializeApp(firebaseConfig);

// Middleware setup
app.use(express.json());

// Define routes (example route)
app.get('/', (req, res) => {
    res.send('Welcome to the E-vote application!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});